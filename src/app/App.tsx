import { useCallback, useEffect, useState } from "react";
import { fetchItems } from "../api/fetchItems";
import cls from "./App.module.scss";
import { Product } from "../components/types/types";
import { Table } from "../components/TableItems";
import { fetchFilters } from "../api/fetchFilters";

const App = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const itemsPerPage = 10;
	const offset = (currentPage - 1) * itemsPerPage;

	const fetchProducts = useCallback(async () => {
		setIsLoading(true);

		const items = await fetchItems(offset, itemsPerPage);
		if (items && typeof items !== "string") {
			setProducts(items);
		} else {
			setError(items);
		}
		setIsLoading(false);
	}, [offset]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const getNextPage = () => {
		setCurrentPage((prev) => prev + 1);
	};

	const getPrevPage = () => {
		setCurrentPage((prev) => {
			if (prev > 1) {
				return prev - 1;
			} else {
				return prev;
			}
		});
	};

	const onChangeFilter = useCallback(
		async (key: string, value: string) => {
			let filter;
			if (key === "brand") {
				filter = { brand: value };
			} else if (key === "price") {
				filter = { price: Number(value) };
			} else {
				filter = { product: value };
			}
			setIsLoading(true);

			const filterItems = await fetchFilters(filter, offset, itemsPerPage);
			if (filterItems && typeof filterItems !== "string") {
				setIsLoading(false);
				setProducts(filterItems);
			} else {
				setError(filterItems);
			}
		},
		[offset],
	);

	return (
		<main className={cls.main}>
			<section className={cls.mainSection}>
				<div className={cls.buttonWrapper}>
					<button type="button" onClick={getPrevPage} className={cls.button}>
						Prev
					</button>
					<button type="button" onClick={getNextPage} className={cls.button}>
						Next
					</button>
				</div>
				<Table
					data={products}
					isLoading={isLoading}
					onChangeFilter={onChangeFilter}
					error={error}
				/>
			</section>
		</main>
	);
};

export default App;
