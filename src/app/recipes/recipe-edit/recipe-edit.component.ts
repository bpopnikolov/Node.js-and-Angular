import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

  }

  private initForm() {
    let recipeName: string = '';
    let recipeImagePath: string = '';
    let recipeDescription: string = '';
    let recipeIngredients: FormArray = new FormArray([]);
    let recipeID: number;

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imageUrl;
      recipeDescription = recipe.description;
      recipe.ingredients.forEach(element => {
        recipeIngredients.push(new FormGroup({
          'name': new FormControl(element.name, Validators.required),
          'amount': new FormControl(element.amount, [Validators.required, Validators.pattern(/^[0-9]*$/)])
        }));
      });
      recipeID = recipe.id;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  onSubmit() {
    let newRecipe = new Recipe(
      this.recipeService.nextID() + 1,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );

    if (this.editMode) {
      newRecipe.id = this.id;
      this.recipeService.updateRecipe(this.id - 1, newRecipe);
    }
    else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(['../'], { relativeTo: this.route });

  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*$/)])
    }));
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
