import {
  Component,
  OnInit,
  ViewChild,

} from '@angular/core';
import { NgForm } from '@angular/forms';
import { OnDestroy } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('slForm') slForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editItemID: number;
  editedItem: Ingredient;


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((itemID: number) => {
      this.editMode = true;
      this.editItemID = itemID;
      this.editedItem = this.shoppingListService.getIngredient(itemID);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const ingName = this.slForm.controls.name.value;
    const ingAmount = this.slForm.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemID, newIngredient);
    }
    else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClearForm();
  }

  onClearForm() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDeleteItem() {
    this.shoppingListService.deleteIngredient(this.editItemID);
    this.onClearForm();
  }

}
