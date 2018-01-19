import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DataStorageService {

  constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) { }

  addRecipesToServer() {
    let token = this.authService.getToken();

    return this.http.put('https://ng-recipe-book-ff6ea.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipesFromServer() {
    let token = this.authService.getToken();

    this.http.get('https://ng-recipe-book-ff6ea.firebaseio.com/recipes.json?auth=' + token).map((response: Response) => {
      let recipes: Recipe[] = response.json();
      for (let recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return recipes;
    }).subscribe((recipes: Recipe[]) => {
      this.recipeService.addRecipes(recipes);
    }, (error: Response) => {
      console.log(error);
    });
  }

}
