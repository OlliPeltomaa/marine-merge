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
        this.load.image('logo', 'images/logo.png');
        this.load.image('startButton', 'images/button_rectangle_depth_gradient.png')
        this.load.image('bubble', 'images/bubble.png');
        this.load.image('homeButton', 'images/home-button.png');
        this.load.image('retryButton', 'images/retry-button.png');
        this.load.image('modal', 'images/button_square_flat.png');

        // Game elements
        this.load.image('walls', 'images/walls.png');
        this.load.json('wall-shape', 'shapes/wall-shape.json');
        this.load.image('purpleFish', 'images/purple-fish.png');
        this.load.json('purpleFishShape', 'shapes/purpleFish-shape.json');
        this.load.image('blueFish', 'images/blue-fish.png');
        this.load.json('blueFishShape', 'shapes/blueFish-shape.json');
        this.load.image('yellowFish', 'images/yellow-fish.png');
        this.load.json('yellowFishShape', 'shapes/yellowFish-shape.json');
        this.load.image('greenFish', 'images/green-fish.png');
        this.load.json('greenFishShape', 'shapes/greenFish-shape.json');
        this.load.image('redFish', 'images/red-fish.png');
        this.load.json('redFishShape', 'shapes/redFish-shape.json');
        this.load.image('grayFish', 'images/gray-fish.png');
        this.load.json('grayFishShape', 'shapes/grayFish-shape.json');
        this.load.image('blowFish', 'images/blow-fish.png');
        this.load.json('blowFishShape', 'shapes/blowFish-shape.json');

        // Audio
        this.load.audio('pop', 'audio/pop.wav');
    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}
