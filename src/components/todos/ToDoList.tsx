import {useRecoilValue} from "recoil";
import {toDoSelector, viewState} from "../../atoms";

import CreateWork from "./CreateWork";
import CategoryTabs from "./CategoryTabs";
import ToDoItem from "./ToDoItem";
import AddCategory from "./AddCategory";

import styled from "styled-components";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const ViewSection = styled.ul`
  width: 80%;
  margin-top: 2.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
`
function ToDoList(){
    const toDos = useRecoilValue(toDoSelector);
    const view = useRecoilValue(viewState);

    return (
        <Wrapper>
            <CreateWork />
            <CategoryTabs />
            <ViewSection>{
                "addCategory" ===  view?.v
                    ? <AddCategory/>
                    : toDos.map(todo=>(
                        <ToDoItem key={todo.id} {...todo} />
                    ))
            }
            </ViewSection>
        </Wrapper>
    )
}
export default ToDoList;