// import assets and style
import "./assets/style.css";
import "./assets/comicrazy.ttf";

// game conf
import Phaser from "phaser";
import Menu from "./scenes/Menu";
import Instructions from "./scenes/Instructions.js";
import Game from "./scenes/Game.js";

const config = {
	type: Phaser.AUTO,
	parent: "game-box",
	width: 760 * 2,
	height: 480 * 2,
	scene: [Menu, Instructions, Game],
	physics: {
		default: "matter",
		matter: {
			debug: true,
			gravity: {
				y: 0,
			},
		},
	},
};

const game = new Phaser.Game(config);
