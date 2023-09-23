import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { URLSearchParams } from 'url';
import Header from '@/components/header';
import axios from 'axios';
import CreateUserForm from '@/app/createUsers/createUserForm';

interface User {
    roleId: number | null,
    dni: string,
    username: string,
    password: string,
    name: string,
    //commission: number | null,
}

interface EditUserProps {
    params: URLSearchParams;
}

export default function EditUser ({ params }: EditUserProps) {
    const router = useRouter();

    const [userData, setUserData] = useState<User>({
        dni: "",
        username: "",
        password: "",        
        name: "",
        roleId: null,
    })

    const id = router.query.id;

    useEffect(() => {
        if (id) {
          axios.get(`http://89.117.33.196:8000/user/${id}`)
            .then((response) => {
              setUserData(response.data);
            })
            .catch((error) => {
              console.error('Error al obtener detalles del usuario', error);
            });
        }
      }, [id]);

    const handleChange = (e: React.FormEvent) =>{
        const property = (e.target as HTMLInputElement).name;
        const value = (e.target as HTMLInputElement).value;
    
        setUserData({...userData, [property]: value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            axios.put(`http://89.117.33.196:8000/user/${id}`, userData)
              .then(() => {
        alert('Usuario actualizado exitosamente');
        router.replace('/usuarios');
        })
            .catch((error) => {
            console.error('Error al actualizar el usuario', error);
            });
        router.push('/usuarios');
      };
    }

    return (
        <div>
            <Header title='Editar usuario'/>
            <div className="flex justify-center mt-32 h-screen">
                    <h1 className='text-black text-24'>Editar Usuario {userData.name}</h1>
                    <CreateUserForm userData={userData} handleChange={handleChange}/>
            </div>
        </div>
    )
}

