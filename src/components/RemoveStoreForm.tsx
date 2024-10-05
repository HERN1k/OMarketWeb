import { FC, useState } from "react";
import { IStoresFormProps } from "../types/Props.interface";
import styles from "../styles/Form.module.css";
import { Modal, Button } from "react-bootstrap";
import { IRemoveStoreForm } from "../types/Form.interface"
import { SubmitHandler, useForm } from "react-hook-form"
import { modalTextRemoveStore } from "../code/Texts"
import { fetchRemoveStoreAsync } from "../code/Requests"

const RemoveStoreForm: FC<IStoresFormProps> = ({ stores, showLoader, hideLoader }) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const { register, handleSubmit, formState: { 
        errors,
        isSubmitting
    }} = useForm<IRemoveStoreForm>({mode: "all"});

    const onSubmit: SubmitHandler<IRemoveStoreForm> = async (data) => {
        showLoader();
        const res: boolean = await fetchRemoveStoreAsync(data);
        if (res)
        {
            alert("Магазин успішно видалено!");
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

                <h2 className={styles.title}>Видалити магазин</h2>

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

                <h5 className={styles.warning}><span>Увага:</span> Під час видалення магазину, будуть каскадно видалені всі пов'язані з ним дані!</h5>

                <button type="submit" className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`} disabled={isSubmitting}>
                    Видалити
                </button>
            </form>

            <Modal show={showModal} onHide={handleClose} dialogClassName="modal-custom">
                <Modal.Header>
                    <Modal.Title>Валідація:</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextRemoveStore }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemoveStoreForm;