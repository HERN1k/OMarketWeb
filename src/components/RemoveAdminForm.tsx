import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import styles from "../styles/Form.module.css";
import { IAdminFormProps } from "../types/Props.interface";
import { fetchRemoveAdminAsync } from "../code/Requests";
import { modalTextRemoveAdmin } from "../code/Texts";
import { IRemoveAdminForm } from "../types/Form.interface";

const RemoveAdminForm: FC<IAdminFormProps> = ({ admins, showLoader, hideLoader }) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const { register, handleSubmit, formState: { 
        errors,
        isSubmitting
    }} = useForm<IRemoveAdminForm>({mode: "all"});
 
    const onSubmit: SubmitHandler<IRemoveAdminForm> = async (data) => {
        showLoader();
        const res: boolean = await fetchRemoveAdminAsync(data);
        if (res)
        {
            alert("Адміністратора успішно видалено!");
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

                <h2 className={styles.title}>Видалити адміністратора</h2>

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

                <h5 className={styles.warning}><span>Увага:</span> Під час видалення адміністратора, будуть каскадно видалені всі пов'язані з ним дані!</h5>
                
                <button type="submit" className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`} disabled={isSubmitting}>
                    Видалити
                </button>
            </form>

            <Modal show={showModal} onHide={handleClose} dialogClassName="modal-custom">
                <Modal.Header>
                    <Modal.Title>Валідація:</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextRemoveAdmin }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemoveAdminForm;