import React, { useState, useEffect } from 'react';
import { SellInterface } from './interfaces';
import { UserInterface } from './interfaces';

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
  const [user, setUser] = useState<UserInterface>({
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

  return (
    <div className="w-full flex items-center justify-center mt-2">
      <SelectUser user={user} setUser={setUser} />
      <form className="flex flex-col items-center w-1/2">
        <input
          type="text"
          placeholder="Nombre cliente"
          name="finalCustomerName"
          onChange={onChange}
          value={sellData.finalCustomerName}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
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
          value={sellData.totalAmount}
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
