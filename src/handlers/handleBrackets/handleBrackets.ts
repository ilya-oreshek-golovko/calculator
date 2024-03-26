import { TParsedUserInput } from "@/types";
import { handlePriorityes } from "@handlers/parser/parser";

export default function handleBrackets(input : TParsedUserInput) : TParsedUserInput{
    if( !input.includes("(") && !input.includes(")") ) return input;

    const state = {
        isBracketOpen: false,
        startIndex: -1,
        endIndex: -1        
    };

    const resetState = () => {
        state.endIndex = -1;
        state.startIndex = -1;
        state.isBracketOpen = false;
    }

    return input.reduce((result : TParsedUserInput, currentVal, currentIndex) => {
        if(currentVal != "(" && !state.isBracketOpen){
            return[...result, currentVal];
        }else if(currentVal == "("){
            state.isBracketOpen = !state.isBracketOpen;
            state.startIndex = currentIndex+1;

            return result;
        }else if(currentVal == ")"){
            state.isBracketOpen = !state.isBracketOpen;
            state.endIndex = currentIndex;
            const exerciseInsideBrackets = input.slice(state.startIndex, state.endIndex);
            const resultInsideBrackets = handlePriorityes(exerciseInsideBrackets);
            resetState();

            return [...result, resultInsideBrackets];
        }else if(state.isBracketOpen){
            return result;
        }else{
            throw Error("Check handleBrackets");
        }
    }, []);
}
