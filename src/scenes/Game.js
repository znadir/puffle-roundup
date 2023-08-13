import wall from "../assets/wall.png";
import wallShape from "../assets/wallShape.json";
import countdownPng from "../assets/countdown.png";
import countdownJson from "../assets/countdown.json";
import Pet from "../classes/Pet.js";
import petsPng from "../assets/pets.png";
import petsJson from "../assets/pets.json";
import Background from "./Background.js";

export default class Game extends Background {
	constructor() {
		super("Game");

		this.gameAcceleration = 3;
		this.gameDurationSec = 120;
		this.statsStyle = {
			fontFamily: "Comicrazy",
			color: "#ffffff",
			fontSize: "35px",
			stroke: "#000000",
			strokeThickness: 5,
			shadow: {
				stroke: true,
				blur: 3,
			},
		};
	}

	preload() {
		super.preload();

		this.load.image("wall", wall);
		this.load.json("wall-shape", wallShape);
		this.load.atlas("countdown-atlas", countdownPng, countdownJson);
		this.load.atlas("pets-atlas", petsPng, petsJson);
	}

	create() {
		super.create();

		const wallShape = this.cache.json.get("wall-shape");
		this.matter.add.sprite(760, 480 + 150, "wall", null, {
			shape: wallShape,
			isStatic: true,
		});

		// pets
		this.pet = new Pet(this, 1181, 618);
		this.pet = new Pet(this, 1105, 474);
		this.pet = new Pet(this, 938, 340);
		this.pet = new Pet(this, 750, 396);
		this.pet = new Pet(this, 633, 336);
		this.pet = new Pet(this, 825, 239);
		this.pet = new Pet(this, 395, 291);
		this.pet = new Pet(this, 537, 97);
		this.pet = new Pet(this, 457, 437);
		this.pet = new Pet(this, 324, 577);
		this.pet = new Pet(this, 500, 692);

		this.addStats();
		this.addCountdown();
	}

	addCountdown() {
		this.anims.create({
			key: "countdown-anim",
			frames: this.anims.generateFrameNames("countdown-atlas", {
				start: 257,
				end: 269,
				zeroPad: 0,
				suffix: ".png",
			}),
			repeat: 1,
			duration: (this.gameDurationSec / this.gameAcceleration) * 1000,
		});

		const countdown = this.add
			.sprite(1520 - 60, 15, "countdown")
			.play("countdown-anim")
			.setOrigin(1, 0);

		const timer = this.add
			.text(
				countdown.x - countdown.displayWidth / 2,
				countdown.y + countdown.displayHeight / 2,
				this.gameDurationSec,
				{
					...this.statsStyle,
					fontSize: "25px",
					color: "#000000",
					stroke: "#ffffff",
				}
			)
			.setOrigin(0.5, 0.5);

		this.time.addEvent({
			delay: 1000 / this.gameAcceleration,
			repeat: this.gameDurationSec,
			callback: () => {
				const time = parseInt(timer.text);
				if (time > 0) {
					timer.setText(String(time - 1));
				}
			},
		});
	}

	addStats() {
		const caughtText = this.add
			.text(400, 10, "CAUGHT: 0", this.statsStyle)
			.setOrigin(1, 0);
		this.add
			.text(400, caughtText.displayHeight + 10, "ESCAPED: 0", this.statsStyle)
			.setOrigin(1, 0);
	}
}
