import { FC, useEffect, useState } from "react";
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";
import styles from "../styles/Form.module.css";
import { fetchProductTypesAsync } from "../code/Requests";
import { ProductType } from "../types/Type.type";
import AddNewProductForm from "../components/AddNewProductForm";
import ChangeProductForm from "../components/ChangeProductForm";
import FindProductForm from "../components/FindProductForm";
import RemoveProductForm from "../components/RemoveProductForm";

const Products: FC = () => {

    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    const { loading, showLoader, hideLoader } = useLoader();

    const fetchTypes: () => Promise<void> = async () => {
        showLoader();
        const res: ProductType[] = await fetchProductTypesAsync();
        setProductTypes(res);
        hideLoader();
    }

    useEffect(() => {
        if (loading) { 
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [loading]);

    useEffect(() => {
        fetchTypes();
    }, []);

    return (
        <div className={styles.container}>
            <FindProductForm productTypes={productTypes} 
                            showLoader={showLoader} 
                            hideLoader={hideLoader}/>
            <AddNewProductForm productTypes={productTypes} 
                            showLoader={showLoader} 
                            hideLoader={hideLoader}/>
            <ChangeProductForm productTypes={productTypes} 
                            showLoader={showLoader} 
                            hideLoader={hideLoader}/>
            <RemoveProductForm productTypes={productTypes} 
                            showLoader={showLoader} 
                            hideLoader={hideLoader}/>
            <Loader loading={loading} />
        </div>
    );
} 

export default Products;