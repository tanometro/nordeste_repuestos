import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen" >
        <div className="text-center">
            <h1 className="text-black mb-4 ">Página no encontrada</h1>
            <Link href="/" className="bg-red-500 text-white p-2 rounded">
                Vuelve al inicio
            </Link>
        </div>
        </div>
    )
}