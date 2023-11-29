import {useRecoilState} from "recoil";
import {isDarkState} from "../atoms";

import styled from "styled-components";
import React from "react";

const WrapToggle = styled.label`
  position: fixed;
  top: 20px;
  right: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const ToggleInput = styled.input`
  appearance: none;
  
  position: relative;

  border: 2px solid ${props => props.theme.toggle};
  border-radius: 1.5em;
  width: 3em;
  height: 1.5em;

  transition: all .1s linear;
  &:hover{
    box-shadow: rgba(0, 0, 0, .2) 0px 0px 0px 2px;
  }
  &::before{
    content : "";
    position: absolute;
    left : 0;
    width: 1.19em;
    height: 1.19em;
    border-radius: 50%;
    transform: scale(.8);
    background-color: ${props => props.theme.toggle};
    transition: left .15s linear;
  }
  &:checked::before{
    background-color: ${props => props.theme.toggle};
    left: 1.5em;
  }
  &:checked{
    border: 2px solid ${props => props.theme.toggle};
  }
`

function ModeToggle(){
    const [isDark, setIsDark] = useRecoilState(isDarkState);
    const onChange = (evt:React.FormEvent<HTMLInputElement>) => {
        localStorage.setItem("theme", evt.currentTarget.checked ? "dark" : "light");
        setIsDark(evt.currentTarget.checked);
    }

    return(
        <WrapToggle>
            <ToggleInput
                role="switch"
                type="checkbox"
                onChange={onChange}
                checked = {isDark}
            />
        </WrapToggle>
    )
}

export default ModeToggle;