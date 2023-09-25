import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface User {
  name: string;
  dni: string;
  roleId: number;
  balance: number;
  id: number,
}
interface SearchBarProps {
    name: string;
    buscar: (name: string) => Promise<User[] | undefined>;
  }

export default function SearchBar(props: SearchBarProps){
  const {buscar} = props;
  const router = useRouter();
  const [users, setUsers] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleChange = (e: React.FormEvent) =>{
    const property = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;

    setUsers({...users, [property]: value});
    setFilteredUsers(users.filter(user => user.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
  } 


    return (
        <div className="flex justify-center mt-12">
        <input 
        className="rounded-2xl border border-custom-red w-1/2 text-center text-black"
        placeholder="Busca por NOMBRE"
        type="search"
        value={userssetUsers}
        onChange={handleChange}
        />
        <button className="bg-red-500 text-white p-2 rounded"
        onClick={buscar} type="button">
          Buscar
        </button>
        </div>
    )
    }
