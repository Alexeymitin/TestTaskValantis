import { Input } from "../../Input/Input";
import { Product } from "../../../types/types";
import { Row } from "../../Row/ui/Row";
import cls from "./Table.module.scss";

interface TableProps {
	data: Product[];
	onChangeFilter: (key: string, value: string) => void;
	isLoading?: boolean;
	error?: string;
}

export const Table = (props: TableProps) => {
	const { data, isLoading, error, onChangeFilter } = props;
	return (
		<table className={cls.table}>
			<thead>
				<tr>
					<th>ID</th>
					<th>
						<Input
							placeholder="Brand"
							onChange={(value) => onChangeFilter("brand", value)}
						/>
					</th>
					<th>
						<Input
							type="number"
							placeholder="Price"
							onChange={(value) => onChangeFilter("price", value)}
						/>
					</th>
					<th>
						<Input
							placeholder="Description"
							onChange={(value) => onChangeFilter("product", value)}
						/>
					</th>
				</tr>
			</thead>
			<tbody>
				{isLoading ? (
					<tr>
						<td className={cls.loader}>Загрузка...</td>
					</tr>
				) : null}
				{error ? (
					<tr>
						<td className={cls.loader}>{error}</td>
					</tr>
				) : null}
				{data.length > 0 &&
					!isLoading &&
					data.map((product, index) => (
						<Row product={product} key={`${product.id}_${index}`} />
					))}
				{data.length === 0 && !isLoading && !error && (
					<div className={cls.loader}>Товары не найдены!</div>
				)}
			</tbody>
		</table>
	);
};
