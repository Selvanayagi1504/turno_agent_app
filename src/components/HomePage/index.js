import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const HomeWelcome = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        var cookieArr = document.cookie.split(";");
        var data = "";
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
            if("token" === cookiePair[0].trim()) {
                data = decodeURIComponent(cookiePair[1]);
            }
        }
        if(data.length > 0){
        }
        else{
            navigate('/login');
        }
    },[navigate])
    return (
        <>
            Welcome to Turno...
        </>
    )
}

export default HomeWelcome


