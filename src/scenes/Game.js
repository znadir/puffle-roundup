import wall from "../assets/wall.png";
import wallShape from "../assets/wallShape.json";
import countdownPng from "../assets/countdown.png";
import countdownJson from "../assets/countdown.json";
import Pet from "../classes/Pet.js";
import petsPng from "../assets/pets.png";
import petsJson from "../assets/pets.json";
import Background from "./Background.js";
import goal from "../assets/goal.png";
import goalShape from "../assets/goalShape.json";
import safeZone from "../assets/safeZone.png";
import safeZoneShape from "../assets/safeZoneShape.json";

export default class Game extends Background {
	constructor() {
		super("Game");
	}

	init() {
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

		this.caught = 0;
		this.escaped = 0;
		this.timer = 0;
	}

	preload() {
		super.preload();

		this.load.image("wall", wall);
		this.load.json("wall-shape", wallShape);
		this.load.atlas("countdown-atlas", countdownPng, countdownJson);
		this.load.atlas("pets-atlas", petsPng, petsJson);
		this.load.image("goal", goal);
		this.load.json("goal-shape", goalShape);
		this.load.image("safe-zone", safeZone);
		this.load.json("safe-zone-shape", safeZoneShape);
	}

	create() {
		super.create();

		const wallShape = this.cache.json.get("wall-shape");
		const wall = this.matter.add.sprite(760, 480 + 150, "wall", null, {
			shape: wallShape,
			isStatic: true,
		});

		// pets
		this.pets = this.add.group();
		this.pets.addMultiple([
			new Pet(this, 1181, 618),
			new Pet(this, 1105, 474),
			new Pet(this, 938, 340),
			new Pet(this, 750, 396),
			new Pet(this, 633, 336),
			new Pet(this, 825, 239),
			new Pet(this, 395, 291),
			new Pet(this, 537, 97),
			new Pet(this, 457, 437),
			new Pet(this, 324, 577),
			new Pet(this, 500, 692),
		]);
		this.petsCount = this.pets.getLength();

		// pets must be catched in the goal
		this.goal = this.matter.add.image(wall.x, wall.y, "goal", null, {
			shape: goalShape,
		});
		this.goal.setCollidesWith([]);
		this.goal.setVisible(false);

		// pets must not leave safe zone
		this.safeZone = this.matter.add.image(760, 480, "safe-zone", null, {
			shape: safeZoneShape,
		});
		this.safeZone.setCollidesWith([]);
		this.safeZone.setVisible(false);

		this.addStats();
		this.addCountdown();

		// sounds
		this.escape = this.sound.add("escape", { loop: false });
		this.capture2 = this.sound.add("capture2", { loop: false });
	}

	update() {
		this.pets.getChildren().forEach((pet) => {
			// verify pets are caught in the goal
			const overlaps = this.matter.overlap(pet, this.goal);

			if (!pet.overlaps && overlaps) {
				this.capture2.play();
				pet.overlaps = true;
				this.incCaught(1);
			} else if (pet.overlaps && !overlaps) {
				pet.overlaps = false;
				this.incCaught(-1);
			}

			// verify pets are not leaving safe zone
			const safe = this.matter.overlap(pet, this.safeZone);

			if (!safe) {
				this.escape.play();
				this.incEscaped(1);
				this.pets.remove(pet, true, false);
			}

			// gameover when all pets are gone/caught
			if (this.petsCount === this.caught + this.escaped) {
				this.gameOver();
			}
		});
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
					this.timer = time - 1;
					timer.setText(String(this.timer));
				} else {
					this.gameOver();
				}
			},
		});
	}

	addStats() {
		this.caughtText = this.add
			.text(400, 10, "CAUGHT: 0", this.statsStyle)
			.setOrigin(1, 0);
		this.escapedText = this.add
			.text(
				400,
				this.caughtText.displayHeight + 10,
				"ESCAPED: 0",
				this.statsStyle
			)
			.setOrigin(1, 0);
	}

	incCaught(number) {
		this.caught = parseInt(this.caughtText.text.replace("CAUGHT: ", ""));
		this.caught += number;

		this.caughtText.setText("CAUGHT: " + this.caught);
	}

	incEscaped(number) {
		this.escaped = parseInt(this.escapedText.text.replace("ESCAPED: ", ""));
		this.escaped += number;

		this.escapedText.setText("ESCAPED: " + this.escaped);
	}

	gameOver() {
		this.events.off("pointermove");
		this.scene.start("Score", {
			caught: this.caught,
			escaped: this.escaped,
			timer: this.timer,
		});
	}
}
