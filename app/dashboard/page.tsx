"use client";

import axios from "axios";
import { useState } from "react";
//import {useAppSelector } from "@/redux/hooks";

export default function Dashboard(){
    //const token = useAppSelector((state) => state.persistedReducer.tokenSaver.token);
    const storedToken = localStorage.getItem('token');
    
    const [token, setToken] = useState<string | null>(null);

    // if(storedToken){
    //     setToken(storedToken);
    // }
    const click = () => {
        console.log(storedToken)
    }
    // const logOut = async () =>{
    //     try{
    //         router.push('/')
    //     }
    //     catch (error){
    //         throw new Error("Fallo en logout ")
    //     }
    // }
    return (
        <div>
            <h1 className="text-black">DASHBOARD</h1>
            <h1 className="text-black">{storedToken}</h1>
            <button onClick={click} className="text-black">
                Log Out
            </button>
        </div>
    )
}
