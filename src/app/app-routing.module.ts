import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate:[AuthGuard]
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
  },
  {
    path: 'map',
    loadChildren: './map/map.module#MapPageModule',
    canActivate:[AuthGuard]
  },

  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },

{
  path: 'register',
  loadChildren: './register/register.module#RegisterPageModule'
},
{
  path: 'settings',
  loadChildren: './setting/setting.module#SettingPageModule'
},
  { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
