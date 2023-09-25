'use client';

import Link from "next/link"

import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="flex items-center justify-center h-screen" >
        <div className="text-center">
            <h1 className="text-black mb-4 ">Esta página aparece cuando estás perdido :-)</h1>
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