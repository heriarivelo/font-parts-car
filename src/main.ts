import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { ContactComponent } from './app/contact/contact.component';
import { ServicesComponent } from './app/services/services.component';
import { ReservationComponent } from './app/reservation/reservation.component';
import { VehiculesComponent } from './app/vehicules/vehicules.component';
import { StocksComponent } from './app/admin/parts/stocks/stocks.component';
import { DashboardsComponent } from './app/admin/parts/dashboards/dashboards.component';
import { CalculatriceComponent } from './app/admin/parts/calculatriceprix/calculatrice.component';
import { DashboardComponent } from './app/admin/cars/dashboards/dashboard.component';
import { ReservationsComponent } from './app/admin/cars/reservations/reservations.component';
// import { AboutComponent } from './app/about.component';


import { AuthGuard } from '../src/app/guards/auth.guard';
import { RoleGuard } from '../src/app/guards/role.guard';
import { LoginComponent } from './app/pages/login/login.component';
import { RegisterComponent } from './app/pages/register/register.component';
import { CommandesFournisseursComponent } from './app/admin/parts/commandes-fournisseurs/commandes-fournisseurs.component';
import { UserManagementComponent } from './app/admin/parts/user-management/user-management.component';
import { ProfessionalClientsComponent } from './app/admin/parts/professional-clients/professional-clients.component';

import { ArcticlesMComponent } from './app/manager/parts/articles/articles.component';
import { DashboardsMComponent } from './app/manager/parts/dashboards/dashboards.component';
import { CommandeMComponent } from './app/manager/parts/Commande/commande.component';
import { NewMComponent } from './app/manager/parts/Commande/new/new.component';
import { FactureMComponent } from './app/manager/parts/Facture/facture.component';
import { FactureMDComponent } from './app/manager/parts/Facture/Detaille/factureD.component';
import { StocksMComponent } from './app/manager/parts/stocks/stocks.component';
import { EntrepotComponent } from './app/admin/parts/entrepot/entrepot.component';
import { ProduitComponent } from './app/admin/parts/produit/produit.component';
import { ImportListComponent } from './app/admin/parts/import-list/import-list.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'nos-vehicules', component: VehiculesComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'admin-stocks', component: StocksComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'admin-tableau-de-bord', component: DashboardsComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'admin-calculatrice-prix', component: CalculatriceComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'admin-commande', component: CommandesFournisseursComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'admin-gestion-users', component: UserManagementComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'admin-clients-pro', component: ProfessionalClientsComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'entrepot' , component: EntrepotComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'importation-historique' , component: ImportListComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },



  { path: 'admin-cars-dashboards', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'admin-cars-reservations', component: ReservationsComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },


    { path: 'manager/article', component: ArcticlesMComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },
    { path: 'manager/tableau-de-bord', component: DashboardsMComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },
    { path: 'manager/commande', component: CommandeMComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },
    { path: 'manager/commande/new', component: NewMComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },
    { path: 'manager/facture', component: FactureMComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },
    { path: 'manager/facture/D', component: FactureMDComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },
    { path: 'manager/stock' , component: StocksMComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },


      { path: 'inventaire-piece' , component: ProduitComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER' , 'ADMIN']} },
    



  // Ajoutez d'autres routes ici
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
});
