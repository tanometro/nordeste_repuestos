"use client"
import Header from "@/components/header";
import { useState } from "react";


interface User {
    dni: string,
    username: string,
    password: string,
    name: string,
    roleId: number,
  }  

export default function CreateUser () {
    const [userData, setUserData] = useState({
        roleId: "",
        name: "",
        username: "",
        dni: "",
        password: "",
        commission: "",
    })

    const postUser = async (user: User) => {
        try {
        const response = fetch('http://89.117.33.196:8000/user/add', {
            method: 'POST',    
            HEADER: token,
                user,
            }) 
        }
        catch(error){
            throw new Error ("No se pudo enviar los datos del user")
        }
    }
    const handleChange = (e: React.FormEvent) => {
        const property = (e.target as HTMLInputElement).name;
        const value = (e.target as HTMLInputElement).value;

        setUserData({...userData, [property]: value});
    
}

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        postUser(userData);
        
        }

let roles = ["Mecánico", "Adiministrador"];

    return (
        <div>
        <Header title="Crear nuevo usuario"/>
        <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-1/2">
        <select className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
                value={userData.role}
                onChange={handleChange}>
            <option value="" disabled defaultValue="" hidden >Seleccionar rol</option>
                {roles.map( (roles, index) => <option key={index}>{roles}</option> )}
        </select>
        <input placeholder="Nombre" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"/>
        <input placeholder="Username" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"/>
        <input placeholder="DNI" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"/>
        <input placeholder="Contraseña" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"/>
        <input placeholder="Repetir contraseña" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"/>
        <input placeholder="% comisión" className="rounded-2xl border border-custom-red w-1/2 text-center text-black"/>
        </form>
        </div>
    </div>
    )
}