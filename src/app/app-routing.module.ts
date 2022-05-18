import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { TemplatesComponent } from './pages/templates/templates.component';

const routes: Routes = [
  { path: 'template', component: TemplatesComponent },
  { path: 'reactivo', component: ReactiveComponent },
  { path: '**', pathMatch:'full', redirectTo:'reactivo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
