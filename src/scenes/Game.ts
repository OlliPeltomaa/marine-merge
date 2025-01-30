import { Scene } from 'phaser';
import { Fish } from '../classes/Fish';
import { fishMap } from '../constants';
import { Button } from '../classes/Button';
import { getRandomFish } from '../gameLogic';

export class Game extends Scene
{
    walls: Phaser.Physics.Matter.Image;
    fish: Fish | undefined;
    score: number;
    scoreText: Phaser.GameObjects.Text;
    homeButton: Button;

    constructor ()
    {
        super('Game');
    }

    /**
     * Check whether the pointer x position is inside the walls
     * @param fish The fish that is about to be dropped
     * @param x pointer x position
     * @returns boolean
     */
    isValidX(fish: Fish, x: number): boolean {
        if (x > this.walls.getLeftCenter().x + fish.width / 2 &&
            x < this.walls.getRightCenter().x - fish.width / 2) {
            return true;
        }
        return false;
    }

    /**
     * Launch GameOver modal when the game area is full
     */
    handleGameOver() {
        this.input.off('pointermove');
        this.input.off('pointerup');
        this.homeButton.removeFromScene();
        this.scene.launch('GameOver', { score: this.score });
    }

    /**
     * Add points from merge to the total score
     * @param points how many points are added to the total score
     */
    updateScore(points: number) {
        this.score += points;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    /**
     * Merge two fish in the collision event into one
     * @param fishA first fish
     * @param fishB second fish
     */
    mergeFish(fishA: Fish, fishB: Fish) {
        const x = fishA.x;
        const y = fishA.y;
        const rotation = fishA.rotation;
        const nextTexture = fishMap[fishA.texture.key].next;

        if (nextTexture) {
            // Remove previous fish
            fishB.destroy();
            fishA.destroy();

            // Create a new fish
            const newFish = new Fish(this.matter.world, x, y, nextTexture);
            newFish.setRotation(rotation);

            this.updateScore(fishMap[newFish.texture.key].points);
            this.sound.play('pop');
        }
    }

    create ()
    {
        // Create the walls
        const wallShape = this.cache.json.get('wall-shape');
        this.walls = this.matter.add.image(this.scale.width / 2, 0, 'walls', undefined, {
            shape: wallShape,
            isStatic: true
        });
        this.walls.displayHeight = this.scale.height * 0.7;
        this.walls.displayWidth = this.scale.width * 0.7;
        this.walls.y = this.scale.height - (this.walls.displayHeight / 2);

        // Set score to zero
        this.score = 0;

        // Initialize score text
        this.scoreText = this.add.text(this.scale.width/2, 20, 'Score: 0', {
            fontSize: '32px',
            color: '#ffffff',
            fontFamily: 'Arial Black, Gadget, sans-serif',
            stroke: '#350f61', strokeThickness: 8,
            align: 'center'
        });
        this.scoreText.setOrigin(0.5);

        // Create the home button
        this.homeButton = new Button(this, this.scale.width - 70, 0, 70, 70, 'homeButton', '', () => {
            this.scene.start('MainMenu');
        });


        // Create the initial fish
        this.fish = new Fish(this.matter.world, this.scale.width / 2, this.walls.getTopCenter().y -50, getRandomFish(Math.random()));
        this.fish.setStatic(true);

        // Update the fish's x position to match the pointer's x position
        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (!this.fish) return;

            if (pointer.isDown && this.isValidX(this.fish, pointer.position.x)) {
                this.fish.setPosition(pointer.x, this.fish.y);
            }
        });
    
        // Drop the fish on pointer release
        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            if (!this.fish) return;

            if (this.isValidX(this.fish, pointer.position.x)) {
                this.fish.setPosition(pointer.x, this.fish.y);
            }

            this.fish.setStatic(false);
            this.fish = undefined;

            // Create a new fish
            this.time.delayedCall(1000, () => {
                this.fish = new Fish(this.matter.world, this.scale.width / 2, this.walls.getTopCenter().y - 50, getRandomFish(Math.random()));
                this.fish.setStatic(true);
                this.add.existing(this.fish);
            });
        });

        this.matter.world.on("collisionstart", (event: Phaser.Physics.Matter.Events.CollisionStartEvent) => {
            event.pairs.forEach((pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
                const { bodyA, bodyB } = pair;
        
                // Access game objects associated with the bodies
                const gameObjectA = bodyA.gameObject;
                const gameObjectB = bodyB.gameObject;

                // If the fish about to be dropped collides with another fish, game ends
                if (gameObjectA === this.fish || gameObjectB === this.fish) {
                    this.handleGameOver();
                    return;
                }
        
                // Check if both are Fish instances
                if (gameObjectA instanceof Fish && gameObjectB instanceof Fish) {
                    // Check for matching textures
                    if (gameObjectA.body && gameObjectB.body && gameObjectA.texture.key === gameObjectB.texture.key) {
                        this.mergeFish(gameObjectA, gameObjectB);
                    }
                }
            });
        });
    }
}
