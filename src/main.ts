import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Finally?? My amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Fry Button
const button = document.createElement("button");
button.innerHTML = "🍟 make a french fry 🍟";
app.append(button);

// Fry Counter
const counter = document.createElement("div");
counter.innerHTML = "you have " + 10 + " fries";
app.append(counter);