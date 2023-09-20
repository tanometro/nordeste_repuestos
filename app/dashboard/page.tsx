"use client";

import axios from "axios";
//import {useRouter} from 'next/router';
import {useAppSelector } from "@/redux/hooks";

export default function Dashboard(){
    const token = useAppSelector((state) => state.tokenReducer.token);
    //const router = useRouter();

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
            <h1 className="text-black">{token}</h1>
            {/* <button onClick={logOut}>
                Log Out
            </button> */}
        </div>
    )
}