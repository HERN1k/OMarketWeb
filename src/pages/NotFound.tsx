import { FC } from "react";
import { useRouteError } from "react-router-dom";
import styles from "../styles/Main.module.css";
import { RouteError } from "../types/Type.type.ts"

const NotFound: FC = () => {

    const error = useRouteError() as RouteError;

    return (
        <div id="error-page" className={styles.notFoundContainer}>
            <h1 className={styles.notFoundTitle}>Oops!</h1>
            <p className={styles.notFoundText}>
                Вибачте, сталася неочікувана помилка.
            </p>
            <p className={styles.notFoundText}>
                <i className={styles.notFoundText}>
                    {error.statusText || error.message}
                </i>
            </p>
        </div>
    );
};

export default NotFound;