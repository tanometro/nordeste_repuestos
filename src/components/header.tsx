'use client';

import RoundedButton from "./buttons/roundedButton";
import { HeaderProps } from "./interfaces";
import { useRouter } from "next/navigation";

export default function Header(props: HeaderProps) {
    const router = useRouter();
    const { title } = props;
  
    return (
      <div className="flex h-full items-center justify-between mt-6 ">
        <img className="h-12 m-2 " src="/logo.svg" alt="logo" onClick={() => router.push('/dashboard')}/>
        <h1 className="text-lg h-10 w-80 text-white bg-custom-red rounded-2xl flex items-center justify-center ">{title}</h1>
        <RoundedButton title='Volver atrás' onClickfunction={() => router.back()}/>
      </div>
    );
  }