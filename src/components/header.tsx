'use client';
import { HeaderProps } from "./interfaces";

import { useRouter } from "next/navigation";

export default function Header(props: HeaderProps) {
    const router = useRouter();
    const { title } = props;
  
    return (
      <div className="flex h-full items-center justify-between mt-6 ">
        <img className="h-12 m-2 " src="/logo.svg" alt="logo" onClick={() => router.push('/dashboard')}/>
        <h1 className="h-10 w-80 text-white bg-custom-red rounded-2xl flex items-center justify-center ">{title}</h1>
        <button
        type="button" 
        onClick={() => router.back()}
        className="hover:bg-blue-600 transform transition-transform hover:scale-105 mr-2 h-10 w-56 text-white bg-custom-red rounded-2xl">
          Volver atrás
          </button>
      </div>
    );
  }