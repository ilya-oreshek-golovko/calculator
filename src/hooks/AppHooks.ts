import { useEffect } from "react";
import { IUseManualInputManagement } from "@/types";
import {allowedInputKeys} from "@/data/globalData";
import {allowedOperations} from "@/data/globalData";

function useManualInputManagement({handleButtunInput, handleOperationInput, handleLastCharacterRemove, handleFullRemove, AppState} : IUseManualInputManagement){
    
    const handleManualInput = (evt : KeyboardEvent) => { 
        if(allowedInputKeys.includes(evt.key)){
            handleButtunInput(evt.key);
        }else if(allowedOperations.includes(evt.key)){
            handleOperationInput(evt.key);
        }else if(evt.key == "Backspace"){
            handleLastCharacterRemove();
        }else if(evt.key == "Delete"){
            handleFullRemove();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleManualInput);
        return () => document.removeEventListener("keydown", handleManualInput);
    }, [AppState]);
}


export {useManualInputManagement}