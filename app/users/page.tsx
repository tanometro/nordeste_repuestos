import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import Lista from "@/components/listas";
import UsersList from "@/components/users";

export default function Users(){
    return (
        <div>
            <Header title="Usuarios"></Header>
            <SearchBar id={""}/>
            <Lista>
                <div className="flex mx-5 justify-space-between w-full">
                <h3 className="mx-3">Nombre</h3>
                <h3 className="mx-3">Dni</h3>
                <h3 className="mx-3">Tipo</h3>
                <h3 className="mx-3">Saldo</h3>
                </div>
                <hr></hr>
                <UsersList name="Angelo" dni="36552942" roleId="Admin" balance="300"/>
                <UsersList name="Angelo" dni="36552942" roleId="Admin" balance="300"/>
            </Lista>
        </div>
    )
}
