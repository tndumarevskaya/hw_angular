import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from '../models/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredients } from '../models/ingredients.model';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[];

  constructor(private shoppingListService: ShoppingListService) {
    let recipesStr = localStorage.getItem('recipes');
        if (recipesStr) {
          this.recipes = JSON.parse(recipesStr) as Recipe[];
        } else {
          this.recipes = [];
        }
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipeById(id: number){
    return this.recipes[id];
  }

  addIngredientToShoppingService(ingredient: Ingredients){
    this.shoppingListService.addIngredients(ingredient);
  }

  addRecipe(newRecipe: Recipe){
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }

  updateRecipe(index: number, updRecipe: Recipe){
    this.recipes[index] = updRecipe;
    this.recipeChanged.next(this.recipes.slice());
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }     
}