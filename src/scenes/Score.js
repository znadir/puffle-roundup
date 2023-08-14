import Background from "./Background.js";
import scoreBox from "../assets/scoreBox.png";
import { getCookie, setCookie } from "../utils.js";

export default class Score extends Background {
	constructor() {
		super("Score");
	}

	init(data) {
		this.caught = data.caught;
		this.escaped = data.escaped;
		this.timer = data.timer;

		this.score = Math.round(this.timer * this.caught);
		this.coins = Math.round(this.score / 10);
		this.totalCoins = this.setTotalCoins(this.coins);
	}

	preload() {
		super.preload();
		this.load.image("scoreBox", scoreBox);
	}

	create() {
		super.create();

		this.add.image(760, 100, "scoreBox").setOrigin(0.5, 0);

		const simpleStyle = {
			fontFamily: "Comicrazy",
			color: "#000000",
			fontSize: "25px",
		};

		const bigStyle = {
			fontFamily: "Comicrazy",
			color: "#fecb00",
			fontSize: "27px",
			stroke: "#000000",
			strokeThickness: 7,
			shadow: {
				stroke: true,
				blur: 3,
			},
		};

		this.add
			.text(760, 240, `TIMER: ${this.timer}`, simpleStyle)
			.setOrigin(0.5, 0);
		this.add
			.text(760, 305, `PUFFLES CAUGHT: ${this.caught}`, simpleStyle)
			.setOrigin(0.5, 0);

		this.add
			.text(760, 380, `SCORE THIS ROUND: ${this.score}`, simpleStyle)
			.setOrigin(0.5, 0)
			.setFontSize("22px");
		this.add
			.text(760, 420, `COINS THIS ROUND: ${this.coins}`, simpleStyle)
			.setOrigin(0.5, 0)
			.setFontSize("22px");
		this.add
			.text(760, 470, `TOTAL COINS: ${this.totalCoins}`, simpleStyle)
			.setOrigin(0.5, 0)
			.setFontSize("25px");

		const playMore = this.add
			.text(760 - 120, 550, "PLAY MORE", bigStyle)
			.setOrigin(0.5, 0);

		playMore.setInteractive({ cursor: "pointer" });
		playMore.on("pointerover", function () {
			playMore.setAlpha(0.5);
		});
		playMore.on("pointerout", function () {
			playMore.setAlpha(1);
		});
		playMore.on(
			"pointerup",
			function () {
				this.clearEvents();
				this.scene.start("Game");
			},
			this
		);

		const finish = this.add
			.text(760 + 120, 550, "FINISH", bigStyle)
			.setOrigin(0.5, 0)
			.setColor("#66ccff");

		finish.setInteractive({ cursor: "pointer" });
		finish.on("pointerover", function () {
			finish.setAlpha(0.5);
		});
		finish.on("pointerout", function () {
			finish.setAlpha(1);
		});
		finish.on(
			"pointerup",
			function () {
				this.clearEvents();
				this.scene.start("Instructions");
			},
			this
		);
	}

	setTotalCoins(coins) {
		const cookie = getCookie("totalCoins");
		const totalCoins = isNaN(parseInt(cookie)) ? 0 : parseInt(cookie);
		const newTotalCoins = totalCoins + coins;

		setCookie("totalCoins", newTotalCoins);

		return newTotalCoins;
	}

	clearEvents() {
		this.events.off("pointerover");
		this.events.off("pointerout");
		this.events.off("pointerup");
	}
}
