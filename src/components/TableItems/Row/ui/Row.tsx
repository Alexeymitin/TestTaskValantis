import { Product } from "../../../types/types";

interface RowProps {
	product: Product;
}

export const Row = (props: RowProps) => {
	const { product } = props;
	return (
		<tr>
			<td>{product.id}</td>
			<td>{product.brand}</td>
			<td>{product.price}</td>
			<td>{product.product}</td>
		</tr>
	);
};
