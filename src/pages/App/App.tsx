import {useState} from "react";
import styles from "./App.module.scss";
import Button from "@app-page/components/Button/Button";
import { IAppState, TPow } from "@/types";
import { useManualInputManagement } from "@/hooks/AppHooks";
import { allowedOperations } from "@data/globalData";
import Popup from "@app-page/components/Popup/Popup";
import { ParserError, PrioritiesError } from "@data/errors";
import ThirdPriorOperation from "@app-page/components/Operation/ThirdPriorOperation";

const l = (mes : any) => console.log(mes);

export default function App() {

  
  const [state, setState] = useState<IAppState>({
    input: [],
    result: "",
    isPowEntering: false,
    errorMessage: ""
  });

  useManualInputManagement({
    handleButtunInput, handleOperationInput, handleLastCharacterRemove, handleFullRemove, AppState: state
  });

  
  function handleButtunInput(inputNumber : string){

    const handleEnterInput = () => {
      const completePowInput = () => {
        const newInput = state.input.slice(0, state.input.length-1);
        const lastInput = state.input.at(-1);
        if(lastInput){
          const numberWithPower = lastInput.toString().replace(/sup-entering/, "sub");
          setState((prevState) => ({
            ...prevState,
            isPowEntering: !prevState.isPowEntering,
            input: [...newInput, JSON.parse(numberWithPower)]
          }));
        }else{
          handleError("Something went wrong during power parsing");
        }
      }
      const performResultCalculation = () => {
        try{

        }catch(error){
          if(error instanceof PrioritiesError){

          }else if(error instanceof ParserError){

          }else{
            
          }
        }
        // const validatedInput = state.input.at(-1) == " " ? state.input.replace(/...$/, "") : state.input;
        // const firstResult = handleFirstPriority(validatedInput);
        // const secondResult = handleSecondPriority(firstResult);

        // setState((prevState) => ({
        //   ...prevState,
        //   result: secondResult
        // }));
      } 
      if(state.isPowEntering){
        completePowInput();
        return;
      }

      performResultCalculation();
    }

    const handlePowInput = () => {
      const newInput = state.input.slice(0, state.input.length-1);
      const powerElement = JSON.stringify(state.input.at(-1));

      if(!powerElement || !powerElement.match(/\d+/)){
        handleError("Could not parse the value to be powered");
        return;
      }

      const currentPowerVal = powerElement.match(/\d+/)![0];

      if(!currentPowerVal) handleError("Could not parse the value to be powered into Number");

      const newPowerElement = JSON.parse(powerElement.replace(/\d+/, String(currentPowerVal + 1)));

      l(newPowerElement);
      setState((prevState) => ({
        ...prevState,
        isPowEntering: !prevState.isPowEntering,
        input: [...newInput, newPowerElement]
      }));
    }

    const handleNumberInput = () => {
      const lastVal = state.input.at(-1)?.toString() || "";
      const newInput = state.input.slice(0, state.input.length - 1);

      if(!lastVal || Number(lastVal)){
        setState((prevState) => ({
          ...prevState,
          input: [...newInput, lastVal.concat(inputNumber)]
        }));
      }else if(allowedOperations.includes(lastVal.trim())){
        setState((prevState) => ({
          ...prevState,
          input: [...prevState.input, inputNumber]
        }));
      }else{
        handleError("Please enter any operation before proceed to entering numbers");
      }
    }

    if( inputNumber == "Enter" ){
      handleEnterInput();
    }
    else if( state.isPowEntering ){
      handlePowInput();
    }
    else{
      handleNumberInput();
    }
  }

  function isLastOperator(){
    const lastVal = state.input.at(-1);
    if(!lastVal ){
      handleError("Test 1: something went wrong");
      return;
    }
    
    return allowedOperations.includes((lastVal as string).trim());
  }

  function handleTrigonometric(operationType : "sin" | "cos" | "tan"){

    // const newOperation = allowedThirdPriorOperations[operationType].call("");
    // const newInput = [...state.input.slice(-1), newOperation];

    // setState(prevState => ({
    //   ...prevState,
    //   input: newInput
    // }));
  }

  function handleOperationInput(inputOperator : string){
    try{
      switch(inputOperator){
        case "DEL":
          handleLastCharacterRemove();
          break;
        case "C":
          handleFullRemove();
          break;
        case "X2":
          handlePow("square");
          break;
        case "Xn":
          handlePow("multiple");
          break;
        case "!":
          handleFactorial();
          break;
        case "cos":
          handleTrigonometric("cos");
          break;
        case "sin":
          handleTrigonometric("sin");
          break;
        case "tan":
          handleTrigonometric("tan");
          break;
        default:{
          const newInput = state.input.slice(0, state.input.length - 1);
          const operatorWithSpaces = " " + inputOperator + " ";

          setState((prevState) => ({
            ...prevState,
            input:  isLastOperator() ? [...newInput, operatorWithSpaces] : [...prevState.input, operatorWithSpaces]
          }));
        }
      }
    }catch(e : any){
      handleError(`Error: ${e.message}`);
    }
  } 

  function handlePow(powType : TPow){
    if(!Number(state.input.at(-1))) return;

    const newState = {
      ...state
    };

    if(powType == "multiple"){
      newState.isPowEntering = true;
      newState.input.push(
        <span className={styles["sup-entering"]}>0</span>
      )
    }else{
      newState.input.push(
        <ThirdPriorOperation userInput={""} operation={"!"} />
        //<span className={styles["sup"]}>2</span>
      );
    }

    setState(newState);
  }

  function handleFactorial(){
    if(!Number(state.input.at(-1))) return;

    setState((prevState) => ({
      ...prevState,
      input:  [...prevState.input , <span className={styles["factorial"]}>!</span>]
    }));
  }

  function handleLastCharacterRemove(){
    const {input} = state;

    const lastVal = input.at(-1) as string;
    const newInput = input.slice(0, input.length - 1);

    if(Number(lastVal)){
      setState((prevState) => ({
        ...prevState,
        input: [...newInput, lastVal.slice(0, lastVal.length - 1)]
      }));
      return;
    }

    setState((prevState) => ({
      ...prevState,
      input: newInput
    }));
  }

  function handleFullRemove(){
    setState({
      input: [],
      result: "",
      isPowEntering: false,
      errorMessage: ""
    });
  }

  function handleError(errorMessage : string){

    setState(prevState => ({
      ...prevState,
      errorMessage: errorMessage
    }));

    setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        errorMessage: ""
      }));
    }, 7000);
  }

  return (
    <div className={styles["background"]}>
      <section className={styles["calc-body"]}>
        <div className={styles["input-block"]}>
          <p className={styles["input"]}>
            {
              state.input.map(el => el)
            }
          </p>
        </div>
        <div className={styles["bottom-block"]}>
          <div className={styles["operations-block"]}>
            <Button text="/" clickHandler={handleOperationInput}/>
            <Button text="*" clickHandler={handleOperationInput}/>
            <Button text="-" clickHandler={handleOperationInput}/>
            <Button text="+" clickHandler={handleOperationInput}/>
            <Button text="DEL" clickHandler={handleOperationInput}/>
            <Button text="C" clickHandler={handleOperationInput}/>
            <Button text="X2" clickHandler={handleOperationInput}/>
            <Button text="Xn" clickHandler={handleOperationInput}/>
            <Button text="X!" clickHandler={handleOperationInput}/>
            <Button text="sin" clickHandler={handleOperationInput}/>
            <Button text="cos" clickHandler={handleOperationInput}/>
            <Button text="tan" clickHandler={handleOperationInput}/>
          </div>
          <div className={styles["numbers-block"]}>
            <Button text="1" clickHandler={handleButtunInput}/>
            <Button text="2" clickHandler={handleButtunInput}/>
            <Button text="3" clickHandler={handleButtunInput}/>
            <Button text="4" clickHandler={handleButtunInput}/>
            <Button text="5" clickHandler={handleButtunInput}/>
            <Button text="6" clickHandler={handleButtunInput}/>
            <Button text="7" clickHandler={handleButtunInput}/>
            <Button text="8" clickHandler={handleButtunInput}/>
            <Button text="9" clickHandler={handleButtunInput}/>
            <Button text="0" clickHandler={handleButtunInput}/>
            <Button text="." clickHandler={handleButtunInput}/>
            <Button text="=" clickHandler={handleButtunInput}/>
          </div>
        </div>
      </section>
      {
        state.errorMessage &&
        <Popup messageToRender={state.errorMessage} clickHandler={() => setState((prevState) => ({...prevState, errorMessage: ""}))}/>
      }
      {
        state.result &&
        <Popup messageToRender={state.result} clickHandler={() => setState((prevState) => ({...prevState, result: ""}))}/>
      }
    </div>
  )
}
