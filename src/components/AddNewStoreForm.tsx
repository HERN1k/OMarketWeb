import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import styles from "../styles/Form.module.css";
import { IStoresFormProps } from "../types/Props.interface";
import { City } from "../types/Type.type";
import { IAddNewStoreForm } from "../types/Form.interface";
import { fetchAddNewStoreAsync, fetchCitiesAsync } from "../code/Requests";
import { modalTextAddNewStore } from "../code/Texts";

const AddNewStoreForm: FC<IStoresFormProps> = ({ showLoader, hideLoader }) => {

    const [cities, setCities] = useState<City[]>([]);

    const [showModal, setShowModal] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { 
        errors,
        isSubmitting
    }} = useForm<IAddNewStoreForm>({ mode: "all" });

    const onSubmit: SubmitHandler<IAddNewStoreForm> = async (data) => {
        showLoader();
        const isSuccess: boolean = await fetchAddNewStoreAsync(data);
        if (!isSuccess) 
        {
            hideLoader();
            return;
        }
        reset();
        alert("Магазин успішно додано!");
        hideLoader();
    };

    useEffect(() => {
        const fetch = async () => {
            const res: City[] = await fetchCitiesAsync();
            res.sort((a, b) => {
                return a.cityName.length - b.cityName.length;
            });
            setCities(res);
        }

        fetch();
    }, [])

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.buttonInfoContainer}>
                    <div onClick={handleShow} className={styles.buttonInfo}>?</div>
                </div> 

                <h2 className={styles.title}>Додати новий магазин</h2>

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
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.cityName}
                            </option>))}
                    </select>

                    <div className={styles.error}>
                        {errors?.cityId && <span>{errors.cityId.message}</span>}
                    </div>
                </div>
                
                <div className={styles.inputContainer}>
                    <input required={true} {...register("address", { 
                            required: {
                                value: true,
                                message: "Це поле є обов'язковим"
                            },
                            maxLength: {
                                value: 256,
                                message: "Це поле має бути не більше 256 символів"
                            },
                            minLength: {
                                value: 3,
                                message: "Це поле має бути не менше 3 символів"
                            },
                        })} />

                    <label>Адреса</label>

                    <div className={styles.error}>
                        {errors?.address && <span>{errors.address.message}</span>}
                    </div>
                </div>
                
                <div className={styles.inputContainer}>
                    <input required={true} {...register("phoneNumber", { 
                            required: {
                                value: true,
                                message: "Це поле є обов'язковим"
                            },
                            maxLength: {
                                value: 32,
                                message: "Це поле має бути не більше 32 символів"
                            },
                            minLength: {
                                value: 10,
                                message: "Це поле має бути не менше 10 символів"
                            },
                            pattern: {
                                value: /^(\+?)(\d{1,3})\s?(\d{1,4})\s?(\d{1,4})\s?(\d{1,9})$/, 
                                message: "Дані введені в невірному форматі"
                            }
                        })} />

                    <label>Номер телефону</label>

                    <div className={styles.error}>
                        {errors?.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <input type="number" step="0.000001" required={true} {...register("latitude", { 
                            required: {
                                value: true,
                                message: "Це поле є обов'язковим"
                            },
                            pattern: {
                                value: /^([-+]?([1-8]?[0-9](\.\d{1,6})?|90(\.0{1,6})?))$/, 
                                message: "Дані введені в невірному форматі"
                            }
                        })} />

                    <label>Широта</label>

                    <div className={styles.error}>
                        {errors?.latitude && <span>{errors.latitude.message}</span>}
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <input type="number" step="0.000001" required={true} {...register("longitude", { 
                            required: {
                                value: true,
                                message: "Це поле є обов'язковим"
                            },
                            pattern: {
                                value: /^([-+]?((1[0-7][0-9])|(0?[0-9]{1,2}))(\.\d{1,6})?|180(\.0{1,6})?)$/, 
                                message: "Дані введені в невірному форматі"
                            }
                        })} />

                    <label>Довгота</label>

                    <div className={styles.error}>
                        {errors?.longitude && <span>{errors.longitude.message}</span>} 
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
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextAddNewStore }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewStoreForm;