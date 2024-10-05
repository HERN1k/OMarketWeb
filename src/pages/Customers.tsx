import { FC, useEffect } from "react";
import useLoader from "../hooks/useLoader";
import Loader from "../components/Loader";
import styles from "../styles/Form.module.css";

const Customers: FC = () => {
    
    const { loading, showLoader, hideLoader } = useLoader();

    useEffect(() => {
        if (loading) { 
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [loading]);
    
    return (
        <div className={styles.container}>

            <Loader loading={loading} />
        </div>  
    );
}

export default Customers;