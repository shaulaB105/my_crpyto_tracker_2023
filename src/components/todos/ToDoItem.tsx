import React from "react";

import {useRecoilValue, useSetRecoilState} from "recoil";
import {categoriesState, IToDo, toDoState, viewState} from "../../atoms";

import styled from "styled-components";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ToDoLi = styled.li`
  font-size: 18px;
  background-color: ${props=>props.theme.tip};
  box-shadow: rgba(60, 64, 67, 0.15) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 1px 3px 2px;
  width: 80%;
  padding: 20px;
  border-radius: 8px;
  transition: all .3s ease-in;
  
  display: flex;
  justify-content: space-between;
  
  &:hover{
    background-color: ${props=>props.theme.hvrbg};
  }
  span{
    display: flex;
    align-items: center;
  }
`
const RaúlBarreraSelect = styled.select`
  appearance: none;
  border: 0;
  outline: 0;

  padding: 10px;
  background: ${props=>props.theme.bg};
  color : ${props=>props.theme.txt};
  border-radius: 8px;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &::-ms-expand {
    display: none;
  }
  &:focus {
    outline: none;
  }
  option {
    color: inherit;
    background-color: var(--option-bg);
  }

  option[value="none"][disabled] {
    display: none;
  }
`

const DeleteBtn = styled.button`
  background-color: transparent;
  border: none;
  color : ${props=>props.theme.txt};
  &:hover{
    cursor: pointer;
    color: ${props=>props.theme.accent}
  }
`

function ToDoItem({txt, id, category}:IToDo){
    const categories = useRecoilValue(categoriesState);
    const view = useRecoilValue(viewState);
    const setTodos = useSetRecoilState(toDoState);

    const onInput = (evt:React.FormEvent<HTMLSelectElement>)=>{
        const {
            text,
            value
        } = evt.currentTarget.selectedOptions[0];
        if("none" === text)
            return;

        setTodos((prev)=>{
            const idx = prev.findIndex(prevTodo=> id === prevTodo.id);
            const newToDo = {
                txt,
                id,
                category : {
                    l : text,
                    v : value
                }
            }
            const changed = [...prev.slice(0, idx), newToDo, ...prev.slice(idx+1)];

            localStorage.setItem("toDos", JSON.stringify(changed));

            return changed;
        })

    };

    const onClick = (evt:React.MouseEvent<HTMLButtonElement>) =>{
        setTodos((prev)=>{
            const idx = prev.findIndex(prevTodo=> id === prevTodo.id);
            const removed = [...prev.slice(0, idx), ...prev.slice(idx+1)];

            localStorage.setItem("toDos", JSON.stringify(removed));

            return removed;
        })
    }

    return (
        <ToDoLi>
            <DeleteBtn onClick={onClick}><DeleteForeverIcon/></DeleteBtn>
            <span>{txt}</span>
            <RaúlBarreraSelect
                value={"none"}
                onInput={onInput}
            >
                <option
                    key={`${id}_none`}
                    value={"none"}
                    disabled
                >{category.l}</option>
                {
                    categories.map(cate=>(
                        (view.v !== cate.v) ? (
                            <option
                                key={`${id}_${cate.v}`}
                                value={cate.v}
                            >{cate.l}</option>
                        ) : null
                    ))
                }
            </RaúlBarreraSelect>
        </ToDoLi>
    )
}

export default ToDoItem;