export default class Game extends Phaser.Scene {
	constructor() {
		super("Game");
	}

	preload() {}

	create() {
		this.add.image(-14, 0, "background").setOrigin(0, 0);
		this.add.image(0, 760 * 2 - 574 + 20, "trees").setOrigin(0, 1);
	}
}
