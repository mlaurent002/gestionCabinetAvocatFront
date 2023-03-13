import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TachesComponent } from './pages/taches/taches.component';
import { HttpClientModule } from "@angular/common/http";
import { TribunauxComponent } from './pages/tribunaux/tribunaux.component';
import { EditAffaireComponent } from './pages/edit/edit-affaire/edit-affaire.component';
import { EditTacheComponent } from './pages/edit-tache/edit-tache.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    EditAffaireComponent,
    EditTacheComponent

  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
