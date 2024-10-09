import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Finally?? My amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Variables
let numFries: number = 0;
let previousTime: DOMHighResTimeStamp = performance.now();		// set it to performance.now() so when autoClickerLoop() runs for the first time it already can start comparing time
const autoClickerSecondsPerClick: number = 1;

// Fry Button
const button = document.createElement("button");
button.innerHTML = "🍟 make a french fry 🍟";
button.addEventListener("click", () => makeFries(1));
app.append(button);

// Fry Counter
const counter = document.createElement("div");
counter.innerHTML = `you have ${numFries} frenchy fries`;
app.append(counter);

// Auto Clicker
requestAnimationFrame(autoClickerLoop);

// Functions
function makeFries(amount: number): void {
  numFries += amount;
  counter.innerHTML = `you have ${numFries} frenchy fries`;
}

function autoClickerLoop(currentTime: DOMHighResTimeStamp): void {
  const deltaTime = (currentTime - previousTime) / 1000;
  if (deltaTime >= autoClickerSecondsPerClick) {
    makeFries(1);
    previousTime = currentTime;
  }
  requestAnimationFrame(autoClickerLoop);
}
