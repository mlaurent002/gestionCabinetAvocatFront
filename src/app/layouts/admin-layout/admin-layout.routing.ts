import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { UtilisateurComponent } from 'app/pages/utilisateur/utilisateur.component';
import { AffaireComponent } from 'app/pages/affaire/affaire.component';
import { LoginComponent } from 'app/pages/login/login.component';
import { LogoutComponent } from 'app/pages/logout/logout.component';
import { TachesComponent } from 'app/pages/taches/taches.component';
import { TribunauxComponent } from 'app/pages/tribunaux/tribunaux.component';
import { EditAffaireComponent } from 'app/pages/edit/edit-affaire/edit-affaire.component';
import { EditTacheComponent } from 'app/pages/edit-tache/edit-tache.component';
import { EditUtilisateurComponent } from 'app/pages/edit/edit-utilisateur/edit-utilisateur.component';
import { DocumentComponent } from 'app/pages/document/document.component';
import { PhaseComponent } from 'app/pages/phase/phase.component';
import { EditPhaseComponent } from 'app/pages/edit/edit-phase/edit-phase.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'utilisateur', component: UtilisateurComponent },
    { path: 'affaires', component: AffaireComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'tache', component: TachesComponent },
    { path: 'tribunaux', component: TribunauxComponent },
    { path: 'tache/:id/phases', component: PhaseComponent },
    { path: 'editTache/:ref', component: EditTacheComponent },
    { path: 'editUtilisateur/:id', component: EditUtilisateurComponent },
    { path: 'affaires/document', component: DocumentComponent },
    { path: 'affaires/editAffaire/:id', component: EditAffaireComponent },
    { path: 'phases/editPhase/:idEdit', component: EditPhaseComponent },

];
