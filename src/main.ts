import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Finally?? My amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Button
const button = document.createElement("button");
button.innerHTML = "🍟 make a french fry 🍟";
app.append(button);
