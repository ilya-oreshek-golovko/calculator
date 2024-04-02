import { MouseEvent, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addNumber, calculateResult, completePowInput, completeTrigonometricInput, handlePowInput, handleTrigonometricInput, setMessage } from "@/redux/CalculatorReducer/CalculatorReducer";
import { showMessage } from "@/redux/CalculatorReducer/ActionCreators";


function useClickManagement(){

    const isPowEntering = useAppSelector((state) => state.CalculatorReducer.isPowEntering);
    const isDegreesEntering = useAppSelector((state) => state.CalculatorReducer.isDegreesEntering);
    const dispatch = useAppDispatch();

    const handleNumberInput = useCallback(function (evt : MouseEvent<HTMLButtonElement>){
      try{
  
        if(isPowEntering)          dispatch(handlePowInput({ newPower : evt.currentTarget.innerText}));
        else if(isDegreesEntering) dispatch(handleTrigonometricInput({ userInput : evt.currentTarget.innerText}));
        else                       dispatch(addNumber(evt.currentTarget.innerText));
  
      }catch(e : unknown){
        console.log("handleNumberInput", e);
        e instanceof Error && dispatch(showMessage(e.message));
      }
    }, [isPowEntering, isDegreesEntering]);
  
    const handleEnterInput = useCallback(function(evt : MouseEvent<HTMLButtonElement>){
      try{
        if(isDegreesEntering){
          dispatch(completeTrigonometricInput());
        } else if(isPowEntering){
          dispatch(completePowInput());
          dispatch(showMessage("Pow input is completed", 3000));
        } else{
          dispatch(calculateResult())
        }
      }catch(e : unknown){
        console.log("handleEnterInput", e);
        e instanceof Error && dispatch(setMessage(e.message));
      }
    }, [isDegreesEntering, isPowEntering])

    return{
        handleNumberInput,
        handleEnterInput
    };
}

export{
    useClickManagement
}