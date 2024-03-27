import {ReactElement, useState} from "react";
import styles from "./App.module.scss";
import Button from "@app-page/components/Button/Button";
import { IAppState, IThirdPriorOperationProps, TPow } from "@/types";
import { useManualInputManagement } from "@/hooks/AppHooks";
import { allowedOperations } from "@data/globalData";
import Popup from "@app-page/components/Popup/Popup";
import ThirdPriorOperation from "@app-page/components/Operation/ThirdPriorOperation";
import { parser } from "@/handlers/parser/parser";

const l = (mes : any, obj ? : any) => obj ? console.log(mes, obj) : console.log(mes);

export default function App() {
  
  const [state, setState] = useState<IAppState>({
    input: [],
    result: "",
    isPowEntering: false,
    isDegreesEntering: false,
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
          const result = parser(state.input);
          setState((prevState) => ({
            ...prevState,
            result
          }));
        }catch(error : any){
          handleError(error.message)
        }
      } 

      if(state.isPowEntering){
        completePowInput();
        return;
      }

      performResultCalculation();
    }

    const handlePowInput = (newPower : string) => {
      const newInput = state.input.slice(0, state.input.length-1);
      const powerElement = state.input.at(-1) as ReactElement;
      const {operation : prevOperation, userInput : prevUserInput} = powerElement["props"] as IThirdPriorOperationProps;

      setState((prevState) => ({
        ...prevState,
        isPowEntering: !prevState.isPowEntering,
        input: [
          ...newInput, 
          <ThirdPriorOperation userInput={prevUserInput} operation={prevOperation} power={newPower}/>
        ]
      }));
      // if(!powerElement || !powerElement.match(/\d+/)){
      //   handleError("Could not parse the value to be powered");
      //   return;
      // }

      // const currentPowerVal = powerElement.match(/\d+/)![0];

      // if(!currentPowerVal) handleError("Could not parse the value to be powered into Number");

      // const newPowerElement = JSON.parse(powerElement.replace(/\d+/, String(inputNumber)));

      // l(newPowerElement);
      // setState((prevState) => ({
      //   ...prevState,
      //   isPowEntering: !prevState.isPowEntering,
      //   input: [...newInput, newPowerElement]
      // }));
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

    if( (inputNumber == "Enter" || inputNumber == "=" ) && !state.isDegreesEntering){
      handleEnterInput();
    } else if( (inputNumber == "Enter" || inputNumber == "=" ) && state.isDegreesEntering){
      completeTrigonometricInput();
    } else if(state.isPowEntering){
      handlePowInput(inputNumber);
    } else if(state.isDegreesEntering){
      handleTrigonometricInput(inputNumber);
    } else{
      handleNumberInput();
    }
  }

  function isLastOperator(){
    const lastVal = state.input.at(-1);
    return typeof lastVal == "string" && !Number(lastVal);
  }

  function completeTrigonometricInput(){
    setState(prevState => ({
      ...prevState,
      isDegreesEntering: false
    }));
  }

  function handleTrigonometricInput(userInput : string){
    const newInput = state.input.splice(0, state.input.length - 1);
    const prevOperator = state.input.at(-1) as ReactElement;
    const {operation, userInput : prevUserInput} = prevOperator["props"] as IThirdPriorOperationProps;

    const newUserInput = prevUserInput == "0" ? userInput : prevUserInput + userInput;

    newInput.push(
      <ThirdPriorOperation userInput={newUserInput} operation={operation}/>
    );

    setState(prevState => ({
      ...prevState,
      isDegreesEntering: newUserInput.length < 3,
      input: newInput
    }));
  }

  function handleTrigonometric(operationType : "sin" | "cos" | "tg"){

    // const newOperation = allowedThirdPriorOperations[operationType].call("");
    // const newInput = [...state.input.slice(-1), newOperation];

    setState(prevState => ({
      ...prevState,
      isDegreesEntering: true,
      input: [
        ...prevState.input,
        <ThirdPriorOperation userInput={"0"} operation={operationType}/>
      ]
    }));
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
        case "X!":
          handleFactorial();
          break;
        case "cos":
          handleTrigonometric("cos");
          break;
        case "sin":
          handleTrigonometric("sin");
          break;
        case "tg":
          handleTrigonometric("tg");
          break;
        default:{
          const operatorWithSpaces = " " + inputOperator + " ";

          if(isLastOperator()){
            setState((prevState) => ({
              ...prevState,
              input:  [
                ...prevState.input.slice(0, prevState.input.length - 1), 
                operatorWithSpaces
              ]
            }));
          }else{
            setState((prevState) => ({
              ...prevState,
              input:  [...prevState.input, operatorWithSpaces]
            }));
          }
        }
      }
    }catch(e : any){
      handleError(`Error: ${e.message}`);
    }
  } 

  function handlePow(powType : TPow){
    const userInput = state.input.at(-1) as string;

    if(!userInput || !Number(userInput)) {
      handleError("Not possible to parse user input to be powered");
      return;
    }

    const newInput = state.input.slice(0, state.input.length - 1);

    if(powType == "multiple"){
      // newInput.push(
      //   <span className={styles["sup-entering"]}>0</span>
      // )
      newInput.push(
        <ThirdPriorOperation userInput={userInput} operation={"^"} power={"0"}/>
      )
    }else if(powType == "square"){
      newInput.push(
        <ThirdPriorOperation userInput={userInput} operation={"^"} power={"2"}/>
      )
    }
    
    setState((prevState) => ({
      ...prevState,
      isPowEntering : powType == "multiple",
      input: newInput
    }));
    //console.log("newState", newState);
  }

  function handleFactorial(){
    const userInput = state.input.at(-1) as string;
    if(isLastOperator()) return;

    const newInput = state.input.slice(0, state.input.length - 1);

    console.log("userInput", userInput);

    setState((prevState) => ({
      ...prevState,
      input:  [
        ...newInput,
        <ThirdPriorOperation userInput={userInput} operation={"!"}/>
      ]
    }));
  }

  function handleLastCharacterRemove(){
    const {input} = state;

    const lastVal = input.at(-1) as string;
    const newInput = input.slice(0, input.length - 1);

    // console.log("newInput", newInput);
    // console.log("input", input);
    // console.log("lastVal", lastVal);

    if(Number(lastVal) && lastVal.length > 1){
      setState((prevState) => ({
        ...prevState,
        input: [...newInput, lastVal.slice(0, lastVal.length - 1)]
      }));

      return;
    }
 
    setState({
      ...state,
      input: newInput
    });
    
    handlePow("square");
  }

  function handleFullRemove(){
    setState({
      input: [],
      result: "",
      isPowEntering: false,
      isDegreesEntering: false,
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
            <Button text="tg" clickHandler={handleOperationInput}/>
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
