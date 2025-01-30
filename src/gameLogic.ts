import { fishMap } from "./constants";

/**
 * Get a random fish texture based on their rarity
 * @param random random number
 * @returns the next fish texture as a string
 */
export const getRandomFish = (random: number): string => {
    const fishArray = Object.entries(fishMap);
    for (let i = 0; i < fishArray.length; i++) {
        const fishData = fishArray[i][1];
        if (random <= fishData.rarity) {
            return fishArray[i][0];
        }
    }

    // defaults to the first fish type
    return fishArray[0][0];
}