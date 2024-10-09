	import "./style.css";

	const app: HTMLDivElement = document.querySelector("#app")!;

	const gameName = "Finally?? My amazing game";
	document.title = gameName;

	const header = document.createElement("h1");
	header.innerHTML = gameName;
	app.append(header);

	// Variables
	let numFries: number = 0;
	const initialWorkerCost:number = 10;
	let previousTime: DOMHighResTimeStamp = performance.now(); // set it to performance.now() so when autoClickerLoop() runs for the first time it already can start comparing time
	const autoClickerSecondsPerClick: number = 1;

	// Fry Button
	const fryButton = document.createElement("button");
	fryButton.innerHTML = "🍟 make french fry 🍟";
	fryButton.addEventListener("click", () => makeFries(1));
	app.append(fryButton);

	// Fry Counter
	const counter = document.createElement("div");
	counter.innerHTML = `you have ${numFries} frenchy fries`;
	app.append(counter);

	// Auto Clicker
	requestAnimationFrame(autoClickerLoop);

	// Worker Button
	const workerButton = document.createElement("button");
	workerButton.innerHTML = "Hire worker";
	workerButton.disabled = true;
	app.append(workerButton);

	// Functions
	function makeFries(amount: number): void {
		// Add fries
		numFries += amount;
		// Update fry counter
		counter.innerHTML = `you have ${numFries} frenchy fries`;
		// Check to enable worker button
		if (numFries >= initialWorkerCost && workerButton.disabled) {
			workerButton.disabled = false;
		}
	}

	function autoClickerLoop(currentTime: DOMHighResTimeStamp): void {
		const deltaTime = (currentTime - previousTime) / 1000;
		if (deltaTime >= autoClickerSecondsPerClick) {
			makeFries(0);
			previousTime = currentTime;
		}
		requestAnimationFrame(autoClickerLoop);
	}
