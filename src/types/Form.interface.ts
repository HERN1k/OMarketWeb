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

export interface IStoreReviewFrom {
    storeId: string,
    page: number
}