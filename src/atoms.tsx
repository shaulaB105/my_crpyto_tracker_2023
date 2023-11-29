import {atom, selector} from "recoil";

export const isDarkState = atom({
    key : "isDark",
    default : false
});

export interface ICategory{
    l : string,
    v : string
}
export const categoriesState = atom<ICategory[]>({
    key : "categories",
    default : [{
        l : "To Do",
        v : "TO_DO"
    }, {
        l : "Doing",
        v : "DOING"
    }, {
        l : "Done",
        v : "DONE"
    }]
});
export const categoriesSelector = selector({
    key : "categoriesSelector",
    get : ({get}) => {
        const categories = get(categoriesState);
        return categories.map(c=>c.v);
    }
});

export interface IToDo{
    txt : string,
    id : number,
    category : ICategory
}
export const toDoState = atom<IToDo[]>({
    key : "toDo",
    default : []
});
export const toDoSelector = selector({
    key : "toDoSelector",
    get : ({get}) => {
        const toDos = get(toDoState);
        const view = get(viewState);

        return [
            ...toDos.filter(todo=>view.v ===todo.category.v)
        ];
    }
});

export const viewState = atom<ICategory>({
    key : "view",
    default : {
        l : "To Do",
        v : "TO_DO"
    }
})