export interface UserInterface {
    name: string,
    username: string,
    password: string,
    dni: string,
    roleId: number,
    balance: number,
    id: number,
    isActive: boolean,
    commission: number,
  }

export interface TransactionInterface {
  finalCustomerName: string,
  finalCustomerDni: string,
  mechanicUserId: number,
  totalAmount: number,
  concept: string,
  isFinalCustomerTransaction: boolean,
}

export interface SellInterface {
  finalCustomerName: string,
  finalCustomerDni: string,
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

