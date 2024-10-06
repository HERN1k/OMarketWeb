import { FC, useEffect } from "react";
import Loader from "../components/Loader.tsx";
import useLoader from "../hooks/useLoader.tsx";
import styles from "../styles/Form.module.css";
import ChangeStoreInfoBaseFrom from "../components/ChangeStorInfoBaseForm.tsx";

const StoresBase: FC = () => {

    const { loading, showLoader, hideLoader } = useLoader();

    useEffect(() => {
        if (loading) { 
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [loading]);

    return(
        <div className={styles.container}>
            <ChangeStoreInfoBaseFrom hideLoader={hideLoader} showLoader={showLoader}/>
            <Loader loading={loading} />
        </div>
    );
}

export default StoresBase;