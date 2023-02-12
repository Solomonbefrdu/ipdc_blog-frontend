import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, updateFailure, updateStart, updateSuccess } from "./authRedux";

export const login = async (dispatch, user)=>{
    dispatch(loginStart());
    try {
        const res = await publicRequest.post(`/api/auth/login`, user)
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure())
    }
}

export const updateUser = async (dispatch, updateData)=>{
    dispatch(updateStart());
    try {
        const res = await userRequest.put(`/api/users/${updateData.userId}`, updateData)
        dispatch(updateSuccess(res.data));
    } catch (err) {
        dispatch(updateFailure());
    }
}