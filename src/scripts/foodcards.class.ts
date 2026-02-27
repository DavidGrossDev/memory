export class Foodcard {
    id:number;
    imgSrc:string;
    isFlipped:boolean = false;
    isMatched:boolean = false;

    constructor(id:number) {
        this.id = id;
        this.imgSrc = `/assets/img/foods_theme/food_${id}.png`;
    }

}