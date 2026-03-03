import { Card } from './card.class';

export function cardTemplate(card: Card, index: number, playtheme:string) {
    return `<div class="card card-${playtheme}" data-index="${index}">
            <div class="card-${playtheme}__inner ">
                <div class="card-${playtheme}__face">
                    <img src="/assets/img/${playtheme}_theme/${playtheme}_card_front.png" alt="">
                </div>
                <div class="card-${playtheme}__face card-${playtheme}__face--bck">
                    <img src="${card.imgSrc}" alt="">
                </div>
            </div>
        </div>`;
}