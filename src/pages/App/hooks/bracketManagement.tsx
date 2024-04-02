import { allowedOperations } from "@/data/globalData";
import { IUseBracketManagementProps, TBrackets } from "@/types";
import { useState } from "react";


function useBracketManagement({input, setState} : IUseBracketManagementProps){

    const [openBracketsCount, setOpenBracketsCount] = useState<number>(0);

    function isBracket(input : any): input is TBrackets{
        return input == "(" || input == ")";
    }

    function isLastNumber(input : any){
        return !!Number(input.at(-1));
    }

    function isLastOperator(input : any){
        const lastVal = input.at(-1) || "";
        return allowedOperations.includes(lastVal.trim()) || input.length == 0 || lastVal == "(";
    }

    function handleBracketsInput(bracket : TBrackets){
        console.log(openBracketsCount);
        if(bracket == ")" && openBracketsCount != 0 && isLastNumber(input) || bracket == "(" && isLastOperator(input)){
            setState((prevState) => ({
                ...prevState,
                input: [...prevState.input, bracket]
              }));
            setOpenBracketsCount(bracket == "(" ? openBracketsCount + 1 : openBracketsCount - 1);
            return;
        }

        throw Error("Invalid brackets input");
    }

    return{
        handleBracketsInput,
        isBracket
    }
}

export{
    useBracketManagement
}