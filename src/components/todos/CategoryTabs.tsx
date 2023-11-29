import {useRecoilState, useSetRecoilState} from "recoil";
import {categoriesState, ICategory, toDoState, viewState} from "../../atoms";

import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";
const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 auto;
  width: 80%;
`;
const Tab = styled.div<{$isactive : boolean}>`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  background-color: ${props=>
     props.$isactive ? props.theme.tip : props.theme.bg
  };
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 1px 3px 2px;
  border-radius: 8px;
  padding: 10px;
  margin-right: 5px;
  cursor: pointer;
  color: ${(props) =>
    props.$isactive ? props.theme.accent : props.theme.toggle
  };
  a {
    display: block;
    padding: 7px;
  }
  &:hover{
    background-color: ${props=>props.theme.hvrbg};
  }
  &:last-child{
    margin-left: auto;
  }
`;
const DeleteBtn = styled.button<{$isactive:boolean}>`
  background-color: transparent;
  border: none;
  color : ${props=>props.theme.txt};
  &:hover{
    cursor: pointer;
    color: ${props=>props.theme.accent}
  }
  display: ${props=>props.$isactive ? "" : "none"};
`

function CategoryTabs(){
    const [categories, setCategories] = useRecoilState(categoriesState);
    const setTodos = useSetRecoilState(toDoState);
    const [view, setView] = useRecoilState(viewState);

    const onClick = ({l, v}:ICategory)=>{
        setView({l, v});
    }
    const onClickDelete = (evt:React.MouseEvent<HTMLButtonElement>) =>{
        if(window.confirm("Delete this category and all toDos...")){
            setCategories(prev=>{
                const idx = categories.findIndex(c=>(view.l === c.l)&&(view.v === c.v));
                const newCates = [...prev.slice(0, idx), ...prev.slice(idx+1)];
                localStorage.setItem("categories", JSON.stringify(newCates));
                return newCates;
            });
            setTodos(prev=>{
                const filtered = prev.filter(td=>(view.l !== td.category.l)&&(view.v !== td.category.v));
                localStorage.setItem("toDos", JSON.stringify(filtered));
                return filtered;
            });
            setView({
                l : "To Do",
                v : "TO_DO"
            });
        }
    }

    return (
        <Tabs>
            {
                categories.map(cate=>(
                    <Tab
                        key={cate.v}
                        $isactive={view.v === cate.v}
                        onClick={()=>onClick(cate)}
                    >
                        {cate.l}
                    </Tab>
                ))
            }
            <DeleteBtn
                $isactive={("TO_DO" !== view.v)
                    && ("DOING" !== view.v)
                    && ("DONE" !== view.v)
                    && ("addCategory" !== view.v)
            }
                onClick={onClickDelete}
            ><DeleteForeverIcon/></DeleteBtn>
            <Tab
                key={"addCategory"}
                $isactive={view.v === "addCategory"}
                onClick={()=>onClick({
                    l : "+",
                    v : "addCategory"
                })}
            >
                +
            </Tab>
        </Tabs>
    )
}

export default CategoryTabs;