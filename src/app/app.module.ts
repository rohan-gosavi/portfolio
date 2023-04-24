import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './header/top-nav/top-nav.component';
import { FooterComponent } from './footer/footer/footer.component';
import { AboutUsComponent } from './content/about/about-us/about-us.component';
import { PhotographyServicesComponent } from './content/services/photography-services/photography-services.component';
import { SoftwareServicesComponent } from './content/services/software-services/software-services.component';
import { PhotographyWorkComponent } from './content/work/photography-work/photography-work.component';
import { SoftwareWorkComponent } from './content/work/software-work/software-work.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './content/intro/intro.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    FooterComponent,
    AboutUsComponent,
    PhotographyServicesComponent,
    SoftwareServicesComponent,
    PhotographyWorkComponent,
    SoftwareWorkComponent,
    HomeComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
