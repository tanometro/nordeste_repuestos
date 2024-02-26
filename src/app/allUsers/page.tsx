"use client";

import Header from "../../components/header";
import getAllUsers from "../../requests/getAllUsers";
import { UserInterface } from "../../types/interfaces";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ActiveMechanics from "../../components/users/mechanics/activeMechanics";
import ActiveAdmins from "../../components/users/admins/activeAdmins";
import InactiveAdmins from "../../components/users/admins/inactiveAdmins";
import InactiveMechanics from "../../components/users/mechanics/inactiveMechanics";
import PrimaryButton from "@/src/components/buttons/primaryButton";
import { useSession } from "next-auth/react";

export default function Users(){
  const [component, setComponent] = useState(true);
  const [active, setActive] = useState(true);
  const router = useRouter();
  const [admins, setAdmins] = useState<UserInterface[]>([]);
  const [mechanics, setMechanics] = useState<UserInterface[]>([]);
  const {data: session} = useSession();
  useEffect(() => {
    async function fetchData() {
      try {
        const userList = await getAllUsers(session?.user.token);
        const admins = userList.filter((user: UserInterface)=> user.roleId === 1 || user.roleId === 2);
        const mechanics = userList.filter((user: UserInterface) => user.roleId == 3);
        
        setAdmins(admins);
        setMechanics(mechanics);
        
      } catch (error) {
        console.error("Error en render componente", error);
      }
    }
  
    fetchData();
  }, [session?.user.token]);
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
        <PrimaryButton title={component ? "Ver administradores" : "Ver mecánicos"} onClickfunction={() => setComponent(!component)}/>
        <PrimaryButton title='Crear nuevo usuario' onClickfunction={() => router.push('/createUsers')}/>
        <PrimaryButton title={active ? "Usuarios inactivos" : "Usuarios activos"} onClickfunction={toggleActive}/>
        <PrimaryButton title='Ir al inicio' onClickfunction={() => router.push('/dashboard')}/>
      </div>
    </div>
  );
}