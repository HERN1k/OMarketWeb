import { FC } from "react";
import styles from "../styles/Main.module.css";

const Greeting: FC = () => {

    return(
        <div className={styles.greetingContainer}>
            <h2 className={styles.greetingTitle}>Вітаю в адмін панелі</h2>
            <h3 className={styles.greetingText}>телеграм боту OMarket</h3>
        </div>
    );
}

export default Greeting;