import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { routes } from './app.routes';
import { provideCore } from './core/app-config';

export const appConfig: ApplicationConfig = {
  providers: [provideCore({ routes })],
};
