import { fishMap } from '../constants';

/**
 * Custom Fish class to create a Matter Image with a custom shape and proper scaling.
 */
export class Fish extends Phaser.Physics.Matter.Image {

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, texture: string) {
        const shapeData = world.scene.cache.json.get(`${texture}Shape`);
        super(world, x, y, texture, undefined, {
            shape: shapeData
        });

        this.setScale(fishMap[texture].scale);

        world.scene.add.existing(this);
    }
}