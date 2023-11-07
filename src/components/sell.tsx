import React, { useState, useEffect } from 'react';
import { SellInterface } from './interfaces';
import { UserInterface } from './interfaces';
import postTransaction from './requests/postTransaction';
import SelectUser from './selectUser';

function NewSell() {

  const [sellData, setSellData] = useState<SellInterface>({
      finalCustomerName: '',
      finalCustomerDni: '',
      mechanicUserId: 0,
      totalAmount: 0,
      concept: '',
      isFinalCustomerTransaction: true
    
  });
  const [user, setUser] = useState<UserInterface >({
    name: '',
    username: '',
    password: '',
    dni: '',
    roleId: 3,
    balance: 0,
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

  const calculateCommission = () => {
    const total = sellData.totalAmount * user.commission;
    return total;
  };

  const onSubmit = () => {
    postTransaction(sellData)
  }


  return (
    <div className="w-full flex items-center justify-center mt-2">
      <SelectUser setUser={setUser} setSellData={setSellData} sellData={sellData}/>
      <form className="flex flex-col items-center w-1/2" onSubmit={onSubmit}>
        <label className='text-black'>Nombre del cliente</label>
        <input
          type="text"
          placeholder="Nombre cliente"
          name="finalCustomerName"
          onChange={onChange}
          value={sellData.finalCustomerName}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
        <label className='text-black'>DNI del cliente</label>
        <input
          type="text"
          placeholder="DNI sin puntos ni guiones"
          name="finalCustomerDni"
          onChange={onChange}
          value={sellData.finalCustomerDni}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
         <label className='text-black'>Concepto de la venta</label>
        <input
          type="text"
          placeholder="Concepto / nº factura"
          name="concept"
          onChange={onChange}
          value={sellData.concept}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
         <label className='text-black'>Monto de la venta</label>
        <input
          type="number"
          placeholder="Monto"
          name="totalAmount"
          onChange={onChange}
          value={sellData.totalAmount}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
         <label className='text-black'>Comisión para el usuario:</label>
         <label className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black flex items-center justify-center mb-2">
          {calculateCommission()}$
        </label>
        <button type="submit" 
         className="w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Crear transacción
         </button>
      </form>
    </div>
  );
}

export default NewSell;
