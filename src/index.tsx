import React from 'react';
import ReactDOM from 'react-dom/client';

import {RecoilRoot} from "recoil";

import ThemeProvider from "./context/ThemeProvider";

import App from './App';
import ModeToggle from "./components/ModeToggle";
import NomadCoders from "./components/NomadCoders";

import {QueryClient, QueryClientProvider} from "react-query";
const queryClient = new QueryClient();
//import 순서 유지

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <QueryClientProvider client={queryClient}>
        <RecoilRoot>
            <ThemeProvider>
                <ModeToggle />
                <App />
                <NomadCoders />
            </ThemeProvider>
        </RecoilRoot>
    </QueryClientProvider>
);

