"use client";
import { useState, useEffect } from "react";
import Validations from "../components/validations";
import axios from "axios";
import { useRouter } from 'next/router';

export default function Home() {
  const URL = "http://localhost/3000";
  const [access, setAccess] = useState(false);
  const router = useRouter();

  let userData = { dni: "", username: "", password: "" };
  let dni = userData.dni;
  let username = userData.username;
  let password = userData.password;
  let query: string;
  if(dni in userData){
    query = `dni=${dni}&password=${password}`;}
    else{
    query = `username=${username}&password=${password}`;
    };

  useEffect(() => {
    axios.get(URL + `?${query}`).then((response) => {
      setAccess(response.data);
    });
  }, [userData]);

  async function login(){   
    try{
      const response = await axios.get(URL + `?${query}`);
        
        if(response.status === 200) {
          const { access } = response.data;
          setAccess(true);
          access && router.replace('/dashboard');
        }
      }
    catch (error){
      throw new Error ("No se pudo verificar los datos")
    }
  }


  return (
    <>
    <div className="align-top">
    <a href="http://localhost:3000/login">Ir a la Pagina</a>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-24 h-36 mr-2" src="assets/logo.svg" alt="logo"/>
          Nordeste Repuestos    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Ingresar al sistema
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
              <div>
                      <label htmlFor="dni" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese su DNI</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
              </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese su contraseña</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Recordarme</label>
                          </div>
                      </div>
                  </div>
                  <button type="submit" className="w-2/4 text-white bg-red-700 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ingresar
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
