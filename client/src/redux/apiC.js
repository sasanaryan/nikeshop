import { Start , loginSuccess ,Failure,logout } from "./userRedux";
import {baseurl} from "../config";





export const login = async (dispatch, user)=>{
    dispatch(Start());
    try{
        const res = await baseurl.post("/auth/login",user);
        dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(Failure());
    }
};

export const register = async (dispatch, user)=>{
    dispatch(Start());
    try{
        const res = await baseurl.post("/auth/register",user);
        dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(Failure());
    }
};

export const Delete = async (dispatch, user)=>{
    
    try{
        const res = await baseurl.delete(`/user/`+user._id, {
            headers: {
                "Authorization" : `Bearer ${user.accessToken}`
            }
          });
          dispatch(logout());
        
    }catch(err){
        dispatch(Failure());  
    }
};