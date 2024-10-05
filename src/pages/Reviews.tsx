import { FC, useState, useEffect } from "react";
import styles from "../styles/Form.module.css";
import useLoader from "../hooks/useLoader";
import Loader from "../components/Loader";
import { Review, Store } from "../types/Type.type";
import { IStoreReviewFrom } from "../types/Form.interface";
import { fetchBlockCustomerReviewsAsync, fetchRemoveStoreReviewAsync, fetchStoreReviewAsync, fetchStoresAsync } from "../code/Requests";
import { IStoreReviewData } from "../types/Response.interface";
import { toLocalDate } from "../code/Application";

const Reviews: FC = () => {

    const [stores, setStores] = useState<Store[] | null>(null);

    const [currentStore, setCurrentStore] = useState<string | null>(null);

    const [reviews, setReviews] = useState<Review[] | null>();

    const [pageCount, setPageCount] = useState<number>(1);

    const [totalQuantity, setTotalQuantity] = useState<number>(0);

    const [currentPage, setCurrentPage] = useState(1);

    const { loading, showLoader, hideLoader } = useLoader();

    const onSubmit: (data: IStoreReviewFrom) => Promise<void> = async (data) => {
        showLoader();
        const res: IStoreReviewData = await fetchStoreReviewAsync(data);
        setReviews(res.reviews);
        setPageCount(res.pageCount);
        setTotalQuantity(res.totalQuantity);
        setCurrentPage(data.page)
        hideLoader(); 
    };

    const handleNextPage = async () => {
        if (currentPage < pageCount) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            await fetchReviews(newPage);
        }
    };
    
    const handlePreviousPage = async () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            await fetchReviews(newPage);
        }
    };

    const fetchReviews = async (page: number) => {
        if (currentStore) {
            const storeId = currentStore;
            const data: IStoreReviewFrom = { storeId, page };
            await onSubmit(data);
        }
    };

    const toggleCurrentStore = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentStore(e.target.value);
        setCurrentPage(1);
        const storeId = e.target.value;
        const page = 1;
        const data: IStoreReviewFrom = { storeId, page };
        await onSubmit(data);
    }

    const fetchStoresOnStart: () => Promise<string | null> = async () => {
        const resStores: Store[] = await fetchStoresAsync();
        resStores.sort((a, b) => {
            return a.city.length - b.city.length;
        });
        setStores(resStores)
        setCurrentStore(resStores[0]?.id);
        return resStores[0]?.id;
    }

    const fetchReviewsOnStart: (storeId: string | null) => Promise<void> = async (storeId) => {
        if (storeId) {
            const data: IStoreReviewFrom = { storeId, page: currentPage };
            const resReviews: IStoreReviewData = await fetchStoreReviewAsync(data);
            setReviews(resReviews.reviews);
            setPageCount(resReviews.pageCount);
            setTotalQuantity(resReviews.totalQuantity);
            setCurrentPage(data.page)
        }
    }

    const fetchRemoveReview: (id: string) => Promise<void> = async (id) => {
        showLoader();
        const res: boolean = await fetchRemoveStoreReviewAsync(id);
        hideLoader();
        if (res) { 
            alert("Відгук успішно видалено!");
            await fetchReviews(currentPage);
        }
    }

    const fetchBlockReviews: (id: string) => Promise<void> = async (id) => {
        showLoader();
        const res: boolean = await fetchBlockCustomerReviewsAsync(id);
        hideLoader();
        if (res) { 
            alert("Додавання відгуків для цього клієнта успішно заблоковано!");
        }
    }

    useEffect(() => { 
        if (loading) { 
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [loading]);

    useEffect(() => {
        const fetch = async () => {
            showLoader();

            const storeId = await fetchStoresOnStart();
            
            await fetchReviewsOnStart(storeId);

            hideLoader();
        }

        fetch();
    }, [])
    
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h2 className={styles.title}>Відгуки</h2>

                <div className={styles.selectedContainer}>
                    <label>Магазин</label>

                    <select defaultValue="" onChange={toggleCurrentStore}>
                        {stores?.map((store) => (
                            <option key={store.id} value={store.id}>
                                {`${store.city} ${store.address}`}
                            </option>))}
                    </select>
                </div>

                <h3 className={styles.reviewQuantity}>Кількість відгуків: {totalQuantity}</h3>

                {reviews?.map((review) => (
                    <div key={review.id} className={styles.reviewContainer}>
                        <h1 className={styles.reviewTitle}>Дата: <span>{toLocalDate(review.createdAt)}</span></h1>
                        <h1 className={styles.reviewTitle}>ID користувача: <span>{review.customerId}</span></h1>
                        <h1 className={styles.reviewTitle}>Відгук: </h1>
                        <h2 className={styles.review}>{review.text}</h2>
                        <div className={styles.reviewButtonsBox}>
                            <button className={styles.reviewButton}
                                onClick={() => fetchRemoveReview(review.id)}>
                                Видалити відгук
                            </button>
                            <button className={styles.reviewButton}
                                onClick={() => fetchBlockReviews(review.customerId)}>
                                Заблокувати можливість додавати відгуки
                            </button>
                        </div>
                    </div>))}

                <div className={styles.pagination}>
                    <button className={`${styles.submit} ${currentPage === 1 ? styles.disabled : ""}`} 
                        onClick={handlePreviousPage} 
                        disabled={currentPage === 1}>
                        Назад
                    </button>
                    
                    <div className={styles.currentPage}><h3><span>Стр:</span> {currentPage}</h3></div>

                    <button className={`${styles.submit} ${currentPage >= pageCount ? styles.disabled : ""}`} 
                        onClick={handleNextPage} 
                        disabled={currentPage >= pageCount}>
                        Вперед
                    </button>
                </div>
            </div>

            <Loader loading={loading} />
        </div>
    );
}

export default Reviews;