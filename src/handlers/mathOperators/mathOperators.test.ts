import { add, cos, divide, minus, multiple, sin, tan } from "./mathOperators";

describe("add module", () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3);
    });
});

describe("minus module", () => {
    test('adds 1 - 2 to equal -1', () => {
        expect(minus(1, 2)).toBe(-1);
    });
});

describe("divide module", () => {
    test('adds 10 / 2 to equal 5', () => {
        expect(divide(10, 2)).toBe(5);
    });
});

describe("multiple module", () => {
    test('adds 10 * 2 to equal 20', () => {
        expect(multiple(10, 2)).toBe(20);
    });
});

describe("minus module", () => {
    test('sin 30 degrees to equal 0.5', () => {
        expect(sin(30)).toBe(0.5);
    });
});

describe("divide module", () => {
    test('cos 60 degrees to equal 0.5', () => {
        expect(cos(60)).toBe(0.5);
    });
});

describe("multiple module", () => {
    test('tan 45 degrees to equal 1', () => {
        expect(tan(45)).toBe(1);
    });
});