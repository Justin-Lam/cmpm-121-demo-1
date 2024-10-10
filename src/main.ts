import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🍟Fry Fever Fantasy 5🍟";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Variables
let numFries: number = 0;
let afps = 0; // "auto fries per second"
const upgradePriceIncreaseFactor = 1.15;

let previousTime: DOMHighResTimeStamp = performance.now(); // set it to performance.now() so when autoClickerLoop() runs for the first time it already can start comparing time
const autoClickerSecondsPerUpdate: number = 1;

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
const numUpgrades: number[] = [];

// Fry Button
const fryButton = document.createElement("button");
fryButton.innerHTML = "🍟 make french fry 🍟";
fryButton.addEventListener("click", () => changeNumFries(1));
app.append(fryButton);

// Fry Counter
const fryCounter = document.createElement("div");
fryCounter.innerHTML = `you have ${numFries.toFixed(0)} frenchy fries`;
app.append(fryCounter);

// Upgrade Buttons
for (let i = 0; i < upgrades.length; i++) {
  const upgrade = upgrades[i];
  numUpgrades.push(0);
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${upgrade.name} (${numUpgrades[i]})`;
  upgradeButton.disabled = true;
  upgradeButton.addEventListener("click", () =>
    purchaseUpgrade(upgrade, i, upgradeButton),
  );
  app.append(upgradeButton);
  upgradeButtons.push(upgradeButton);
  numUpgrades.push(0);
}

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
  // Change afps and update afps counter
  afps += amount;
  afpsCounter.innerHTML = `Fries per second: ${afps.toFixed(1)}`;
}

function purchaseUpgrade(
  upgrade: Upgrade,
  index: number,
  upgradeButton: HTMLButtonElement,
) {
  // Subtract fries
  changeNumFries(-upgrade.cost);
  // Increase afps
  changeAFPS(upgrade.fps);
  // Increase numUpgrades and update counter in text
  numUpgrades[index]++;
  upgradeButton.innerHTML = `${upgrade.name} (${numUpgrades[index]})`;
  // Increase price of upgrade
  upgrades[index].cost *= upgradePriceIncreaseFactor;
}

function autoClickerLoop(currentTime: DOMHighResTimeStamp): void {
  const deltaTime = (currentTime - previousTime) / 1000;
  if (deltaTime >= autoClickerSecondsPerUpdate) {
    changeNumFries(afps);
    previousTime = currentTime;
  }
  requestAnimationFrame(autoClickerLoop);
}
