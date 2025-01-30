/**
 * Reusable Button class for creating buttons with images and text.
 * This class handles the pointer events and 
 */
export class Button extends Phaser.GameObjects.Container {
    image: Phaser.GameObjects.Image;
    text: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, imageFile: string, buttonText: string, action: Function) {
        super(scene, x, y);

        // Add the container to the scene
        scene.add.existing(this);
        this.image = this.createImage(width, height, imageFile, x, y);
        this.text = this.createText(buttonText, x, y);

        // Scale the image on hover
        this.image.on('pointerover', () => {
            this.image.displayWidth *= 1.05;
            this.image.displayHeight *= 1.05;
            this.text.displayHeight *= 1.05;
            this.text.displayWidth *= 1.05;
        });

        // Scale the image to original size when hovering ends
        this.image.on('pointerout', () => {
            this.image.displayWidth /= 1.05;
            this.image.displayHeight /= 1.05;
            this.text.displayHeight /= 1.05;
            this.text.displayWidth /= 1.05;
        });

        // When the button is clicked, perform the action given to the Button
        this.image.on('pointerdown', action)
    }

    /**
     * Create the image for the button
     * @param width button width
     * @param height button height
     * @param imageFile button image
     * @returns Phaser.GameObjects.Image object
     */
    private createImage(width: number, height: number, imageFile: string, x: number, y: number): any {
        const button = this.scene.add.image(x, y, imageFile);
        button.setInteractive();

        button.displayWidth = width;
        button.displayHeight = height;
        button.y = y + button.height / 2;

        return button;
    }

    /**
     * Create the text for the button
     * @param buttonText text displayed on the button
     * @returns Phaser.GameObjects.Text object
     */
    private createText(buttonText: string, x: number, y: number) {
        // Add a text to the button
        const textObject = this.scene.add.text(x, y, buttonText, {
            fontFamily: 'Arial Black, Gadget, sans-serif', fontSize: 38, color: '#ffffff',
            stroke: '#350f61', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        textObject.y = y + textObject.height / 2;

        return textObject;
    }

    /**
     * Remove the button from the scene
     */
    public removeFromScene() {
        this.text.destroy();
        this.image.destroy();
    }
}
