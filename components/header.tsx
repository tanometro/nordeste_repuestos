'use client'

import { useRouter } from "next/navigation";

interface HeaderProps {
    title: string;
  }
export default function Header(props: HeaderProps) {
    const router = useRouter();
    const { title } = props;
  
    return (
      <div className="flex h-full items-center justify-between my-6 ">
        <img className="h-12 m-2 " src="assets/logo.svg" alt="logo"/>
        <h1 className="h-8 w-80 text-white bg-custom-red rounded-2xl flex items-center justify-center ">{title}</h1>
        <button
        type="button" 
        onClick={() => router.back()}
        className="hover:bg-blue-600 transform transition-transform hover:scale-105 mr-2 h-8 w-56 text-white bg-custom-red rounded-2xl">
          Volver atrás
          </button>
      </div>
    );
  }