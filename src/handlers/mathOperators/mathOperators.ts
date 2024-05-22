import { TOneArgOperations, TTwoArgsOperations } from "@/types";

const add : TTwoArgsOperations = (first : number, second : number) => first + second; 
const minus : TTwoArgsOperations = (first : number, second : number) => first - second; 
const divide : TTwoArgsOperations = (first : number, second : number) => {
    if(second == 0) throw Error("Division by zero is prohibited");
    else return first / second;
}; 
const multiple : TTwoArgsOperations = (first : number, second : number) => first * second;  
const raiseToPower : TTwoArgsOperations = (numberToPower : number, power : number) => Math.pow(numberToPower, power); 
//const square : TMathOperationArg = (numberToSquare : number) => Math.pow(numberToSquare, 2);
const factorial : TOneArgOperations = (numberToFactorial : number) => (numberToFactorial != 1) ? numberToFactorial * factorial(numberToFactorial-1) : 1;
const sin : TOneArgOperations = (degrees : number) => Number(Math.sin(degrees * Math.PI/180).toFixed(9));
const cos : TOneArgOperations = (degrees : number) => Number(Math.cos(degrees * Math.PI/180).toFixed(9));
const tan : TOneArgOperations = (degrees : number) => Number(Math.tan(degrees * Math.PI/180).toFixed(9));

export {
    add, minus, divide, multiple, raiseToPower, factorial, sin, cos, tan
};