import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { MatMenuModule } from '@angular/material/menu';

import { SharedModule } from './shared';
import { AppComponent } from './app.component';
import { filter, tap } from 'rxjs/operators';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    SharedModule,
    LoadingBarRouterModule,
    MatMenuModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'guide', loadChildren: './guides/guides.module#GuidesModule' },
      { path: 'ui', loadChildren: './ui/ui.module#UIModule' },
      { path: 'examples', loadChildren: './examples/examples.module#ExamplesModule' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(router: Router) {
    router.events.pipe(
      filter(evt => evt instanceof NavigationEnd),
      tap(() => document.querySelector('.mat-sidenav-content').scrollTop = 0),
    ).subscribe();
  }
}
