import React, { useState, useEffect } from 'react';
import { SellInterface } from './interfaces';

function NewSell() {

  const [sellData, setSellData] = useState<SellInterface>({
    user: "",
    concept: "",
    ammount: 0,
    commission: 0
  });

  // // Cuando monta el componente //
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const userList = await getAllUsers();
  //       setUsers(userList);
  //     } catch (error) {
  //       console.error("Error en render componente", error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const onChange = (e: React.FormEvent) => {
    const property = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;

    setSellData({ ...sellData, [property]: value });
    //setErrors(validations({...dataDriver, [property] : value}));
  };

  const calculateCommission = () => {
    const total = sellData.ammount * 0.05;
    return total;
  };

  return (
    <div className="w-full flex items-center justify-center mt-2">
      {/* <SelectUser/> */}
      <form className="flex flex-col items-center w-1/2">
        <input
          type="text"
          placeholder="Concepto / nº factura"
          name="concept"
          onChange={onChange}
          value={sellData.concept}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
        <input
          type="number"
          placeholder="Monto"
          name="ammount"
          onChange={onChange}
          value={sellData.ammount}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
        <input
          type="text"
          placeholder="Comisión"
          name="commission"
          value={calculateCommission()}
          readOnly
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
      </form>
    </div>
  );
}

export default NewSell;
