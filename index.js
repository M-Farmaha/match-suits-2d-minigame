"use strict";

class CardGame {
  constructor(container, rows, columns) {
    this.container = container;
    this.rows = rows;
    this.columns = columns;
    this.score = 0;
    this.suits = ["hearts", "diamonds", "clubs", "spades"];

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.container.addEventListener("click", this.handleButtonClick);
    this.container.addEventListener("mouseover", this.handleMouseOver);
    this.container.addEventListener("mouseout", this.handleMouseOut);

    this.createCards();
  }

  handleMouseOver(event) {
    if (event.target.nodeName !== "BUTTON") return;

    const { suit } = event.target.dataset;
    const allCards = this.container.querySelectorAll(".card");
    const currentIndex = Array.from(allCards).indexOf(event.target);
    const adjasentIndexesArray = [currentIndex];

    let i = 0;

    while (i < adjasentIndexesArray.length) {
      const index = adjasentIndexesArray[i];

      if (
        allCards[index + 1]?.dataset.suit === suit &&
        (index + 1) % this.columns !== 0 &&
        !adjasentIndexesArray.includes(index + 1)
      ) {
        adjasentIndexesArray.push(index + 1);
      }

      if (
        allCards[index - 1]?.dataset.suit === suit &&
        index % this.columns !== 0 &&
        !adjasentIndexesArray.includes(index - 1)
      ) {
        adjasentIndexesArray.push(index - 1);
      }

      if (
        allCards[index + this.columns]?.dataset.suit === suit &&
        !adjasentIndexesArray.includes(index + this.columns)
      ) {
        adjasentIndexesArray.push(index + this.columns);
      }

      if (
        allCards[index - this.columns]?.dataset.suit === suit &&
        !adjasentIndexesArray.includes(index - this.columns)
      ) {
        adjasentIndexesArray.push(index - this.columns);
      }

      i += 1;
    }

    allCards.forEach((card, index) => {
      if (adjasentIndexesArray.includes(index)) {
        card.classList.add("hovered");
      }
    });
  }

  handleMouseOut() {
    const allCards = this.container.querySelectorAll(".card");

    allCards.forEach((card) => {
      card.classList.remove("hovered");
    });
  }

  handleButtonClick(event) {
    if (event.target.nodeName !== "BUTTON") return;

    const allCards = this.container.querySelectorAll(".card");

    allCards.forEach((card) => {
      if (card.classList.contains("hovered")) {
        this.score += 1;

        card.classList.remove("hovered");
        this.changeCardElement(card);
      }
    });

    setTimeout(() => {
      this.handleMouseOver(event);
    }, 250);

    this.updateScore()
  }

  changeCardElement(cardElement) {
    const currentSuit = cardElement.dataset.suit;
    const newSuits = this.suits.filter((suit) => suit !== currentSuit);
    const suit = newSuits[Math.floor(Math.random() * newSuits.length)];

    const svgPath = `svg/${suit}.svg`;
    const imgElement = cardElement.querySelector("img");

    cardElement.classList.add("hidden");

    setTimeout(() => {
      cardElement.dataset.suit = suit;
      imgElement.src = svgPath;
      imgElement.alt = suit;
      cardElement.classList.remove("hidden");
    }, 200);
  }

  createCardElement() {
    const suit = this.suits[Math.floor(Math.random() * this.suits.length)];
    const cardElement = document.createElement("button");
    const svgPath = `svg/${suit}.svg`;
    const imgElement = document.createElement("img");

    imgElement.setAttribute("src", svgPath);
    imgElement.setAttribute("alt", suit);
    imgElement.style.pointerEvents = "none";

    cardElement.classList.add("card");
    cardElement.dataset.suit = suit;
    cardElement.style.flex = `1 0 calc(100% / ${this.columns} - 5px)`;

    cardElement.appendChild(imgElement);

    return cardElement;
  }

  createCards() {
    for (let i = 0; i < this.rows * this.columns; i += 1) {
      const cardElement = this.createCardElement();
      this.container.appendChild(cardElement);
    }
  }

  updateScore() {
    const scoreElement = document.querySelector(".score");
    scoreElement.textContent = `Score: ${this.score}`;
  }
}

const container = document.querySelector(".container");
const cardGame = new CardGame(container, 7, 6);
