import Button from "@pages/App/components/Button/Button";
import styles from "@app-page/App.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearState, setPow, setFactorial, setTrigonometric, setCommonOperation, setBrackets, removeDegreeCharacter, removeLastCharacter, completePowInput} from "@/redux/CalculatorReducer/CalculatorReducer";
import { MouseEvent, memo, useCallback } from "react";
import { showMessage } from "@/redux/CalculatorReducer/ActionCreators";

const Operations = () => {
  const dispatch = useAppDispatch();
  const isDegreesEntering = useAppSelector((state) => state.CalculatorReducer.isDegreesEntering);
  const isPowEntering = useAppSelector((state) => state.CalculatorReducer.isPowEntering);

  const handleBrackets = useCallback(function (evt : MouseEvent<HTMLButtonElement>){
    try{
      const bracket = evt.currentTarget.innerText;
      dispatch(setBrackets({bracket}));
    }catch(e : unknown){
      console.log("handleBrackets", e);
      e instanceof Error && dispatch(showMessage(e.message));
    }
  }, []);

  const handleLastCharacterRemove = useCallback(function (evt : MouseEvent<HTMLButtonElement>){
    try{
      if(isDegreesEntering) dispatch(removeDegreeCharacter());
      else if(isPowEntering) {
        dispatch(completePowInput());
        dispatch(showMessage("Pow input is completed", 3000));
      }
      else dispatch(removeLastCharacter());

    }catch(e : unknown){
      console.log("handleLastCharacterRemove", e);
      e instanceof Error && dispatch(showMessage(e.message));
    }
  }, [isDegreesEntering, isPowEntering]);

  const handleFullRemove = useCallback(function (evt : MouseEvent<HTMLButtonElement>){
    try{
      dispatch(clearState());
    }catch(e : unknown){
      console.log("handleFullRemove", e);
      e instanceof Error && dispatch(showMessage(e.message));
    }
  }, []);
  
  const handlePow = useCallback(function (evt : MouseEvent<HTMLButtonElement>){
    try{
      const powType = evt.currentTarget.innerText;
      dispatch(setPow({powType}));
    }catch(e : unknown){
      console.log("handlePow", e);
      e instanceof Error && dispatch(showMessage(e.message));
    }
  }, []);

  const handleFactorial = useCallback(function (evt : MouseEvent<HTMLButtonElement>){
    try{
      dispatch(setFactorial());
    }catch(e : unknown){
      console.log("handleFactorial", e);
      e instanceof Error && dispatch(showMessage(e.message));
    }
  }, []);

  const handleTrigonometric = useCallback(function (evt : MouseEvent<HTMLButtonElement>){
    try{
      const operationType = evt.currentTarget.innerText;
      dispatch(setTrigonometric({operationType}));
    }catch(e : unknown){
      console.log("handleTrigonometric", e);
      e instanceof Error && dispatch(showMessage(e.message));
    }
  }, []);

  const handleCommonOperations = useCallback(function (evt : MouseEvent<HTMLButtonElement>){
    try{
      const inputOperator = evt.currentTarget.innerText;
      dispatch(setCommonOperation({inputOperator}));
    }catch(e : unknown){
      console.log("handleCommonOperations", e);
      e instanceof Error && dispatch(showMessage(e.message));
    }
  }, []);


  return (
    <div className={styles["operations-block"]}>
        <Button text="/" onClick={handleCommonOperations}/>
        <Button text="*" onClick={handleCommonOperations}/>
        <Button text="-" onClick={handleCommonOperations}/>
        <Button text="+" onClick={handleCommonOperations}/>
        <Button text="DEL" onClick={handleLastCharacterRemove}/>
        <Button text="C" onClick={handleFullRemove}/>
        <Button text="X2" onClick={handlePow}/>
        <Button text="Xn" onClick={handlePow}/>
        <Button text="X!" onClick={handleFactorial}/>
        <Button text="sin" onClick={handleTrigonometric}/>
        <Button text="cos" onClick={handleTrigonometric}/>
        <Button text="tg" onClick={handleTrigonometric}/>
        <Button text="(" onClick={handleBrackets}/>
        <Button text=")" onClick={handleBrackets}/>
    </div>
  )
}

export default memo(Operations);