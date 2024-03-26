import handleSecondPriority from "./handleSecondPriority";

describe("handleSecondPriority", () => {

    const test1 = {
        input: ["8473", "-", "83", "*", "9", "/", "2", "-", "5"],
        expectedResult: ["8473", "-", "373.5", "-", "5"]
    };

    const test2 = {
        input: [
            "2",
             "-",
             "3",
            "-",
             "0",
            ],
        expectedResult: [
            "2",
             "-",
             "3",
             "-",
             "0"
            ],
    }

    const test3 = {
        input: [
            "2",
             "-",
             "3",
            "-",
             "",
            ],
        expectedResult: Error("Error during exercise parsing. 2 priority")
    }

    const test4 = {
        input: [
            "2",
             "-",
             "3",
            "/",
             "0",
            ],
        expectedResult: Error("Division by zero is prohibited")
    }

    test(`Second Priority: Test#1`, () => {
        expect(handleSecondPriority(test1.input)).toStrictEqual(test1.expectedResult);
    });
    test(`Second Priority: Test#2`, () => {
        expect(handleSecondPriority(test2.input)).toStrictEqual(test2.expectedResult);
    });
    test(`Second Priority: Test#3`, () => {
        expect(() => handleSecondPriority(test3.input)).toThrow(test3.expectedResult);
    });
    test(`Second Priority: Test#4`, () => {
        expect(() => handleSecondPriority(test4.input)).toThrow(test4.expectedResult);
    });
});

