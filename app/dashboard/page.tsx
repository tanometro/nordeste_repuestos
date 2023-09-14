import axios from "axios";
import {useRouter} from 'next/router';

export default function Dashboard(){
    const router = useRouter();

    const logOut = async () =>{
        try{
            await axios.post('rutabackend');
            router.push('/')
        }
        catch (error){
            throw new Error("Fallo en logout ")
        }
    }
    return (
        <div>
            <h1 className="text-black">DASHBOARD</h1>
            <button onClick={logOut}>
                Log Out
            </button>
        </div>
    )
}