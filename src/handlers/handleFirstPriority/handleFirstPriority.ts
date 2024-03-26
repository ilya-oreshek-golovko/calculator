import { getMathOperation } from "@/data/globalData";
import { isNumber } from "@handlers/parser/parser";

interface IExericeseState{
    isExcersiceStarted: boolean,
    FirstArg: number,
    SecondArg: number,
    calculator: any
}

export default function handleFirstPriority(inputStr : Array<string>) : string{
    const state : IExericeseState = {
        isExcersiceStarted: false,
        FirstArg: 0,
        SecondArg: 0,
        calculator: undefined
    };

    for(const currentVal of inputStr){
        if(isNumber(currentVal) && !state.isExcersiceStarted){
            state.FirstArg = Number(currentVal);
            state.isExcersiceStarted = !state.isExcersiceStarted;
        }else if(!isNumber(currentVal) && state.isExcersiceStarted){
            const {performCalculation} = getMathOperation(currentVal);
            state.calculator = performCalculation;
        }else if(isNumber(currentVal) && state.isExcersiceStarted){
            state.SecondArg = Number(currentVal);
            state.FirstArg = state.calculator!(state.FirstArg, state.SecondArg);
        }
    }
    

    return state.FirstArg.toString();
}
