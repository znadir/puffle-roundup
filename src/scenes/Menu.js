import playBox from "../assets/playBox.png";
import Background from "./Background.js";

export default class Menu extends Background {
	constructor() {
		super("Menu");
	}

	preload() {
		super.preload();

		this.load.image("playBox", playBox);
	}

	create() {
		super.create();

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
