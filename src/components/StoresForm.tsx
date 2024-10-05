import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../styles/Form.module.css";
import { IStoresFormProps } from "../types/Props.interface";
import { Store } from "../types/Type.type";
import { fetchStoresAsync } from "../code/Requests";

const StoresForm: FC<IStoresFormProps> = ({ stores, setStores, showLoader, hideLoader }) => {

    const { handleSubmit, formState: { isSubmitting }} = useForm<any>();
 
    const onSubmit: SubmitHandler<any> = async () => {
        showLoader();
        const res: Store[] = await fetchStoresAsync();
        res.sort((a, b) => {
            return a.city.length - b.city.length;
        });
        setStores(res)
        hideLoader();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.title}>Перелік магазинів</h2>

            {stores?.map((item, index) => (
                <div key={index} className={styles.storeListContainer}>
                    <h4 className={styles.storeListItemTitle}><span>№{++index}</span>&nbsp;&nbsp;{item.city} {item.address}</h4>
                    <h5 className={styles.storeListItem}><span>Адміністратор:</span> {item.adminLogin ?? "Немає"}</h5>
                    <h5 className={styles.storeListItem}><span>Номер телефона:</span> {item.phoneNumber ?? "Немає"}</h5>
                    <h5 className={styles.storeListItemLast}><span>Телеграм чат id:</span> {item.tgChatId ?? "Немає"}</h5>
                </div>))}

            <button type="submit" className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`}>
                    Оновити
            </button>   
        </form>
    );
}

export default StoresForm;