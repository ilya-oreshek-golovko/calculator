import { TParsedUserInput } from "@/types";
import { handlePriorityes } from "@handlers/parser/parser";

export default function handleBrackets(input : TParsedUserInput) : TParsedUserInput{
    if( !input.includes("(") && !input.includes(")") ) return input;

    const startIndexes : number[] = [];

    const resetState = () => {
        // state.endIndex = -1;
        // state.startIndexes = state.startIndexes.splice(0, state.startIndexes.length - 1);
        // state.isBracketOpen = false;
    }

    return input.reduce((result : TParsedUserInput, currentVal, currentIndex) => {
        if(currentVal != "(" && startIndexes.length == 0){
            return[...result, currentVal];
        }else if(currentVal == "("){
            startIndexes.push(currentIndex + 1);
            return result;
        }else if(currentVal == ")"){
            const exerciseInsideBrackets = input.slice(startIndexes.at(-1), currentIndex);
            const resultInsideBrackets = handlePriorityes(exerciseInsideBrackets);
            console.log(resultInsideBrackets);
            resetState();

            return [...result, resultInsideBrackets];
        }else if(startIndexes.length > 0){
            return result;
        }else{
            throw Error("Check handleBrackets");
        }
    }, []);
}
