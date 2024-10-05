import { FC } from "react";
import useTheme from "../hooks/useTheme.tsx";
import "../styles/ThemeSwitcher.css";

const ThemeSwitcher: FC = () => {

    const { checked, toggleTheme } = useTheme();

    return (
    <div className="mainContainer">
        <input  className="input" 
                type="checkbox" 
                id="ThemeSwitcherToggle" 
                checked={checked} 
                onChange={toggleTheme}/>
        <label className="label" htmlFor="ThemeSwitcherToggle"></label>
    </div>
    );
}

export default ThemeSwitcher;