import { ReactElement, useEffect, useState } from "react";
import { IThirdPriorOperationProps } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showPopup } from "@/redux/CalculatorReducer/CalculatorReducer";

function useDegreeInput(){

    const dispatch = useAppDispatch();
    const input = useAppSelector((state) => state.CalculatorReducer.input);
    const isDegreesEntering = useAppSelector((state) => state.CalculatorReducer.isDegreesEntering);
    const [degree, setDegree] = useState(isDegreesEntering ? "0" : ""); 

    useEffect(() => {
        const getCurrentDegree = () => {

            const degree = input.at(-1) as ReactElement;
            if(!degree || typeof degree != "object") return "";
    
            const {userInput} = degree["props"] as IThirdPriorOperationProps;

            return userInput;
        };

        if(isDegreesEntering){
            setDegree(getCurrentDegree());
            dispatch(showPopup({
                title: `Input(max: 3): ${degree}`,
                description: `*Press "Enter" to complete input`
            }));
        }

    }, [isDegreesEntering, input, degree]);

    // const DegreeInput = () => {
    //     return(
    //         isDegreesEntering 
    //         ?
    //         showPopup({
    //             title: getMessageToRender(),
    //             description: `*Press "Enter" to complete input`
    //         })
    //         // <Popup messageToRender={getMessageToRender()} description={`*Press "Enter" to complete input`}/>
    //         :
    //         null
    //     )
    // };

    // return DegreeInput
}

export {useDegreeInput}