import { useRouter } from "next/navigation";

interface UserProps {
    name: string,
    dni: string,
    roleId: number,
    balance: number,
    id: number,

}
export default function UsersList(props: UserProps){
    const {name, dni, roleId, balance, id} = props;
    const router = useRouter();

    return(
        <div className="flex m-3 justify-space-between w-full">
            <h3 className="mx-3">{name}</h3>
            <h3 className="mx-3">{dni}</h3>
            <h3 className="mx-3"> {roleId === 1 ? 'SúperAdmin' : roleId === 2 ? 'Admin' : roleId === 3 ? 'Mecánico' : ''}</h3>
            <h3 className="mx-3"> {roleId === 1 ? 'Sin saldo' : roleId === 2 ? 'Sin saldo' : roleId === 3 ? `${balance}` : ""}</h3>
            <button onClick={() => router.push(`/editUser?id=${id}`)}>
                <a className="text-blue-500">Editar</a>
            </button>
            <button>Eliminar</button>
        </div>
    )
}