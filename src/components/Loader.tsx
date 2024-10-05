import { FC } from "react";
import "../styles/Loader.css";

interface LoaderProps {
    loading: boolean;
}

const Loader: FC<LoaderProps> = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="loader-container">
            <div className="loader">
                <div id="shadow"></div>
                <div id="box"></div>
            </div>
        </div>
    );
};

export default Loader;