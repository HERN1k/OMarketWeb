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

            <div className={styles.storesQuantity}>Кількість магазинів: {stores?.length}</div>

            {stores?.map((item, index) => (
                <div key={index} className={styles.storesContainer}>
                    <h4 className={styles.storesText}><span>№{++index}</span>&nbsp;&nbsp;{item.city} {item.address}</h4>
                    <h5 className={styles.storesText}><span>Адміністратор:</span> {item.adminLogin ?? "Немає"}</h5>
                    <h5 className={styles.storesText}><span>Номер телефона:</span> {item.phoneNumber ?? "Немає"}</h5>
                    <h5 className={styles.storesText}><span>Телеграм чат id:</span> {item.tgChatId ?? "Немає"}</h5>
                </div>))}

            <button type="submit" className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`}>
                    Оновити
            </button>   
        </form>
    );
}

export default StoresForm;