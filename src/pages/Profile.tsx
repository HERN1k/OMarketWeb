import { FC } from "react";
import styles from "../styles/Form.module.css";
import ChangePasswordForm from "../components/ChangePasswordForm.tsx";

const Profile: FC = () => {

    return(
        <div className={styles.container}>
            <ChangePasswordForm />
        </div>
    );
}

export default Profile;