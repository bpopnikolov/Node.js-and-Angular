import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { NoRecipeSelectedComponent } from './no-recipe-selected/no-recipe-selected.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const recipesRoutes: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      { path: '', component: NoRecipeSelectedComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
      { path: ':id', component: RecipeDetailsComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule {

}
