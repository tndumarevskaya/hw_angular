import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeSub: Subscription
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.recipeSub = this.recipeService.recipeChanged
     .subscribe(
      (newRecipes: Recipe[]) => {
        this.recipes = newRecipes;
      }
     );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.recipeSub.unsubscribe();
  }
}
