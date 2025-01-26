export const backgroundColor: string = '#00c5ff';

type FishData = {
    scale: number,
    next: string | undefined,
    rarity: number,
    points: number
}

export const fishMap: Record<string, FishData> = {
    purpleFish: {
        scale: 1,
        next: 'yellowFish',
        rarity: 0.5,
        points: 0
    },
    yellowFish: {
        scale: 1,
        next: 'blueFish',
        rarity: 0.7,
        points: 2
    },
    blueFish: {
        scale: 1.15,
        next: 'greenFish',
        rarity: 0.8,
        points: 4
    },
    greenFish: {
        scale: 1.25,
        next: 'redFish',
        rarity: 0.9,
        points: 6
    },
    redFish: {
        scale: 1.3,
        next: 'grayFish',
        rarity: 0.95,
        points: 8
    },
    grayFish: {
        scale: 1.5,
        next: 'blowFish',
        rarity: 0.975,
        points: 10
    },
    blowFish: {
        scale: 1.6,
        next: undefined,
        rarity: 1,
        points: 12
    }
};