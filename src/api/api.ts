/* eslint-disable @typescript-eslint/no-explicit-any */
import { md5 } from "js-md5";
import { Product } from "../components/types/types";

export enum Actions {
	filter = "filter",
	getID = "get_ids",
	getItems = "get_items",
	getFields = "get_fields",
}

export type FilterParams<T> = {
	[K in keyof T]?: T[K]
}

export interface IdParams {
	offset: number
	limit: number
}

export interface ItemsParams {
	ids: string[]
}
export interface FieldsParams {
	field: string
	offset: number
	limit: number
}

export type ActionsParams<T> = T extends Actions.filter 
? FilterParams<Product> 
: T extends Actions.getID 
? IdParams
: T extends Actions.getItems
? ItemsParams
: FieldsParams


export interface Request { 
	action: Actions
	params?: ActionsParams<Actions>
}

interface Answer extends Response {
	result: []
}

const password = "Valantis";
const timestamp = new Date().toISOString().slice(0,10).replace(/-/g,"");
const token = md5(`${password}_${timestamp}`).toString();

export const customFetch = async (request: Request): Promise<Answer | any> => {
	let retries = 0;
	while (retries < 2) {
		try {
			const response = await fetch("https://api.valantis.store:41000/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Auth": token
				},
				body: JSON.stringify(request),
			});
			if (response.ok) {
				retries = 2;
				return response.json();
			} else {
				retries++;
			}
		} catch (error) {
			retries++;
			console.log(error);
		}
	}
};



const getField = {
	"action": Actions.getFields,
	"params": {"field": "brand", "offset": 3}
};

const filter = {
	"action": Actions.filter,
	"params": {"price": 17500.0}
};

