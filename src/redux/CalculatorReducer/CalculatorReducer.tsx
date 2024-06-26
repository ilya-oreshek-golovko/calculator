import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICalculatorSlice } from "./types";
import { IThirdPriorOperationProps, TBrackets, TThirdPriorOperation } from "@/types";
import { allowedOperations } from "@/data/globalData";
import ThirdPriorOperation from "@/pages/App/components/Operation";
import { parser } from "@/handlers/parser/parser";
import { ReactElement } from "react";

const initialState : ICalculatorSlice = {
    input: [],
    result: "",
    isPowEntering: false,
    isDegreesEntering: false,
    openBracketsCount: 0,
    messageToDisplay: "",
    isShowPopup: false,
    popupTitle: "",
    popupDescription: "",
};

function isBracket(input : any): input is TBrackets{
    return input == "(" || input == ")";
}

function isLastHighPriorOperation(input : any){
    const lastVal = input.at(-1) || "";
    return typeof lastVal == "object";
}

function isLastNumber(input : any){
    const lastVal = input.at(-1) || "";
    return !!Number(lastVal);
}

function isLastOperator(input : any){
    const lastVal = input.at(-1) || "";
    return ( typeof lastVal != "object" && allowedOperations.includes(lastVal.trim()) ) || input.length == 0 || lastVal == "(";
}

const CalculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        showPopup(state, {payload} : PayloadAction<{title : string, description?: string}>){
            clearTimeout(state.timeoutID);
            state.isShowPopup = true;
            state.popupTitle = payload.title;
            state.popupDescription = payload.description ? payload.description : "";
        },
        setTimeoutID(state, {payload} : PayloadAction<{timeoutID : NodeJS.Timeout}>){
            state.timeoutID = payload.timeoutID;
        },
        hidePopup(state){
            state.isShowPopup = false;
            state.popupTitle = "";
            state.popupDescription = "";
        },
        removeDegreeCharacter(state){
            const prevOperator = state.input.at(-1) as ReactElement;
            const {operation, userInput : prevUserInput} = prevOperator["props"] as IThirdPriorOperationProps;

            const newUserInput = prevUserInput.slice(0, prevUserInput.length - 1) || "0";

            const newInput = state.input.splice(0, state.input.length - 1);
            newInput.push(
                <ThirdPriorOperation key={Math.random()} userInput={newUserInput} operation={operation}/>
            );

            state.input = newInput;
        },
        removeLastCharacter(state){
            const lastVal = state.input.at(-1);
            const newInput = state.input.slice(0, state.input.length - 1);
            
            if(typeof lastVal == "string" && Number(lastVal) && lastVal.length > 1){
              state.input = [
                ...newInput,
                lastVal.slice(0, lastVal.length - 1)
              ]
            }else{
                state.input = newInput
            }
        },
        clearState: () => initialState,
        setPow(state, {payload} : PayloadAction<{powType : string}>){
            const userInput = state.input.at(-1) as string;

            if(!userInput && (!Number(userInput) || userInput != ")") ) throw Error("Not possible to parse user input to be powered");
            
            const newInput = state.input.slice(0, state.input.length - 1);

            if(payload.powType == "Xn"){
                newInput.push(
                    <ThirdPriorOperation key={Math.random()} userInput={userInput} operation={"^"} power={"0"}/>
                )
            }else if(payload.powType == "X2"){
                newInput.push(
                    <ThirdPriorOperation key={Math.random()} userInput={userInput} operation={"^"} power={"2"}/>
                )
            }
            
            state.isPowEntering = payload.powType == "Xn";
            state.input = newInput
        },
        setFactorial(state){
            const userInput = state.input.at(-1);

            if(typeof userInput != "string" || isLastOperator(state.input)) throw Error("You can set factorial only for number");

            const newInput = state.input.slice(0, state.input.length - 1);

            state.input = [
                ...newInput,
                <ThirdPriorOperation key={Math.random()} userInput={userInput} operation={"!"}/>
            ];
        },
        setTrigonometric(state, {payload} : PayloadAction<{operationType : TThirdPriorOperation}>){
            if(state.isDegreesEntering) throw Error("You haven't completed the previous operation input");
            if(isLastNumber(state.input) || isLastHighPriorOperation(state.input)) throw Error("Please enter any common operator before proceeding to this input");
            state.input.push(<ThirdPriorOperation key={Math.random()} userInput={"0"} operation={payload.operationType}/>);
            state.isDegreesEntering = true;
        },
        setCommonOperation(state, {payload} : PayloadAction<{inputOperator : string}>){
            const operatorWithSpaces = " " + payload.inputOperator + " ";
            
            if(state.input.length == 0) return;
            if(state.isPowEntering) state.isPowEntering = false;
            if(state.isDegreesEntering) state.isDegreesEntering = false;

            if(isLastOperator(state.input) && !isBracket(state.input.at(-1))){
                state.input = [
                    ...state.input.slice(0, state.input.length - 1),
                    operatorWithSpaces
                ];
            }else{
                state.input = [
                    ...state.input,
                    operatorWithSpaces
                ];
            }
        },
        setBrackets(state, {payload} : PayloadAction<{bracket : string}>){
            // TODO common
            if(payload.bracket == ")" && state.openBracketsCount != 0 && (isLastNumber(state.input) || isLastHighPriorOperation(state.input) || state.input.at(-1) == ")") || payload.bracket == "(" && isLastOperator(state.input)){
                state.input = [
                    ...state.input,
                    payload.bracket
                ];
                state.openBracketsCount = payload.bracket == "(" ? state.openBracketsCount + 1 : state.openBracketsCount - 1;
            }else{
                throw Error("Invalid brackets input");
            }
        },
        setMessage(state, {payload} : PayloadAction<string>){
            state.messageToDisplay = payload;
        },
        calculateResult(state){
            if(state.input.length == 0){
                state.result = "Input is empty"
            }else{
                clearTimeout(state.timeoutID);
                state.result = parser(state.input);
                state.isShowPopup = true;
                state.popupTitle = state.result;
            }
        },
        completePowInput(state){
            state.isPowEntering = false;
            // const newInput = state.input.slice(0, state.input.length-1);
            // const lastInput = state.input.at(-1);

            // if(lastInput){
            //     const numberWithPower = lastInput.toString().replace(/sup-entering/, "sub");
            //     state.isPowEntering = false;
            //     state.input = [
            //         ...newInput, 
            //         JSON.parse(numberWithPower)
            //     ]
            // }else{
            //     throw Error("Something went wrong during power parsing");
            // }
        },
        completeTrigonometricInput(state){
            state.isDegreesEntering = false;
        },
        addNumber(state, {payload} : PayloadAction<string>){
            if(isLastNumber(state.input) && !isLastHighPriorOperation(state.input)){
                const lastVal = state.input.at(-1) as string;
                const newInput = state.input.slice(0, state.input.length - 1);

                state.input = [
                    ...newInput, 
                    lastVal.concat(payload)
                ];
                // TODO common
            } else if(isLastOperator(state.input)){
                state.input.push(payload);
            } else{
                throw Error("Please enter any operation before proceed to entering numbers");
            }
        },
        handlePowInput(state, {payload} : PayloadAction<{newPower : string}>){

            const powerElement = state.input.at(-1) as ReactElement;
            const {operation : prevOperation, userInput : prevUserInput} = powerElement["props"] as IThirdPriorOperationProps;

            //state.isPowEntering = false;
            const newInput = state.input.slice(0, state.input.length-1);
            state.input = [
                ...newInput,
                <ThirdPriorOperation key={Math.random()} userInput={prevUserInput} operation={prevOperation} power={payload.newPower}/>
            ];
        },
        handleTrigonometricInput(state, {payload} : PayloadAction<{userInput : string}>){
            const prevOperator = state.input.at(-1) as ReactElement;
            const {operation, userInput : prevUserInput} = prevOperator["props"] as IThirdPriorOperationProps;
            if(prevUserInput.length == 3) return;

            const newUserInput = prevUserInput == "0" ? payload.userInput : prevUserInput + payload.userInput;

            const newInput = state.input.splice(0, state.input.length - 1);
            newInput.push(
                <ThirdPriorOperation key={Math.random()} userInput={newUserInput} operation={operation}/>
            );

            state.input = newInput;
        }
    }
});

export default CalculatorSlice.reducer;
export const {
    showPopup,
    hidePopup,
    setTimeoutID,
    removeDegreeCharacter,
    removeLastCharacter, 
    clearState, 
    setPow, 
    setFactorial, 
    setTrigonometric, 
    setCommonOperation, 
    setBrackets, 
    setMessage, 
    calculateResult,
    completePowInput, 
    completeTrigonometricInput,
    addNumber,
    handlePowInput,
    handleTrigonometricInput
} = CalculatorSlice.actions;

export{
    CalculatorSlice,
    isBracket,
    isLastNumber,
    isLastOperator
}