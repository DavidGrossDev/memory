import './styles/style.scss';
import { Foodcard } from './scripts/foodcards.class';
import { cardTemplate } from './scripts/card.template';

let playCards: Foodcard[] = [];
let flippedCards: Foodcard[] = [];

let scoreOrange = 0;
let scoreBlue = 0;

let currentPlayerIconRef = document.getElementById('current_player_icon') as HTMLElement;

type Theme = "da_projects" | "foods";
type PlayerID = "orange" | "blue";
type PlaySize = 16 | 24 | 36;

let playtheme: Theme;
let currentPlayer: PlayerID;

initGame("foods", "orange", 16);

function initGame(theme: Theme, player: PlayerID, size: PlaySize): void {
    playtheme = theme;
    currentPlayer = player;
    let cardPairs = size / 2;


    setCurrentPlayerColor();

    playCards = [];
    flippedCards = [];

    for (let index = 0; index < cardPairs; index++) {
        playCards.push(new Foodcard(index));
        playCards.push(new Foodcard(index));
    }
    prepareGame(theme, size);
    shuffleCards(playCards);
    renderCards();
}

function prepareGame(theme: Theme, size: PlaySize) {
    let headerRef = document.getElementById('game_header') as HTMLElement;
    let headerH2Ref = document.getElementById('game_header_h2') as HTMLElement;
    let scoreBoardRef = document.getElementById('score_board') as HTMLElement;
    let exitBtnRef = document.getElementById('exit_btn') as HTMLButtonElement;
    let exitBtnSvgRef = document.getElementById('exit_btn_svg') as HTMLElement;
    let exitBtnTxtRef = document.getElementById('exit_btn_txt') as HTMLElement;
    let mainContentRef = document.getElementById('playdeck') as HTMLElement;
    if (theme === "foods") {
        headerRef.classList.add('game-header--foods');
        headerH2Ref.classList.add('current-player__title--foods');
        scoreBoardRef.classList.add('visual-score--foods');
        exitBtnRef.classList.add('exit-btn-foods');
        exitBtnSvgRef.classList.add('exit-btn-foods__svg');
        exitBtnTxtRef.classList.add('exit-btn-foods__text');
        mainContentRef.classList.add(`game-main-content--foods${size}`);
    } else {
        headerRef.classList.add('game-header--da-projects');
        headerH2Ref.classList.add('current-player__title--da-projects');
        scoreBoardRef.classList.add('visual-score--da-projects');
        exitBtnRef.classList.add('exit-btn-da-projects');
        exitBtnSvgRef.classList.add('exit-btn-da-projects__svg');
        exitBtnTxtRef.classList.add('exit-btn-da-projects__text');
        mainContentRef.classList.add(`game-main-content--da-projects${size}`);
    }
}

function shuffleCards(array: Foodcard[]) {
    array.sort(() => Math.random() - 0.5);
}

function renderCards() {
    const playdeckRef = document.getElementById('playdeck');
    if (!playdeckRef) return;
    playdeckRef.innerHTML = "";

    playCards.forEach((card, index) => {
        playdeckRef.innerHTML += cardTemplate(card, index, playtheme);
    });
}

document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const cardElement = target.closest(".card-foods") as HTMLElement;
    if (!cardElement) return;

    const index = Number(cardElement.dataset.index);
    console.log(index);

    flipCard(index);
});

function flipCard(index: number) {
    const card = playCards[index];

    if (flippedCards.length === 2) return;
    card.isFlipped = true;
    flippedCards.push(card);
    updatePlaydeck();

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function updatePlaydeck() {
    const allCards = document.querySelectorAll(".card");

    allCards.forEach((element, index) => {
        const card = playCards[index];

        if (card.isMatched || card.isFlipped) {
            element.classList.add("is-flipped");
        } else {
            element.classList.remove("is-flipped");
        }
    })
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.id === card2.id) {
        card1.isMatched = true;
        card2.isMatched = true;
        pointForCurrentPlayer();
        flippedCards = [];
    } else {
        setTimeout(() => {
            flipCardsBack(card1, card2);
            flippedCards = [];
            updatePlaydeck();
            currentPlayer = currentPlayer === "orange" ? "blue" : "orange";
            setCurrentPlayerColor();
        }, 1000);
    }
}

function pointForCurrentPlayer() {
    if (currentPlayer === "orange") {
        let scoreOrangeRef = document.getElementById('score_orange') as HTMLElement;
        scoreOrange++;
        scoreOrangeRef.innerText = scoreOrange.toString();

    } else {
        let scoreBlueRef = document.getElementById('score_blue') as HTMLElement;
        scoreBlue++;
        scoreBlueRef.innerText = scoreBlue.toString();
    }
}

function setCurrentPlayerColor() {
    currentPlayerIconRef.classList.remove('clr-or');
    currentPlayerIconRef.classList.remove('clr-bl');
    if(currentPlayer === "orange") {
        currentPlayerIconRef.classList.add('clr-or');
    } else {
        currentPlayerIconRef.classList.add('clr-bl');
    }
}

function flipCardsBack(card1: Foodcard, card2: Foodcard) {
    card1.isFlipped = false;
    card2.isFlipped = false;
}
