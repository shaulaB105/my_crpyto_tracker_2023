import {useForm} from "react-hook-form";

import {useRecoilValue, useSetRecoilState} from "recoil";
import {toDoState, viewState} from "../../atoms";

import styled from "styled-components";

const WrapForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5em;
`
const InputSet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap : 10px;
`
const CreateInput = styled.input<{$isactive : boolean}>`
  font-weight: 600;
  border: none;
  background-color: ${props =>
      props.$isactive ? props.theme.assist : props.theme.bg
  };
  width: 60%;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
  padding: 10px;
  transition: all .15s ease-in;
  color : ${props => props.theme.txt};
  &::placeholder{
    font-weight: 400;
    font-style: italic;
    color : ${props => props.theme.toggle};
  }
  &:focus{
    outline: none;
    padding: 15px;
    font-size: 24px;
    width: 80%;
  }
`
const ErrorMSG = styled.span`
  color : ${props=>props.theme.accent};
  display: block;
  margin-top: 10px;
  font-size: 12px;
`
interface IForm{
    toDo : string;
}
function CreateWork(){
    const setToDos = useSetRecoilState(toDoState);
    const view = useRecoilValue(viewState);

    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue
    } = useForm<IForm>();
    const addWork = ({toDo}:IForm) => {
        setToDos((prev)=>[
            {
                txt :toDo,
                id: Date.now(),
                category: view
            }, ...prev]);
        setValue("toDo", "");
    }
    return (
        <WrapForm onSubmit={handleSubmit(addWork)}>
            <InputSet>
                <CreateInput
                    {...register("toDo",{
                        required : "Please write a to do"
                    })}
                    placeholder={"Write a to do..."}
                    disabled={"addCategory" === view.v}
                    $isactive={"addCategory" !== view.v}
                />
            </InputSet>
            <ErrorMSG>{errors?.toDo?.message}</ErrorMSG>
        </WrapForm>
    )
}

export default CreateWork;