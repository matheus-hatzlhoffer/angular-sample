import { Component, signal } from '@angular/core';
import { MainLayout } from "./layout/main-layout/main-layout";

@Component({
  imports: [MainLayout],
  selector: 'sample-root',
  template: `<sample-main-layout/>`,
})
export class App {}
