import { Scene, GameObjects } from 'phaser';
import { Button } from '../classes/Button';

export class MainMenu extends Scene
{
    logo: GameObjects.Image;
    buttonText: GameObjects.Text;
    startButton: Button;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        // Add particle effects
        this.add.particles(0, this.scale.height + 50, 'bubble', {
            x: { min: 10, max: this.scale.width -10 },
            quantity: 1,
            lifespan: 5000,
            gravityY: -100,
            frequency: 300
        });

        // Add the game logo
        this.logo = this.add.image(this.scale.width / 2, 0, 'logo');
        // Adjust the y-position so it is at the top of the screen with a padding
        this.logo.y = (this.logo.height / 2) + 20;

        // Create the start button
        this.startButton = new Button(this, this.scale.width / 2, this.scale.height / 2, 300, 100, 'startButton', 'Play', () => {
            this.scene.start('Game');
        });
    }
}
