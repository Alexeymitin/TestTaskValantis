import { Product } from "../components/types/types";
import { Actions, customFetch } from "./api";

export const fetchItems = async (offset: number, limit: number) => {
	try {
		const response = await customFetch<string>({
			action: Actions.getID,
			params: {
				offset,
				limit,
			},
		});

		const items = await customFetch<Product>({
			action: Actions.getItems,
			params: {
				ids: [...new Set(response.result)],
			},
		});

		return items.result;
	} catch (error) {
		console.log(error);
		return `${error}`;
	}
};
