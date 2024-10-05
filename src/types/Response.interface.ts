import { Admin, City, Customer, Product, ProductType, Review, Store } from "./Type.type";

export interface IErrorResponse {
    status: string,
    message: string
}

export interface IStoresResponse {
    data: Store[],
    status: string,
    message: string
}

export interface ILoginResponse {
    data : {
        permission: string,
        login: string
    },
    status: string,
    message: string
}

export interface ICitiesResponse {
    data: City[],
    status: string,
    message: string
}

export interface IAdminsResponse {
    data: Admin[],
    status: string,
    message: string
}

export interface IStoreReviewData {
    reviews: Review[],
    pageCount: number,
    totalQuantity: number
}

export interface IStoreReviewResponse {
    data: IStoreReviewData,
    status: string,
    message: string
}

export interface ICustomerResponse {
    data?: Customer,
    status: string,
    message: string
}

export interface IProductTypesResponse {
    data: ProductType[],
    status: string,
    message: string
}

export interface ITypeProductData {
    products: Product[],
    pageCount: number,
    totalQuantity: number
}

export interface ITypeProductResponse {
    data: ITypeProductData,
    status: string,
    message: string
}