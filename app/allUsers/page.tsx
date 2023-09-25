"use client";

import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import List from "@/components/lists";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../page";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  dni: string;
  roleId: number;
  balance: number;
  id: number,
}

export default function Users(){

  const [users,setUsers] = useState<User[]>([]);
  const storedToken = localStorage.getItem('token');
  const [name, setName] = useState("");
  const router = useRouter();

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
            <Header title="Usuarios"></Header>
            
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
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="">{user.name}</td>
                          <td className="">{user.dni}</td>
                          <td className=""> {user.roleId === 1 ? 'SúperAdmin' : user.roleId === 2 ? 'Admin' : user.roleId === 3 ? 'Mecánico' : ''}</td>
                          <td className=""> {user.roleId === 1 ? 'Sin saldo' : user.roleId === 2 ? 'Sin saldo' : user.roleId === 3 ? `${user.balance}` : ""}</td>
                          <button onClick={() => router.push(`/editUser/${user.id}`)}>
                              <a className="text-blue-500">Ver usuario</a>
                          </button>
                          <button>Eliminar</button>
                </tr>
              ))}
            </tbody>
          </table>
        </List>

        </div>
    )
}
