import { Ingredients } from './ingredients.model';
export class Recipe {
    public title: string;
    public description: string;
    public img: string;
    public ingredients: Ingredients[];

    constructor(title: string, desc: string, img: string, ingredients: Ingredients[]){
        this.title = title;
        this.description = desc;
        this.img = img;
        this.ingredients = ingredients;
    }
}