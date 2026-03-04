import '../styles/style.scss'
import { Card } from './card.class';
import { cardTemplate } from './card.template';
import { showEndScreenFinalScore } from './end-screen.template';
import { winnerSvgtemplate } from './winner-svg.template';
import { showWinningScreen } from './win-screen.template';


const params = new URLSearchParams(window.location.search);
const theme = params.get("theme") as Theme;
const player = params.get("player") as PlayerID;
const board = Number(params.get("board")) as PlaySize;
let playCards: Card[] = [];
let flippedCards: Card[] = [];
let scoreOrange = 0;
let scoreBlue = 0;
const overlayRef = document.getElementById('game_overlay') as HTMLElement;
const exitCardRef = document.getElementById('exit_card') as HTMLElement;
const currentPlayerIconRef = document.getElementById('current_player_icon') as HTMLElement;
const exitBtnRef = document.getElementById('exit_btn') as HTMLElement;
const bckToGameRef = document.getElementById('bck_to_game') as HTMLElement;
const bckToHomeRef = document.getElementById('bck_to_home') as HTMLButtonElement;
const colorO = "#F58E39";
const colorB = "#097FC5";
const colorU = "#0000";
type Theme = "da_projects" | "foods";
type PlayerID = "orange" | "blue";
type PlaySize = 16 | 24 | 36;
let playtheme: Theme;
let currentPlayer: PlayerID;
let playSize: PlaySize;

initGame(theme, player, board);

function initGame(theme: Theme, player: PlayerID, size: PlaySize): void {
    setPlaythemeCurrentPlayerPlaysize(theme, player, size);
    let cardPairs = size / 2;
    setCurrentPlayerColor();
    playCards = [];
    flippedCards = [];
    for (let index = 0; index < cardPairs; index++) {
        playCards.push(new Card(index, playtheme));
        playCards.push(new Card(index, playtheme));
    }
    prepareGame(theme, size);
    shuffleCards(playCards);
    renderCards();
}

function setPlaythemeCurrentPlayerPlaysize(theme: Theme, player: PlayerID, size: PlaySize) {
    playtheme = theme;
    currentPlayer = player;
    playSize = size;
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
        setFoodTheme(headerRef, headerH2Ref, scoreBoardRef, exitBtnRef, exitBtnSvgRef, exitBtnTxtRef, mainContentRef, size);
    } else {
        setDaProjectsTheme(headerRef, headerH2Ref, scoreBoardRef, exitBtnRef, exitBtnSvgRef, exitBtnTxtRef, mainContentRef, size);
    }
}

function setFoodTheme(headerRef: HTMLElement, headerH2Ref: HTMLElement, scoreBoardRef: HTMLElement, exitBtnRef: HTMLElement, exitBtnSvgRef: HTMLElement, exitBtnTxtRef: HTMLElement, mainContentRef: HTMLElement, size: PlaySize) {
    headerRef.classList.add('game-header--foods');
    headerH2Ref.classList.add('current-player__title--foods');
    scoreBoardRef.classList.add('visual-score--foods');
    exitBtnRef.classList.add('exit-btn-foods');
    exitBtnSvgRef.classList.add('exit-btn-foods__svg');
    exitBtnTxtRef.classList.add('exit-btn-foods__text');
    mainContentRef.classList.add(`game-main-content--foods${size}`);
}

function setDaProjectsTheme(headerRef: HTMLElement, headerH2Ref: HTMLElement, scoreBoardRef: HTMLElement, exitBtnRef: HTMLElement, exitBtnSvgRef: HTMLElement, exitBtnTxtRef: HTMLElement, mainContentRef: HTMLElement, size: PlaySize) {
    headerRef.classList.add('game-header--da-projects');
    headerH2Ref.classList.add('current-player__title--da-projects');
    scoreBoardRef.classList.add('visual-score--da-projects');
    exitBtnRef.classList.add('exit-btn-da-projects');
    exitBtnSvgRef.classList.add('exit-btn-da-projects__svg');
    exitBtnTxtRef.classList.add('exit-btn-da-projects__text');
    mainContentRef.classList.add(`game-main-content--da-projects${size}`);
}

