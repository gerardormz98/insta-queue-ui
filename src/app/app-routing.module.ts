import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { EnqueuePageComponent } from './pages/enqueue-page/enqueue-page.component';
import { WaitlistPageComponent } from './pages/waitlist-page/waitlist-page.component';
import { CreateWaitlistPageComponent } from './pages/create-waitlist-page/create-waitlist-page.component';
import { AdminAccessPageComponent } from './pages/admin-access-page/admin-access-page.component';
import { validWaitlistCodeGuard } from './guards/valid-waitlist-code.guard';
import { userIsInWaitlistGuard } from './guards/user-is-in-waitlist.guard';
import { redirectIfUserIsEnqueuedGuard } from './guards/redirect-if-user-is-enqueued.guard';
import { WaitlistAdminPageComponent } from './pages/waitlist-admin-page/waitlist-admin-page.component';
import { userIsAdminGuard } from './guards/user-is-admin.guard';
import { WaitlistCompletePageComponent } from './pages/waitlist-complete-page/waitlist-complete-page.component';
import { WaitlistEditPageComponent } from './pages/waitlist-edit-page/waitlist-edit-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full', canActivate: [redirectIfUserIsEnqueuedGuard] },
  { path: 'enqueue/:code', component: EnqueuePageComponent, canActivate: [redirectIfUserIsEnqueuedGuard, validWaitlistCodeGuard] },
  { path: 'waitlist/:code', component: WaitlistPageComponent, canActivate: [validWaitlistCodeGuard, userIsInWaitlistGuard] },
  { path: 'create-waitlist', component: CreateWaitlistPageComponent, canActivate: [redirectIfUserIsEnqueuedGuard] },
  { path: 'admin-access/:code', component: AdminAccessPageComponent, canActivate: [redirectIfUserIsEnqueuedGuard, validWaitlistCodeGuard] },
  { path: 'waitlist-admin/:code', component: WaitlistAdminPageComponent, canActivate: [redirectIfUserIsEnqueuedGuard, validWaitlistCodeGuard, userIsAdminGuard] },
  { path: 'waitlist-edit/:code', component: WaitlistEditPageComponent, canActivate: [redirectIfUserIsEnqueuedGuard, validWaitlistCodeGuard, userIsAdminGuard] },
  { path: 'complete/:code', component: WaitlistCompletePageComponent, canActivate: [redirectIfUserIsEnqueuedGuard, validWaitlistCodeGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
