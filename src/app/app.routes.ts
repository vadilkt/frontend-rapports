import { BordereauxComponent } from './bordereaux/bordereaux.component';
import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { BordereauDetailComponent } from './bordereau-detail/bordereau-detail.component';

export const routes: Routes = [
    { path: '', component: AccueilComponent },
    { path: 'bordereaux', component: BordereauxComponent },
    { path: 'bordereaux/:bordereauId', component: BordereauDetailComponent }
];
