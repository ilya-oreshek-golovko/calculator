import { add, cos, divide, factorial, minus, multiple, raiseToPower, sin, tan } from "@handlers/mathOperators/mathOperators";
import { IMathOperation, TAllowedThirdPriorOperation } from "@/types";
import operationStyles from "@app-page/components/Operation/ThirdPriorOperation.module.scss";

const allowedInputKeys = ["1","2","3","4","5","6","7","8","9","0",".", "Enter"];
const allowedOperations = ["/","*","+","-"];
const allowedThirdPriorOperations : TAllowedThirdPriorOperation = {
    "sin" : (userInput) => {
        return(
            <span className={operationStyles["trig-oper"]}>
                {"sin("}<span className={operationStyles["operation-value"]}>{userInput}</span>{")"}
            </span>
        )
    },
    "cos" : (userInput) => {
        return(
            <span className={operationStyles["trig-oper"]}>
                {"cos("}<span className={operationStyles["operation-value"]}>{userInput}</span>{")"}
            </span>
        )
    },
    "tg" : (userInput) => {
        return(
            <span className={operationStyles["trig-oper"]}>
                {"tg("}<span className={operationStyles["operation-value"]}>{userInput}</span>{")"}
            </span>
        )
    },
    "^" : (userInput, power) => {
        return(
            <span className={operationStyles["operation-value"]}>
                {userInput}<span className={operationStyles["sup"]}>{power}</span>
            </span>
        )
    },
    "!" : (userInput) => {
        return(
            <span className={operationStyles["operation-value"]}>
                {userInput}<span className={operationStyles["factorial"]}>!</span>
            </span>
        )
    },
};

// 1 - the lowest 3 - the highest
const Priorities : number[] = [1, 2, 3];
const [FirstPriority, SecondPriority, ThirdPriority] = Priorities;
// const mathOperationsPriorities : IMathOperationsPriorities<TOneArgOperations, TTwoArgsOperations> = {
//     "+" : {
//         priority: FirstPriority,
//         calc: add
//     },
//     "-" : {
//         priority: FirstPriority,
//         calc: minus
//     },
//     "*" : {
//         priority: SecondPriority,
//         calc: multiple
//     },
//     "/" : {
//         priority: SecondPriority,
//         calc: divide
//     },
//     "^" : {
//         priority: ThirdPriority,
//         calc: raiseToPower
//     },
//     "!" : {
//         priority: ThirdPriority,
//         calc: factorial
//     },
//     "sin" : {
//         priority: ThirdPriority,
//         calc: sin
//     },
//     "cos" : {
//         priority: ThirdPriority,
//         calc: cos
//     },
//     "tan" : {
//         priority: ThirdPriority,
//         calc: tan
//     },
// }

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
            throw Error("Not possible to identify operator");
        }
    }
}

export {
    allowedInputKeys, allowedOperations, allowedThirdPriorOperations, 
    FirstPriority, SecondPriority, ThirdPriority, getMathOperation
}