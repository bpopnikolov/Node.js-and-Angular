import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';
import { element } from 'protractor';


export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  ingredientAdded = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  addIngredient(ingredient: Ingredient) {

      if (this.ingredients.find(x => x.name === ingredient.name)) {
        this.ingredients.find(x => x.name === ingredient.name).amount += ingredient.amount;
      }
      else {
        this.ingredients.push(ingredient);
      }
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredients(ingr: Ingredient[]) {
    ingr.forEach(element => {

      let newElement: Ingredient = Object.create(element);

      if (this.ingredients.find(x => x.name === newElement.name)) {
        this.ingredients.find(x => x.name === newElement.name).amount += newElement.amount;
      }
      else {
        this.ingredients.push(newElement);
      }
    });

    //this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
}

}
