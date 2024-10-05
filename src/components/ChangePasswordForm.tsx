import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLoader from "../hooks/useLoader.tsx";
import styles from "../styles/Form.module.css";
import { modalTextChangePassword } from "../code/Texts.ts";
import { LoginPage } from "../code/Constants.ts";
import { IChangePasswordForm } from "../types/Form.interface.ts";
import { fetchChangePasswordAsync } from "../code/Requests.ts";
import Loader from "./Loader.tsx";

const ChangePasswordForm: FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showNewPassword, setShowNewPassword] = useState(false);

    const { loading, showLoader, hideLoader } = useLoader();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { 
        errors,
        isSubmitting
    }} = useForm<IChangePasswordForm>({
        mode: "all"
    });

    const onSubmit: SubmitHandler<IChangePasswordForm> = async (data) => {
        showLoader();
        const isSuccess: boolean = await fetchChangePasswordAsync(data);
        if (isSuccess)
        {
            hideLoader();
            navigate(LoginPage);
            window.location.reload();
            return;
        }
        hideLoader();
    };

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [loading]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const togglePasswordVisibility = () => setShowPassword(prevState => !prevState);
    const toggleNewPasswordVisibility = () => setShowNewPassword(prevState => !prevState);

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.buttonInfoContainer}>
                    <div onClick={handleShow} className={styles.buttonInfo}>?</div>
                </div>

                <h2 className={styles.title}>Зміна паролю</h2>
                <div className={styles.inputContainer}>
                    <div onClick={togglePasswordVisibility} className={styles.passwordVisibility}>
                        &#128065;
                    </div>

                    <input  type={showPassword ? "text" : "password"}
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
                
                <div className={styles.inputContainer}>
                    <div onClick={toggleNewPasswordVisibility} className={styles.passwordVisibility}>
                        &#128065;
                    </div>

                    <input  type={showNewPassword ? "text" : "password"}
                            required={true} {...register("newPassword", { 
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

                    <label>Новий пароль</label>

                    <div className={styles.error}>
                        {errors?.newPassword && <span>{errors.newPassword.message}</span>}
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
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextChangePassword }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>

            <Loader loading={loading} />
        </>
    );
}

export default ChangePasswordForm;