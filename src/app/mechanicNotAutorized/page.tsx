'use client';

import { useRouter } from "next/navigation";

export default function MechanicNotAutorized() {
    const router = useRouter();
    return (
        <div className="flex items-center justify-center h-screen" >
        <div className="text-center">
            <h1 className="text-black mb-4 ">¡Hola! Si sos un usuarios "mecánico", esta página no es para vos</h1>
            <h1 className="text-black mb-4 ">Te recomendamos el uso de la app móvil que Nordeste Repuestos preparó para vos</h1>
            <button
                type="button" 
                onClick={() => router.push('/')}
                className="bg-red-500 text-white p-2 rounded mr-6">
                Volver al inicio
            </button>
            <button
                type="button" 
                onClick={() => router.back()}
                className="bg-red-500 text-white p-2 rounded">
                Volver atrás
            </button>
        </div>
        </div>
    )
}