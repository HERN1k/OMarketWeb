import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/BurgerMenu.css";
import { toggleMenuLink } from "../code/Application";

const SuperLinks: FC = () => {

    return (
        <>
            <Link onClick={toggleMenuLink} className="link-item" to={"profile"}>Профіль</Link>
            <Link onClick={toggleMenuLink} className="link-item" to={"cities"}>Міста</Link>
            <Link onClick={toggleMenuLink} className="link-item" to={"stores"}>Магазини</Link>
            <Link onClick={toggleMenuLink} className="link-item" to={"admins"}>Адміністратори</Link>
            <Link onClick={toggleMenuLink} className="link-item" to={"products"}>Товари</Link>
            <Link onClick={toggleMenuLink} className="link-item" to={"reviews"}>Відгуки</Link>
            <Link onClick={toggleMenuLink} className="link-item" to={"customers"}>Клієнти</Link>
            <Link onClick={toggleMenuLink} className="link-item" to={"logout"}>Вихід</Link>
        </>
    );
} 

export default SuperLinks;