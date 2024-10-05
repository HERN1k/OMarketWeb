import { FC, useState } from "react";
import { IProductsFormProps } from "../types/Props.interface";
import styles from "../styles/Form.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { modalTextRemoveProductForm } from "../code/Texts";
import { Button, Modal } from "react-bootstrap";
import { IRemoveProductFrom } from "../types/Form.interface";
import { fetchRemoveProductAsync } from "../code/Requests";

const RemoveProductForm: FC<IProductsFormProps> = ({ showLoader, hideLoader}) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const { register, handleSubmit, formState: { 
        errors,
        isSubmitting
    }} = useForm<IRemoveProductFrom>({
        mode: "all"
    });
    
    const onSubmit: SubmitHandler<IRemoveProductFrom> = async (data) => {
        showLoader();
        const res: boolean = await fetchRemoveProductAsync(data);
        if (res) {
            alert("Товар успішно видалено.");
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

                <h2 className={styles.title}>Видалення товару</h2>

                <div className={styles.inputContainer}>
                    <input required={true} type="text" {...register("productId", { 
                            required: {
                                value: true,
                                message: "Це поле є обов'язковим"
                            }
                        })} /> 

                    <label>ID товару</label>

                    <div className={styles.error}>
                        {errors?.productId && <span>{errors.productId.message}</span>}
                    </div>
                </div>

                <h5 className={styles.warning}><span>Увага:</span> Під час видалення товару, будуть каскадно видалені всі пов'язані з ним дані!</h5>

                <button type="submit"
                    className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`}
                    disabled={isSubmitting}>
                    Видалити
                </button> 
            </form>

            <Modal show={showModal} onHide={handleClose} dialogClassName="modal-custom">
                <Modal.Header>
                    <Modal.Title>Валідація:</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextRemoveProductForm }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemoveProductForm;