import { Link } from "react-router-dom";
import { toggleMenuLink } from "../code/Application";
import { FC } from "react";
import "../styles/BurgerMenu.css";

const DefaultLinks: FC = () => {

    return (
        <>
            <Link onClick={toggleMenuLink} className="link-item" to={"login"}>Вхід</Link>
        </>
    );
}

export default DefaultLinks;