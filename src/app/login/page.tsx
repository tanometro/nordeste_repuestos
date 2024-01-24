"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useParams, useRouter, usePathname } from 'next/navigation';

import { signIn } from "next-auth/react";
import SubmitButton from "@/src/components/buttons/submitButton";

export default function Home() {
    const router = useRouter();
  const { tokenExpired } = useParams();

  const [userData, setUserData] = useState({
      username: "", 
      password: "",
    });
  const [viewPass, setViewPass] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    
    const response = await signIn("credentials", {
      username: userData.username,
      password: userData.password,
    });
    
    console.log('llega aca');
    
    if (response && response.status === 200) {
      router.push("/dashboard");
    } else {
      console.log("Credenciales Inválidas");
      setErrors("Credenciales Inválidas");
    }
    }

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
      
    //   try {
    //     console.log('Try');
        
    //     await signIn("credentials", {
    //       username: userData.username,
    //       password: userData.password,
    //     }).then((response) => {
    //       if (response?.status == 401) {
    //         setErrors("Credenciales Invalidas");
    //       } else {
    //         router.push("/dashboard");
    //       }
    //     });
    //   } catch (error) {
    //     if (error instanceof Error) {
    //         console.error("Error en el inicio de sesión: ", error.message);
    //       }
    //     }
    //   }

  const handleChange = (e: React.FormEvent) =>{
    const property = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    
    setUserData({...userData, [property]: value});
    // setErrors(validations({...userData, [property]: value}));
  } 
  
  //Ver o desver la pass
  const handleView = () => {
    if(viewPass == true){
      setViewPass(false);
    }
    else{
      setViewPass(true);
    }
  }

  return (   

    <div className="align-top">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
          <img className="w-100 h-100 mb-6 mr-2" src="/logo.svg" alt="logo"/>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Pagina de login
              </h1>           
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
    <div>
      <input type="text" 
        name="username" 
        value={userData.username}
        placeholder="Ingresar aquí su DNI o NOMBRE DE USUARIO" 
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        required
        onChange={handleChange}/>
    </div>
    <div>
      <input type={viewPass ? "text" : "password"} 
        name="password" 
        placeholder="Ingresar aquí su contraseña" 
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        required
        value={userData.password}
        onChange={handleChange}
      />
    </div>
    <div>
      <button
        type="button"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        onClick={() => handleView()}>
          {viewPass ? <FaEyeSlash /> : <FaEye />}
      </button>
      <div>
      {tokenExpired && <p>El token ha expirado. Por favor, inicia sesión nuevamente.</p>}
      </div>
    </div>
        {errors && (
      <div className="error-message text-white">
        {errors}
      </div>
        )}
      {/* <div className="flex items-start">
        <div className="flex items-center h-5">
          <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Recordarme</label>
        </div>
      </div> */}
      <SubmitButton
      title='Ingresar'
      />
  </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}