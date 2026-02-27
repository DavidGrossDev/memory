import './styles/style.scss';
import { Foodcard } from './scripts/foodcards.class';


let playCards: Foodcard[] = [];
let flippedCards: Foodcard[] = [];

initGame();


function initGame(): void {
    playCards = [];
    flippedCards = [];

    for (let index = 0; index < 8; index++) {
        playCards.push(new Foodcard(index));
        playCards.push(new Foodcard(index));
    }
    shuffleCards(playCards);
    renderCards();
    console.log(playCards);



}

function shuffleCards(array: Foodcard[]) {
    array.sort(() => Math.random() - 0.5);
}

function renderCards() {
    const playdeckRef = document.getElementById('playdeck');
    if(!playdeckRef) return;

    let html = "";

    playCards.forEach((card, index) => {
        html += `
            <div class="card-foods" id="${index}">
                <img src="${card.imgSrc}">
            </div>
        `;
    });

    playdeckRef.innerHTML = html;
}