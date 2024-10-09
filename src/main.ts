import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Finally?? My amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Variables
let numFries: number = 0;

// Fry Button
const button = document.createElement("button");
button.innerHTML = "🍟 make a french fry 🍟";
button.addEventListener("click", () => {
	numFries++;
	counter.innerHTML = `you have ${numFries} frenchy fries`;
});
app.append(button);

// Fry Counter
const counter = document.createElement("div");
counter.innerHTML = `you have ${numFries} frenchy fries`;
app.append(counter);