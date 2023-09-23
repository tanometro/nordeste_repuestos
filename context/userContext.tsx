'use client';

import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  roleId: number,
  dni: string,
  username: string,
  password: string,
  name: string,
}

interface UsersContextType {
  users: User[];
  createUser: (newUser: User) => void;
}

export const context = createContext<UsersContextType | null>(null);

export const useTask = (): UsersContextType => {
  const dataContext = useContext(context);
  if (!dataContext) throw new Error('useTask must be used within a provider');
  return dataContext;
};

interface UsersProviderProps {
  children: ReactNode;
}


export default function TaskProvider({ children }: UsersProviderProps) {
  const storedToken = localStorage.getItem('token');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://89.117.33.196:8000/user/list', {
          headers: {
            Authorization: storedToken,
          },
        });

        if (response.status !== 200) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = response.data;
        setUsers(data);
      } catch (error) {
        throw new Error("Error en obtener usuarios");
      }
    };

    fetchUsers(); 
  }, []);

  const createUser = (newUser: User) => {
    setUsers([...users, newUser]);
  }

  return (
    <context.Provider value={
      {users,
      createUser
      }}>
      {children}
    </context.Provider>
  );
}
