import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs/Subject';




@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(1, 'Fruit and Nuts Chocolate Bars', 'Snacks and Sandwiches', 'https://akispetretzikis.com/system/uploads/medium/data/3846/recipe_main_akis-petretzikis-mpares.jpg', [
      new Ingredient('50 g butter', 1),
      new Ingredient('200 g dark chocolate couverture', 1),
      new Ingredient('tablespoons honey', 1),
      new Ingredient('50 ml whiskey', 1),
      new Ingredient('90 g cookies', 1),
      new Ingredient('30 g hazelnuts', 1),
      new Ingredient('30 g Pistachio nuts', 1),
      new Ingredient('teaspoon cocoa power', 1)
    ]),
    new Recipe(2, 'Yogurt and blueberry popsicles', 'Good Living / Sweets / Desserts', 'https://akispetretzikis.com/system/uploads/medium/data/10270/recipe_main_disney-popsicles-site.jpg', [
      new Ingredient('280 g Greek strained yogurt', 1),
      new Ingredient('170 g honey', 1),
      new Ingredient('30 g water', 1),
      new Ingredient('400 g blueberries', 1)
    ]),
  ];

  constructor(private slService: ShoppingListService, private http: Http) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    const recipe = this.recipes.find((r) => {
      return r.id === id;
    });
    return recipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  nextID() {
    return this.recipes.length;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id - 1, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


}
