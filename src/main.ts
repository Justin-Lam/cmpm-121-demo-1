import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Finally?? My amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);


// Variables
let numFries: number = 0;

let previousTime: DOMHighResTimeStamp = performance.now(); // set it to performance.now() so when autoClickerLoop() runs for the first time it already can start comparing time
const autoClickerSecondsPerClick: number = 1;
let autoClicksPerSecond = 0;

interface Upgrade {
	name: string,
	cost: number,
	cps: number		// "clicks per second", in units/sec
}
const upgrades: Upgrade[] = [
	{
		name: "Hire Worker",
		cost: 10,
		cps: 0.1
	},
	{
		name: "Purchase Air Fryer",
		cost: 100,
		cps: 2
	},
	{
		name: "Purchase Deep Fryer",
		cost: 1000,
		cps: 50
	}
];

const upgradeButtons: HTMLButtonElement[] = [];


// Fry Button
const fryButton = document.createElement("button");
fryButton.innerHTML = "🍟 make french fry 🍟";
fryButton.addEventListener("click", () => changeNumFries(1));
app.append(fryButton);

// Fry Counter
const counter = document.createElement("div");
counter.innerHTML = `you have ${numFries} frenchy fries`;
app.append(counter);

// Upgrades
upgrades.forEach((upgrade) => {
	const upgradeButton = document.createElement("button");
	upgradeButton.innerHTML = upgrade.name;
	upgradeButton.disabled = true;
	upgradeButton.addEventListener("click", () => {
		changeNumFries(-upgrade.cost);
		autoClicksPerSecond += upgrade.cps;
		if (numFries < upgrade.cost) {
			upgradeButton.disabled = true;
		}
	});
	app.append(upgradeButton);
	upgradeButtons.push(upgradeButton);
});

// Auto Clicker
requestAnimationFrame(autoClickerLoop);

// Functions
function changeNumFries(amount: number): void {
	// Add fries
	numFries += amount;
	// Update fry counter
	counter.innerHTML = `you have ${numFries} frenchy fries`;
	// Check to enable buttons
	for (let i = 0; i < upgrades.length; i++) {
		if (numFries >= upgrades[i].cost && upgradeButtons[i].disabled) {
			upgradeButtons[i].disabled = false;
		}
	}
}

function autoClickerLoop(currentTime: DOMHighResTimeStamp): void {
	const deltaTime = (currentTime - previousTime) / 1000;
	if (deltaTime >= autoClickerSecondsPerClick) {
		changeNumFries(autoClicksPerSecond);
		previousTime = currentTime;
	}
	requestAnimationFrame(autoClickerLoop);
}
