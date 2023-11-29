
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";
import {categoriesState} from "../../atoms";

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
const CreateInput = styled.input`
  font-weight: 600;
  border: none;
  background-color: ${props => props.theme.assist};
  width: 80%;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
  padding: 15px;
  transition: all .15s ease-in;
  color : ${props => props.theme.txt};
  font-size: 24px;
  &::placeholder{
    font-weight: 400;
    font-style: italic;
    color : ${props => props.theme.toggle};
  }
  &:focus{
    outline: none;
  }
`
const ErrorMSG = styled.span`
  color : ${props=>props.theme.accent};
  display: block;
  margin-top: 10px;
  font-size: 12px;
`
interface IForm{
    newCate : string;
}

function AddCategory(){
    const setCategories = useSetRecoilState(categoriesState);

    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue
    } = useForm<IForm>();
    const addWork = ({newCate}:IForm) => {
        setCategories((prev)=>{
            const added = [...prev, {
                l : newCate,
                v : newCate.replaceAll(" ", "_").toUpperCase()
            }];

            localStorage.setItem("categories", JSON.stringify(added));

            return added;
        });
        setValue("newCate", "");
    }


    return (
        <WrapForm onSubmit={handleSubmit(addWork)}>
            <InputSet>
                <CreateInput
                    {...register("newCate",{
                        required : "Please write new category label",
                        pattern:{
                            value:/^[A-Za-z0-9]+$/,
                            message:"Only eng and nums are accepted."
                        }
                    })}
                    placeholder={"Write new category label..."}
                />
            </InputSet>
            <ErrorMSG>{errors?.newCate?.message}</ErrorMSG>
        </WrapForm>
    );
}

export default AddCategory;