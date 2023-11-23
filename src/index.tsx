import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

import styled, {ThemeProvider} from "styled-components";
import {light, dark} from "./styles/theme";

import App from './App';

import {QueryClient, QueryClientProvider} from "react-query";
import {pallets} from "./styles/pallets";
const queryClient = new QueryClient();
//import 순서 유지


const ModeToggle = styled.button`
  border: none;
  text-transform: uppercase;
  position : fixed;
  padding : 10px;
  top : 20px;
  right : 30px;
  background-color: transparent;

  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all .1s linear;
  &:hover{
    font-size: 16px;
  }
`
const local =  window.localStorage.getItem("theme") || "light";
const [theme, setTheme] = useState(light);


const onClick = (evt:React.FormEvent<HTMLButtonElement>) => {
    console.log("test");
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <ModeToggle>{theme.toggle}</ModeToggle>
            <App />
        </ThemeProvider>
    </QueryClientProvider>
);

