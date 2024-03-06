import { Product } from "../components/types/types";
import { Actions, customFetch } from "./api";

const getId = {
	action: Actions.getID,
	params: { offset: 10, limit: 3 },
};

export const fetchItems = async (offset: number, limit: number) => {
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
};
