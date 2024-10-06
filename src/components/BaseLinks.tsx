import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/BurgerMenu.css";
import { toggleMenuLink } from "../code/Application";

const BaseLinks: FC = () => {

    return (
        <>
            <Link onClick={toggleMenuLink} className="link-item" to={"profile"}>Профіль</Link>
            <Link onClick={toggleMenuLink} className="link-item" to={"stores-base"}>Магазин</Link> 
            <Link onClick={toggleMenuLink} className="link-item" to={"base-products"}>Товари</Link> 
            <Link onClick={toggleMenuLink} className="link-item" to={"base-reviews"}>Відгуки</Link>
            <Link onClick={toggleMenuLink} className="link-item" to={"customers"}>Клієнти</Link>
            <Link onClick={toggleMenuLink} className="link-item" to={"logout"}>Вихід</Link> 
        </>
    );
}

export default BaseLinks;