import { add, cos, divide, factorial, minus, multiple, raiseToPower, sin, tan } from "@handlers/mathOperators/mathOperators";
import { IMathOperation, TAllowedThirdPriorOperation } from "@/types";

const allowedOperations = ["/","*","+","-"];
const allowedThirdPriorOperations : TAllowedThirdPriorOperation = {
    "sin" : (userInput) => {
        return(
            <span className={"trig-oper"}>
                {"sin("}<span className={"operation-value"}>{userInput}</span>{")"}
            </span>
        )
    },
    "cos" : (userInput) => {
        return(
            <span className={"trig-oper"}>
                {"cos("}<span className={"operation-value"}>{userInput}</span>{")"}
            </span>
        )
    },
    "tg" : (userInput) => {
        return(
            <span className={"trig-oper"}>
                {"tg("}<span className={"operation-value"}>{userInput}</span>{")"}
            </span>
        )
    },
    "^" : (userInput, power) => {
        return(
            <span className={"sup-operation"}>
                {userInput}<span className={"sup"}>{power}</span>
            </span>
        )
    },
    "!" : (userInput) => {
        return(
            <span className={"factorial-operation"}>
                {userInput}<span className={"factorial"}>!</span>
            </span>
        )
    },
};

// 1 - the lowest 3 - the highest
const Priorities : number[] = [1, 2, 3];
const [FirstPriority, SecondPriority, ThirdPriority] = Priorities;

const getMathOperation = (input : string) : IMathOperation => {

    switch(input.trim()){
        case "+":{
            return{
                priority: FirstPriority,
                performCalculation: add
            }
        }
        case "-":{
            return{
                priority: FirstPriority,
                performCalculation: minus
            }
        }
        case "*":{
            return{
                priority: SecondPriority,
                performCalculation: multiple
            }
        }
        case "/":{
            return{
                priority: SecondPriority,
                performCalculation: divide
            }
        }
        case "^":{
            return{
                priority: ThirdPriority,
                performCalculation: raiseToPower
            }
        }
        case "!":{
            return{
                priority: ThirdPriority,
                performCalculation: factorial
            }
        }
        case "sin":{
            return{
                priority: ThirdPriority,
                performCalculation: sin
            }
        }
        case "cos":{
            return{
                priority: ThirdPriority,
                performCalculation: cos
            }
        }
        case "tg":{
            return{
                priority: ThirdPriority,
                performCalculation: tan
            }
        }
        default:{
            console.log(input);
            throw Error("Not possible to identify operator");
        }
    }
}

export {
     allowedOperations, allowedThirdPriorOperations, 
    FirstPriority, SecondPriority, ThirdPriority, getMathOperation
}