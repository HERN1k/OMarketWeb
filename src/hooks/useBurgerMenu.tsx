import { useState } from "react";

const useBurgerMenu = () => {
    const [authorized, setAuthorized] = useState<boolean>(localStorage.getItem("login") == undefined)

    return { authorized, setAuthorized };
};

export default useBurgerMenu;