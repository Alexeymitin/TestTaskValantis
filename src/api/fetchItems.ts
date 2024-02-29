import { Actions, customFetch } from "./api";

const getId = {
	"action": Actions.getID,
	"params": {"offset": 10, "limit": 3}
};

export const fetchItems = async (offset: number, limit: number) => {
	await customFetch({
		action: Actions.getID,
		params: {
			offset,
			limit
		}
	}).then((value) => {
		const data = customFetch({
			action: Actions.getItems,
			params: {
				ids: value.result
			}
		}).then(value => {
			return value.result;
		});
		return data;
	});
};