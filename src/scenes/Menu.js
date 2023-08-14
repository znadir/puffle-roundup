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
		this.sound.add("backgroundLoop", { loop: true }).play();

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

		const capture1 = this.sound.add("capture1", { loop: false });
		const playButton = this.add.text(850, 525, "PLAY", startStyle);

		playButton.setInteractive({ cursor: "pointer" });
		playButton.on("pointerover", function () {
			playButton.setAlpha(0.5);
			capture1.play();
		});
		playButton.on("pointerout", function () {
			playButton.setAlpha(1);
		});
		playButton.on(
			"pointerup",
			function () {
				this.clearEvents();
				this.scene.start("Instructions");
			},
			this
		);
	}

	clearEvents() {
		this.events.off("pointerover");
		this.events.off("pointerout");
		this.events.off("pointerup");
	}
}
