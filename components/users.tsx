interface UserProps {
    name: string,
    dni: string,
    roleId: string,
    balance: string

}
export default function UsersList(props: UserProps){
    const {name, dni, roleId, balance} = props;

    return(
        <div className="flex m-3 justify-space-between w-full">
            <h3 className="mx-3">{name}</h3>
            <h3 className="mx-3">{dni}</h3>
            <h3 className="mx-3">{roleId}</h3>
            <h3 className="mx-3">${balance}</h3>
            <button className="mx-3">Editar</button>
            <button>Eliminar</button>
        </div>
    )
}