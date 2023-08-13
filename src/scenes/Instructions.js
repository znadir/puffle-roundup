import tutoJson from "../assets/tuto-anim.json";
import tutoPng from "../assets/tuto-anim.png";
import instruBox from "../assets/instruBox.png";
import Background from "./Background.js";

export default class Instructions extends Background {
	constructor() {
		super("Instructions");
	}

	preload() {
		super.preload();

		this.load.atlas("tuto-atlas", tutoPng, tutoJson);
		this.load.image("instruBox", instruBox);
	}

	create() {
		super.create();

		this.add.image(760, 100, "instruBox").setOrigin(0.5, 0);

		// tutorial animation
		this.anims.create({
			key: "tuto-anim",
			frames: this.anims.generateFrameNames("tuto-atlas", {
				start: 1,
				end: 66,
				zeroPad: 0,
				suffix: ".png",
			}),
			repeat: -1,
			duration: 3000,
		});

		this.add.sprite(600, 500, "tuto").play("tuto-anim");

		// start btn

		const startStyle = {
			fontFamily: "Comicrazy-BoldItalic",
			color: "#fecb00",
			fontSize: "50px",
			stroke: "#3d3d3d",
			strokeThickness: 7,
			shadow: {
				stroke: true,
				blur: 3,
			},
		};

		const playButton = this.add
			.text(760, 535, "PLAY", startStyle)
			.setPadding(10, 0, 10, 0);

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
				this.scene.start("Game");
			},
			this
		);
	}
}
