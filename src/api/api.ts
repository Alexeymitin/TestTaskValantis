/* eslint-disable @typescript-eslint/no-explicit-any */
import { md5 } from "js-md5";

export enum Actions {
	filter = "filter",
	getID = "get_ids",
	getItems = "get_items",
	getFields = "get_fields",
}

export type FilterParams<T> = {
	[K in keyof T]?: T[K];
};

export interface IdParams {
	offset: number;
	limit: number;
}

export interface ItemsParams {
	ids: string[];
}
export interface FieldsParams {
	field: string;
	offset: number;
	limit: number;
}

export interface Request {
	action: Actions;
	params?: IdParams | ItemsParams | FieldsParams;
}

interface Answer<T> {
	result: T[];
}

const password = "Valantis";
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const token = md5(`${password}_${timestamp}`).toString();

export const customFetch = async <T>(request: Request): Promise<Answer<T>> => {
	let retries = 0;
	while (retries < 2) {
		try {
			const response = await fetch("https://api.valantis.store:41000/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Auth": token,
				},
				body: JSON.stringify(request),
			});
			if (response.ok) {
				retries = 2;
				return await response.json();
			} else if (response.status === 401) {
				retries++;
				throw new Error("Ошибка авторизации");
			} else {
				throw new Error(`${response.status}`);
			}
		} catch (error) {
			retries++;
			console.log(error);
			throw new Error(`Произошла ошибка при запросе - ${error}`);
		}
	}

	throw new Error("Не удалось выполнить запрос после нескольких попыток");
};

const getField = {
	action: Actions.getFields,
	params: { field: "brand", offset: 3 },
};

const filter = {
	action: Actions.filter,
	params: { price: 17500.0 },
};
