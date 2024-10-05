import { ChangeEvent, FC, useState } from "react";
import { IProductsFormProps } from "../types/Props.interface";
import { modalTextChangeProductForm } from "../code/Texts";
import { Button, Modal } from "react-bootstrap";
import styles from "../styles/Form.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { IChangeProductFrom } from "../types/Form.interface"
import { fetchChangeProductAsync } from "../code/Requests";

const ChangeProductForm: FC<IProductsFormProps> = ({ showLoader, hideLoader}) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const [imageButton, setImageButton] = useState<string>("Додати фото");

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { 
        errors,
        isSubmitting
    }} = useForm<IChangeProductFrom>({
        mode: "all"
    });
    
    const onSubmit: SubmitHandler<IChangeProductFrom> = async (data) => {
        showLoader();
        const res: boolean = await fetchChangeProductAsync(data);
        if (!res) {
            hideLoader();
            return;
        }
        alert("Товар успішно змінено.");
        setImageButton("Додати фото");
        setImagePreview(null);
        reset();
        hideLoader();
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };

            reader.readAsDataURL(file);
            setImageButton("Змінити фото");
        }
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.buttonInfoContainer}>
                    <div onClick={handleShow} className={styles.buttonInfo}>?</div>
                </div>

                <h2 className={styles.title}>Зміна товару</h2>

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

                <div className={styles.inputContainerNotRequired}>
                    <input placeholder=" " {...register("name", { 
                            maxLength: {
                                value: 32,
                                message: "Це поле має бути не більше 32 символів"
                            },
                            minLength: {
                                value: 1,
                                message: "Це поле має бути не менше 1 символ"
                            }
                        })} /> 

                    <label>Назва</label>

                    <div className={styles.error}>
                        {errors?.name && <span>{errors.name.message}</span>}
                    </div>
                </div>

                <div className={styles.inputContainerNotRequired}>
                    <input placeholder=" " type="text" {...register("price", {
                            validate: (value) => {
                                if (String(value) === "" || value === undefined) return true;

                                return /^(0|[1-9]\d*)(\.\d{1,2})?$/.test(String(value)) || "Дані введені в невірному форматі";
                            }
                        })} /> 

                    <label>Ціна</label>

                    <div className={styles.error}>
                        {errors?.price && <span>{errors.price.message}</span>}
                    </div>
                </div>

                <div className={styles.inputContainerNotRequired}>
                    <input placeholder=" " {...register("dimensions", { 
                            maxLength: {
                                value: 32,
                                message: "Це поле має бути не більше 32 символів"
                            }
                        })} />

                    <label>Характеристика</label>

                    <div className={styles.error}>
                        {errors?.dimensions && <span>{errors.dimensions.message}</span>}
                    </div>
                </div>

                <div className={styles.inputContainerNotRequired}>
                    <input placeholder=" " {...register("description", { 
                            maxLength: {
                                value: 64,
                                message: "Це поле має бути не більше 64 символів"
                            }
                        })} />

                    <label>Опис</label>

                    <div className={styles.error}>
                        {errors?.description && <span>{errors.description.message}</span>}
                    </div>
                </div>

                <div className={styles.inputFileContainer}>
                    <input type="file"
                        id="fileChangeLabel"
                        accept=".jpg, .jpeg, .png, .webp"
                        onInput={handleFileChange}
                        {...register("file")} /> 
                    
                    <label htmlFor="fileChangeLabel">{imageButton}</label>
                    
                    <div className={styles.productPreviewContainer}>
                        {imagePreview && <img src={imagePreview} className={styles.productPreview} />}
                    </div>

                    <div className={styles.error}>
                        {errors?.file && <span>{errors.file.message}</span>}
                    </div>
                </div>

                <h5 className={styles.warning}><span>Зверніть увагу:</span> Нове фото може не відображатися відразу після зміни через кешування в Telegram!</h5>

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
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextChangeProductForm }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangeProductForm;