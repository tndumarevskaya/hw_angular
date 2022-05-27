import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {path:'', redirectTo:'/recipes', pathMatch:'full'},
    {
        path:'recipes', 
        component: RecipesComponent, 
        resolve: [RecipeResolverService],
        children: [
            {path:'', component: RecipeStartComponent},
            {path:'new', component: RecipeEditComponent},
            {
                path:':id', 
                component: RecipeDetailComponent,
                resolve: [RecipeResolverService]
            },
            {
                path:':id/edit', 
                component: RecipeEditComponent,
                resolve: [RecipeResolverService]
            }
        ]},
    {path:'shopping-list', component: ShoppingListComponent},    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}