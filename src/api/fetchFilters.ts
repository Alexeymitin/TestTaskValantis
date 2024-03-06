import { Product } from "../components/types/types";
import { Actions, FilterParams, customFetch } from "./api";

export const fetchFilters = async (
	params: FilterParams<Product>,
	offset: number,
	limit: number,
) => {
	try {
		const response = await customFetch<string>({
			action: Actions.filter,
			params: params,
		});

		const items = await customFetch<Product>({
			action: Actions.getItems,
			params: {
				ids: [...new Set(response.result.slice(offset, limit))],
			},
		});

		return items.result;
	} catch (error) {
		console.log(error);
		return `${error}`;
	}
};
