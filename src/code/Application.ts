import { MouseEventHandler } from "react";

const preventDefault: (event: Event) => void = (event) => {
    event.preventDefault()
}

const toggleMenuImpl: () => void = () => {
    const menu = document.getElementById("BurgerMenuButton") as HTMLButtonElement;

    menu.classList.toggle("opened");
    menu.setAttribute("aria-expanded", menu.classList.contains("opened").toString());
  
    const menuContainer = document.getElementById("menuContainer");
  
    menuContainer?.classList.toggle("menu-main-opened");
  
    if (menu.classList.contains("opened")) {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", preventDefault);
      window.addEventListener("wheel", preventDefault, { passive: false });
      window.addEventListener("touchmove", preventDefault, { passive: false });
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", preventDefault);
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    }
}

export const setThemeAttribute: () => void = () => {
    const theme: string = localStorage.getItem("theme") ?? "light";

    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
}

export const addEventListenerToHeader: () => void = () => {
    
    let lastScrollTop = 0;
    const header = document.getElementById("header");

    window.addEventListener("scroll", function () {
        const currentScroll = document.documentElement.scrollTop;

        if (header == null)
            return

        if (currentScroll > lastScrollTop) {
            header.style.transform = "translateY(-100%)";
        } else {
            header.style.transform = "translateY(0)"; 
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}

export const handleMainThemeChange: (theme: string) => void = (theme) => {
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        const root = document.documentElement;

        root.style.setProperty("--neutral-0-color", "rgb(255, 255, 255)");
        root.style.setProperty("--neutral-100-color", "rgb(247, 248, 249)");
        root.style.setProperty("--neutral-200-color", "rgb(241, 242, 244)");
        root.style.setProperty("--neutral-300-color", "rgb(220, 223, 228)");
        root.style.setProperty("--neutral-400-color", "rgb(179, 185, 196)");
        root.style.setProperty("--neutral-500-color", "rgb(133, 144, 162)");
        root.style.setProperty("--neutral-600-color", "rgb(117, 129, 149)");
        root.style.setProperty("--neutral-700-color", "rgb(98, 111, 134)");
        root.style.setProperty("--neutral-800-color", "rgb(68, 84, 111)");
        root.style.setProperty("--neutral-900-color", "rgb(44, 62, 93)");
        root.style.setProperty("--neutral-1000-color", "rgb(23, 43, 77)");
        root.style.setProperty("--neutral-1100-color", "rgb(9, 30, 66)");
        root.style.setProperty("--neutral-100A-color", "rgba(9, 30, 66, 0.03)");
        root.style.setProperty("--neutral-200A-color", "rgba(9, 30, 66, 0.06)");
        root.style.setProperty("--neutral-300A-color", "rgba(9, 30, 66, 0.14)");
        root.style.setProperty("--neutral-400A-color", "rgba(9, 30, 66, 0.31)");
        root.style.setProperty("--neutral-500A-color", "rgba(9, 30, 66, 0.49)");
        root.style.setProperty("--accent-color", "rgb(255, 183, 230)");
        root.style.setProperty("--accent-color-A", "rgba(255, 183, 230, 0.75)");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        const root = document.documentElement;

        root.style.setProperty("--neutral-0-color", "rgb(22, 26, 29)");
        root.style.setProperty("--neutral-100-color", "rgb(29, 33, 37)");
        root.style.setProperty("--neutral-200-color", "rgb(34, 39, 43)");
        root.style.setProperty("--neutral-300-color", "rgb(44, 51, 58)");
        root.style.setProperty("--neutral-400-color", "rgb(69, 79, 89)");
        root.style.setProperty("--neutral-500-color", "rgb(89, 103, 115)");
        root.style.setProperty("--neutral-600-color", "rgb(115, 132, 150)");
        root.style.setProperty("--neutral-700-color", "rgb(140, 155, 171)");
        root.style.setProperty("--neutral-800-color", "rgb(159, 173, 188)");
        root.style.setProperty("--neutral-900-color", "rgb(182, 194, 207)");
        root.style.setProperty("--neutral-1000-color", "rgb(199, 209, 219)");
        root.style.setProperty("--neutral-1100-color", "rgb(222, 228, 234)");
        root.style.setProperty("--neutral-100A-color", "rgba(188, 214, 240, 0.04)");
        root.style.setProperty("--neutral-200A-color", "rgba(161, 189, 217, 0.08)");
        root.style.setProperty("--neutral-300A-color", "rgba(166, 197, 226, 0.16)");
        root.style.setProperty("--neutral-400A-color", "rgba(191, 219, 248, 0.28)");
        root.style.setProperty("--neutral-500A-color", "rgba(155, 180, 202, 0.5)");
        root.style.setProperty("--accent-color", "rgb(255, 120, 219)");
        root.style.setProperty("--accent-color-A", "rgba(255, 120, 219, 0.5)");
    }
}

export const handleThemeChange: (event: MediaQueryListEvent) => void = (event) => {
    if (event.matches) {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
        const root = document.documentElement;

        root.style.setProperty("--neutral-0-color", "rgb(255, 255, 255)");
        root.style.setProperty("--neutral-100-color", "rgb(247, 248, 249)");
        root.style.setProperty("--neutral-200-color", "rgb(241, 242, 244)");
        root.style.setProperty("--neutral-300-color", "rgb(220, 223, 228)");
        root.style.setProperty("--neutral-400-color", "rgb(179, 185, 196)");
        root.style.setProperty("--neutral-500-color", "rgb(133, 144, 162)");
        root.style.setProperty("--neutral-600-color", "rgb(117, 129, 149)");
        root.style.setProperty("--neutral-700-color", "rgb(98, 111, 134)");
        root.style.setProperty("--neutral-800-color", "rgb(68, 84, 111)");
        root.style.setProperty("--neutral-900-color", "rgb(44, 62, 93)");
        root.style.setProperty("--neutral-1000-color", "rgb(23, 43, 77)");
        root.style.setProperty("--neutral-1100-color", "rgb(9, 30, 66)");
        root.style.setProperty("--neutral-100A-color", "rgba(9, 30, 66, 0.03)");
        root.style.setProperty("--neutral-200A-color", "rgba(9, 30, 66, 0.06)");
        root.style.setProperty("--neutral-300A-color", "rgba(9, 30, 66, 0.14)");
        root.style.setProperty("--neutral-400A-color", "rgba(9, 30, 66, 0.31)");
        root.style.setProperty("--neutral-500A-color", "rgba(9, 30, 66, 0.49)");
        root.style.setProperty("--accent-color", "rgb(255, 183, 230)");
        root.style.setProperty("--accent-color-A", "rgba(255, 183, 230, 0.75)");
    } else {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
        const root = document.documentElement;

        root.style.setProperty("--neutral-0-color", "rgb(22, 26, 29)");
        root.style.setProperty("--neutral-100-color", "rgb(29, 33, 37)");
        root.style.setProperty("--neutral-200-color", "rgb(34, 39, 43)");
        root.style.setProperty("--neutral-300-color", "rgb(44, 51, 58)");
        root.style.setProperty("--neutral-400-color", "rgb(69, 79, 89)");
        root.style.setProperty("--neutral-500-color", "rgb(89, 103, 115)");
        root.style.setProperty("--neutral-600-color", "rgb(115, 132, 150)");
        root.style.setProperty("--neutral-700-color", "rgb(140, 155, 171)");
        root.style.setProperty("--neutral-800-color", "rgb(159, 173, 188)");
        root.style.setProperty("--neutral-900-color", "rgb(182, 194, 207)");
        root.style.setProperty("--neutral-1000-color", "rgb(199, 209, 219)");
        root.style.setProperty("--neutral-1100-color", "rgb(222, 228, 234)");
        root.style.setProperty("--neutral-100A-color", "rgba(188, 214, 240, 0.04)");
        root.style.setProperty("--neutral-200A-color", "rgba(161, 189, 217, 0.08)");
        root.style.setProperty("--neutral-300A-color", "rgba(166, 197, 226, 0.16)");
        root.style.setProperty("--neutral-400A-color", "rgba(191, 219, 248, 0.28)");
        root.style.setProperty("--neutral-500A-color", "rgba(155, 180, 202, 0.5)");
        root.style.setProperty("--accent-color", "rgb(255, 120, 219)");
        root.style.setProperty("--accent-color-A", "rgba(255, 120, 219, 0.5)");
    }
}

export const toggleMenu : MouseEventHandler<HTMLButtonElement> = () => toggleMenuImpl();

export const toggleMenuLink : MouseEventHandler<HTMLAnchorElement> = () => toggleMenuImpl();

export const toLocalDate: (dateString: string) => string = (dateString) => {
    const date = new Date(dateString);

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit', 
        month: 'short',
        year: 'numeric' 
    };
    
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const formattedDate = date.toLocaleDateString("uk-UA", dateOptions);
    const formattedTime = date.toLocaleTimeString("uk-UA", timeOptions);
    
    return `${formattedDate} ${formattedTime}`;
}