import { Injectable, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilisateurComponent } from 'app/pages/utilisateur/utilisateur.component';
import { AffaireService } from 'app/services/affaire.service';
import { HttpClientModule } from '@angular/common/http';
import { AffaireComponent } from 'app/pages/affaire/affaire.component';

import { AppService } from 'app/app.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginComponent } from 'app/pages/login/login.component';
import { TachesComponent } from 'app/pages/taches/taches.component';
import { LogoutComponent } from 'app/pages/logout/logout.component';
import { TacheService } from 'app/services/tache.service';
import { TribunauxComponent } from 'app/pages/tribunaux/tribunaux.component';
import { TribunalService } from 'app/services/tribunal.service';
import { EditAffaireComponent } from 'app/pages/edit/edit-affaire/edit-affaire.component';
import { DocumentComponent } from 'app/pages/document/document.component';
import { EditUtilisateurComponent } from 'app/pages/edit/edit-utilisateur/edit-utilisateur.component';
import { EditTacheComponent } from 'app/pages/edit-tache/edit-tache.component';



@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UtilisateurComponent,
    LoginComponent,
    LogoutComponent,
    TachesComponent,
    AffaireComponent,
    TribunauxComponent,
    DocumentComponent,
    EditAffaireComponent,
    EditUtilisateurComponent,
    EditTacheComponent,

  ],

  providers: [
    AffaireService,
    TacheService,
    TribunalService,
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }
  ],
})

export class AdminLayoutModule { }
