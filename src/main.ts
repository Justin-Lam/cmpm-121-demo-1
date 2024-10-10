import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Finally?? My amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Variables
let numFries: number = 0;

let previousTime: DOMHighResTimeStamp = performance.now(); 	// set it to performance.now() so when autoClickerLoop() runs for the first time it already can start comparing time
const autoClickerSecondsPerUpdate: number = 1;
let afps = 0;																						// "auto fries per second"

interface Upgrade {
	name: string;
	cost: number;
	fps: number; // "fries per second", in units/sec
}
const upgrades: Upgrade[] = [
	{
		name: "Hire Worker",
		cost: 10,
		fps: 0.1,
	},
	{
		name: "Purchase Air Fryer",
		cost: 100,
		fps: 2,
	},
	{
		name: "Purchase Deep Fryer",
		cost: 1000,
		fps: 50,
	},
];

const upgradeButtons: HTMLButtonElement[] = [];

// Fry Button
const fryButton = document.createElement("button");
fryButton.innerHTML = "🍟 make french fry 🍟";
fryButton.addEventListener("click", () => changeNumFries(1));
app.append(fryButton);

// Fry Counter
const fryCounter = document.createElement("div");
fryCounter.innerHTML = `you have ${numFries} frenchy fries`;
app.append(fryCounter);

// Upgrades
upgrades.forEach((upgrade) => {
	const upgradeButton = document.createElement("button");
	upgradeButton.innerHTML = upgrade.name;
	upgradeButton.disabled = true;
	upgradeButton.addEventListener("click", () => {
		// Subtract fries
		changeNumFries(-upgrade.cost);
		// Increase auto FPS
		changeAFPS(upgrade.fps);
	});
	app.append(upgradeButton);
	upgradeButtons.push(upgradeButton);
});

// AFPS (Auto Fries per Second) Counter
const afpsCounter = document.createElement("div");
afpsCounter.innerHTML = `Fries per second: ${afps.toFixed(1)}`;
app.append(afpsCounter);

// Auto Clicker
requestAnimationFrame(autoClickerLoop);

// Functions
function changeNumFries(amount: number): void {
	// Change fries and update fry counter
	numFries += amount;
	fryCounter.innerHTML = `you have ${numFries.toFixed(0)} frenchy fries`;
	// Check to enable/disable upgrade buttons
	for (let i = 0; i < upgrades.length; i++) {
		//Enable
		if (numFries >= upgrades[i].cost && upgradeButtons[i].disabled) {
			upgradeButtons[i].disabled = false;
		}
		//Disable
		else if (numFries < upgrades[i].cost && !upgradeButtons[i].disabled) {
			upgradeButtons[i].disabled = true;
		}
	}
}

function changeAFPS(amount: number): void {
	// Change autoFPS and update afps counter
	afps += amount;
	afpsCounter.innerHTML = `Fries per second: ${afps.toFixed(1)}`;
}

function autoClickerLoop(currentTime: DOMHighResTimeStamp): void {
	const deltaTime = (currentTime - previousTime) / 1000;
	if (deltaTime >= autoClickerSecondsPerUpdate) {
		changeNumFries(afps);
		previousTime = currentTime;
	}
	requestAnimationFrame(autoClickerLoop);
}
