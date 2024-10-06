export interface IAddNewStoreForm {
    cityId: string,
    address: string,
    latitude: number,
    longitude: number,
    phoneNumber: string 
}

export interface ILoginForm {
    login: string;
    password: string;
}

export interface IAddNewCityForm {
    cityName: string
}

export interface IRemoveCityForm {
    cityId: string 
}

export interface IChangePasswordForm {
    password: string,
    newPassword: string 
}

export interface IAddNewAdminForm {
    storeId: string
    login: string,
    password: string
}

export interface IRemoveAdminForm {
    adminId: string
}

export interface IRemoveStoreForm {
    storeId: string
}

export interface IChangeAdminPasswordForm {
    adminId: string,
    password: string
}

export interface IChangeCityNameFrom {
    cityId: string,
    cityName: string
} 

export interface IChangeStoreInfoFrom {
    storeId: string,
    address?: string,
    phoneNumber?: string,
    longitude?: number,
    latitude?: number,
    tgChatId?: number 
}

export interface IChangeStoreInfoBaseFrom {
    address?: string,
    phoneNumber?: string,
    longitude?: number,
    latitude?: number,
    tgChatId?: number 
}

export interface IStoreReviewFrom {
    storeId: string,
    page: number
}

export interface ICustomerFrom {
    customer: string,
    option: string
} 
 
export interface IAddNewProductFrom {
    typeId: string,
    underTypeId: string,
    name: string,
    price: number,
    dimensions: string,
    description: string,
    file: FileList
} 

export interface IChangeProductFrom {
    productId: string,
    name: string,
    price: number,
    dimensions: string,
    description: string,
    file: FileList
}

export interface IRemoveProductFrom {
    productId: string
}

export interface ITypeProductFrom {
    typeId: string,
    page: number
}