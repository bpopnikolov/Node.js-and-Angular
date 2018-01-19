import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ErrorPageComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    ErrorPageComponent
  ],
    providers: [
    ShoppingListService,
    AuthGuardService,
    RecipeService,
    DataStorageService,
    AuthService
  ],
})
export class CoreModule {

}
