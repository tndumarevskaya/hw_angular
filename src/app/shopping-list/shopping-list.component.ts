import { ShoppingListService } from './shopping-list.service';
import { Ingredients } from '../models/ingredients.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredients[];
  ingChangSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingChangSub = this.shoppingListService.ingredientsChanged
    .subscribe(
      (ings: Ingredients[]) => {
        this.ingredients = ings;
      }
    );
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  onDelete(index: number){
    this.shoppingListService.deleteIngredients(index);
  }

  ngOnDestroy(){
    this.ingChangSub.unsubscribe();
  }
}
