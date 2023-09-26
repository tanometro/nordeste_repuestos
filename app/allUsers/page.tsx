"use client";

import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import List from "@/components/lists";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../page";
import { useRouter } from "next/navigation";

interface User {
  name: string,
  dni: string,
  roleId: number,
  balance: number,
  id: number,
  isActive: boolean,
}

export default function Users(){

  const [users,setUsers] = useState<User[]>([]);
  const storedToken = localStorage.getItem('token');
  const [name, setName] = useState("");
  const router = useRouter();
  const [num, setNum] = useState(1);

  let pages = []

  useEffect(() => {
    async function fetchData() {
      try {
        const userList = await getUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Error en render componente", error);
      }
    }
    fetchData();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/list`, {
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

  const deleteUser = async (id: number) => {
    try {
      if (storedToken !== null) {
      const response = await fetch(`${BASE_URL}/user/deactivate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: storedToken,
        },
        body: JSON.stringify({id: id.toString()}),
      });
      if (!response.ok) {
          throw new Error('Error al editar el usuario' + response);
      } 
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  }  else{
          window.alert("Usuario editado exitosamente")
      }

  } catch (error) {
    if (error instanceof Error) {
      throw new Error("No editó el usuario: " + error.message);
    } else {
      throw new Error("Error desconocido: " + String(error));
    }
  }
  };

  const search = (name: string) =>{
    try{
      const filteredUsers = users.filter(user => user.name == name )
      setName(name);
      return filteredUsers;
    }
    catch(error){
      console.log(error);
    }
   
 }
    return (
        <div>
          <Header title="Usuarios"/>
            <div className="flex flex-col items-center h-screen">
              <List>
                <table cellSpacing="10">
                  <thead>
                    <tr className="border-b border-gray">
                      <th className="">Nombre</th>
                      <th className="">Dni</th>
                      <th className="">Tipo</th>
                      <th className="">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter((user) => user.isActive === true)
                    .map((user, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="">{user.name}</td>
                            <td className="">{user.dni}</td>
                            <td className=""> {user.roleId === 1 ? 'SúperAdmin' : user.roleId === 2 ? 'Admin' : user.roleId === 3 ? 'Mecánico' : ''}</td>
                            <td className=""> {user.roleId === 1 ? 'Sin saldo' : user.roleId === 2 ? 'Sin saldo' : user.roleId === 3 ? `${user.balance}` : ""}</td>
                            <td>
                              <button onClick={() => router.push(`/editUser/${user.id}`)}>
                                <a className="text-blue-500">Ver usuario</a>
                              </button>
                            </td>
                            <td>
                              <button onClick={() => deleteUser(user.id) }>
                                <a className="text-blue-500">Eliminar</a>
                              </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
              </List>
                <button type="button" onClick={() => router.push('/createUsers')} 
                className="w-48 mt-6 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Crear nuevo usuario
                </button>
                <button type="button" onClick={() => router.push('/dashboard')} 
                className="w-48 mt-6 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Ir al inicio
                </button>
            </div>
        </div>
    )
}
