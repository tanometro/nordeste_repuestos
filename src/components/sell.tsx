import React, { useState } from 'react';
import { SellInterface, UserInterface, ValidationsTransaction } from './interfaces';
import postTransaction from './requests/postTransaction';
import SelectUser from './selectUser';
import validateTransaction from './validations/transactionValidations';
import { useRouter } from 'next/navigation';

function NewSell() {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    finalCustomerName: '',
    finalCustomerDni: '',
    concept: '',
  });

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

  };
  const validateAndSetError = (property: keyof ValidationsTransaction, value: string) => {
    const validationError = validateTransaction({ ...sellData, [property]: value as string });
    setErrors({ ...errors, [property]: validationError[property] });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const property = e.target.name as keyof ValidationsTransaction;
    const value = e.target.value;
    validateAndSetError(property, value);
  };
  

  const calculateCommission = () => {
    if (user.commission !== null) {
      const total = sellData.totalAmount * user.commission;
      return total;
    } else {
      return 0;
    }
  };
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    postTransaction(sellData);
    router.push('/allTransactions');
  };
  
  const comisionUser = () => {
    if(user.commission){
      const userComm = user.commission * 100
      return userComm;
    }
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
          onBlur={handleBlur}
          value={sellData.finalCustomerName ?? ''}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
        <p className='text-custom-red'>{errors.finalCustomerName}</p>
        <label className='text-black'>DNI del cliente</label>
        <input
          type="text"
          placeholder="DNI sin puntos ni guiones"
          name="finalCustomerDni"
          onChange={onChange}
          value={sellData.finalCustomerDni ?? ''}
          onBlur={handleBlur}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
        <p className='text-custom-red'>{errors.finalCustomerDni}</p>
        <label className='text-black'>Concepto de la venta</label>
        <input
          type="text"
          placeholder="Concepto / nº factura"
          name="concept"
          onChange={onChange}
          value={sellData.concept}
          onBlur={handleBlur}
          required
          className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black mb-2"
        />
        <p className='text-custom-red'>{errors.concept}</p>
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
          {comisionUser()}% / {calculateCommission()}$
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
