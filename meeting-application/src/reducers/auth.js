import { LOGIN, LOGOUT } from "../actions/constants";
const initialState = {
    email: localStorage.getItem("EMAIL") || "",
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                email: action.payload.email,
            };
        case LOGOUT:
            return {
                email: "",
            };
        default:
            return state;
    }
};
export default authReducer;
