import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../styles/Form.module.css";
import { ICitiesFormProps } from "../types/Props.interface";
import { City } from "../types/Type.type";
import { fetchCitiesAsync } from "../code/Requests";

const CitiesForm: FC<ICitiesFormProps> = ({ cities, setCities, hideLoader, showLoader }) => {

    const { handleSubmit, formState: { isSubmitting }} = useForm<any>();

    const onSubmit: SubmitHandler<any> = async () => {
        showLoader();
        const res: City[] = await fetchCitiesAsync();
        res.sort((a, b) => {
            return a.cityName.length - b.cityName.length;
        });
        setCities(res)
        hideLoader();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.title}>Перелік міст</h2>

            {cities?.map((item, index) => (
                <h4 className={styles.cityNameListItem} key={index}><span>№{++index}</span>&nbsp;&nbsp;{item.cityName}</h4>))}

            <button type="submit" className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`}>
                    Оновити
            </button>
        </form>
    );
};

export default CitiesForm;