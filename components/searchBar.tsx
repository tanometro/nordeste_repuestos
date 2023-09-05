'use client';
import { useState } from "react";
import axios from "axios";

interface SearchBarProps {
    id: string;
  }

export default function SearchBar(props: SearchBarProps){
    const [id, setId] = useState();

    const search = async (string: string | number) => {
        let response;
        try{
            if(typeof string == "string"){
                const response = await axios.get("")
            }
            else{
                const response = await axios.get("")
            }
        }
        catch(error){
            if (error instanceof Error) {
                window.alert("Error: " + error.message);
        }
            else{
                window.alert("Error desconocido en SearchBar");
            }
        
    }

    return (
        <div className="flex justify-center">
        <input 
        className="rounded-2xl border border-custom-red w-1/2 text-center text-black"
        placeholder="Busca por DNI o NOMBRE USUARIO"
        type="search"/>
        </div>
    )
    }
}