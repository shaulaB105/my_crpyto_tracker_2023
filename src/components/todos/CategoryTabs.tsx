import {useRecoilState, useRecoilValue} from "recoil";
import {categoriesState, ICategory, viewState} from "../../atoms";

import styled from "styled-components";
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
function CategoryTabs(){
    const categories = useRecoilValue(categoriesState);
    const [view, setView] = useRecoilState(viewState);

    const onClick = ({l, v}:ICategory)=>{
        setView({l, v});
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