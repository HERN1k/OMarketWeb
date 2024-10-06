import { Dispatch, SetStateAction } from "react";
import { Admin, City, ProductType, Store } from "./Type.type";
import { ILoginForm } from "./Form.interface";

export interface IStoresFormProps {
    stores: Store[] | null,
    setStores: Dispatch<SetStateAction<Store[] | null>>,
    showLoader: () => void, 
    hideLoader: () => void
}

export interface IStoresFormBaseProps {
    showLoader: () => void, 
    hideLoader: () => void
}

export interface ILoginRequestProps {
    data: ILoginForm, 
    setTitle: Dispatch<SetStateAction<string>>
}

export interface ICitiesFormProps {
    cities: City[] | null,
    setCities: Dispatch<SetStateAction<City[] | null>>,
    showLoader: () => void, 
    hideLoader: () => void
}

export interface IAdminFormProps {
    admins: Admin[] | null,
    setAdmins: Dispatch<SetStateAction<Admin[] | null>>,
    stores: Store[] | null,
    setStores: Dispatch<SetStateAction<Store[] | null>>,
    showLoader: () => void, 
    hideLoader: () => void
}

export interface IProductsFormProps {
    productTypes: ProductType[],
    showLoader: () => void, 
    hideLoader: () => void
}