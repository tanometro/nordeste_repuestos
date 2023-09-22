"use client";

// import { useAppSelector } from "@/redux/hooks";
import CreateUserForm from "./createUserForm";
import Header from "@/components/header";
import { useRouter } from 'next/navigation';

export default function CreateUser () {
    const storedToken = localStorage.getItem('token');
  

    return (
        <div>
      <Header title="Crear nuevo usuario" />
      <div className="justify-center">
      {!storedToken ? (
        <p className="text-black text-xl ">
          No tenes permiso para crear usuarios
        </p>
      ) : (
        <CreateUserForm />
      )}
      </div>
    </div>
    )
}
