import { ReactElement } from "react";

type THandleInput = (inputCharacter : string) => void;
type TOneArgOperations = (first : number) => number;
type TTwoArgsOperations = (first : number, second : number) => number;
type TPow = "square" | "multiple";
type TParsedUserInput = Array<string | IThirdPriorOperationProps>;
type TParserResult = string | null;
// type TAllowedThirdPriorOperation = {
//     key : string,
//     get : (props : string) => ReactElement
// };
type TThirdPriorOperation = "sin" | "cos" | "tan" | "^" | "!";
type TAllowedThirdPriorOperation = {
    [key : string] : (userInput : string, power? : string) => ReactElement
}

interface IButtonProps{
    text: string,
    clickHandler: THandleInput
}
interface IAppState{
    input: Array<string | ReactElement>,
    result: string,
    isPowEntering: boolean,
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
    clickHandler : () => void
}
interface IThirdPriorOperationProps{
    userInput : string, 
    operation : TThirdPriorOperation,
    power? : string
}


export type{
    IButtonProps, IAppState,IUseManualInputManagement, IPopupProps, IThirdPriorOperationProps, IMathOperation,
    TOneArgOperations, TTwoArgsOperations, TPow, TParsedUserInput, TParserResult, TAllowedThirdPriorOperation
}