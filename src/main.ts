// Pre-provided Stuff
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName: string = "🍟Fry Fever Fantasy 5🍟";
document.title = gameName;

const header: HTMLHeadingElement = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Fry Variables
let numFries: number = 0;
let afps: number = 0; // "auto fries per second"
const upgradePriceIncreaseFactor: number = 1.15;

// Auto Click Variables
let previousTime: DOMHighResTimeStamp = performance.now(); // set it to performance.now() so when autoClickerLoop() runs for the first time it already can start comparing time
const autoClickerSecondsPerUpdate: number = 1;

// Upgrades
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
// the following arrays are parallel
const upgradeButtons: HTMLButtonElement[] = [];
const numUpgrades: number[] = [];

// Fry Button
createButton("🍟 make french fry 🍟", () => changeNumFries(1)); // don't need to save reference to button because nothing references it

// Fry Counter
const fryCounter: HTMLDivElement = createDiv(
  `you have ${numFries.toFixed(0)} frenchy fries`,
);

// Upgrade Buttons
// make a button for each upgrade
for (let i = 0; i < availableItems.length; i++) {
  // initialize the number of player-purchased upgrades for this upgrade to 0
  numUpgrades.push(0);
  // get the upgrade data
  const upgrade: Item = availableItems[i];
  // create the upgrade button
  const upgradeButton: HTMLButtonElement = createButton(
    `${upgrade.name} (${numUpgrades[i]})`,
    () => purchaseUpgrade(upgrade, i, upgradeButton),
  );
  upgradeButton.title = upgrade.description;
  upgradeButton.disabled = true;
  // add the button to upgradeButtons[]
  upgradeButtons.push(upgradeButton);
}

// AFPS (Auto Fries per Second) Counter
const afpsCounter: HTMLDivElement = createDiv(
  `Fries per second: ${afps.toFixed(1)}`,
);

// Auto Clicker
requestAnimationFrame(autoClickerLoop); // initiate autoClickerLoop() to start recursively calling itself forever

// Functions
function createButton(
  innerHTML: string,
  clickEventFunction: () => void,
): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement("button");
  button.innerHTML = innerHTML;
  button.addEventListener("click", clickEventFunction);
  app.append(button);
  return button;
}

function createDiv(innerHTML: string): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.innerHTML = innerHTML;
  app.append(div);
  return div;
}

function changeNumFries(amount: number): void {
  // Change fries and update fry counter
  numFries += amount;
  fryCounter.innerHTML = `you have ${numFries.toFixed(0)} frenchy fries`;
  // Check to enable/disable upgrade buttons
  // loop over each upgrade button
  for (let i = 0; i < availableItems.length; i++) {
    // enable
    if (numFries >= availableItems[i].cost && upgradeButtons[i].disabled) {
      upgradeButtons[i].disabled = false;
    } // disable
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
  // get the delta time
  const deltaTime: number = (currentTime - previousTime) / 1000;
  // increase num fries if it's been long enough
  if (deltaTime >= autoClickerSecondsPerUpdate) {
    changeNumFries(afps);
    previousTime = currentTime;
  }
  // set up for this function to be called again on the next frame
  requestAnimationFrame(autoClickerLoop);
}
