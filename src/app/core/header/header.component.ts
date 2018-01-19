import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipes/recipe.service';
import { Response } from '@angular/http';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  constructor(private dataStorage: DataStorageService, private recipeService: RecipeService, public authService: AuthService) { }


  ngOnInit() { }

  onSave() {
    this.dataStorage.addRecipesToServer().subscribe((response: Response) => {
      console.log(response);
    },
      (error: Response) => {
        console.log(error);
      });
  }
  onFetchData() {
    this.dataStorage.getRecipesFromServer();
  }
  onLogout() {
    this.authService.logout();
  }
}
