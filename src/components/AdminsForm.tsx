import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../styles/Form.module.css";
import { IAdminFormProps } from "../types/Props.interface";
import { Admin } from "../types/Type.type";
import { fetchAdminsAsync } from "../code/Requests";

const AdminsForm: FC<IAdminFormProps> = ({ admins, setAdmins, showLoader, hideLoader }) => {

    const { handleSubmit, formState: { isSubmitting }} = useForm<any>();
 
    const onSubmit: SubmitHandler<any> = async () => {
        showLoader();
        const res: Admin[] = await fetchAdminsAsync();
        res.sort((a, b) => {
            return a.storeName.length - b.storeName.length;
        });
        setAdmins(res)
        hideLoader();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.title}>Перелік Адміністраторів</h2>

            {admins?.map((item, index) => (
                <div key={index} className={styles.storeListContainer}>
                    <h4 className={styles.storeListItemIndex}><span>№{++index}</span></h4>
                    <h4 className={styles.storeListItemTitle}><span>Магазин:</span> {item.storeName != " " ? item.storeName : "Немає"}</h4>
                    <h5 className={styles.storeListItem}><span>Логін:</span> {item.login ?? "Немає"}</h5>
                    <h5 className={styles.storeListItem}><span>Дозвіл:</span> {item.permission ?? "Немає"}</h5>
                    <h5 className={styles.storeListItemLast}><span>Телеграм чат id:</span> {item.tgAccountId ?? "Немає"}</h5>
                </div>))}

            <button type="submit" className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`}>
                    Оновити
            </button>  
        </form>
    );
}

export default AdminsForm;