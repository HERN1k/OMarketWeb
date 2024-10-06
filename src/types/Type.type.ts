export type RouteError = {
    statusText?: number;
    message?: string;
};

export type Store = {
    id: string,
    cityId: string,
    adminId: string,
    address: string,
    city: string,
    adminLogin: string,
    tgChatId: string,
    phoneNumber: string
}

export type City = {
    id: string,
    cityName: string
}

export type Admin = {
    id: string,
    login: string,
    permission: string,
    storeId?: string,
    storeName: string
}

export type Review = {
    id: string,
    text: string,
    customerId: string,
    storeId: string,
    createdAt: string,
} 

export type Customer = {
    id: number,
    username?: string,
    firstName: string,
    lastName?: string,
    phoneNumber?: string,
    isBot: boolean,
    storeAddress: string,
    createdAt?: string,
    blockedOrders: boolean,
    blockedReviews: boolean,
}

export type ProductUnderType = {
    underTypeId: string,
    underType: string
} 

export type ProductType = {
    typeId: string,
    type: string,
    underTypes: ProductUnderType[]
} 

export type Product = {
    id: string,
    name: string,
    photoUri: string,
    typeId: string,
    type: string,
    underType: string,
    price: string,
    dimensions: string,
    description: string,
    status: boolean,
}