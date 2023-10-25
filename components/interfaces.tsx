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
