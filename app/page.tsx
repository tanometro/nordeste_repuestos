"use client";

import { useState, useEffect } from "react";
import validations from "../components/validations";
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";


export const BASE_URL = 'http://89.117.33.196:8000'

export default function Home() {
  const [access, setAccess] = useState(false);
  const router = useRouter();

  const [userData, setUserData] = useState({
  username: "", 
  password: "",
});
const [error, setError] = useState<string | null>(null);

async function login(userData: {username: string, password: string}) {
  const formData = new FormData();
  formData.append('username', userData.username);
  formData.append('password', userData.password);
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST', 
      body: formData
    });

    if (!response.ok) {
      throw new Error('Credenciales incorrectas');
    }
    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem('token', data.token);
      setAccess(true);
      router.replace('/dashboard');
    } else {
      throw new Error('Credenciales incorrectas');
    }
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message || 'Ocurrió un error desconocido');
    } else {
      setError('Ocurrió un error desconocido');
    }
  }
}

  useEffect(() => {
    !access && router.replace('/');
 }, [access]);

  const handleChange = (e: React.FormEvent) =>{
    const property = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;

    setUserData({...userData, [property]: value});
    // setErrors(validations({...userData, [property]: value}));
  } 

  const handleSubmit = async (e: React.FormEvent) =>{
  e.preventDefault();
  login(userData);
  }
  
  const [viewPass, setViewPass] = useState(false);
  const handleView = () => {
    if(viewPass == true){
      setViewPass(false);
    }
    else{
      setViewPass(true);
    }
  }

  return (
    <>
    <div className="align-top">
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
    <img className="w-100 h-100 mb-6 mr-2" src="assets/logo.svg" alt="logo"/>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Ingresar al sistema
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
                    <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                    onClick={() => handleView()}>
                    {viewPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {error && (
                <div className="error-message text-white">
                  {error}
                </div>
                   )}
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Recordarme</label>
                          </div>
                      </div>
                  </div>
                  <button type="submit" className="w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Ingresar
                  </button>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
    </>
  )
}

