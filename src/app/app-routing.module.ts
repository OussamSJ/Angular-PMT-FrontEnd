import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/unauth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DetailsComponent } from './pages/pokemon/details/details.component';
import { GeneralComponent } from './pages/pokemon/general/general.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'login',
    canActivate: [UnAuthGuard],
    component: LoginComponent
  },
  {
    path: 'signup',
    canActivate: [UnAuthGuard],
    component: SignupComponent
  },
  {
    path: 'pokemon/:id',
    canActivate: [AuthGuard],
    component: PokemonComponent,
    children: [
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full',
      },
      {
        path: 'general',
        component: GeneralComponent,
      },
      {
        path: 'details',
        component: DetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
