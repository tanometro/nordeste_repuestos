'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/app/page';
import Header from '@/components/header';

interface User {
  roleId: number | null,
  dni: string,
  username: string,
  password: string,
  name: string,
  //commission: number | null,
  
} 

interface Params{
  id?: number
}

export default function EditUserForm () {
  const storedToken = localStorage.getItem('token');
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    balance: null,
    commission: null,
    created: "",
    dni: "",
    id: 0,
    name: "",
    roleId: 0,
    updated: "",
    username: "",
    password: ""
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUsers();
        setUserData(user);
      } catch (error) {
        console.error("Error en render componente", error);
      }
    }
    fetchData();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${params.id}`, {
        headers: {
          Authorization: storedToken, 
        },
      });
  
      if (response.status !== 200) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
  
      const data = response.data;
  
      return data;
    } catch (error) {
      throw new Error("Error en obtener usuarios");
    }
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.FormEvent) => {
    const property = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;

    setUserData({...userData, [property]: value});
}

const patchUser = async (user: User) =>{
  try {
    const response = await axios.patch(`${BASE_URL}/user/update/${params.id}`, user, {
      headers: {
        Authorization: storedToken,
      },
    });

    if (response.status === 200) {
      setIsEditing(false);
    } else {
      console.error("Error en la solicitud de actualización");
    }
  } catch (error) {
    console.error("Error en la solicitud de actualización", error);
  }
}
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  patchUser(userData)
};
  const { balance, commission, dni, id, name, roleId, username } = userData;

  return (
    <div>
      <Header title="Editando usuario"/>
      <div className="flex justify-center items-center mt-32">
    {isEditing ? (
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-1/2">
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
       
        <button 
        className="w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="submit">
          Guardar
        </button>
      </form>
    ) : (
      
      <div className="flex flex-col items-center w-1/2">
      <h1 className="text-center text-black mb-4">Editando el usuario: {name}</h1>
      <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">{name}</h1>
      <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Usuario: {username}</h1>
      <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Saldo: {balance}</h1>
      <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Rol: {roleId}</h1>
      <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Id: {id}</h1>
      <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Dni: {dni}</h1>
      <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Comisión %: {commission? commission : "No tiene comisiones"}</h1>
        <button
        className="w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={handleEditClick}>Editar</button>
      </div>
    )}
  </div>
    </div>
  )
  }


