import { Outlet } from "react-router-dom";

import ThemeMode from "../common/ThemeMode";

function ThemeModeLayout() {
    return (
        <>
            <ThemeMode />
            <Outlet />
        </>
    )
}

export default ThemeModeLayout;
