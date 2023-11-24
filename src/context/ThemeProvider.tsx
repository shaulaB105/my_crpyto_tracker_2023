import React, {ReactNode} from "react";
import useTheme from "../hooks/useTheme";
import {ThemeProvider as StyledThemeProvider} from "styled-components";
import {light, dark} from "../styles/theme";

type Props = {
    children: ReactNode;
}

const defaultVal = {
    theme : "light",
    onChangeTheme: ()=>{},
}

export const ThemeContext = React.createContext(defaultVal);

function ThemeProvider({children}:Props){
    const themeProps = useTheme();

    return(
        <ThemeContext.Provider value={themeProps}>
            <StyledThemeProvider theme={themeProps.theme === "light" ? light : dark}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;