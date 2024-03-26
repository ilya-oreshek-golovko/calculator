import { FirstPriority, getMathOperation } from "@/data/globalData";
import { isNumber } from "@handlers/parser/parser";

export default function handleSecondPriority(inputStr : Array<string>) : Array<string>{

    // const state : IExericeseState = {
    //     isExcersiceStarted: false,
    //     FirstArg: 0,
    //     SecondArg: 0,
    //     calculator: undefined
    // };

    // for(const currentVal of inputStr){
    //     if(Number(currentVal) && !state.isExcersiceStarted){
    //         state.FirstArg = Number(currentVal);
    //         state.isExcersiceStarted = !state.isExcersiceStarted;
    //     }else if(!Number(currentVal) && state.isExcersiceStarted){
    //         state.calculator = mathOperationsPriorities[currentVal].calc;
    //     }else if(Number(currentVal) && state.isExcersiceStarted){
    //         state.SecondArg = Number(currentVal);
    //         state.FirstArg = state.calculator(state.FirstArg, state.SecondArg);
    //     }
    // }

    return inputStr.reduce((result : Array<string>, currentVal, currentIndex) => {
        
        if(isNumber(currentVal)) return[...result, currentVal];

        const {priority : operatorPriority, performCalculation} = getMathOperation(currentVal);

        if(operatorPriority == FirstPriority) return [...result, currentVal];

        const prevNumber = Number(result[result.length - 1]);
        const nextNumber = Number(inputStr[currentIndex + 1]);

        const calculatedVal = performCalculation(prevNumber, nextNumber);
        
        result[result.length - 1] = calculatedVal.toString();

        inputStr.splice(currentIndex + 1, 1);

        return result;
    }, []);
}
