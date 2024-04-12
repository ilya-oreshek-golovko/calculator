import { allowedThirdPriorOperations } from '@/data/globalData';
import { IThirdPriorOperationProps } from '@/types';

export default function ThirdPriorOperation({userInput, operation, power} : IThirdPriorOperationProps) {

    const elementToRender = () => {
        if(!allowedThirdPriorOperations.hasOwnProperty(operation)) throw Error("Input contains invalid operation");

        const operationToRender = allowedThirdPriorOperations[operation];

        if(power) return operationToRender(userInput, power);

        return operationToRender(userInput);
    }

    return elementToRender();
    
}
