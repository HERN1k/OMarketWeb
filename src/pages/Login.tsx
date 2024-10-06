import { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";
import useLoader from "../hooks/useLoader.tsx";
import useMainTitle from "../hooks/useMainTitle.tsx";
import "../styles/CustomModal.css";
import styles from "../styles/Login.module.css";
import useBurgerMenu from "../hooks/useBurgerMenu.tsx";
import { ILoginForm } from "../types/Form.interface.ts";
import { fetchLoginAsync } from "../code/Requests.ts";
import { modalTextLogin } from "../code/Texts.ts"; 

const Login: FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { loading, showLoader, hideLoader } = useLoader();

    const { setAuthorized } = useBurgerMenu();

    const { setTitle } = useMainTitle();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { 
        errors,
        isValid,
        isSubmitting
    }} = useForm<ILoginForm>({
        mode: "all"
    });

    const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
        showLoader();
        const isSuccess: boolean = await fetchLoginAsync({ data, setTitle });
        if (isSuccess)
        {
            hideLoader();
            setAuthorized(true);
            navigate("/greeting");
            window.location.reload();
            return;
        }
        hideLoader();
    };

    useEffect(() => {
        if (localStorage.getItem("login") != undefined)
        {
            navigate("/greeting");
        }
    }, [])

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

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                <div className={styles.buttonInfoContainer}>
                    <div onClick={handleShow} className={styles.buttonInfo}>?</div>
                </div>
                
                <span className={styles.title}>Вхід</span>

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
                    className={`${styles.submit} ${!isValid ? styles.disabled : ""} ${isSubmitting ? styles.loading : ""}`}
                    disabled={!isValid || isSubmitting}>
                    Надіслати
                </button> 
            </form>

            <Modal show={showModal} onHide={handleClose} dialogClassName="modal-custom">
                <Modal.Header>
                    <Modal.Title>Валідація:</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextLogin }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>

            <Loader loading={loading} />
        </div>
    );
}

export default Login;