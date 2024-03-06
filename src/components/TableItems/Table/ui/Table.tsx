import { Product } from "../../../types/types";
import { Row } from "../../Row/ui/Row";
import cls from "./Table.module.scss";

interface TableProps {
	data: Product[];
	isLoading?: boolean;
	error?: string;
}

export const Table = (props: TableProps) => {
	const { data, isLoading, error } = props;
	return (
		<table className={cls.table}>
			<thead>
				<tr>
					<th>ID</th>
					<th>Brand</th>
					<th>Price</th>
					<th>Description</th>
				</tr>
			</thead>
			{isLoading && <div className={cls.loader}>Загрузка...</div>}
			{error && <div className={cls.loader}>{error}</div>}
			{data && !isLoading && (
				<tbody>
					{data.map((product, index) => (
						<Row product={product} key={`${product.id}_${index}`} />
					))}
				</tbody>
			)}
		</table>
	);
};
