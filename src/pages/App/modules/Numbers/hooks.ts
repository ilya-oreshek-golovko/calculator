import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addNumber, calculateResult, completePowInput, completeTrigonometricInput, handlePowInput, handleTrigonometricInput } from "@/redux/CalculatorReducer/CalculatorReducer";
import { showMessage } from "@/redux/CalculatorReducer/ActionCreators";


function useClickManagement(){

    const isPowEntering = useAppSelector((state) => state.CalculatorReducer.isPowEntering);
    const isDegreesEntering = useAppSelector((state) => state.CalculatorReducer.isDegreesEntering);
    const dispatch = useAppDispatch();

    const handleNumberInput = useCallback(function (userInput? : string){
      try{
  
        if(isPowEntering)          dispatch(handlePowInput({ newPower : userInput!}));
        else if(isDegreesEntering) dispatch(handleTrigonometricInput({ userInput : userInput!}));
        else                       dispatch(addNumber(userInput!));
  
      }catch(e : unknown){
        console.log("handleNumberInput", e);
        e instanceof Error && dispatch(showMessage(e.message));
      }
    }, [isPowEntering, isDegreesEntering]);
  
    const handleEnterInput = function(){
      try{
        if(isDegreesEntering){
          dispatch(completeTrigonometricInput());
          dispatch(showMessage("Degree input is completed", 3000));
        } else if(isPowEntering){
          dispatch(completePowInput());
          dispatch(showMessage("Pow input is completed", 3000));
        } else{
          dispatch(calculateResult());
        }
      }catch(e : unknown){
        console.log("handleEnterInput", e);
        e instanceof Error && dispatch(showMessage(e.message));
      }
    };

    return{
      handleNumberInput,
      handleEnterInput
    };
}

function useManualInputNumbers(numberClickHandler : Function, enterClickHandler : Function){

  const allowedInputKeys : string[] = useMemo(() => ["1","2","3","4","5","6","7","8","9","0"], []);

  const handleManualInput = useCallback(function (evt : KeyboardEvent){ 
    //console.log("useManualInputNumbers", evt.key);
    if(allowedInputKeys.includes(evt.key)) numberClickHandler(evt.key);
    else if(evt.key == "Enter") enterClickHandler(evt.key);

  }, [numberClickHandler, enterClickHandler]);

  useEffect(() => {
    document.addEventListener("keydown", handleManualInput);
    return () => document.removeEventListener("keydown", handleManualInput);
  }, [handleManualInput]);

}

export{
  useClickManagement,
  useManualInputNumbers
}