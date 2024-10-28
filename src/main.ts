import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName: string = "🍟Fry Fever Fantasy 5🍟";
document.title = gameName;

const header: HTMLHeadingElement = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Variables
let numFries: number = 0;
let afps: number = 0; // "auto fries per second"
const upgradePriceIncreaseFactor: number = 1.15;

let previousTime: DOMHighResTimeStamp = performance.now(); // set it to performance.now() so when autoClickerLoop() runs for the first time it already can start comparing time
const autoClickerSecondsPerUpdate: number = 1;

interface Item {
  name: string;
  description: string;
  cost: number;
  fps: number; // "fries per second", in units/sec
}
const availableItems: Item[] = [
  {
    name: "Hire Worker",
    description:
      "They don't know that they've just agreed to work for you for the rest of their lives",
    cost: 10,
    fps: 0.1,
  },
  {
    name: "Purchase Air Fryer",
    description: "Turns out these things don't actually fry air",
    cost: 100,
    fps: 2,
  },
  {
    name: "Purchase Deep Fryer",
    description: "What's a deep and why are we frying it?",
    cost: 1000,
    fps: 50,
  },
  {
    name: "Purchase Fry Factory",
    description: "Automated everything, from seed planting to fry polishing",
    cost: 2500,
    fps: 100,
  },
  {
    name: "Summon Fry Demigod",
    description: "and then make it work for minimum wage",
    cost: 10000,
    fps: 1000,
  },
];
const upgradeButtons: HTMLButtonElement[] = [];
const numUpgrades: number[] = [];

// Fry Button
const fryButton: HTMLButtonElement = document.createElement("button");
fryButton.innerHTML = "🍟 make french fry 🍟";
fryButton.addEventListener("click", () => changeNumFries(1));
app.append(fryButton);

// Fry Counter
const fryCounter: HTMLDivElement = document.createElement("div");
fryCounter.innerHTML = `you have ${numFries.toFixed(0)} frenchy fries`;
app.append(fryCounter);

// Upgrade Buttons
for (let i = 0; i < availableItems.length; i++) {
  const upgrade: Item = availableItems[i];
  numUpgrades.push(0);
  const upgradeButton: HTMLButtonElement = document.createElement("button");
  upgradeButton.innerHTML = `${upgrade.name} (${numUpgrades[i]})`;
  upgradeButton.title = upgrade.description;
  upgradeButton.disabled = true;
  upgradeButton.addEventListener(
    "click",
    () => purchaseUpgrade(upgrade, i, upgradeButton),
  );
  app.append(upgradeButton);
  upgradeButtons.push(upgradeButton);
  numUpgrades.push(0);
}

// AFPS (Auto Fries per Second) Counter
const afpsCounter: HTMLDivElement = document.createElement("div");
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
  for (let i = 0; i < availableItems.length; i++) {
    //Enable
    if (numFries >= availableItems[i].cost && upgradeButtons[i].disabled) {
      upgradeButtons[i].disabled = false;
    } //Disable
    else if (numFries < availableItems[i].cost && !upgradeButtons[i].disabled) {
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
  upgrade: Item,
  index: number,
  upgradeButton: HTMLButtonElement,
): void {
  // Subtract fries
  changeNumFries(-upgrade.cost);
  // Increase afps
  changeAFPS(upgrade.fps);
  // Increase numUpgrades and update counter in text
  numUpgrades[index]++;
  upgradeButton.innerHTML = `${upgrade.name} (${numUpgrades[index]})`;
  // Increase price of upgrade
  availableItems[index].cost *= upgradePriceIncreaseFactor;
}

function autoClickerLoop(currentTime: DOMHighResTimeStamp): void {
  const deltaTime: number = (currentTime - previousTime) / 1000;
  if (deltaTime >= autoClickerSecondsPerUpdate) {
    changeNumFries(afps);
    previousTime = currentTime;
  }
  requestAnimationFrame(autoClickerLoop);
}
