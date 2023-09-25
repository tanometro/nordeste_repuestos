"use client";

import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import UsersList from "@/components/users";
import List from "@/components/lists";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../page";

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
              <table>
                <thead>
                  <tr>
                    <td className="mx-3">Nombre</td>
                    <td className="mx-3">Dni</td>
                    <td className="mx-3">Tipo</td>
                    <td className="mx-3">Saldo</td>
                  </tr>
                </thead>
                {<tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <UsersList
                        name={user.name}
                        dni={user.dni}
                        roleId={user.roleId} 
                        balance={user.balance}
                        id={user.id}
                      />
                    </tr>
                    ))}
                </tbody>}
              </table>
          </List>
        </div>
    )
}
