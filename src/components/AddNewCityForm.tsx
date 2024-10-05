import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import styles from "../styles/Form.module.css"; 
import { ICitiesFormProps } from "../types/Props.interface";
import { IAddNewCityForm } from "../types/Form.interface";
import { fetchAddNewCityAsync } from "../code/Requests";
import { modalTextAddNewCity } from "../code/Texts";

const AddNewCityForm: FC<ICitiesFormProps> = ( { showLoader, hideLoader }) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { 
        errors,
        isSubmitting
    }} = useForm<IAddNewCityForm>({
        mode: "all"
    });

    const onSubmit: SubmitHandler<IAddNewCityForm> = async (data) => {
        showLoader();
        const isSuccess: boolean = await fetchAddNewCityAsync(data);
        if (!isSuccess)
        {
            hideLoader(); 
            return;
        }
        reset();
        alert("Місто успішно додано!");
        hideLoader();
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return( 
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.buttonInfoContainer}>
                    <div onClick={handleShow} className={styles.buttonInfo}>?</div>
                </div>

                <h2 className={styles.title}>Додати нове місто</h2>
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

                    <label>Назва міста</label>

                    <div className={styles.error}>
                        {errors?.cityName && <span>{errors.cityName.message}</span>}
                    </div>
                </div>

                <button type="submit"
                    className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`}
                    disabled={isSubmitting}>
                    Надіслати
                </button>            
            </form>

            <Modal show={showModal} onHide={handleClose} dialogClassName="modal-custom">
                <Modal.Header>
                    <Modal.Title>Валідація:</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextAddNewCity }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewCityForm;