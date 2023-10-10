'use client';
import React, { useState, useEffect } from "react";



export default function SelectUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectOption = (team) => {
    setSearchTerm('');
    setSelectedUsers((prevSelectedTeams) => [...prevSelectedTeams, team]);
    onChange({ target: { name: 'teams', value: [...selectedTeams, team] } });
  };

  const handleRemoveTeam = (team) => {
    setSelectedTeams((prevSelectedTeams) =>
      prevSelectedTeams.filter((selectedTeam) => selectedTeam !== team)
    );
    onChange({
      target: { name: 'teams', value: selectedTeams.filter((t) => t !== team) },
    });
  };

  return (
    <div className={styles.multiselect}>
      <div className={styles.inputContainer}>
        <input
          type="search"
          placeholder="Buscar escudería"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      {searchTerm && (
        <ul className={styles.optionsList}>
          {filteredTeams.map((team, index) => (
            <li key={index} onClick={() => handleSelectOption(team)}>
              {team}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}