export class Card {
    id:number;
    imgSrc:string;
    isFlipped:boolean = false;
    isMatched:boolean = false;

    constructor(id:number, playTheme:string) {
        this.id = id;
        this.imgSrc = `/assets/img/${playTheme}_theme/${playTheme}_${id}.png`;
    }

}