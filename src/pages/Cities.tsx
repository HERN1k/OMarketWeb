import { FC, useEffect, useState } from "react";
import AddNewCityForm from "../components/AddNewCityForm.tsx";
import CitiesForm from "../components/CitiesForm.tsx";
import Loader from "../components/Loader.tsx";
import useLoader from "../hooks/useLoader.tsx";
import styles from "../styles/Form.module.css";
import RemoveCityForm from "../components/RemoveCityForm.tsx";
import ChangeCityNameForm from "../components/ChangeCityNameForm.tsx";
import { City } from "../types/Type.type.ts";
import { fetchCitiesAsync } from "../code/Requests.ts";

const Cities: FC = () => { 

    const [cities, setCities] = useState<City[] | null>(null);

    const { loading, showLoader, hideLoader } = useLoader();

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
            const res: City[] = await fetchCitiesAsync();
            res.sort((a, b) => {
                return a.cityName.length - b.cityName.length;
            });
            setCities(res)
            hideLoader();
        }

        fetch();
    }, []);

    return(
        <div className={styles.container}>
            <CitiesForm cities={cities} 
                            setCities={setCities} 
                            showLoader={showLoader} 
                            hideLoader={hideLoader} />
            <AddNewCityForm cities={cities} 
                            setCities={setCities} 
                            showLoader={showLoader} 
                            hideLoader={hideLoader} />
            <ChangeCityNameForm cities={cities} 
                            setCities={setCities} 
                            showLoader={showLoader} 
                            hideLoader={hideLoader} />
            <RemoveCityForm cities={cities} 
                            setCities={setCities} 
                            showLoader={showLoader} 
                            hideLoader={hideLoader} />
            <Loader loading={loading} />
        </div>
    );
}

export default Cities;