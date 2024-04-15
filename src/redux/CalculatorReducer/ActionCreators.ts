import { AppDispatch } from "@redux/store";
import { showPopup, hidePopup, setTimeoutID } from "./CalculatorReducer";

const showMessage = (message : string, delay: number = 7000, description: string = "") => (dispatch : AppDispatch) => {

    dispatch(showPopup({title: message, description}));

    const timeoutID = setTimeout(() => {
        dispatch(hidePopup());
    }, delay);

    dispatch(setTimeoutID({timeoutID}));
}


export{
    showMessage
}