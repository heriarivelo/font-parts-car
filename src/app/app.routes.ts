import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { ReservationComponent } from './reservation/reservation.component';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { CalculatriceComponent } from './admin/parts/calculatriceprix/calculatrice.component';
import { StocksComponent } from './admin/parts/stocks/stocks.component';
import { DashboardsComponent } from './admin/parts/dashboards/dashboards.component';
import { DashboardComponent } from './admin/cars/dashboards/dashboard.component';
import { ReservationsComponent } from './admin/cars/reservations/reservations.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


import { AuthGuard } from '../app/guards/auth.guard';
import { RoleGuard } from '../app/guards/role.guard';
import { CommandesFournisseursComponent } from './admin/parts/commandes-fournisseurs/commandes-fournisseurs.component';
import { UserManagementComponent } from './admin/parts/user-management/user-management.component';
import { ProfessionalClientsComponent } from './admin/parts/professional-clients/professional-clients.component';

import { ArcticlesMComponent } from './manager/parts/articles/articles.component';
import { DashboardsMComponent } from './manager/parts/dashboards/dashboards.component';
import { CommandeMComponent } from './manager/parts/Commande/commande.component';
import { NewMComponent } from './manager/parts/Commande/new/new.component';
import { FactureMComponent } from './manager/parts/Facture/facture.component';
import { FactureMDComponent } from './manager/parts/Facture/Detaille/factureD.component';
import { StocksMComponent } from './manager/parts/stocks/stocks.component';
import { EntrepotComponent } from './admin/parts/entrepot/entrepot.component';
import { ProduitComponent } from './admin/parts/produit/produit.component';
import { ImportListComponent } from './admin/parts/import-list/import-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'nos-vehicules', component: VehiculesComponent },

   { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

  { path: 'admin-stocks', component: StocksComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'admin-tableau-de-bord', component: DashboardsComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'admin-calculatrice-prix', component: CalculatriceComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'admin-commande', component: CommandesFournisseursComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'admin-gestion-users', component: UserManagementComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'admin-clients-pro', component: ProfessionalClientsComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'entrepot' , component: EntrepotComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'importation-historique' , component: ImportListComponent, canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  


  { path: 'admin-cars-dashboards', component: DashboardComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },
  { path: 'admin-cars-reservations', component: ReservationsComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN']} },



  { path: 'manager/article', component: ArcticlesMComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },
  { path: 'manager/tableau-de-bord', component: DashboardsMComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },
  { path: 'manager/commande', component: CommandeMComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },
  { path: 'manager/commande/new', component: NewMComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },
  { path: 'manager/facture', component: FactureMComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },
  { path: 'manager/facture/D', component: FactureMDComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },
  { path: 'manager/stock' , component: StocksMComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER']} },

  { path: 'inventaire-piece' , component: ProduitComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['MANAGER' , 'ADMIN']} },




  // { 
  //   path: 'admin', 
  //   component: AdminDashboardComponent,canActivate: [AuthGuard, RoleGuard],data: { roles: ['ADMIN'] }
  // },

  // Ajoutez d'autres routes ici
  { path: '**', redirectTo: '' } // Redirige vers la page d'accueil pour les routes non trouvées
];
