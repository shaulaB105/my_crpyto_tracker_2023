import {DefaultTheme} from "styled-components";
import {pallets} from "./pallets";
export const light:DefaultTheme = {
    bg : pallets.white.saints,
    hvrbg : pallets.white.christmas,
    txt : pallets.black.saints,
    accent : pallets.red.one,
    assist : pallets.white.base,
    tip : pallets.white.snowflower,
    toggle : pallets.gray.toggle,
    slctbg : pallets.white.crowsilver,
};
export const dark:DefaultTheme = {
    bg : pallets.black.abaddon,
    hvrbg : pallets.gray.tolvishdeep,
    txt : pallets.white.crowsilver,
    accent : pallets.blue.sora,
    assist : pallets.gray.leaderdeep,
    tip : pallets.gray.realdeep,
    toggle : pallets.gray.duhka,
    slctbg : pallets.white.saints,
};
