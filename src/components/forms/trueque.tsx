import React, { useState, useEffect } from 'react';
import { SellInterface } from '../../types/interfaces';
import { UserInterface } from '../../types/interfaces';
import postTransaction from '../../requests/postTransaction';
import SelectUser from './selectUser';
import { useRouter } from 'next/navigation';
import SubmitButton from '../buttons/submitButton';
import { useSession } from 'next-auth/react';

function Trueque() {
  const router = useRouter();
  const {data: session} = useSession();
  const [data, setSellData] = useState<SellInterface>({
      finalCustomerName: null,
      finalCustomerDni: null,
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

    setSellData({ ...data, [property]: value });
    //setErrors(validations({...dataDriver, [property] : value}));
  };
  
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postTransaction(session?.user.token, data);
    router.push('/allTransactions');    
  }

  return (
    <div className="w-full flex items-center justify-center mt-2">
      <SelectUser setUser={setUser} setSellData={setSellData} sellData={data}/>
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
          value={data.concept}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
        <label className='text-black'>Monto de la transacción</label>
        <input
          type="number"
          placeholder="Monto"
          name="totalAmount"
          onChange={onChange}
          value={data.totalAmount}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2 input-with-sign"
        />
        <SubmitButton title='Realizar intercambio'/>
      </form>
    </div>
  );
}

export default Trueque;