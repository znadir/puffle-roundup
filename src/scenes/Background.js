import background from "../assets/background.svg";
import trees from "../assets/trees.svg";

// all audio
import backgroundLoopMp3 from "../assets/audio/backgroundLoop.mp3";
import backgroundLoopOgg from "../assets/audio/backgroundLoop.ogg";
import backgroundLoopM4a from "../assets/audio/backgroundLoop.m4a";
import capture1Mp3 from "../assets/audio/capture1.mp3";
import capture1Ogg from "../assets/audio/capture1.ogg";
import capture1M4a from "../assets/audio/capture1.m4a";
import capture2Mp3 from "../assets/audio/capture2.mp3";
import capture2Ogg from "../assets/audio/capture2.ogg";
import capture2M4a from "../assets/audio/capture2.m4a";
import escapeMp3 from "../assets/audio/escape.mp3";
import escapeOgg from "../assets/audio/escape.ogg";
import escapeM4a from "../assets/audio/escape.m4a";

export default class Background extends Phaser.Scene {
	constructor(config) {
		super(config);
	}

	preload() {
		this.load.image("background", background);
		this.load.image("trees", trees);

		this.load.audio("backgroundLoop", [
			backgroundLoopM4a,
			backgroundLoopOgg,
			backgroundLoopMp3,
		]);
		this.load.audio("capture1", [capture1M4a, capture1Ogg, capture1Mp3]);
		this.load.audio("capture2", [capture2M4a, capture2Ogg, capture2Mp3]);
		this.load.audio("escape", [escapeM4a, escapeOgg, escapeMp3]);
	}

	create() {
		this.add.image(-14, 0, "background").setOrigin(0, 0);
		this.add.image(0, 760 * 2 - 574 + 20, "trees").setOrigin(0, 1);
	}
}
