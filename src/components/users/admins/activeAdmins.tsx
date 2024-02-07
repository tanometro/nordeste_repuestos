"use client";

import List from "@/src/components/lists";
import { useState } from "react";
import deleteUser from "@/src/requests/deleteUser";
import { useRouter } from "next/navigation";
import { ActiveAdminsProps } from "@/src/types/interfaces";
import Pagination from "../../pagination/pagination";
import { useSession } from "next-auth/react";

const ActiveAdmins: React.FC<ActiveAdminsProps> = (props) => {
  const {admins, setAdmins} = props;
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = 10;
  const lastIndex = currentPage * pagination;
  const firstIndex = lastIndex - pagination;
  const {data: session} = useSession();
  
// Filtrado de usuarios //
const filteredUsers = admins.filter((user) => {
  const lowercaseSearchTerm = search.toLowerCase();
  return (
    (user.dni && user.dni.toLowerCase().includes(lowercaseSearchTerm)) ||
    (user.name && user.name.toLowerCase().includes(lowercaseSearchTerm))
  );
});

//Paginacion 
  const userActive = filteredUsers.filter((user) => user.isActive == true);
  const userShow = userActive.slice(firstIndex, lastIndex);

   const searchUser = ({target}: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(0);
      setSearch(target.value)
   }

    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center mt-6 w-full">
                  <input 
                  className="rounded-2xl border border-custom-red w-1/2 text-center text-black"
                  placeholder="Busca por NOMBRE o DNI"
                  type="text"
                  value={search}
                  onChange={searchUser}
                  />
              </div>
              <List>
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">Nombre</th>
                        <th scope="col" className="px-6 py-4">DNI</th>
                        <th scope="col" className="px-6 py-4">Tipo</th>
                        <th scope="col" className="px-6 py-4">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                  {userShow.map((user) => (
              <tr key={user.id} 
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                <td className="whitespace-nowrap px-6 py-4 font-medium">{user.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{user.dni}</td>
                <td className="whitespace-nowrap px-6 py-4"> {user.roleId === 1 ? 'SúperAdmin' : user.roleId === 2 ? 'Admin' : user.roleId === 3 ? 'Mecánico' : ''}</td>
                <td className="whitespace-nowrap px-6 py-4"> {user.roleId === 1 || user.roleId === 2 ? 'Sin saldo' : user.roleId === 3 && user.balance === 0 ? '0' : user.balance}</td>
                <td>
                  <button onClick={() => router.push(`/editUser/${user.id}`)}>
                    <a className="text-custom-red px-3">Ver usuario</a>
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteUser(session?.user.token, user.id, setAdmins)}>
                    <a className="text-custom-red px-3">Desactivar</a>
                  </button>
                </td>
              </tr>
                ))}
                  </tbody>
                </table>
              </List>
              <div className="flex items-center justify-center space-x-4">
                <Pagination data={userActive}recordsPerPage={pagination} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>  
        </div>
    )
}

export default ActiveAdmins;