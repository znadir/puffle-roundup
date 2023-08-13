import wall from "../assets/wall.png";
import wallShape from "../assets/wallShape.json";
import countdownPng from "../assets/countdown.png";
import countdownJson from "../assets/countdown.json";

export default class Game extends Phaser.Scene {
	constructor() {
		super("Game");
	}

	preload() {
		this.load.image("wall", wall);
		this.load.json("wall-shape", wallShape);
		this.load.atlas("countdown-atlas", countdownPng, countdownJson);
	}

	create() {
		const gameAcceleration = 3;
		const gameDurationSec = 120;
		const wallShape = this.cache.json.get("wall-shape");

		this.add.image(-14, 0, "background").setOrigin(0, 0);
		this.add.image(0, 760 * 2 - 574 + 20, "trees").setOrigin(0, 1);
		this.matter.add.sprite(760, 480 + 150, "wall", null, {
			shape: wallShape,
		});

		// stats
		const statsStyle = {
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

		const caughtText = this.add
			.text(400, 10, "CAUGHT: 0", statsStyle)
			.setOrigin(1, 0);
		this.add
			.text(400, caughtText.displayHeight + 10, "ESCAPED: 0", statsStyle)
			.setOrigin(1, 0);

		// countdown
		this.anims.create({
			key: "countdown-anim",
			frames: this.anims.generateFrameNames("countdown-atlas", {
				start: 257,
				end: 269,
				zeroPad: 0,
				suffix: ".png",
			}),
			repeat: 1,
			duration: (gameDurationSec / gameAcceleration) * 1000,
		});
		const countdown = this.add
			.sprite(1520 - 60, 15, "countdown")
			.play("countdown-anim")
			.setOrigin(1, 0);

		// timer
		const timer = this.add
			.text(
				countdown.x - countdown.displayWidth / 2,
				countdown.y + countdown.displayHeight / 2,
				gameDurationSec,
				{
					...statsStyle,
					fontSize: "25px",
					color: "#000000",
					stroke: "#ffffff",
				}
			)
			.setOrigin(0.5, 0.5);

		this.time.addEvent({
			delay: 1000 / gameAcceleration,
			repeat: gameDurationSec,
			callback: () => {
				const time = parseInt(timer.text);
				if (time > 0) {
					timer.setText(String(time - 1));
				}
			},
		});
	}
}
