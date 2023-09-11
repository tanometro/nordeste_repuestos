import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import Lista from "@/components/listas";
import UsersList from "@/components/users";

export default function Users(){
    interface UsersList {
        name: string,
        dni: string,
        balance: string,
        roleId: string,
      }
      
    let users: UsersList[] = [
        {
        name: "Angelo",
        dni: "36552942",
        balance: "300",
        roleId: "Admin",
        }
    ]
    return (
        <div>
            <Header title="Usuarios"></Header>
            <SearchBar id={''}/>
            <Lista>
              <table>
                <thead>
                  <tr>
                    <th className="mx-3">Nombre</th>
                    <th className="mx-3">Dni</th>
                    <th className="mx-3">Tipo</th>
                    <th className="mx-3">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <UsersList
                        name={user.name}
                        dni={user.dni}
                        roleId={user.roleId}
                        balance={user.balance}
                      />
                    </tr>
                    ))}
                </tbody>
              </table>
          </Lista>
        </div>
    )
}
