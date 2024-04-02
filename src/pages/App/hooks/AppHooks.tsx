import { ReactElement, useCallback, useEffect, useState } from "react";
import { IThirdPriorOperationProps, IUseManualInputManagement } from "@/types";
import {allowedInputKeys} from "@/data/globalData";
import {allowedOperations} from "@/data/globalData";
import { useAppSelector } from "@/redux/hooks";
import Popup from "@app-page/components/Popup/Popup";

function useManualInputManagement({handleButtunInput, handleOperationInput, handleLastCharacterRemove, handleFullRemove, AppState} : IUseManualInputManagement){
    
    // const handleManualInput = (evt : KeyboardEvent) => { 
    //     if(allowedInputKeys.includes(evt.key)){
    //         handleButtunInput(evt.key);
    //     }else if(allowedOperations.includes(evt.key)){
    //         handleOperationInput(evt.key);
    //     }else if(evt.key == "Backspace"){
    //         handleLastCharacterRemove();
    //     }else if(evt.key == "Delete"){
    //         handleFullRemove();
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener("keydown", handleManualInput);
    //     return () => document.removeEventListener("keydown", handleManualInput);
    // }, [AppState]);
}

function useDegreeInput(){

    const input = useAppSelector((state) => state.CalculatorReducer.input);
    const getCurrentDegree = () => {

        const degree = input.at(-1) as ReactElement;
        if(!degree || typeof degree != "object") return "";

        const {userInput} = degree["props"] as IThirdPriorOperationProps;

        // if(["sin", "cos", "tg"].includes(operation) == false) return ""; 

        return userInput;
    }

    const isDegreesEntering = useAppSelector((state) => state.CalculatorReducer.isDegreesEntering);
    const [degree, setDegree] = useState(isDegreesEntering ? "0" : ""); 

    useEffect(() => {
        isDegreesEntering && setDegree(getCurrentDegree())
    }, [isDegreesEntering, input]);
    
    const getMessageToRender = useCallback(() => {
        return degree.length == 3 ? `Result: ${degree}` : `Input(max: 3): ${degree}`;
    }, [degree]);

    const DegreeInput = () => {
        return(
            isDegreesEntering 
            ?
            <Popup messageToRender={getMessageToRender()} description={`*Press "Enter" to complete input`}/>
            :
            null
        )
    };

    return DegreeInput
}

export {useManualInputManagement, useDegreeInput}