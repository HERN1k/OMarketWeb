import { FC, useState } from "react";
import { ICitiesFormProps } from "../types/Props.interface";
import { modalTextChangeCityName } from "../code/Texts";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import styles from "../styles/Form.module.css"; 
import { IChangeCityNameFrom } from "../types/Form.interface";
import { fetchChangeCityNameAsync } from "../code/Requests";

const ChangeCityNameForm: FC<ICitiesFormProps> = ( { cities, showLoader, hideLoader }) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const { register, handleSubmit, formState: { 
        errors,
        isSubmitting
    }} = useForm<IChangeCityNameFrom>({
        mode: "all"
    });

    const onSubmit: SubmitHandler<IChangeCityNameFrom> = async (data) => {
        showLoader();
        const isSuccess: boolean = await fetchChangeCityNameAsync(data);
        if (!isSuccess)
        {
            alert("Назву міста успішно змінено!");
            hideLoader();
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

                <h2 className={styles.title}>Змінтити назву міста</h2>

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
                        <option disabled={true} value="">⎯⎯⎯⎯⎯⎯</option>
                        {cities?.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.cityName}
                            </option>))}
                    </select>

                    <div className={styles.error}>
                        {errors?.cityId && <span>{errors.cityId.message}</span>}
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <input required={true} {...register("cityName", { 
                            required: {
                                value: true,
                                message: "Це поле є обов'язковим"
                            },
                            maxLength: {
                                value: 64,
                                message: "Це поле має бути не більше 64 символів"
                            },
                            minLength: {
                                value: 2,
                                message: "Це поле має бути не менше 2 символів"
                            }
                        })} />

                    <label>Нова назва</label>

                    <div className={styles.error}>
                        {errors?.cityName && <span>{errors.cityName.message}</span>}
                    </div>
                </div>
 
                <button type="submit"
                    className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`}
                    disabled={isSubmitting}>
                    Змінити
                </button> 
            </form>

            <Modal show={showModal} onHide={handleClose} dialogClassName="modal-custom">
                <Modal.Header>
                    <Modal.Title>Валідація:</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextChangeCityName }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangeCityNameForm;