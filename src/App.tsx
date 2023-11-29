import React, {useEffect} from 'react';

import {createGlobalStyle, ThemeProvider} from "styled-components";
import {dark, light} from "./styles/theme";

import {useRecoilState} from "recoil";
import {isDarkState} from "./atoms";

import ToDoList from "./components/todos/ToDoList";
import ModeToggle from "./components/ModeToggle";
import NomadCoders from "./components/NomadCoders";

const GlobalStyle = createGlobalStyle`
  /* 
      http://meyerweb.com/eric/tools/css/reset/ 
      v2.0 | 20110126
      License: none (public domain)
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  *{
    box-sizing : border-box;
  }
  body {
    font-family: 'Noto Sans KR', 'Source Sans 3', sans-serif;
    background-color: ${props=>props.theme.bg};
    color: ${props=>props.theme.txt};
  }
  a {
    text-decoration: none;
    color:inherit;
  }
`

function App() {
    const [isDark, setIsDark] = useRecoilState(isDarkState);

    useEffect(()=>{
        const themeLocal = localStorage.getItem("theme");
        setIsDark(themeLocal
            ? ("dark" === themeLocal )
            : false
        );
    }, []);

    return (
        <>
            <GlobalStyle theme={isDark ? dark : light} />
            <ThemeProvider theme={isDark ? dark : light} >
                <ModeToggle />
                <ToDoList />
                <NomadCoders />
            </ThemeProvider>
        </>
    );
}

export default App;
