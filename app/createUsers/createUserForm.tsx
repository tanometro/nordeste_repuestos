"use client";
import { useState } from "react";
import Header from "@/components/header";
// import {useAppSelector} from "@/redux/hooks";

interface User {
    dni: string,
    username: string,
    password: string,
    name: string,
    roleId: number | null,
    commission: number | null,
  }  

export default function CreateUserForm(){
//const token = useAppSelector(state => state.tokenReducer.token);
const storedToken = localStorage.getItem('token');

    const [userData, setUserData] = useState<User>({
        roleId: null,
        name: "",
        username: "",
        dni: "",
        password: "",
        commission: 5,
    })
    const [repeatePass, setRepeatePass] = useState<string>("")

    const postUser = async (user: User) => {
        try {
            const response = await fetch('http://89.117.33.196:8000/user/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${storedToken}`,
              },
              body: JSON.stringify(user),
            });
        }
        catch(error){
            throw new Error ("No se pudo crear el usuario")
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

let roles = [1, 2];

return (
    <div>
        <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-1/2">
        <select className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
                value={userData.roleId !== null ? userData.roleId.toString() : ""}
                onChange={handleChange}
                required>
            <option value={0} disabled defaultValue="" hidden>
                Seleccionar rol
            </option>
                {roles.map((roleId, index) => (
                    <option key={index} value={roleId}>
                    {roleId === 1 ? "Mecánico" : roleId === 2 ? "Administrador" : ""}
                    </option>
            ))}
        </select>
        <input placeholder="Nombre" 
        className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
        value={userData.name}
        onChange={handleChange}
        required/>
        <input placeholder="Username" 
        className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
        value={userData.username}
        onChange={handleChange}
        required/>
        <input placeholder="DNI" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
         value={userData.dni}
         onChange={handleChange}
         required/>
        <input placeholder="Contraseña" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
         value={userData.password}
         onChange={handleChange}
         required/>
        <input
        name="repite-pass" placeholder="Repetir contraseña" 
        className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
        value={repeatePass}
        onChange={(e) => setRepeatePass(e.target.value)}
        required
        />
        <input placeholder="% comisión" className="rounded-2xl border border-custom-red w-1/2 text-center text-black"
         value={userData.commission !== null ? userData.commission.toString() : ""}
         onChange={handleChange}/>
        </form>
        </div>
    </div>
)

}

