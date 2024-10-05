import { FC } from "react";
import { Outlet } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu.tsx";
import ThemeSwitcher from "../components/ThemeSwitcher.tsx";
import useMainTitle from "../hooks/useMainTitle.tsx";
import styles from "../styles/Main.module.css"; 

const App: FC = () => {

    const { title } = useMainTitle();

    return (
        <>
            <div id="header" className={styles.header}>
                <BurgerMenu />
                <p className={styles.headerTitle}>{title}</p>
                <ThemeSwitcher />
            </div>

            <div className={styles.body}>
                <Outlet />
            </div>

            <div className={styles.footer}>
                <p className={styles.createdBy}>© Created by HERN1k</p>
            </div>
        </>
    );
};

export default App;