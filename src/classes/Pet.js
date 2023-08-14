import { randomInteger } from "../utils.js";

export default class Pet extends Phaser.Physics.Matter.Sprite {
	constructor(scene, x, y) {
		super(scene.matter.world, x, y, "pet", null, {
			shape: { type: "circle", radius: 25 },
		});

		this.scene = scene;
		this.colors = [
			"black",
			"blue",
			"brown",
			"green",
			"orange",
			"pink",
			"purple",
			"red",
			"white",
			"yellow",
		];
		this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
		this.sensibility = randomInteger(30, 180);

		this.scene.add.existing(this);

		this.setFixedRotation();
		this.setBounce(1);
		this.setCollisionGroup(-1);
		this.animationKeys = ["0", "45", "90", "135", "180", "225", "270", "315"];
		this.addAnimations();
		this.makeFleeMouse();
	}

	addAnimations() {
		this.anims.create({
			key: "90",
			frames: [
				{
					key: "pets-atlas",
					frame: this.color + "/1.png",
				},
			],
		});

		this.anims.create({
			key: "135",
			frames: [
				{
					key: "pets-atlas",
					frame: this.color + "/2.png",
				},
			],
		});

		this.anims.create({
			key: "180",
			frames: [
				{
					key: "pets-atlas",
					frame: this.color + "/3.png",
				},
			],
		});

		this.anims.create({
			key: "225",
			frames: [
				{
					key: "pets-atlas",
					frame: this.color + "/4.png",
				},
			],
		});

		this.anims.create({
			key: "270",
			frames: [
				{
					key: "pets-atlas",
					frame: this.color + "/5.png",
				},
			],
		});

		this.anims.create({
			key: "315",
			frames: [
				{
					key: "pets-atlas",
					frame: this.color + "/6.png",
				},
			],
		});

		this.anims.create({
			key: "0",
			frames: [
				{
					key: "pets-atlas",
					frame: this.color + "/7.png",
				},
			],
		});

		this.anims.create({
			key: "45",
			frames: [
				{
					key: "pets-atlas",
					frame: this.color + "/8.png",
				},
			],
			repeat: -1,
			duration: 1000,
		});

		this.play("90");
	}

	makeFleeMouse() {
		this.scene.input.addListener("pointermove", () => {
			const mousePos = this.scene.input.activePointer;
			const distanceMin = 30;

			const distance =
				Math.sqrt(
					Math.pow(mousePos.x - this.x, 2) + Math.pow(mousePos.y - this.y, 2)
				) - this.sensibility;

			if (distance < distanceMin) {
				const directionX = this.x - mousePos.x + Math.random();
				const directionY = this.y - mousePos.y + Math.random();

				const magnitude = Math.sqrt(directionX ** 2 + directionY ** 2);
				const deplacementX = (directionX / magnitude) * distanceMin;
				const deplacementY = (directionY / magnitude) * distanceMin;

				const newPosX = this.x + deplacementX;
				const newPosY = this.y + deplacementY;
				this.setPosition(newPosX, newPosY);

				const suitableAngle = this.findSuitableAngle(
					deplacementX,
					deplacementY
				);
				this.play(suitableAngle);
			}
		});
	}

	findSuitableAngle(deplacementX, deplacementY) {
		// Calculate the angle using arctangent (atan2) function
		const angleRadians = Math.atan2(deplacementY, deplacementX);

		// Convert radians to degrees and ensure the angle is positive
		let angleDegrees = (angleRadians * 180) / Math.PI;
		if (angleDegrees < 0) {
			angleDegrees += 360;
		}

		// Array of available angles
		const availableAngles = this.animationKeys;

		// Find the closest angle from the array
		let closestAngle = availableAngles[0];
		let minAngleDifference = Math.abs(angleDegrees - parseInt(closestAngle));

		for (let i = 1; i < availableAngles.length; i++) {
			const currentAngle = parseInt(availableAngles[i]);
			const angleDifference = Math.abs(angleDegrees - currentAngle);

			if (angleDifference < minAngleDifference) {
				minAngleDifference = angleDifference;
				closestAngle = availableAngles[i];
			}
		}

		return closestAngle;
	}
}
