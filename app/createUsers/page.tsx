"use client";

// import { useAppSelector } from "@/redux/hooks";
import CreateUserForm from "./createUserForm";
import Header from "@/components/header";
import { useRouter } from 'next/navigation';

export default function CreateUser () {
    const storedToken = localStorage.getItem('token');
    // const token = useAppSelector(state => state.persistedReducer.tokenSaver.token);
    // const router = useRouter();

    // const checkToken = () => {
    //     const token = useAppSelector().token; 
    //     if (token !== storedToken) {
    //         router.replace('/');
    //     }
    //   };
      
    //   setInterval(checkToken, 3600000);

    return (
        <div>
      <Header title="Crear nuevo usuario" />
      <div className="flex justify-center mt-40">
      {!storedToken ? (
        <p className="text-black text-xl text- ">
          No tenes permiso para crear usuarios
        </p>
      ) : (
        <CreateUserForm />
      )}
      </div>
    </div>
    )
}
