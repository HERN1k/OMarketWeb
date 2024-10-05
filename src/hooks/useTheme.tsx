import { useState, useEffect } from "react";
import { handleMainThemeChange } from "../code/Application.ts";

const useTheme = () => {

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme") ?? "light";
    return savedTheme;
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    handleMainThemeChange(theme);
  }, [theme]);

  return { checked: theme === "light" ? true : false, toggleTheme };
};

export default useTheme;