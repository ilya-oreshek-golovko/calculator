import { getMathOperation } from "@data/globalData";
import { TParsedUserInput } from "@/types";

export default function handleThirdPriority(input : TParsedUserInput) : Array<string>{

    const result : Array<string> = input.reduce((accumulator : Array<string>, currntVal) => {
        if(typeof currntVal == "string") return [...accumulator, currntVal];

        const { operation, userInput, power } = currntVal;
        
        const {performCalculation} = getMathOperation(operation);

        const calculatedVal = power ? performCalculation(Number(userInput), Number(power)) : performCalculation(Number(userInput));

        return [...accumulator, calculatedVal.toString()];

    }, []);

    return result;
}
