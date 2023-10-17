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
  id: 0,
  created: string,
  updated: string,
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
  isFinalCustomerTransaction: boolean
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
  
  user: UserInterface;
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}


export interface HeaderProps {
  title: string;
}

