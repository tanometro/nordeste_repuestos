'use client';

import RoundedButton from "./buttons/roundedButton";
import { HeaderProps } from "../types/interfaces";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header(props: HeaderProps) {
    const router = useRouter();
    const { title } = props;
  
    return (
      <div className="flex h-full items-center justify-between mt-6 ">
        <Image
          alt='Logo Nordeste Repuestos'
          height={48}
          width={300}
          src='/logo.svg'
          onClick={() => router.push('/dashboard')}
          className="mt-2"
          />
        <h1 className="text-lg h-10 w-80 text-white bg-custom-red rounded-2xl flex items-center justify-center ">{title}</h1>
        <RoundedButton title='Volver atrás' onClickfunction={() => router.back()}/>
      </div>
    );
  }