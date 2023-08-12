import background from "../assets/background.svg";
import trees from "../assets/trees.svg";
import playBox from "../assets/playBox.png";

export default class Menu extends Phaser.Scene {
	constructor() {
		super("Menu");
	}

	preload() {
		this.load.image("background", background);
		this.load.image("trees", trees);
		this.load.image("playBox", playBox);
	}

	create() {
		this.add.image(-14, 0, "background").setOrigin(0, 0);
		this.add.image(0, 760 * 2 - 574 + 20, "trees").setOrigin(0, 1);
		this.add.image(760, 100, "playBox").setOrigin(0.5, 0);

		const startStyle = {
			fontFamily: "Comicrazy",
			color: "#fecb00",
			fontSize: "50px",
			stroke: "#3d3d3d",
			strokeThickness: 7,
			shadow: {
				stroke: true,
				blur: 3,
			},
		};

		const playButton = this.add.text(850, 525, "PLAY", startStyle);

		playButton.setInteractive({ cursor: "pointer" });
		playButton.on("pointerover", function () {
			playButton.setAlpha(0.5);
		});
		playButton.on("pointerout", function () {
			playButton.setAlpha(1);
		});
		playButton.on(
			"pointerup",
			function () {
				this.scene.start("Instructions");
			},
			this
		);
	}
}
