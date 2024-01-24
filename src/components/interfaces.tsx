import React, { ChangeEvent } from 'react';


export interface UserInterface {
  dni: string;
  username: string;
  password: string;
  name: string;
  roleId: number;
  commission: number | null;
  id: number;
  balance: number | null; 
  isActive: boolean;
}

export interface UserPost {
  roleId: number | null,
  dni: string,
  username: string,
  password: string,
  name: string,
  commission: number | null,
}

export interface PrimaryButtonProps {
  title?: string,
  onClickfunction: () => void;
}
export interface SubmitButtonProps {
  title: string,
}

export interface SellInterface {
  finalCustomerName: string | null,
  finalCustomerDni: string | null,
  mechanicUserId: number,
  totalAmount: number,
  concept: string,
  isFinalCustomerTransaction: boolean
}

export interface SelectUserProps {
  setSellData: React.Dispatch<React.SetStateAction<SellInterface>>
  sellData: SellInterface,
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}

export interface HeaderProps {
  title: string;
}

export interface TransactionInterface {
    id: number,
    created: Date,
    updated: Date,
    updatedByUserName: string,
    updatedByUserDni: string,
    finalCustomerName: string,
    finalCustomerDni: string,
    userSellerName: string,
    userSellerDni: string,
    userAssociatedName: string,
    userAssociatedDni: string,
    saleCommissionedAmount: number,
    saleTotalAmount: number,
    saleConcept: string,
    userAssociatedCommision: number,
    status: boolean,
    isFinalCustomerTransaction: boolean,
}

export interface ValidationsInterface {
  name: string,
  username: string,
  dni: string,
  password: string
}
export interface ValidationsTransaction {
  finalCustomerName: string | null;
  concept: string | null;
  finalCustomerDni: string | null;
}

export interface ErrorType {
  name: string;
  username: string;
  dni: string;
  password: string;
}

export interface FilterByClientProps {
  searchClient: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchByClient: string;
  setFilteredTransactions: (filteredTransactions: TransactionInterface[]) => void;
}

export interface FilterByMechanicsProps {
  searchMechanic: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchByMechanic: string;
  filteredTransactions: TransactionInterface[];
  setFilteredTransactions: (filteredTransactions: TransactionInterface[]) => void;
}

export interface BalanceListInterface {
    id: number,
    transactionId: number,
    created: Date,
    previousBalance: number,
    currentBalance: number,
    userDni: string,
    userName: string,
    userCommissionAtTheTime: number
}

export interface PaginationProps {
  data: any[];
  recordsPerPage: number,
  currentPage: number,
  setCurrentPage: (pageNumber: number) => void;
}

export interface CustomResponse extends Response {
  status: number;
}

export interface TransactionProps {
  data: TransactionInterface[],
}


export interface SearchParameters {
  dni_or_name: string | number;
  from_date?: string;
  to_date?: string;
}

export interface RenderProps {
  data: TransactionInterface[],
  setFinalTransactions?: React.Dispatch<React.SetStateAction<TransactionInterface[]>>;
  eliminar?: string,
}

export interface SearchInputProps {
  placeholder: string,
  value: string | number;
  onChangeFunction: (e: ChangeEvent<HTMLInputElement>) => void;
}

// export interface DateInputProps {
//   value?: DateRange | undefined;
//   onChangeFunction?: (value: DateRange) => void;
// }

export interface ActiveMechanicsProps {
  mechanics: UserInterface[];
  setMechanics: React.Dispatch<React.SetStateAction<UserInterface[]>>;
}

export interface ActiveAdminsProps {
  admins: UserInterface[];
  setAdmins: React.Dispatch<React.SetStateAction<UserInterface[]>>;
}