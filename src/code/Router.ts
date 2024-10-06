import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound.tsx";
import App from '../pages/App.tsx';
import Login from "../pages/Login.tsx";
import Logout from "../pages/Logout.tsx";
import Greeting from "../pages/Greeting.tsx";
import Profile from "../pages/Profile.tsx";
import Cities from "../pages/Cities.tsx";
import Stores from "../pages/Stores.tsx";
import Admins from "../pages/Admins.tsx";
import Reviews from "../pages/Reviews.tsx";
import Customers from "../pages/Customers.tsx";
import Products from "../pages/Products.tsx";
import BaseReviews from "../pages/BaseReviews.tsx";
import BaseProducts from "../pages/BaseProducts.tsx";
import StoresBase from "../pages/StoresBase.tsx";
import Reference from "../pages/Reference.tsx";

export const router = createBrowserRouter([ 
    {
        path: "/",
        element: React.createElement(App),
        errorElement: React.createElement(NotFound),
        children: [
            {
                path: "login",
                element: React.createElement(Login),
                errorElement: React.createElement(NotFound)
            },
            {
              path: "greeting",
              element: React.createElement(Greeting),
              errorElement: React.createElement(NotFound)
            },
            {
                path: "logout",
                element: React.createElement(Logout),
                errorElement: React.createElement(NotFound)
            },
            {
                path: "profile",
                element: React.createElement(Profile),
                errorElement: React.createElement(NotFound)
            },
            {
                path: "cities",
                element: React.createElement(Cities),
                errorElement: React.createElement(NotFound)
            },
            {
                path: "stores",
                element: React.createElement(Stores),
                errorElement: React.createElement(NotFound)
            },
            {
                path: "admins",
                element: React.createElement(Admins),
                errorElement: React.createElement(NotFound)
            },
            {
                path: "reviews",
                element: React.createElement(Reviews),
                errorElement: React.createElement(NotFound)
            },
            {
                path: "customers",
                element: React.createElement(Customers),
                errorElement: React.createElement(NotFound)
            },
            {
                path: "products",
                element: React.createElement(Products),
                errorElement: React.createElement(NotFound)
            },
            {
                path: "base-reviews",
                element: React.createElement(BaseReviews),
                errorElement: React.createElement(NotFound)
            },
            {
                path: "base-products",
                element: React.createElement(BaseProducts),
                errorElement: React.createElement(NotFound)
            },
            {
                path: "stores-base",
                element: React.createElement(StoresBase),
                errorElement: React.createElement(NotFound)
            },
            {
                path: "reference",
                element: React.createElement(Reference),
                errorElement: React.createElement(NotFound)
            },
        ],
    },    
]);