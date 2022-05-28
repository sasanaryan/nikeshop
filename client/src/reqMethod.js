import axios from "axios";
import {useSelector} from "react-redux";
import React from 'react'

const URL = "http://localhost:500/api";


const TOKEN = () => {
    const TOKEN = useSelector(state=>state.currentUser.accessToken);
    return (
        <>
            {TOKEN}
        </>
    )
};





export const publicReq = axios.create({
    baseURL:URL,
});

export const userReq = axios.create({
    baseURL:URL,
    header:{token: `Bearer ${TOKEN}`},
});
