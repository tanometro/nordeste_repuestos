"use client";

import Header from "@/components/header";
import { useRouter, useParams } from 'next/navigation';
import { useState} from "react";
import { BASE_URL } from "@/app/page";
import validations from '../../components/validations';

interface User {
  roleId: number | null,
  dni: string,
  username: string,
  password: string,
  name: string,
  commission: number | null,
  
} 

export default function CreateUser () {
  const storedToken = localStorage.getItem('token');
  const params = useParams()
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
});

  const [userData, setUserData] = useState<User>({
    dni: "",
    username: "",
    password: "",        
    name: "",
    roleId: null,
    commission: 5,
  })
// const [userDni, setUserDni] = useState("");
// const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");
// const [name, setName] = useState("");
// const [roleId, setRoleId] = useState("");

//  const resetFormFields = () => {
//     setUserData({
//       roleId: null,
//       name: "",
//       username: "",
//       dni: "",
//       password: "",
//       commission: 5
//     });
//   };
    // const [repitePass, setRepeatePass] = useState<string>("");

    const postUser = async (user: User) => {
        try {
            if (storedToken !== null) {
            const response = await fetch(`${BASE_URL}/user/add`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', 
                Authorization: storedToken,
              },
              body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error('Error al crear el usuario');
            } 
        }  else{
                window.alert("Usuario creado exitosamente")
            }

        } catch(error){
            throw new Error ("No se pudo crear el usuario")
        }
    }


    const handleChange = (e: React.FormEvent) => {
        const property = (e.target as HTMLInputElement).name;
        const value = (e.target as HTMLInputElement).value;

        setUserData({...userData, [property]: value});
        setErrors(validations({...userData, [property] : value}));
    }

    const handleSubmit = async (e: React.FormEvent) =>{
      e.preventDefault();
     
        postUser(userData);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
        router.push('/allUsers') 
        }

let roles = [1, 2, 3];

    return (
        <div>
      <Header title="Crear nuevo usuario" />
      <div className="justify-center">
      {!storedToken ? (
        <p className="text-black text-xl ">
          No tenes permiso para crear usuarios
        </p>
      ) : (
        <div>
        <div className="flex justify-center mt-32 h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-1/2">
        <select
            className="rounded-2xl border border-custom-red w-1/2 h-8 text-center text-black mb-4"
            onChange={handleChange}
            required
            name="roleId"
            value={userData.roleId !== null ? userData.roleId.toString() : ""}
            >
            <option value="" disabled defaultValue="" hidden>
                Seleccionar rol
            </option>
            {roles.map((roleId, index) => (
                <option key={index} value={roleId.toString()}>
                {roleId === 1 ? "SúperAdmin" : roleId === 2 ? "Admin" : roleId === 3 ? "Mecánico" : ""}
                </option>
            ))}
      </select>
        <input
        name="name"
        placeholder="Nombre" 
        className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
        value={userData.name}
        onChange={handleChange}
        required/>
        <input 
        name="username"
        placeholder="Username" 
        className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
        value={userData.username}
        onChange={handleChange}
        required/>
        <input 
        name="dni"
        type="number"
        placeholder="DNI" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
         value={userData.dni}
         onChange={handleChange}
         required/>
        <input 
        name="password"
        placeholder="Contraseña" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
         value={userData.password}
         onChange={handleChange}
         required/>
         <p>{errors.password}</p>
        {/* <input
        name="repite-pass" placeholder="Repetir contraseña" 
        className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
        value={repitePass}
        onChange={(e) => setRepeatePass(e.target.value)}
        required
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>} */}
        <input 
        name="commission"
        placeholder="% comisión"
        className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
         value={userData.commission !== null ? userData.commission.toString() : ""}
         onChange={handleChange}/>
         <button type="submit" 
         className="w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Crear usuario
         </button>
        </form>
        </div>
        {showSuccessMessage && (
      <p className="text-black mt-24">Usuario creado correctamente</p>)}
    </div>
      )}
      </div>
    </div>
    )
}
