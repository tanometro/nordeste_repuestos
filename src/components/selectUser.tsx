import React, { useState, useEffect, ChangeEvent } from "react";
import { SelectUserProps, UserInterface } from "./interfaces";
import getOneMechanic from './requests/searchMechanic';

const SelectUser = (props: SelectUserProps) => {
    const { sellData, setSellData, setUser } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const userFind = await getOneMechanic(searchTerm);
          setFilteredUsers(userFind);
        } catch (error) {
          console.error("Error en obtener usuario mecánico", error);
          setFilteredUsers([]);
        }
      };
  
      if (searchTerm.trim() !== '') {
        fetchUsers();
      }
    }, [searchTerm]);

    const handleSelectOption = (user: UserInterface) => {
      setUser(user);
      const {id} = user;
      setSellData({
        ...sellData,
        mechanicUserId: id,
      })
      setSearchTerm("");
      setSelectedUser(user);
    };

    const handleDeselect = () => {
      setSelectedUser(null);
    };

return (
  <div className="text-black">
    <div>
      <input
        type="search"
        placeholder="Buscar por NOMBRE o DNI"
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        className="rounded-2xl border border-custom-red h-10 w-80 text-center text-black mb-2"
      />
    </div>
    {searchTerm && (
      <ul className="text-black">
        {filteredUsers.map((user, index) => (
          <li key={index} onClick={() => handleSelectOption(user)}>
            <div className="text-black hover:bg-gray-200 shadow-xl rounded-2xl cursor-pointer">{user.name} {user.dni}</div>
          </li>
        ))}
      </ul>
    )}
    <div className="text-black hover:bg-gray-200 shadow-xl rounded-2xl px-3 py-3" style={{ display: 'flex', alignItems: 'center' }}>
      {selectedUser ? (
        <div className='cursor-pointer'>
          {selectedUser.name} {selectedUser.dni} {selectedUser.roleId === 3 ? "Mecánico" : "Admin"}
        </div>
        
      ) : ""}
      {selectedUser && (
        <button onClick={handleDeselect} className="ml-auto mr-4 bg-gray-200 hover:bg-gray-400 w-6 h-6 rounded">X</button>
      )}
    </div>
  </div>
  );
  }
  
export default SelectUser;