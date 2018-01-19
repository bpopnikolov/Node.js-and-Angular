import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, CanActivate, PreloadAllModules } from '@angular/router';


import { HomeComponent } from './core/home/home.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'The page you are looking for doesn\'t exist' } },
  { path: '**', redirectTo: '/not-found' }

];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {usehash: true})
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule {

}
