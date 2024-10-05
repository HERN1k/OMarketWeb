import { FC, useEffect, useState } from "react";
import useLoader from "../hooks/useLoader";
import Loader from "../components/Loader";
import styles from "../styles/Form.module.css";
import { ICustomerFrom } from "../types/Form.interface"
import { SubmitHandler, useForm } from "react-hook-form";
import { modalTextCustomers } from "../code/Texts";
import { Button, Modal } from "react-bootstrap";
import { Customer } from "../types/Type.type";
import { 
    fetchBlockCustomerOrdersAsync,
    fetchBlockCustomerReviewsAsync,
    fetchGetCustomerByIdAsync, 
    fetchGetCustomerByPhoneNumberAsync, 
    fetchUnBlockCustomerOrdersAsync, 
    fetchUnBlockCustomerReviewsAsync
} from "../code/Requests";
import { toLocalDate } from "../code/Application";

const Customers: FC = () => {

    const [customer, setCustomer] = useState<Customer | null>(null);

    const [showModal, setShowModal] = useState<boolean>(false);
    
    const { loading, showLoader, hideLoader } = useLoader();

    const { register, handleSubmit, reset, formState: { 
        errors,
        isSubmitting
    }} = useForm<ICustomerFrom>({
        mode: "all"
    });

    const onSubmit: SubmitHandler<ICustomerFrom> = async (data) => {
        showLoader();
        if (data.option === "id") {
            const cust: Customer | null | undefined = await fetchGetCustomerByIdAsync(data.customer);
            if (cust) { 
                setCustomer(cust);
                reset();
            } else {
                setCustomer(null);
                alert("Такого клієнта не знайдено.");
            }
        } else if (data.option === "phoneNumber") {
            const cust: Customer | null | undefined = await fetchGetCustomerByPhoneNumberAsync(data.customer);
            if (cust) { 
                setCustomer(cust);
                reset();
            } else {
                setCustomer(null);
                alert("Такого клієнта не знайдено.");
            }
        } else {
            alert("Сталась помилка.");
        }
        hideLoader();
    };

    const fetchBlockReviews: () => Promise<void> = async () => {
        if (customer) {
            showLoader();
            const res: boolean = await fetchBlockCustomerReviewsAsync(String(customer.id));
            if (res) {
                const cust: Customer | null | undefined = await fetchGetCustomerByIdAsync(String(customer.id));
                if (cust) { 
                    setCustomer(cust);
                } else {
                    setCustomer(null);
                    alert("Помилка оновлення клієнта.");
                }
            }
            hideLoader();
        }
    };

    const fetchUnBlockReviews: () => Promise<void> = async () => {
        if (customer) {
            showLoader();
            const res: boolean = await fetchUnBlockCustomerReviewsAsync(String(customer.id));
            if (res) {
                const cust: Customer | null | undefined = await fetchGetCustomerByIdAsync(String(customer.id));
                if (cust) { 
                    setCustomer(cust);
                } else {
                    setCustomer(null);
                    alert("Помилка оновлення клієнта.");
                }
            }
            hideLoader();
        }
    };

    const fetchBlockOrders: () => Promise<void> = async () => {
        if (customer) {
            showLoader();
            const res: boolean = await fetchBlockCustomerOrdersAsync(String(customer.id));
            if (res) {
                const cust: Customer | null | undefined = await fetchGetCustomerByIdAsync(String(customer.id));
                if (cust) { 
                    setCustomer(cust);
                } else {
                    setCustomer(null);
                    alert("Помилка оновлення клієнта.");
                }
            }
            hideLoader();
        }
    };

    const fetchUnBlockOrders: () => Promise<void> = async () => {
        if (customer) {
            showLoader();
            const res: boolean = await fetchUnBlockCustomerOrdersAsync(String(customer.id));
            if (res) {
                const cust: Customer | null | undefined = await fetchGetCustomerByIdAsync(String(customer.id));
                if (cust) { 
                    setCustomer(cust);
                } else {
                    setCustomer(null);
                    alert("Помилка оновлення клієнта.");
                }
            }
            hideLoader();
        }
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        if (loading) { 
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [loading]);
    
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.buttonInfoContainer}>
                    <div onClick={handleShow} className={styles.buttonInfo}>?</div>
                </div>

                <h2 className={styles.title}>Пошук клієнта</h2>

                <div className={styles.inputContainer}>
                    <input required={true} {...register("customer", { 
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
                                message: "Це поле має бути не менше 1 символів"
                            },
                            pattern: {
                                value: /^\+?\d+$/, 
                                message: "Дані введені в невірному форматі"
                            }
                        })} />

                    <label>Клієнт</label>

                    <div className={styles.error}>
                        {errors?.customer && <span>{errors.customer.message}</span>}
                    </div>
                </div>

                <div className={styles.inputRadioContainer}>
                    <div className={styles.radioItem}>
                        <input id="inputRadio1" type="radio" value="id" {...register("option", { 
                                required: {
                                    value: true,
                                    message: "Виберіть один із варіантів"
                                }})} />
                        <label htmlFor="inputRadio1">Пошук за ID клієнта</label>
                    </div>

                    <div className={styles.radioItem}>
                        <input id="inputRadio2" type="radio" value="phoneNumber" {...register("option", { 
                                required: {
                                    value: true,
                                    message: "Виберіть один із варіантів"
                                }})} />
                        <label htmlFor="inputRadio2">Пошук за номером телефону</label>
                    </div>

                    <div className={styles.error}>
                        {errors?.option && <span>{errors.option.message}</span>}
                    </div>
                </div>

                <button type="submit"
                    className={`${styles.submit} ${isSubmitting ? styles.loading : ""}`}
                    disabled={isSubmitting}>
                    Знайти
                </button> 
            </form>

            <div className={styles.form}>
                <h2 className={styles.title}>Результат пошуку</h2>

                { customer 
                ? <div className={styles.сustomerConteiner}>
                    <h1 className={styles.сustomerTitle}>
                        <span>ПІБ:</span> {customer.firstName} {customer.lastName}
                    </h1>
                    <h1 className={styles.сustomerTitle}>
                        <span>Username:</span> {customer.username}
                    </h1>
                    <h1 className={styles.сustomerTitle}>
                        <span>Номером телефону:</span> {customer.phoneNumber}
                    </h1>
                    <h1 className={styles.сustomerTitle}>
                        <span>Обраний магазин:</span> {customer.storeAddress}
                    </h1>
                    <h1 className={styles.сustomerTitle}>
                        <span>Дата реєстрації:</span> {toLocalDate(customer?.createdAt ?? "")}
                    </h1>
                    <h1 className={styles.сustomerTitle}>
                        <span>Відгуки заблоковані:</span> {customer.blockedReviews ? "так" : "ні"}
                    </h1>
                    <h1 className={styles.сustomerTitle}>
                        <span>Замовлення заблоковані:</span> {customer.blockedOrders ? "так" : "ні"}
                    </h1>

                    <div className={styles.blockedCustomerButtonContainer}>
                        { customer.blockedReviews 
                        ? <button className={styles.blockedCustomerButton}
                                onClick={fetchUnBlockReviews}>
                            Розблокувати можливість додавати відгуки
                        </button> 
                        : <button className={styles.blockedCustomerButton}
                                onClick={fetchBlockReviews}>
                            Заблокувати можливість додавати відгуки
                        </button> }

                        { customer.blockedOrders
                        ? <button className={styles.blockedCustomerButton}
                                onClick={fetchUnBlockOrders}>
                            Розблокувати можливість робити замовлення
                        </button> 
                        : <button className={styles.blockedCustomerButton}
                                onClick={fetchBlockOrders}>
                            Заблокувати можливість робити замовлення
                        </button> }
                    </div>
                </div> 
                : <div className={styles.сustomerConteiner}></div> }
            </div>

            <Modal show={showModal} onHide={handleClose} dialogClassName="modal-custom">
                <Modal.Header>
                    <Modal.Title>Валідація:</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: modalTextCustomers }}/>
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

export default Customers;