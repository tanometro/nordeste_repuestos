import React, { useState, useEffect } from 'react';
import { SellInterface } from './interfaces';
import { UserInterface } from './interfaces';
import postTransaction from './requests/postTransaction';
import SelectUser from './selectUser';

function Trueque() {

  const [sellData, setSellData] = useState<SellInterface>({
      finalCustomerName: '',
      finalCustomerDni: '',
      mechanicUserId: 0,
      totalAmount: 0,
      concept: '',
      isFinalCustomerTransaction: false
    
  });
  const [user, setUser] = useState<UserInterface >({
    name: '',
    username: '',
    password: '',
    dni: '',
    roleId: 3,
    balance: null,
    id: 0,
    isActive: true,
    commission: 0,
  });

  const onChange = (e: React.FormEvent) => {
    const property = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;

    setSellData({ ...sellData, [property]: value });
    //setErrors(validations({...dataDriver, [property] : value}));
  };
  
  const onSubmit = () => {
    postTransaction(sellData);
    console.log(sellData);
    
  }


  return (
    <div className="w-full flex items-center justify-center mt-2">
      <SelectUser setUser={setUser} setSellData={setSellData} sellData={sellData}/>
      <form className="flex flex-col items-center w-1/2" onSubmit={onSubmit}>
        <label className='text-black'>Nombre del mecánico seleccionado:</label>
        <input
          type="text"
          placeholder="Mecánico seleccionado"
          name="name"
          onChange={onChange}
          value={user.name}
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
        <label className='text-black'>DNI del mecánico seleccionado:</label>
        <input
          type="text"
          placeholder="DNI del mecánico"
          name="dni"
          onChange={onChange}
          value={user.dni}
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
        <label className='text-black'>Saldo disponible del mecánico seleccionado:</label>
        <input
          type="text"
          placeholder="Saldo disponible"
          name="balance"
          onChange={onChange}
          value={user.balance ?? ''}
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
        <label className='text-black'>Concepto de la transacción</label>
        <input
          type="text"
          placeholder="Concepto / nº factura"
          name="concept"
          onChange={onChange}
          value={sellData.concept}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
        <label className='text-black'>Monto de la transacción</label>
        <input
          type="number"
          placeholder="Monto"
          name="totalAmount"
          onChange={onChange}
          value={sellData.totalAmount}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
        <button type="submit" 
         className="w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Realizar intercambio
         </button>
      </form>
    </div>
  );
}

export default Trueque;