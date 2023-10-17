import React, { useState, useEffect, ChangeEvent } from "react";
import { SelectUserProps, UserInterface } from "./interfaces";
import getOneMechanic from './requests/searchMechanic';

const SelectUser = (props: SelectUserProps) => {
    const { user, setUser } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const userFind = await getOneMechanic(searchTerm);
          console.log('User' + userFind)
          if (userFind) {
            setFilteredUsers([userFind]);
          }
          console.log('Array' + filteredUsers);
        } catch (error) {
          console.error("Error en obtener usuario mecánico", error);
          setFilteredUsers([]);
        }
      };
  
      if (searchTerm.trim() !== '') {
        fetchUsers();
      } else {
        setFilteredUsers([]);  
      }
    }, [searchTerm]);
  
    const handleSelectOption = () => {
      
        setFilteredUsers([user]);
       
        setSearchTerm('');
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
            <li key={index} onClick={() => handleSelectOption()}>
              <div className="text-black">{user.name}</div>
              <div className="text-black">DNI: {user.dni}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
  }
  
  export default SelectUser;