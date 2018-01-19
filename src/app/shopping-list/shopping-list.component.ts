import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
    this.subscription = this.shoppingListService.ingredientAdded.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  onEditItem(itemID: number) {
    this.shoppingListService.startedEditing.next(itemID);

}


}
