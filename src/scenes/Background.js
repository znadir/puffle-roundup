import background from "../assets/background.svg";
import trees from "../assets/trees.svg";

export default class Background extends Phaser.Scene {
	constructor(config) {
		super(config);
	}

	preload() {
		this.load.image("background", background);
		this.load.image("trees", trees);
	}

	create() {
		this.add.image(-14, 0, "background").setOrigin(0, 0);
		this.add.image(0, 760 * 2 - 574 + 20, "trees").setOrigin(0, 1);
	}
}
