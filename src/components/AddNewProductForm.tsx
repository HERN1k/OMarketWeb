import { ChangeEvent, FC, useState } from "react";
import { IProductsFormProps } from "../types/Props.interface";
import { Button, Modal } from "react-bootstrap";
import styles from "../styles/Form.module.css";
import { modalTextAddNewProductForm } from "../code/Texts";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddNewProductFrom } from "../types/Form.interface";
import { fetchAddNewProductAsync } from "../code/Requests";
import { ProductUnderType } from "../types/Type.type";

const AddNewProductForm: FC<IProductsFormProps> = ({ productTypes, showLoader, hideLoader }) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const [underTypes, setUnderTypes] = useState<ProductUnderType[]>([]);

    const [imageButton, setImageButton] = useState<string>("Додати фото");

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { 
        errors,
        isSubmitting
    }} = useForm<IAddNewProductFrom>({
        mode: "all"
    });

    const onSubmit: SubmitHandler<IAddNewProductFrom> = async (data) => {
        showLoader();
        const res: boolean = await fetchAddNewProductAsync(data);
        if (!res) {
            hideLoader();
            return;
        }
        reset();
        setUnderTypes([]);
        setImageButton("Додати фото");
        setImagePreview(null);
        alert("Новий товар успішно додано.");
        hideLoader();
    };

    const handleSetUnderTypes = (e: ChangeEvent<HTMLSelectElement>) => {
        const typeId: string = e.target.value;

        const productType = productTypes.find(e => e.typeId == typeId)
        if (productType) {
            setUnderTypes(productType.underTypes);
        } else {
            setUnderTypes([]);
        }
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

    const validateFileSize: (fileList: FileList) => boolean = (fileList) => {
        const file = fileList[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 5) {
                return false;
            }
            return true;
        }

        return true;
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.buttonInfoContainer}>
                    <div onClick={handleShow} className={styles.buttonInfo}>?</div>
                </div>

                <h2 className={styles.title}>Додати новий товар</h2>

                <div className={styles.selectedContainer}>
                    <label>Тип товару</label>

                    <select {...register("typeId", { 
                                required: {
                                    value: true,
                                    message: "Це поле є обов'язковим"
                                }, 
                                pattern: {
                                    value: /^(?!\s*$).+/,
                                    message: "Це поле є обов'язковим"
                                } 
                            })} defaultValue="" onChange={handleSetUnderTypes}>
                        <option disabled={true} value="">⎯⎯⎯⎯⎯⎯</option>
                        {productTypes?.map((type) => (
                            <option key={type.typeId} value={type.typeId}>
                                {type.type}
                            </option>))}
                    </select>

                    <div className={styles.error}>
                        {errors?.typeId && <span>{errors.typeId.message}</span>}
                    </div>
                </div>

                <div className={styles.selectedContainer}>
                    <label>Під-тип товару</label>

                    <select {...register("underTypeId", { 
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
                        {underTypes.map((underType) => (
                            <option key={underType.underTypeId} value={underType.underTypeId}>
                                {underType.underType}
                            </option>))}
                    </select>

                    <div className={styles.error}>
                        {errors?.underTypeId && <span>{errors.underTypeId.message}</span>}
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <input required={true} {...register("name", { 
                            required: {
                                value: true,
                                message: "Це поле є обов'язковим"
                            },
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

                <div className={styles.inputContainer}>
                    <input required={true} type="text" {...register("price", { 
                            required: {
                                value: true,
                                message: "Це поле є обов'язковим"
                            },
                            validate: (value) => {
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
                    <input required={true}
                        type="file"
                        id="fileLabel"
                        accept=".jpg, .jpeg, .png, .webp"
                        onInput={handleFileChange}
                        {...register("file", { 
                            required: {
                                value: true,
                                message: "Це поле є обов'язковим"
                            },
                            validate: (value) => validateFileSize(value) || "Файл не повинен перевищувати 5 МБ."
                            })} /> 
                    
                    <label htmlFor="fileLabel">{imageButton}</label>
                    
                    <div className={styles.productPreviewContainer}>
                        {imagePreview && <img src={imagePreview} className={styles.productPreview} />}
                    </div>

                    <div className={styles.error}>
                        {errors?.file && <span>{errors.file.message}</span>}
                    </div>
                </div>

                <button type="submit"
                    className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`}
                    disabled={isSubmitting}>
                    Додати
                </button> 
            </form>

            <Modal show={showModal} onHide={handleClose} dialogClassName="modal-custom">
                <Modal.Header>
                    <Modal.Title>Валідація:</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextAddNewProductForm }}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewProductForm;