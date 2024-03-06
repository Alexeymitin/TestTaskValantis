import { useCallback, useEffect, useState } from "react";
import { fetchItems } from "../api/fetchItems";
import cls from "./App.module.scss";
import { Product } from "../components/types/types";
import { Table } from "../components/TableItems";

const App = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const itemsPerPage = 10;
	const offset = (currentPage - 1) * itemsPerPage;

	const fetchProducts = useCallback(async () => {
		setIsLoading(true);
		try {
			const items = await fetchItems(offset, itemsPerPage);
			if (items !== undefined) {
				setProducts(items);
			}
		} catch (error) {
			console.log(error);
			setError(`${error}`);
		} finally {
			setIsLoading(false);
		}
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

	return (
		<main className={cls.main}>
			<section className={cls.mainSection}>
				<div className={cls.buttonWrapper}>
					<button type="button" onClick={getPrevPage}>
						Prev
					</button>
					<button type="button" onClick={getNextPage}>
						Next
					</button>
				</div>
				<Table data={products} isLoading={isLoading} error={error} />
			</section>
		</main>
	);
};

export default App;
