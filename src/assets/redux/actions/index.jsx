import { SET_COUNTRY } from "./action-types";

export function setCountry(payload) {
	return { type: SET_COUNTRY, payload }
};