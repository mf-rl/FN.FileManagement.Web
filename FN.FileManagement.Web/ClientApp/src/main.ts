import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { CounterComponent } from './app/counter/counter.component';
import { FetchDataComponent } from './app/fetch-data/fetch-data.component';
import { FileUploadsComponent } from './app/file-uploads/file-uploads.component';
import { importProvidersFrom } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'file-uploads', component: FileUploadsComponent }
    ]),
    provideHttpClient(),
    importProvidersFrom(NgbModule),
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
  ]
}).catch(err => console.error(err));
