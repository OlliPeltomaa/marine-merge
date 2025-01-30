import { describe, expect, test } from "vitest";
import { getRandomFish } from "../gameLogic";

describe("Test getRandomFish", () => {
    test("Value 1 returns blowfish", () => {
        expect(getRandomFish(1)).toBe("blowFish");
    });

    test("Value above 1 returns purpleFish", () => {
        expect(getRandomFish(20)).toBe("purpleFish");
    });

    test("Value below 0 returns purpleFish", () => {
        expect(getRandomFish(-5)).toBe("purpleFish");
    });

    test("Value 0 returns purpleFish", () => {
        expect(getRandomFish(0)).toBe("purpleFish");
    });

    test("Value 0.5 returns purpleFish", () => {
        expect(getRandomFish(0.5)).toBe("purpleFish");
    });

    test("Value 0.7 returns yellowFish", () => {
        expect(getRandomFish(0.7)).toBe("yellowFish");
    });

    test("Value 0.8 returns blueFish", () => {
        expect(getRandomFish(0.8)).toBe("blueFish");
    });

    test("Value 0.9 returns greenFish", () => {
        expect(getRandomFish(0.9)).toBe("greenFish");
    });

    test("Value 0.95 returns redFish", () => {
        expect(getRandomFish(0.95)).toBe("redFish");
    });

    test("Value 0.975 returns grayFish", () => {
        expect(getRandomFish(0.975)).toBe("grayFish");
    });
    
});