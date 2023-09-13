import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import Lista from "@/components/lists";
import UsersList from "@/components/users";
import List from "@/components/lists";

export default function Users(){

  const getUsers = async () => {
    const response = await fetch("http://89.117.33.196:8000/user/list", {
      method: "GET",
    });

  }
    return (
        <div>
            <Header title="Usuarios"></Header>
            <SearchBar id={''}/>
            <List>
              <table>
                <thead>
                  <tr>
                    <th className="mx-3">Nombre</th>
                    <th className="mx-3">Dni</th>
                    <th className="mx-3">Tipo</th>
                    <th className="mx-3">Saldo</th>
                  </tr>
                </thead>
                {/* <tbody>
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
                </tbody> */}
              </table>
          </List>
        </div>
    )
}
