import { Routes } from '@angular/router';
import { Home } from './modules/home/home';
import { Test } from './modules/test/test';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'test', component: Test },

    /*Detecta cualquier url no encontrada*/
    { path: '**', redirectTo: 'home' },
];
