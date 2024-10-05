import { FC, useEffect, useState } from "react";
import Loader from "../components/Loader.tsx";
import useLoader from "../hooks/useLoader.tsx";
import styles from "../styles/Form.module.css";
import { Admin, Store } from "../types/Type.type.ts";
import AddNewAdminForm from "../components/AddNewAdminForm.tsx";
import { fetchAdminsAsync, fetchStoresAsync } from "../code/Requests.ts";
import AdminsForm from "../components/AdminsForm.tsx";
import RemoveAdminForm from "../components/RemoveAdminForm.tsx";
import ChangePaswordAdminsForm from "../components/ChangePaswordAdminsForm.tsx"

const Admins: FC = () => {

    const [stores, setStores] = useState<Store[] | null>(null);

    const [admins, setAdmins] = useState<Admin[] | null>(null);

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
            const storesList: Store[] = await fetchStoresAsync();
            storesList.sort((a, b) => {
                return a.city.length - b.city.length;
            });
            setStores(storesList)
            const adminsList: Admin[] = await fetchAdminsAsync();
            adminsList.sort((a, b) => {
                return a.storeName.length - b.storeName.length;
            });
            setAdmins(adminsList)
        }

        fetch();
    }, [])

    return(
        <div className={styles.container}>
            <AdminsForm admins={admins}
                            setAdmins={setAdmins} 
                            stores={stores} 
                            setStores={setStores} 
                            hideLoader={hideLoader} 
                            showLoader={showLoader}/>
            <AddNewAdminForm admins={admins}
                            setAdmins={setAdmins} 
                            stores={stores} 
                            setStores={setStores} 
                            hideLoader={hideLoader} 
                            showLoader={showLoader}/>
            <ChangePaswordAdminsForm admins={admins}
                            setAdmins={setAdmins} 
                            stores={stores} 
                            setStores={setStores} 
                            hideLoader={hideLoader} 
                            showLoader={showLoader}/>
            <RemoveAdminForm admins={admins}
                            setAdmins={setAdmins} 
                            stores={stores} 
                            setStores={setStores} 
                            hideLoader={hideLoader} 
                            showLoader={showLoader}/>
            <Loader loading={loading} />
        </div>
    );
}

export default Admins;