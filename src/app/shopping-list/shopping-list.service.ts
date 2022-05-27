import { Ingredients } from '../models/ingredients.model';
import { Subject } from 'rxjs';


export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredients[]>();
    startedEditing = new Subject<number>();
    
    private ingredients: Ingredients[] = [];

    constructor() {
        let ingredientsStr = localStorage.getItem('shopping-list');
        if (ingredientsStr) {
          this.ingredients = JSON.parse(ingredientsStr) as Ingredients[];
        } else {
          this.ingredients = [];
        }
      }

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredientsByIndex(index: number){
        return this.ingredients[index];
    }

    addIngredients(ing: Ingredients){
        console.log(ing);
        this.ingredients.push(ing);
        this.ingredientsChanged.next(this.ingredients.slice());
        localStorage.setItem('shopping-list', JSON.stringify(this.ingredients));
    }

    updateIngredients(index: number, newIng: Ingredients){
        this.ingredients[index] = newIng;
        this.ingredientsChanged.next(this.ingredients.slice());
        localStorage.setItem('shopping-list', JSON.stringify(this.ingredients));
    }

    deleteIngredients(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
        localStorage.setItem('shopping-list', JSON.stringify(this.ingredients));
    }
}