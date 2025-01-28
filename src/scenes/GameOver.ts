import { Scene } from 'phaser';
import { Button } from '../classes/Button';

/**
 * The gameover modal that is displayed when the player loses
 */
export class GameOver extends Scene
{
    background: Phaser.GameObjects.Image;
    homeButton: Button;
    retryButton: Button;
    finalScore: number = 0;
    headerText: Phaser.GameObjects.Text;
    text: Phaser.GameObjects.Text;

    constructor ()
    {
        super('GameOver');
    }

    init(data: { score: number }) {
        if (!data.score) this.finalScore = 0;
        else this.finalScore = data.score;
    }

    create ()
    {
        // Set modal background
        this.background = this.add.image(this.scale.width/2, this.scale.height/2, 'modal');
        this.background.displayWidth = this.scale.width * 0.9;
        this.background.displayHeight = this.scale.width * 0.9;

        // Set modal header
        this.headerText = this.add.text(this.scale.width / 2, this.background.getTopCenter().y + 70, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#350f61', strokeThickness: 8,
            align: 'center'
        });
        this.headerText.setOrigin(0.5);

        // Set text
        this.text = this.add.text(this.scale.width / 2, this.headerText.y + 100, `Final Score: ${this.finalScore}`, {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#350f61', strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5);

        // Add homebutton
        this.homeButton = new Button(this, this.scale.width / 2 - 100, this.scale.height / 2, 100, 100, 'homeButton', '', () => {
            this.scene.stop('Game');
            this.scene.start('MainMenu');
        });

        // Add retry button
        this.retryButton = new Button(this, this.scale.width / 2 + 100, this.scale.height / 2, 100, 100, 'retryButton', '', () => {
            this.scene.start('Game');
        });
    }
}
