'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import getOneUser from '@/components/requests/getOneuser';
import patchUser from '@/components/requests/patchUser';
import Header from '@/components/header';


export default function EditUserForm () {
  const storedToken = localStorage.getItem('token');
  const params = useParams();
  const userId = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id, 10);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    balance: null,
    commission: null,
    dni: "",
    id: 0,
    name: "",
    roleId: 0,
    username: "",
    password: "",
    isActive: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getOneUser(userId);
        setUserData(user);
      } catch (error) {
        console.error("Error en render componente", error);
      }
    }
    fetchData();
  }, []);

    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleChange = (e: React.FormEvent) => {
      const property = (e.target as HTMLInputElement).name;
      const value = (e.target as HTMLInputElement).value;

      setUserData({...userData, [property]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      patchUser(userData);
      router.push('/allUsers')
    };

  const { balance, commission, dni, name, roleId, username } = userData;

  return (
    <div>
      <Header title="Editando usuario"/>
      <div className="flex justify-center items-center">
    {isEditing ? (
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-1/2">
        <label className="text-clip text-black">Nombre:</label>
        <input
          name="name"
          placeholder="Nombre" 
          className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
          value={userData.name}
          onChange={handleChange}
          required
        />
        <label className="text-clip text-black">Username:</label>
        <input 
          name="username"
          placeholder="Username" 
          className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
          value={userData.username}
          onChange={handleChange}
          required
        />
        <label className="text-clip text-black">DNI:</label>
        <input 
          name="dni"
          type="number"
          placeholder="DNI" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
          value={userData.dni}
          onChange={handleChange}
          required
        />
        <label className="text-clip text-black">Password:</label>
        <input 
          name="password"
          placeholder="Contraseña" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
          value={userData.password}
          onChange={handleChange}
          required
        />
        {
          userData.roleId == 3 ? (
          <div>
          <label className="text-clip text-black">Comisión %:</label>
            <input 
          name="commission"
          placeholder="Comisión %" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
          value={userData.commission || ""} 
          onChange={handleChange}
          required
        />
        </div>
          ) : null
        }
       
        <button 
          className="w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="submit">
            Guardar
        </button>
      </form>
    ) : (
      <div className="flex flex-col items-center w-1/2">
        {isEditing ? (
          <h1 className="text-center text-black mb-4">Editando el usuario {name}</h1>
        ) :
        (
          <h1 className="text-center text-black mb-4">Detalle del usuario {name}</h1>
        )}
        <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Nombre: {name}</h1>
        <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Username: {username}</h1>
        {roleId == 3 ? (
          <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Saldo: {balance}</h1>
        ) : ""
        }
        <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">
        Rol: {roleId == 1 ? "SúperAdmin" : roleId == 2 ? "Admin" : roleId == 3 ? "Mecánico" : ""}</h1>
        <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Dni: {dni}</h1>
        <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Comisión %: {commission? commission : "No tiene comisiones"}</h1>
          <button
          className="w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={handleEditClick}>
            Editar
          </button>
      </div>
    )}
  </div>
    </div>
  )
}

