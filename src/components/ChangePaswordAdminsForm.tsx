import { FC, useState } from "react";
import { IAdminFormProps } from "../types/Props.interface";
import { IChangeAdminPasswordForm } from "../types/Form.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchChangeAdminPasswordAsync } from "../code/Requests";
import { Modal, Button } from "react-bootstrap";
import styles from "../styles/Form.module.css";
import { modalTextChangePaswordAdmins } from "../code/Texts";

const ChangePaswordAdminsForm: FC<IAdminFormProps> = ({ admins, showLoader, hideLoader }) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { 
        errors,
        isSubmitting
    }} = useForm<IChangeAdminPasswordForm>({mode: "all"});
 
    const onSubmit: SubmitHandler<IChangeAdminPasswordForm> = async (data) => {
        showLoader();
        const res: boolean = await fetchChangeAdminPasswordAsync(data);
        if (res)
        {
            alert("Пароль адміністратора успішно змінено!");
            reset();
        }
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

                <h2 className={styles.title}>Змінити пароль адміністратора</h2>

                <div className={styles.selectedContainer}>
                    <label>Адміністратор</label>

                    <select {...register("adminId", { 
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
                        {admins?.map((admin) => (
                            <option key={admin.id} value={admin.id}>
                                {admin.login}
                            </option>))}
                    </select>

                    <div className={styles.error}>
                        {errors?.adminId && <span>{errors.adminId.message}</span>}
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

                <h5 className={styles.warning}><span>Увага:</span> Після зміни пароля цей адміністратор буде автоматично виведений з системи протягом 30 хвилин, що призведе до втрати доступу до акаунту. Для відновлення доступу адміністратору необхідно буде повторно увійти в адмін-панель з новим паролем!</h5>
                
                <button type="submit" className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`} disabled={isSubmitting}>
                    Змінити
                </button>
            </form>

            <Modal show={showModal} onHide={handleClose} dialogClassName="modal-custom">
                <Modal.Header>
                    <Modal.Title>Валідація:</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextChangePaswordAdmins }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangePaswordAdminsForm;