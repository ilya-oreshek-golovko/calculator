import { AppDispatch } from "@redux/store";
import { setMessage } from "./CalculatorReducer";

const showMessage = (message : string, delay: number = 7000) => (dispatch : AppDispatch) => {

    dispatch(setMessage(message));

    setTimeout(() => {
        dispatch(setMessage(""));
    }, delay);
}


export{
    showMessage
}