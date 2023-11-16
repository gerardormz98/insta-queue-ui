import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { EnqueuePageComponent } from './pages/enqueue-page/enqueue-page.component';
import { WaitlistPageComponent } from './pages/waitlist-page/waitlist-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full'},
  { path: 'enqueue', component: EnqueuePageComponent },
  { path: 'waitlist', component: WaitlistPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
