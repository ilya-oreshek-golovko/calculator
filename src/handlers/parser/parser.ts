import { IAppState, TParsedUserInput } from "@/types";
import handleThirdPriority from "@handlers/handleThirdPriority/handleThirdPriority";
import handleBrackets from "@handlers/handleBrackets/handleBrackets";
import handleSecondPriority from "@handlers/handleSecondPriority/handleSecondPriority";
import handleFirstPriority from "@handlers/handleFirstPriority/handleFirstPriority";

function handlePriorityes(input : TParsedUserInput) {
    const parsedThirdPriority = handleThirdPriority(input);
    const parsedSecondPriority = handleSecondPriority(parsedThirdPriority);
    const result = handleFirstPriority(parsedSecondPriority);

    return result;
}

//The main goal of parser is to remove React Elements from the user input array
function parseUserInput(userInput : IAppState["input"]) : TParsedUserInput{
    return userInput.map(el => (typeof el == "string") ? el : el.props);
}

function parser(userInput : IAppState["input"]) : string {
    const parsedUserInput = parseUserInput(userInput);
    const parsedBrackets = handleBrackets(parsedUserInput);
    const result = handlePriorityes(parsedBrackets);

    return result;
}

const isNumber = (inputVal : string) => /\d+/i.test(inputVal);

export {parser, handlePriorityes, parseUserInput, isNumber};