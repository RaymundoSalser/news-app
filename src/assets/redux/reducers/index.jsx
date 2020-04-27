import { SET_COUNTRY } from "../actions/action-types";

const initialState = {
	country: {
		code : "mx",
		name : "Mexico"
	}
};

function rootReducer(state = initialState, action) {
	switch(action.type){
		case SET_COUNTRY:
			return {
				...state,
				country: {
					...action.payload
				}
			}
		default:
			return state
	}
}

export default rootReducer;