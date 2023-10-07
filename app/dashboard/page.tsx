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
            router.push('/');
        }
        catch (error){
            throw new Error("Fallo en logout ")
        }
    }
    return (
        <div>
            <Header title="Dashboard"/>
            <div className="mx-auto w-7/12">
                <div className='flex mt-32 justify-between'>
                    {/* <h1 className='text-black'>{storedToken}</h1> */}
                    <button onClick={() => router.push('/createUsers')} 
                    className="w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Crear Usuario
                    </button>
                    <button onClick={() => router.push('/allUsers')}
                    className="w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Usuarios
                    </button>
                    <button onClick={logOut} 
                    className="w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Log Out
                    </button>
                </div>
            </div>
           
            
        </div>
    )
}
