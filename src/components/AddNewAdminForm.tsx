import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import styles from "../styles/Form.module.css";
import { IAdminFormProps } from "../types/Props.interface";
import { IAddNewAdminForm } from "../types/Form.interface";
import { modalTextAddNewAdmin } from "../code/Texts";
import { fetchAddNewAdminAsync } from "../code/Requests"

const AddNewAdminForm: FC<IAdminFormProps> = ({ stores, showLoader, hideLoader }) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { 
        errors,
        isSubmitting
    }} = useForm<IAddNewAdminForm>({ mode: "all" });

    const onSubmit: SubmitHandler<IAddNewAdminForm> = async (data) => {
        showLoader();
        const isSuccess: boolean = await fetchAddNewAdminAsync(data);
        if (!isSuccess)
        {
            hideLoader();
            return; 
        }
        reset();
        alert("Адміністратора успішно додано!");
        hideLoader();
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const togglePasswordVisibility = () => setShowPassword(prevState => !prevState);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.buttonInfoContainer}>
                    <div onClick={handleShow} className={styles.buttonInfo}>?</div>
                </div>

                <h2 className={styles.title}>Додати нового адміністратора</h2>

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
                        <option disabled={true} value="">⎯⎯⎯⎯⎯</option>
                        {stores?.map((store) => (
                            <option key={store.id} value={store.id}>
                                {`${store.city} ${store.address}`}
                            </option>))}
                    </select>

                    <div className={styles.error}>
                        {errors?.storeId && <span>{errors.storeId.message}</span>}
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <input required={true} {...register("login", { 
                            required: {
                                value: true,
                                message: "Це поле є обов'язковим"
                            },
                            maxLength: {
                                value: 32,
                                message: "Це поле має бути не більше 32 символів"
                            },
                            minLength: {
                                value: 3,
                                message: "Це поле має бути не менше 3 символів"
                            },
                            pattern: {
                                value: /^[A-Za-z0-9!@#$%^&*()\-_{}/\\]{3,32}$/i, 
                                message: "Дані введені в невірному форматі"
                            }
                        })} />

                    <label>Логін</label>

                    <div className={styles.error}>
                        {errors?.login && <span>{errors.login.message}</span>}
                    </div>
                </div>
                
                <div className={styles.inputContainer}>
                    <div onClick={togglePasswordVisibility} className={styles.passwordVisibility}>
                        &#128065;
                    </div>

                    <input  type={showPassword ? "text" : "password"}
                            style={{padding: "0.5rem 2rem 0 0"}}
                            required={true} {...register("password", { 
                            required: {
                                value: true,
                                message: "Це поле є обов'язковим"
                            },
                            maxLength: {
                                value: 64,
                                message: "Це поле має бути не більше 64 символів"
                            },
                            minLength: {
                                value: 8,
                                message: "Це поле має бути не менше 8 символів"
                            },
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_{}/\\])(?!.*\s).{8,}$/, 
                                message: "Дані введені в невірному форматі"
                            }
                        })} /> 

                    <label>Пароль</label>

                    <div className={styles.error}>
                        {errors?.password && <span>{errors.password.message}</span>}
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
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextAddNewAdmin }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewAdminForm;