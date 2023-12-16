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
  finalCustomerName: string,
  concept: string,
  finalCustomerDni: string,
}

export interface ErrorType {
  name: string;
  username: string;
  dni: string;
  password: string;
}

export interface ActiveMechanicsProps {
  mechanics: UserInterface[];
  setMechanics: React.Dispatch<React.SetStateAction<UserInterface[]>>;
}

export interface ActiveAdminsProps {
  admins: UserInterface[];
  setAdmins: React.Dispatch<React.SetStateAction<UserInterface[]>>;
}

export interface FinalTransactionsProps {
  finalTransactions: TransactionInterface[];
  setFinalTransactions: React.Dispatch<React.SetStateAction<TransactionInterface[]>>;
}
export interface DeletedTransactionsProps {
  finalTransactions: TransactionInterface[];
}

export interface MechanicsTransactionsProps {
  mechanicTransactions: TransactionInterface[];
  setMechhanicTransactions: React.Dispatch<React.SetStateAction<TransactionInterface[]>>;
}
export interface DeletedMechanicsTransactionsProps {
  mechanicTransactions: TransactionInterface[];
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
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  filteredData: any[]; 
  renderData: (data: any[]) => React.ReactNode; 
  onPageChange: (newPage: number) => void;
}

export interface CustomResponse extends Response {
  status: number;
}

export interface TransactionProps {
  data: TransactionInterface[],
}