function shuffleCards(array: Card[]) {
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
    const cardElement = target.closest(".card") as HTMLElement;
    if (!cardElement) return;
    const index = Number(cardElement.dataset.index);
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
    let allCards = document.querySelectorAll(".card");
    allCards.forEach((element, index) => {
        let card = playCards[index];
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
        checkWinningCondition();
    } else {
        setTimeout(() => {
            flipCardsBackAndUpdate(card1, card2);
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

function checkWinningCondition() {
    let maxScore = scoreOrange + scoreBlue;
    let maxPairs = playSize / 2;
    let endScreenRef = document.getElementById('end_screen') as HTMLElement;
    let winScreenRef = document.getElementById('winner_screen') as HTMLElement;

    if (!(maxScore == maxPairs)) return;
    resetOverlay(overlayRef, endScreenRef, winScreenRef);
    showEndScreen(overlayRef, endScreenRef);
    setTimeout(() => {
        showWinner(scoreOrange, scoreBlue, endScreenRef, overlayRef, winScreenRef);
    }, 4000);
}

function resetOverlay(overlayRef: HTMLElement, endScreenRef: HTMLElement, winScreenRef: HTMLElement) {
    overlayRef.classList.add('d_none');
    overlayRef.classList.remove('bck-wh');
    overlayRef.classList.remove('bck-or');
    overlayRef.classList.remove('bck-bl');
    endScreenRef.classList.add('d_none');
    winScreenRef.classList.add('d_none');
    winScreenRef.innerHTML = "";
}

function showEndScreen(overlayRef: HTMLElement, endScreenRef: HTMLElement) {
    overlayRef.classList.remove('d_none');
    if (playtheme === "foods") {
        overlayRef.classList.add('bck-or');
    } else {
        overlayRef.classList.add('bck-bl');
    }
    endScreenRef.classList.remove('d_none');
    endScreenRef.innerHTML = showEndScreenFinalScore(playtheme);
    let endScoreORef = document.getElementById('end_score_orange') as HTMLElement;
    let endScoreBRef = document.getElementById('end_score_blue') as HTMLElement;
    endScoreORef.innerText = scoreOrange.toString();
    endScoreBRef.innerText = scoreBlue.toString();
}

function showWinner(scoreOrange: number, scoreBlue: number, endScreenRef: HTMLElement, overlayRef: HTMLElement, winScreenRef: HTMLElement) {
    let winnerSvg = "";
    if (scoreOrange > scoreBlue) {
        prepareWinningScreen(endScreenRef, overlayRef, winScreenRef);
        winnerSvg = winnerSvgtemplate(playtheme, colorO);
        winScreenRef.innerHTML = showWinningScreen("Orange", playtheme, winnerSvg);
    } else if (scoreOrange < scoreBlue) {
        prepareWinningScreen(endScreenRef, overlayRef, winScreenRef);
        winnerSvg = winnerSvgtemplate(playtheme, colorB);
        winScreenRef.innerHTML = showWinningScreen("Blue", playtheme, winnerSvg);
    } else {
        prepareWinningScreen(endScreenRef, overlayRef, winScreenRef);
        winnerSvg = winnerSvgtemplate(playtheme, colorU);
        winScreenRef.innerHTML = showWinningScreen("Both", playtheme, winnerSvg);
    }
}

function prepareWinningScreen(endScreenRef: HTMLElement, overlayRef: HTMLElement, winScreenRef: HTMLElement) {
    endScreenRef.classList.add('d_none');
    overlayRef.classList.remove('bck-or');
    overlayRef.classList.remove('bck-bl');
    if (playtheme === "foods") {
        overlayRef.classList.add('bck-wh');
    } else {
        overlayRef.classList.add('bck-bl');
    }
    winScreenRef.classList.remove('d_none');
}

function setCurrentPlayerColor() {
    currentPlayerIconRef.classList.remove('clr-or');
    currentPlayerIconRef.classList.remove('clr-bl');
    if (currentPlayer === "orange") {
        currentPlayerIconRef.classList.add('clr-or');
    } else {
        currentPlayerIconRef.classList.add('clr-bl');
    }
}

function flipCardsBackAndUpdate(card1:Card, card2:Card) {
    flipCardsBack(card1, card2);
    flippedCards = [];
    updatePlaydeck();
    currentPlayer = currentPlayer === "orange" ? "blue" : "orange";
    setCurrentPlayerColor();
}

function flipCardsBack(card1: Card, card2: Card) {
    card1.isFlipped = false;
    card2.isFlipped = false;
}

function exitGame() {
    overlayRef.classList.remove('d_none');
    exitCardRef.classList.remove('d_none');
}

function bckToGame() {
    overlayRef.classList.add('d_none');
    exitCardRef.classList.add('d_none');
}

exitBtnRef?.addEventListener('click', () => {
    exitGame();
});

bckToGameRef?.addEventListener('click', () => {
    bckToGame();
});


bckToHomeRef.addEventListener('click', () => {
    window.location.href = "index.html";
})