import { useState } from "react";

const useMainTitle = () => {

    const [title, setTitle] = useState(() => {
        const savedTitle = localStorage.getItem("login") ?? "Admin Panel";
        return savedTitle;
    });

    return { title, setTitle };
}

export default useMainTitle;