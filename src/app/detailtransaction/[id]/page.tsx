'use client';
import React, {useEffect, useState} from 'react'
import { useParams } from "next/navigation";
import Header from '@/src/components/header';
import getOneTransaction from '@/src/components/requests/getOneTransaction';


function DetailTransaction() {
    const params = useParams();
    const transactionId = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id, 10);
    const [transactionData, setTransactionData] = useState({
        id: 0,
        created: "2023-11-07T02:42:24.322Z",
        updated: "2023-11-07T02:42:24.322Z",
        updatedByUserName: '',
        updatedByUserDni: '',
        finalCustomerName: '',
        finalCustomerDni: '',
        userSellerName: '',
        userSellerDni: '',
        userAssociatedName: '',
        userAssociatedDni: '',
        saleCommissionedAmount: 0,
        saleTotalAmount: 0,
        saleConcept: '',
        userAssociatedCommision: 0,
        status: true,
        isFinalCustomerTransaction: true
    })

    useEffect(() => {
        async function fetchData() {
          try {
            const transaction = await getOneTransaction(transactionId);
            setTransactionData(transaction);
          } catch (error) {
            console.error("Error en render componente de detalle transacción", error);
          }
        }
        fetchData();
      }, []);
  return (
    <div>
        <Header title={`Detalle de transacción número ${transactionData.id}`}/>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center w-1/2 mt-24">
          <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4 text-xl ">Numero: {transactionData.id}</h1>
          <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4 text-xl">Cliente: {transactionData.finalCustomerName}</h1>
          <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4 text-xl">Vendedor: {transactionData.userSellerName}</h1>
          <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4 text-xl">Mecánico: {transactionData.userAssociatedName}</h1>
          <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4 text-xl">Total de la venta: {transactionData.saleTotalAmount}$</h1>
          <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4 text-xl">Comisión %: {transactionData.userAssociatedCommision}</h1>
          <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4 text-xl">Comisión: {transactionData.saleCommissionedAmount}$</h1>
          <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4 text-xl">Concepto: {transactionData.saleConcept}</h1>
          <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4 text-xl">Estado: {transactionData.status ? 'Válida' : 'Eliminada'}</h1>
          <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4 text-xl">Es un/a {transactionData.isFinalCustomerTransaction === true ? 'Venta' : 'Intercambio' }</h1>
          </div>
        </div>
    </div>
  )
}

export default DetailTransaction;