import { Product } from "../../../types/types";

interface RowProps {
	product: Product;
	key?: string;
}

export const Row = (props: RowProps) => {
	const { product, key } = props;
	return (
		<tr key={key}>
			<td>{product.id}</td>
			<td>{product.brand}</td>
			<td>{product.price}</td>
			<td>{product.product}</td>
		</tr>
	);
};
