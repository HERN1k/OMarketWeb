import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";
import useLoader from "../hooks/useLoader.tsx";
import styles from "../styles/Main.module.css";
import { fetchLogoutAsync } from "../code/Requests.ts";
import { LoginPage } from "../code/Constants.ts";

const Logout: FC = () => {

    const { handleSubmit, formState: { isSubmitting } } = useForm();

    const { loading, showLoader, hideLoader } = useLoader();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = async () => {
        showLoader();
        const isSuccess: boolean = await fetchLogoutAsync();
        if (isSuccess)
        {
            hideLoader();
            navigate(LoginPage);
            window.location.reload();
            return;
        }
        hideLoader();
    };

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [loading]);

    return (
        <div className={styles.logoutContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.logoutForm}>
                <span className={styles.logoutTitle}>Ви хочете вийти?</span>

                <button type="submit" 
                        className={`${styles.logoutSubmit} ${isSubmitting ? styles.logoutLoading : ""}`}>
                    Так
                </button>
            </form>

            <Loader loading={loading} />
        </div>
    );
}

export default Logout;