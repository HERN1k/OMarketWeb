import { FC, useState } from "react";
import { IStoresFormProps } from "../types/Props.interface";
import { IChangeStoreInfoFrom } from "../types/Form.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchChangeStoreInfoAsync } from "../code/Requests";
import { modalTextChangeStoreInfo } from "../code/Texts";
import { Modal, Button } from "react-bootstrap";
import styles from "../styles/Form.module.css";

const ChangeStoreInfoFrom: FC<IStoresFormProps> = ({ stores, showLoader, hideLoader }) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { 
        errors,
        isSubmitting
    }} = useForm<IChangeStoreInfoFrom>({ mode: "all" });

    const onSubmit: SubmitHandler<IChangeStoreInfoFrom> = async (data) => {
        showLoader();
        const isSuccess: boolean = await fetchChangeStoreInfoAsync(data);
        if (isSuccess) 
        {
            alert("Данні магазину успішно змінено!");
            reset();
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

                <h2 className={styles.title}>Змінити данні магазину</h2>

                <div className={styles.selectedContainer}>
                    <label>Магазин</label>

                    <select {...register("storeId", { 
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
                        {stores?.map((store) => (
                            <option key={store.id} value={store.id}>
                                {`${store.city} ${store.address}`}
                            </option>))}
                    </select>

                    <div className={styles.error}>
                        {errors?.storeId && <span>{errors.storeId.message}</span>}
                    </div>
                </div>

                <div className={styles.inputContainerNotRequired}>
                    <input placeholder=" " {...register("address", { 
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

                <div className={styles.inputContainerNotRequired}>
                    <input placeholder=" " {...register("phoneNumber", { 
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

                <div className={styles.inputContainerNotRequired}>
                    <input placeholder=" " type="text" {...register("latitude", { 
                            pattern: {
                                value: /^([-+]?([1-8]?[0-9](\.\d{1,6})?|90(\.0{1,6})?))$/, 
                                message: "Дані введені в невірному форматі"
                            },
                            validate: (value) => {
                                if (String(value) === "" || value === undefined) return true;
                
                                return /^([-+]?([1-8]?[0-9](\.\d{1,6})?|90(\.0{1,6})?))$/.test(String(value)) || "Дані введені в невірному форматі";
                            }
                        })} />

                    <label>Широта</label>

                    <div className={styles.error}>
                        {errors?.latitude && <span>{errors.latitude.message}</span>}
                    </div>
                </div>

                <div className={styles.inputContainerNotRequired}>
                    <input placeholder=" " type="text" {...register("longitude", { 
                            pattern: {
                                value: /^([-+]?((1[0-7][0-9])|(0?[0-9]{1,2}))(\.\d{1,6})?|180(\.0{1,6})?)$/, 
                                message: "Дані введені в невірному форматі"
                            },
                            validate: (value) => {
                                if (String(value) === "" || value === undefined) return true;
                
                                return /^([-+]?((1[0-7][0-9])|(0?[0-9]{1,2}))(\.\d{1,6})?|180(\.0{1,6})?)$/.test(String(value)) || "Дані введені в невірному форматі";
                            }
                        })} />

                    <label>Довгота</label>

                    <div className={styles.error}>
                        {errors?.longitude && <span>{errors.longitude.message}</span>} 
                    </div>
                </div>

                <div className={styles.inputContainerNotRequired}>
                    <input placeholder=" " type="text" {...register("tgChatId", { 
                            pattern: {
                                value: /^-?\d+$/, 
                                message: "Дані введені в невірному форматі"
                            },
                            validate: (value) => {
                                if (String(value) === "" || value === undefined) return true;
                
                                return /^-?\d+$/.test(String(value)) || "Дані введені в невірному форматі";
                            }
                        })} />

                    <label>Телеграм чат ID</label>

                    <div className={styles.error}>
                        {errors?.tgChatId && <span>{errors.tgChatId.message}</span>} 
                    </div>
                </div>        

                <h5 className={styles.warning}><span>Увага:</span> Ви можете змінити одне або кілька полів. Поля, які не потребують змін, потрібно повністю залишити порожніми. Обов’язково оберіть магазин!</h5>

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
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextChangeStoreInfo }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button> 
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangeStoreInfoFrom;