"use client";

import Header from "../components/header";
import getAllUsers from "../components/requests/getAllUsers";
import { UserInterface } from "../components/interfaces";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ActiveMechanics from "../components/users/mechanics/activeMechanics";
import ActiveAdmins from "../components/users/admins/activeAdmins";
import InactiveAdmins from "../components/users/admins/inactiveAdmins";
import InactiveMechanics from "../components/users/mechanics/inactiveMechanics";

export default function Users(){
  
  const [component, setComponent] = useState(true);
  const [active, setActive] = useState(true);
  const router = useRouter();
  const [admins, setAdmins] = useState<UserInterface[]>([]);
  const [mechanics, setMechanics] = useState<UserInterface[]>([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const userList = await getAllUsers();
        const admins = userList.filter((user: UserInterface)=> user.roleId === 1 || user.roleId === 2);
        const mechanics = userList.filter((user: UserInterface) => user.roleId == 3);
        
        setAdmins(admins);
        setMechanics(mechanics);
        
      } catch (error) {
        console.error("Error en render componente", error);
      }
    }
  
    fetchData();
  }, []);
  const toggleActive = () => {
    setActive(!active);
  };

  return (
    <div>
      <Header title="Usuarios" />
      <div className="flex flex-col items-center w-full">
        {component ? (
          active ? 
          <ActiveMechanics mechanics={mechanics} setMechanics={setMechanics}/> : <InactiveMechanics mechanics={mechanics} setMechanics={setMechanics}/>) 
        : (
          active ? <ActiveAdmins admins={admins} setAdmins={setAdmins}/> : <InactiveAdmins admins={admins} setAdmins={setAdmins}/>
          )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 mx-auto mb-4 flex justify-center">
        <button
          type="button"
          onClick={() => setComponent(!component)}
          className="w-48 mr-1 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {component ? "Ver administradores" : "Ver mecánicos"}
        </button>
        <button
          type="button"
          onClick={() => router.push('/createUsers')}
          className="w-48 mx-1 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Crear nuevo usuario
        </button>
        <button
          type="button"
          onClick={toggleActive}
          className="w-48 mx-1 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {active ? "Usuarios inactivos" : "Usuarios activos"}
        </button>
        <button
          type="button"
          onClick={() => router.push('/dashboard')}
          className="w-48 ml-1 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Ir al inicio
        </button>
      </div>
    </div>
  );
}