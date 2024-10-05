import { FC, useEffect, useState } from "react";
import AddNewStoreForm from "../components/AddNewStoreForm.tsx";
import Loader from "../components/Loader.tsx";
import useLoader from "../hooks/useLoader.tsx";
import styles from "../styles/Form.module.css";
import RemoveStoreForm from "../components/RemoveStoreForm.tsx";
import StoresForm from "../components/StoresForm.tsx";
import { Store } from "../types/Type.type.ts";
import { fetchStoresAsync } from "../code/Requests.ts";
import ChangeStoreInfoFrom from "../components/ChangeStoreInfoForm.tsx";

const Stores: FC = () => {

    const [stores, setStores] = useState<Store[] | null>(null);

    const { loading, showLoader, hideLoader } = useLoader();

    useEffect(() => {
        if (loading) { 
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [loading]);

    useEffect(() => {
        const fetch = async () => {
            showLoader();
            const res: Store[] = await fetchStoresAsync();
            res.sort((a, b) => {
                return a.city.length - b.city.length;
            });
            setStores(res)
            hideLoader();
        }

        fetch();
    }, [])

    return(
        <div className={styles.container}>
            <StoresForm stores={stores} 
                            setStores={setStores} 
                            hideLoader={hideLoader} 
                            showLoader={showLoader} />
            <AddNewStoreForm stores={stores} 
                            setStores={setStores} 
                            hideLoader={hideLoader} 
                            showLoader={showLoader}/>
            <ChangeStoreInfoFrom stores={stores} 
                            setStores={setStores} 
                            hideLoader={hideLoader} 
                            showLoader={showLoader}/>
            <RemoveStoreForm stores={stores} 
                            setStores={setStores} 
                            hideLoader={hideLoader} 
                            showLoader={showLoader}/>
            <Loader loading={loading} />
        </div>
    );
}

export default Stores;