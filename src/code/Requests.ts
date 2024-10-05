import axios from "./Axios.ts";
import { Admin, City, Customer, ProductType } from "../types/Type.type.ts";
import { ILoginRequestProps } from "../types/Props.interface";
import { 
    IAdminsResponse,
    ICitiesResponse,
    IErrorResponse, 
    ILoginResponse, 
    IStoreReviewResponse, 
    IStoreReviewData, 
    IStoresResponse,
    ICustomerResponse,
    IProductTypesResponse,
    ITypeProductData,
    ITypeProductResponse
} from "../types/Response.interface.ts";
import { 
    IAddNewAdminForm,
    IAddNewCityForm, 
    IAddNewProductFrom, 
    IAddNewStoreForm, 
    IChangeAdminPasswordForm, 
    IChangeCityNameFrom, 
    IChangePasswordForm, 
    IChangeProductFrom, 
    IChangeStoreInfoFrom, 
    IRemoveAdminForm, 
    IRemoveCityForm, 
    IRemoveProductFrom, 
    IRemoveStoreForm,
    IStoreReviewFrom,
    ITypeProductFrom
} from "../types/Form.interface.ts";
import { 
    AddNewAdmin,
    AddNewCity,
    AddNewProduct,
    AddNewStore,
    Admins,
    BlockCustomerOrders,
    BlockCustomerReviews,
    ChangeAdminPassword,
    ChangeCityName,
    ChangePassword,
    ChangeProduct,
    ChangeStoreInfo,
    Cities,
    GetCustomerById,
    GetCustomerByPhoneNumber,
    GetProducts,
    Login,
    Logout,
    ProductTypes,
    RemoveAdmin,
    RemoveCity,
    RemoveProduct,
    RemoveStore,
    RemoveStoreReview,
    StoreReview,
    Stores,
    UnBlockCustomerOrders,
    UnBlockCustomerReviews
 } from "./Constants.ts";

export const fetchLoginAsync = async ({ data, setTitle } : ILoginRequestProps) => {
    try {
        const response = await axios.post<ILoginResponse>(Login, data);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        localStorage.setItem("login", response.data.data.login);
        localStorage.setItem("permission", response.data.data.permission);
        setTitle(response.data.data.login);

        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false;
    }
};

export const fetchLogoutAsync = async () => {
    try {
        const response = await axios.get<IErrorResponse>(Logout);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        localStorage.clear();

        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        localStorage.clear();
        window.location.reload();
        window.location.href = "/web/login";
        return false;
    }
};

export const fetchChangePasswordAsync = async (data: IChangePasswordForm) => {
    try {
        const response = await axios.post<IErrorResponse>(ChangePassword, data);
        
        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        localStorage.clear();

        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        localStorage.clear();
        window.location.reload();
        window.location.href = "/web/login";
        return false;
    }
}

export const fetchAddNewCityAsync: (data: IAddNewCityForm) => Promise<boolean> = async (data) => {
    try {
        const response = await axios.post<IErrorResponse>(AddNewCity, data);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false;
    }
}

export const fetchCitiesAsync: () => Promise<City[]> = async () => {
    try {
        const response = await axios.get<ICitiesResponse>(Cities);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return [];
        }
        
        return response.data.data;
    } catch (error) {
        console.error(error);
        alert(error);
        return [];
    }
}

export const fetchRemoveCityAsync: (data: IRemoveCityForm) => Promise<boolean> = async (data) => {
    try {
        const response = await axios.post<IErrorResponse>(RemoveCity, data);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false;
    }
}

export const fetchAddNewStoreAsync = async (data: IAddNewStoreForm) => {
    try {
        const response = await axios.post<IErrorResponse>(AddNewStore, data);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false;
    }
}

export const fetchStoresAsync = async () => {
    try {
        const response = await axios.get<IStoresResponse>(Stores);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return [];
        }
        
        return response.data.data;
    } catch (error) {
        console.error(error);
        alert(error);
        return [];
    }
}

export const fetchAddNewAdminAsync: (data: IAddNewAdminForm) => Promise<boolean> = async (data) => {
    try {
        const response = await axios.post<IErrorResponse>(AddNewAdmin, data);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false;
    }
}

export const fetchAdminsAsync: () => Promise<Admin[]> = async () => {
    try {
        const response = await axios.get<IAdminsResponse>(Admins);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return [];
        }
        
        return response.data.data;
    } catch (error) {
        console.error(error);
        alert(error);
        return [];
    }
}

export const fetchRemoveAdminAsync: (data: IRemoveAdminForm) => Promise<boolean> = async (data) => {
    try {
        const response = await axios.post<IErrorResponse>(RemoveAdmin, data);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false;
    }
}

export const fetchRemoveStoreAsync: (data: IRemoveStoreForm) => Promise<boolean> = async (data) => {
    try {
        const response = await axios.post<IErrorResponse>(RemoveStore, data);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false;
    }
}

export const fetchChangeAdminPasswordAsync: (data: IChangeAdminPasswordForm) => Promise<boolean> = async (data) => {
    try {
        const response = await axios.post<IErrorResponse>(ChangeAdminPassword, data);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false;
    }
}

export const fetchChangeCityNameAsync: (data: IChangeCityNameFrom) => Promise<boolean> = async (data) => {
    try {
        const response = await axios.post<IErrorResponse>(ChangeCityName, data);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false;
    }
}

