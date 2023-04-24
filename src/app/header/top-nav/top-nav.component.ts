import { Component } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  navLinks: NavLink[] = [
    { name: 'Home', link: 'home/' },
    {
      name: 'Work',
      subLinks: [
        { name: 'Photography Work', link: 'work/photography-work/' },
        { name: 'Software Work', link: 'work/software-work/' },
      ],
    },
    {
      name: 'Services',
      subLinks: [
        { name: 'Photography Services', link: 'services/photography-services/' },
        { name: 'Software Services', link: 'services/software-services/' },
      ],
    },
    { name: 'About Us', link: 'about/' },
    // { name: 'Contact Us', link: '#' },
  ]; // Define an array of navigation links

  constructor() {}
}

interface NavLink {
  name: string;
  link?: string;
  subLinks?: NavLink[];
}
