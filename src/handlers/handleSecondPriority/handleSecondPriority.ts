import { FirstPriority, getMathOperation } from "@/data/globalData";
import { isNumber } from "@handlers/parser/parser";

export default function handleSecondPriority(inputStr : Array<string>) : Array<string>{

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
