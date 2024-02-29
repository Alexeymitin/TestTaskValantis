import { Product } from "../../../types/types";
import { Row } from "../../Row/ui/Row";

interface TableProps {
	data: Product[];
}

export const Table = (props: TableProps) => {
	const { data } = props;
	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Brand</th>
					<th>Price</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{data &&
					data.map((product, index) => (
						<Row product={product} key={`${product.id}_${index}`} />
					))}
			</tbody>
		</table>
	);
};
