//Leo I know you are leyendo this so I want to say:
// 6 + 1
// Bakaaaa

'use client';
import { useState } from "react";
import axios from "axios";

interface SearchBarProps {
    id: string;
  }

export default function SearchBar(props: SearchBarProps){
    const [id, setId] = useState();

    // const search = async (string: string | number) => {
    //     let response;

    //     const URL: string = "";
       
    //         if(typeof string == "string"){ //Si es USER NAME 
    //             try{
    //                 const response = await axios.get("") //Solicitud con USERNAME
    //             }
    //             catch(error){
    //                 if (error instanceof Error) {
    //                     window.alert("Error: " + error.message);
    //             }
    //                 else{
    //                     window.alert("Error desconocido en SearchBar");
    //                 }}}
    //         else{ //Si es DNI
    //             try{
    //                 const response = await axios.get("") //Solicitud con DNI
    //             }
    //             catch(error){
    //                 if (error instanceof Error) {
    //                     window.alert("Error: " + error.message);
    //             }
    //                 else{
    //                     window.alert("Error desconocido en SearchBar");
    //                 }}}}

    return (
        <div className="flex justify-center mt-12">
        <input 
        className="rounded-2xl border border-custom-red w-1/2 text-center text-black"
        placeholder="Busca por DNI o NOMBRE USUARIO"
        type="search"/>
        </div>
    )
    }
