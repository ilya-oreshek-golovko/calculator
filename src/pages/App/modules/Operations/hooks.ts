import { useCallback, useEffect } from "react";

function useManualInputOperations(handleCommonOperations : Function, handleLastCharacterRemove : Function, handleFullRemove : Function, handleBrackets : Function,  handlePow : Function, handleFactorial : Function){

    const handleManualInput = useCallback(function (evt : KeyboardEvent){ 
      //console.log("useManualInputOperations", evt);
      if(evt.key == "/" || evt.key == "-" || (evt.shiftKey && evt.key == "+") || (evt.shiftKey && evt.key == "*")) handleCommonOperations(evt.key);
      else if(evt.key == "Backspace") handleLastCharacterRemove();
      else if(evt.key == "Delete") handleFullRemove();
      else if(evt.shiftKey && (evt.key == "(" || evt.key == ")")) handleBrackets(evt.key);
      else if(evt.shiftKey && evt.key == "^") handlePow("Xn");
      else if(evt.shiftKey && evt.key == "!") handleFactorial();
  
    }, []);
  
    useEffect(() => {
      document.addEventListener("keydown", handleManualInput);
      return () => document.removeEventListener("keydown", handleManualInput);
    }, []);
}

export{
    useManualInputOperations
}