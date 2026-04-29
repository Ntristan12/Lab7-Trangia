import 'zone.js';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamie } from '@angular/platform-browser-dynamic';
import { AppModule} from './app/app.module';
import { environment } from './environments/environment';
if (environment.production) {
enableProdMode();
}
platformBrowserDynamie().bootstrapModule (AppModule, { ngZone: 'zone.js' })
.catch(err => console.error(err));