export const fetchChangeStoreInfoAsync: (data: IChangeStoreInfoFrom) => Promise<boolean> = async (data) => {
    try {
        const response = await axios.post<IErrorResponse>(ChangeStoreInfo, data);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false;
    }
}

export const fetchStoreReviewAsync: (data: IStoreReviewFrom) => Promise<IStoreReviewData> = async (data) => {
    try {
        const response = await axios.get<IStoreReviewResponse>(StoreReview, {
            params: {
                storeId: data.storeId,
                page: data.page
            }
        });

        if (response.data.status != undefined) {
            alert(response.data.message)
            return { reviews: [], pageCount: 0, totalQuantity: 0 };
        }
        
        return response.data.data;
    } catch (error) {
        console.error(error);
        alert(error);
        return { reviews: [], pageCount: 0, totalQuantity: 0 };
    }
}

export const fetchRemoveStoreReviewAsync: (id: string) => Promise<boolean> = async (id) => {
    try {
        const response = await axios.get<IErrorResponse>(RemoveStoreReview, {
            params: { reviewId: id }
        });

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false; 
    }
}

export const fetchBlockCustomerReviewsAsync: (id: string) => Promise<boolean> = async (id) => {
    try {
        const response = await axios.get<IErrorResponse>(BlockCustomerReviews, {
            params: { customerId: id }
        });

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false; 
    }
}

export const fetchUnBlockCustomerReviewsAsync: (id: string) => Promise<boolean> = async (id) => {
    try {
        const response = await axios.get<IErrorResponse>(UnBlockCustomerReviews, {
            params: { customerId: id }
        });

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false; 
    }
}

export const fetchBlockCustomerOrdersAsync: (id: string) => Promise<boolean> = async (id) => {
    try {
        const response = await axios.get<IErrorResponse>(BlockCustomerOrders, {
            params: { customerId: id }
        });

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false; 
    }
}

export const fetchUnBlockCustomerOrdersAsync: (id: string) => Promise<boolean> = async (id) => {
    try {
        const response = await axios.get<IErrorResponse>(UnBlockCustomerOrders, {
            params: { customerId: id }
        });

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false; 
    }
}

export const fetchGetCustomerByIdAsync: (id: string) => Promise<Customer | null | undefined> = async (id) => {
    try {
        const response = await axios.get<ICustomerResponse>(GetCustomerById, {
            params: { customerId: id }
        });

        if (response.data.status != undefined) {
            alert(response.data.message)
            return null;
        }
        
        return response.data.data;
    } catch (error) {
        console.error(error);
        alert(error);
        return null; 
    }
}

export const fetchGetCustomerByPhoneNumberAsync: (phoneNumber: string) => Promise<Customer | null | undefined> = async (phoneNumber) => {
    try {
        const response = await axios.get<ICustomerResponse>(GetCustomerByPhoneNumber, {
            params: { phoneNumber: phoneNumber }
        });

        if (response.data.status != undefined) {
            alert(response.data.message)
            return null;
        }
        
        return response.data.data;
    } catch (error) {
        console.error(error);
        alert(error);
        return null; 
    }
}

export const fetchProductTypesAsync: () => Promise<ProductType[]> = async () => {
    try {
        const response = await axios.get<IProductTypesResponse>(ProductTypes);

        if (response.data.status != undefined) {
            alert(response.data.message)
            return [];
        }
        
        return response.data.data;
    } catch (error) {
        console.error(error);
        alert(error);
        return []; 
    }
}

export const fetchAddNewProductAsync: (data: IAddNewProductFrom) => Promise<boolean> = async (data) => {
    try {
        const formData = new FormData();

        formData.append("file", data.file[0]);
        formData.append("metadata", JSON.stringify({
            typeId: data.typeId,
            underTypeId: data.underTypeId,
            name: data.name,
            price: data.price,
            dimensions: data.dimensions,
            description: data.description
        }));

        const response = await axios.post<IErrorResponse>(AddNewProduct, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false; 
    }
}

export const fetchChangeProductAsync: (data: IChangeProductFrom) => Promise<boolean> = async (data) => {
    try {
        const formData = new FormData();

        if (data.file[0] != undefined) {
            formData.append("file", data.file[0]);
        }
        formData.append("metadata", JSON.stringify({
            productId: data.productId,
            name: data.name,
            price: data.price,
            dimensions: data.dimensions,
            description: data.description
        }));

        const response = await axios.post<IErrorResponse>(ChangeProduct, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false; 
    }
}

export const fetchRemoveProductAsync: (data: IRemoveProductFrom) => Promise<boolean> = async (data) => {
    try {
        const response = await axios.get<IErrorResponse>(RemoveProduct, {
            params: { productId: data.productId }
        });

        if (response.data.status != undefined) {
            alert(response.data.message)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(error);
        alert(error);
        return false; 
    }
}

export const fetchTypeProductAsync: (data: ITypeProductFrom) => Promise<ITypeProductData> = async (data) => {
    try {
        const response = await axios.get<ITypeProductResponse>(GetProducts, {
            params: {
                typeId: data.typeId,
                page: data.page
            }
        });

        if (response.data.status != undefined) {
            alert(response.data.message)
            return { products: [], pageCount: 0, totalQuantity: 0 };
        }
        
        return response.data.data;
    } catch (error) {
        console.error(error);
        alert(error);
        return { products: [], pageCount: 0, totalQuantity: 0 };
    }
}