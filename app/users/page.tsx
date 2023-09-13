"use client";

import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import UsersList from "@/components/users";
import List from "@/components/lists";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  dni: string;
  roleId: number;
  balance: number;
}

export default function Users(){

  const [users,setUsers] = useState<User[]>([]);

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
    try{
      const response = await axios.get('http://89.117.33.196:8000/user/list');
      if(response.status !== 200){
        throw new Error(`Error en la solicitud: ${response}`);
      }
      const data = await response.data();
      return data;
    }
    catch (error){
      throw new Error ("Error en obtener usuarios");
    }
  }
    return (
        <div>
            <Header title="Usuarios"></Header>
            <SearchBar id={''}/>
            <List>
              <table>
                <thead>
                  <tr>
                    <th className="mx-3">Nombre</th>
                    <th className="mx-3">Dni</th>
                    <th className="mx-3">Tipo</th>
                    <th className="mx-3">Saldo</th>
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
                      />
                    </tr>
                    ))}
                </tbody>}
              </table>
          </List>
        </div>
    )
}
