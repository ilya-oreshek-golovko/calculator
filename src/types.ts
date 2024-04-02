import { ReactElement } from "react";
import { MouseEvent } from "react";

type THandleInput = (evt : MouseEvent<HTMLButtonElement>) => void;
type TOneArgOperations = (first : number) => number;
type TTwoArgsOperations = (first : number, second : number) => number;
type TPow = "X2" | "Xn";
type TrigonometricOperations = "sin" | "cos" | "tg";
type TParsedUserInput = Array<string | IThirdPriorOperationProps>;
type TParserResult = string | null;
type TBrackets = "(" | ")";

type TThirdPriorOperation = "sin" | "cos" | "tg" | "^" | "!";
type TAllowedThirdPriorOperation = {
    [key : string] : (userInput : string, power? : string) => ReactElement
}

interface IButtonProps{
    text: string,
    onClick: THandleInput
}
interface IAppState{
    input: Array<string | ReactElement>,
    result: string,
    isPowEntering: boolean,
    isDegreesEntering : boolean,
    errorMessage: string
}
interface IUseManualInputManagement{
    handleButtunInput:THandleInput,
    handleOperationInput: THandleInput,
    handleLastCharacterRemove: () => void,
    handleFullRemove: () => void,
    AppState: IAppState
}
// interface IMathOperationsPriorities{
//     [key : string] : {
//         priority: number,
//         calc: <T> | <S>
//     }
// }
interface IMathOperation{
    priority: number,
    performCalculation: Function
}
// interface IMathOperationsPriorities<T1,T2>{
//     "+" : IMathOperation<T2>,
//     "-" : IMathOperation<T2>,
//     "*" : IMathOperation<T2>,
//     "/" : IMathOperation<T2>,
//     "^" : IMathOperation<T2>,
//     "!" : IMathOperation<T1>,
//     "sin" : IMathOperation<T1>,
//     "cos" : IMathOperation<T1>,
//     "tan" : IMathOperation<T1>,
// }
interface IPopupProps{
    messageToRender : string,
    description?: string
}
interface IThirdPriorOperationProps{
    userInput : string, 
    operation : TThirdPriorOperation,
    power? : string
}
interface IUseBracketManagementProps{
    input : Array<any>, 
    setState : React.Dispatch<React.SetStateAction<IAppState>>,
    isLastNumber : Function
}


export type{
    IButtonProps, IAppState,IUseManualInputManagement, IPopupProps, IThirdPriorOperationProps, IMathOperation, IUseBracketManagementProps,
    TOneArgOperations, TTwoArgsOperations, TPow, TParsedUserInput, TParserResult, TAllowedThirdPriorOperation, TBrackets, TrigonometricOperations
}