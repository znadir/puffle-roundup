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

		this.scene.add.existing(this);

		this.setFixedRotation();
		this.setBounce(1);
		this.setCollisionGroup(-1);
		this.animate();
		this.makeFleeMouse();
	}

	animate() {
		this.anims.create({
			key: "pet-anim",
			frames: this.anims.generateFrameNames("pets-atlas", {
				start: 1,
				end: 8,
				zeroPad: 0,
				prefix: this.color + "/",
				suffix: ".png",
			}),
			repeat: -1,
			duration: 1000,
		});

		this.play("pet-anim");
	}

	makeFleeMouse() {
		// add listenever everytime mouse click and log x and y
		this.scene.input.addListener("pointerdown", () => {
			const mousePos = this.scene.input.activePointer;
			console.log(mousePos.x, mousePos.y);
		});
		this.scene.input.addListener("pointermove", () => {
			const mousePos = this.scene.input.activePointer;
			const distanceMin = 30;
			const sensibility = 170;
			const randomness = 50;

			const distance =
				Math.sqrt(
					Math.pow(mousePos.x - this.x, 2) + Math.pow(mousePos.y - this.y, 2)
				) - sensibility;

			if (distance < distanceMin) {
				const directionX = this.x - mousePos.x + Math.random() * randomness;
				const directionY = this.y - mousePos.y + Math.random() * randomness;

				const magnitude = Math.sqrt(directionX ** 2 + directionY ** 2);
				const deplacementX = (directionX / magnitude) * distanceMin;
				const deplacementY = (directionY / magnitude) * distanceMin;

				const newPosX = this.x + deplacementX;
				const newPosY = this.y + deplacementY;
				this.setPosition(newPosX, newPosY);
			}
		});
	}
}
