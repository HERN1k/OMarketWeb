import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import styles from "../styles/Form.module.css";
import { ICitiesFormProps } from "../types/Props.interface";
import { IRemoveCityForm } from "../types/Form.interface";
import { fetchRemoveCityAsync } from "../code/Requests";
import { modalTextRemoveCity } from "../code/Texts";

const RemoveCityForm: FC<ICitiesFormProps> = ({ cities, hideLoader, showLoader }) => {

    const { register, handleSubmit, formState: { 
        errors,
        isSubmitting
    }} = useForm<IRemoveCityForm>({mode: "all"});

    const [showModal, setShowModal] = useState<boolean>(false);

    const onSubmit: SubmitHandler<IRemoveCityForm> = async (data) => {
        showLoader();
        const res: boolean = await fetchRemoveCityAsync(data);
        if (res)
        {
            alert("Місто успішно видалено!");
            window.location.reload();
        }
        hideLoader();
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.buttonInfoContainer}>
                    <div onClick={handleShow} className={styles.buttonInfo}>?</div>
                </div>

                <h2 className={styles.title}>Видалити місто</h2>

                <div className={styles.selectedContainer}>
                    <label>Місто</label>

                    <select {...register("cityId", { 
                                required: {
                                    value: true,
                                    message: "Це поле є обов'язковим"
                                }, 
                                pattern: {
                                    value: /^(?!\s*$).+/,
                                    message: "Це поле є обов'язковим"
                                } 
                            })} defaultValue="">
                        <option disabled={true} value="">⎯⎯⎯⎯⎯</option>
                        {cities?.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.cityName}
                            </option>))}
                    </select>

                    <div className={styles.error}>
                        {errors?.cityId && <span>{errors.cityId.message}</span>}
                    </div>
                </div>

                <h5 className={styles.warning}><span>Увага:</span> Під час видалення міста, будуть каскадно видалені всі пов'язані з ним магазини та інші залежні дані!</h5>
                
                <button type="submit" className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`} disabled={isSubmitting}>
                    Видалити
                </button>
            </form>

            <Modal show={showModal} onHide={handleClose} dialogClassName="modal-custom">
                <Modal.Header>
                    <Modal.Title>Валідація:</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextRemoveCity }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X 
                    </Button>
                </Modal.Footer>
            </Modal>        
        </>
    );
}

export default RemoveCityForm;