import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [HomeComponent, MainComponent],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
