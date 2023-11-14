"use strict";

const container = document.querySelector(".container");
const suits = ["hearts", "diamonds", "clubs", "spades"];
const rows = 7;
const columns = 6;

const handleButtonClick = (event) => {

    if (!event.target.closest("button")) {
      return;
    }
    console.log("click");
  };

container.addEventListener("click", handleButtonClick);

for (let i = 0; i < rows * columns; i += 1) {
  const cardEl = document.createElement("button");
  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const svgPath = `svg/${randomSuit}.svg`;
  const svgElement = document.createElement("img");

  cardEl.classList.add("card", randomSuit);
  svgElement.src = svgPath;

  cardEl.appendChild(svgElement);
  container.appendChild(cardEl);
}
