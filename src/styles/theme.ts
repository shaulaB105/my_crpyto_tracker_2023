import {DefalutTheme} from "styled-components";
import {pallets} from "./pallets";

export const light:DefalutTheme = {
    bg : pallets.white.saints,
    hvrbg : pallets.white.christmas,
    txt : pallets.black.saints,
    accent : pallets.red.one,
    assist : pallets.white.base,
    toggle : "dark"
};

export const dark:DefalutTheme = {
    bg : pallets.black.abaddon,
    hvrbg : pallets.gray.tolvishdeep,
    txt : pallets.white.crowsilver,
    accent : pallets.blue.sora,
    assist : pallets.gray.leaderdeep,
    toggle : "light"
};
