import { ChangeEvent, FC, useState } from "react";
import { IProductsFormProps } from "../types/Props.interface";
import styles from "../styles/Form.module.css";
import { ITypeProductFrom } from "../types/Form.interface";
import { ITypeProductData } from "../types/Response.interface";
import { fetchTypeProductAsync } from "../code/Requests";
import { Product } from "../types/Type.type";
import { toUAH } from "../code/Application";

const FindProductForm: FC<IProductsFormProps> = ({ productTypes, showLoader, hideLoader }) => {

    const [products, setProducts] = useState<Product[]>([]);

    const [currentType, setCurrentType] = useState<string | null>(null);

    const [pageCount, setPageCount] = useState<number>(1);

    const [totalQuantity, setTotalQuantity] = useState<number>(0);

    const [currentPage, setCurrentPage] = useState(1);

    const onSubmit: (data: ITypeProductFrom) => Promise<void> = async (data) => {
        showLoader();
        const res: ITypeProductData = await fetchTypeProductAsync(data);
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
        const res: ITypeProductData = await fetchTypeProductAsync(data);
        setProducts(res.products);
        setPageCount(res.pageCount);
        setTotalQuantity(res.totalQuantity);
        setCurrentPage(data.page)
        if (res.totalQuantity == 0) {
            alert("Тут пусто.");
        }
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
                </div>))}

            <div className={styles.pagination}>
                <button className={styles.submit} onClick={fetchProductsRefresh}>🔄</button>  

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

export default FindProductForm;