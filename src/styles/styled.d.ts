import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme{
        bg : string;
        hvrbg: string;
        txt : string;
        accent : string;
        assist : string;
        tip : string;
        toggle : string;
    }
}