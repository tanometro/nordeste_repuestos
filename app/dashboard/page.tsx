"use client";
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import getAllUsers from '@/components/requests/getAllUsers';
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import { setUsers } from '@/redux/features/userSlice';

export default function Dashboard(){
    //const token = useAppSelector((state) => state.persistedReducer.tokenSaver.token);
    // const users = useAppSelector(state => state.userReducer.users);
    const storedToken = localStorage.getItem('token');
    const router = useRouter();
    const dispatch = useAppDispatch();


  
    const logOut = async () =>{
        try{
            localStorage.removeItem('token');
            router.push('/');
        }
        catch (error){
            throw new Error("Fallo en logout ")
        }
    }
    return (
        <div>
            <Header title="Dashboard"/>
            <div className=" h-full w-full my-6">
                <div className='flex flex-col mt-32 items-center'>
                    {/* <h1 className='text-black'>{storedToken}</h1> */}
                    <div className=' justify-arround '>
                        <button onClick={() => router.push('/activeUsers')}
                        className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Usuarios
                        </button>
                        <button onClick={() => router.push('/createUsers')} 
                        className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Crear usuario
                        </button>
                    </div>
                    <div className='flex justify-arround'>
                        <button onClick={() => router.push('/transactions')} 
                        className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Transacciones
                        </button>
                        <button onClick={() => router.push('/newTransaction')}
                        className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Crear transacción
                        </button>
                    </div>
                    <div>
                        <button onClick={logOut} 
                        className="w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Salir
                        </button>
                    </div>
                   
                </div>
            </div>
           
            
        </div>
    )
}
