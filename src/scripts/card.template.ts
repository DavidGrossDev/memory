import { Foodcard } from './foodcards.class';


export function cardTemplate(card: Foodcard, index: number, playtheme:string) {
    return `<div class="card card-${playtheme}" data-index="${index}">
            <div class="card-foods__inner ">
                <div class="card-foods__face">
                    <img src="/assets/img/${playtheme}_theme/${playtheme}_card_front.png" alt="">
                </div>
                <div class="card-foods__face card-foods__face--bck">
                    <img src="${card.imgSrc}" alt="">
                </div>
            </div>
        </div>
        `;
}