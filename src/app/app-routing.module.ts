import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { StudyComponent } from './study/study.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'view', component:ViewComponent},
  {path:'study', component:StudyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
