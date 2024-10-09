import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu.tsx";
import ThemeSwitcher from "../components/ThemeSwitcher.tsx";
import useMainTitle from "../hooks/useMainTitle.tsx";
import styles from "../styles/Main.module.css"; 
import { Link } from "react-router-dom";

const App: FC = () => {

    const { title } = useMainTitle();
    const location = useLocation();
    
    return (
        <>
            <div id="header" className={styles.header}>
                <BurgerMenu />
                <p className={styles.headerTitle}>{title}</p>
                <ThemeSwitcher />
            </div> 

            <div className={styles.body}>
                {location.pathname === "/"
                ? <div className={styles.greetingContainer}>
                    <h2 className={styles.greetingTitle}>Вітаю в адмін панелі</h2>
                    <h3 className={styles.greetingText}>телеграм боту OMarket</h3>
                </div>
                : <Outlet />}
            </div>

            <div className={styles.footer}>
                <Link className={styles.linkItem} to={"reference"}>Довідка</Link>
                <p className={styles.createdBy}>© Created by HERN1k</p>
            </div>
        </> 
    );
};

export default App;