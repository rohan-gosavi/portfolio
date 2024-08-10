import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './content/about/about-us/about-us.component';
import { IntroComponent } from './content/intro/intro.component';
import { PhotographyServicesComponent } from './content/services/photography-services/photography-services.component';
import { SoftwareServicesComponent } from './content/services/software-services/software-services.component';
import { PhotographyWorkComponent } from './content/work/photography-work/photography-work.component';
import { SoftwareWorkComponent } from './content/work/software-work/software-work.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
    data: {
      description:
        'Introduction page which shows information about Rohan Gosavi',
    },
  },
  {
    path: '#',
    component: IntroComponent,
    data: {
      description:
        'Introduction page which shows information about Rohan Gosavi',
    },
  },
  {
    path: 'home',
    component: IntroComponent,
    data: {
      description:
        'Introduction page which shows information about Rohan Gosavi',
    },
  },

  {
    path: 'work',
    children: [
      {
        path: 'photography-work',
        component: PhotographyWorkComponent,
        data: { description: 'Photography showcasing as its my hobby' },
      },
      {
        path: 'software-work',
        component: SoftwareWorkComponent,
        data: { description: 'My work in software field' },
      },
    ],
  },

  {
    path: 'services',
    children: [
      { path: 'photography-services', component: PhotographyServicesComponent },
      { path: 'software-services', component: SoftwareServicesComponent },
    ],
  },

  { path: 'about', component: AboutUsComponent, data: { description: 'More Information about me' }  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
