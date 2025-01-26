import { Scene } from 'phaser';
import { backgroundColor } from '../constants';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        // Set the background color to the HTML body
        const div = document.getElementById('body');
        if (div) div.style.backgroundColor = backgroundColor;

        // Set the background image visible
        const bg = document.getElementById('background');
        if (bg) bg.style.display = "block";
    }

    preload ()
    {
        this.load.setPath('assets');

        // UI elements
        this.load.image('logo', 'logo.png');
        this.load.image('startButton', 'button_rectangle_depth_gradient.png')
        this.load.image('bubble', 'bubble.png');
        this.load.image('homeButton', 'home-button.png');
        this.load.image('retryButton', 'retry-button.png');
        this.load.image('modal', 'button_square_flat.png');

        // Game elements
        this.load.image('walls', 'walls.png');
        this.load.json('wall-shape', 'shapes/wall-shape.json');
        this.load.image('purpleFish', 'purple-fish.png');
        this.load.json('purpleFishShape', 'shapes/purpleFish-shape.json');
        this.load.image('blueFish', 'blue-fish.png');
        this.load.json('blueFishShape', 'shapes/blueFish-shape.json');
        this.load.image('yellowFish', 'yellow-fish.png');
        this.load.json('yellowFishShape', 'shapes/yellowFish-shape.json');
        this.load.image('greenFish', 'green-fish.png');
        this.load.json('greenFishShape', 'shapes/greenFish-shape.json');
        this.load.image('redFish', 'red-fish.png');
        this.load.json('redFishShape', 'shapes/redFish-shape.json');
        this.load.image('grayFish', 'gray-fish.png');
        this.load.json('grayFishShape', 'shapes/grayFish-shape.json');
        this.load.image('blowFish', 'blow-fish.png');
        this.load.json('blowFishShape', 'shapes/blowFish-shape.json');

        // Audio
        this.load.audio('pop', 'audio/pop.ogg');
        this.load.audio('bubbles', 'audio/bubbles.wav');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
