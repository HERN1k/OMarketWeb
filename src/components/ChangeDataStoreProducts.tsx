import { ChangeEvent, FC, useState } from "react";
import { IProductsFormProps } from "../types/Props.interface";
import styles from "../styles/Form.module.css";
import { ITypeProductFrom } from "../types/Form.interface";
import { ITypeProductData } from "../types/Response.interface";
import { 
    fetchTypeProductWithStoreIdAsync,
    fetchChangeDataStoreProductStatusAsync
 } from "../code/Requests";
import { Product } from "../types/Type.type";
import { toUAH } from "../code/Application";

const ChangeDataStoreProducts: FC<IProductsFormProps> = ({ productTypes, showLoader, hideLoader }) => {

    const [products, setProducts] = useState<Product[]>([]);

    const [currentType, setCurrentType] = useState<string | null>(null);

    const [pageCount, setPageCount] = useState<number>(1);

    const [totalQuantity, setTotalQuantity] = useState<number>(0);

    const [currentPage, setCurrentPage] = useState(1);

    const onSubmit: (data: ITypeProductFrom) => Promise<void> = async (data) => {
        showLoader();
        const res: ITypeProductData = await fetchTypeProductWithStoreIdAsync(data);
        setProducts(res.products);
        setPageCount(res.pageCount);
        setTotalQuantity(res.totalQuantity);
        setCurrentPage(data.page)
        hideLoader();
    };

    const handleNextPage = async () => {
        if (currentPage < pageCount) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            await fetchProducts(newPage);
        }
    };
    
    const handlePreviousPage = async () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            await fetchProducts(newPage);
        }
    };

    const fetchProducts = async (page: number) => {
        if (currentType) {
            const typeId = currentType;
            const data: ITypeProductFrom = { typeId, page };
            await onSubmit(data);
        }
    };

    const toggleCurrentType = async (e: ChangeEvent<HTMLSelectElement>) => {
        setCurrentType(e.target.value);
        setCurrentPage(1);
        if (e.target.value) {
            const typeId = e.target.value;
            const page = 1;
            const data: ITypeProductFrom = { typeId, page };
            await onSubmit(data);
        }
    }

    const fetchProductsRefresh: () => Promise<void> = async () => {
        const typeId = currentType == null ? productTypes[0].typeId : currentType ;
        const data: ITypeProductFrom = { typeId, page: 1 };
        const res: ITypeProductData = await fetchTypeProductWithStoreIdAsync(data);
        setProducts(res.products);
        setPageCount(res.pageCount);
        setTotalQuantity(res.totalQuantity);
        setCurrentPage(data.page)
        if (res.totalQuantity == 0) {
            alert("Тут пусто.");
        }
    }

    const inStore: (status: boolean) => JSX.Element = (status) => {
        return status 
        ? <h5 style={{ color: "rgba(0, 230, 215, 0.9)" }}>В продажу</h5>
        : <h5 style={{ color: "rgba(255, 90, 100, 0.9)" }}>Немає в продажу</h5>;
    }

    const changeStatus: (productId: string) => Promise<void> = async (productId) => {
        showLoader();
        const res: boolean = await fetchChangeDataStoreProductStatusAsync(productId);
        if (res) {
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId
                        ? { ...product, status: !product.status }
                        : product
                )
            );
        }
        hideLoader();
    }

    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Перелік товарів</h2>

            <div className={styles.selectedContainer}>
                <label>Тип товару</label>

                <select defaultValue="" onChange={toggleCurrentType}>
                    {productTypes?.map((type) => (
                        <option key={type.typeId} value={type.typeId}>
                            {type.type}
                        </option>))}
                </select>
            </div>

            <h3 className={styles.productQuantity}>Кількість товарів: {totalQuantity}</h3>

            {products?.map((product) => (
                <div key={product.id} className={styles.productContainer}>
                    <h1 className={styles.productText}><span>ID:</span> {product.id}</h1>
                    <h1 className={styles.productName}><span>Назва:</span> {product.name}, {product.dimensions}</h1>
                    <h1 className={styles.productText}><span>Ціна:</span> {toUAH(product.price)}</h1>
                    <h1 className={styles.productText}><span>Тип:</span> {product.type}</h1>
                    <h1 className={styles.productText}><span>Під-тип:</span> {product.underType}</h1>
                    <h1 className={styles.productText}><span>Опис:</span> {product.description}</h1>
                    <h1 className={styles.productStatus}><span>Статус:</span> {inStore(product.status)}</h1>
                    <button onClick={() => changeStatus(product.id)}
                        className={styles.changeProductStatusButton}>
                        Змінити статус
                    </button>
                </div>))}

            <div className={styles.pagination}>
                <button className={styles.submit} onClick={fetchProductsRefresh}>⭮</button> 

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
    );
}

export default ChangeDataStoreProducts;