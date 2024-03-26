import { Component, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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
        { name: 'Photography', link: 'work/photography-work/' },
        { name: 'Software', link: 'work/software-work/' },
      ],
      link: '#',
    },
    // {
    //   name: 'Services',
    //   subLinks: [
    //     { name: 'Photography Services', link: 'services/photography-services/' },
    //     { name: 'Software Services', link: 'services/software-services/' },
    //   ],
    // },
    { name: 'About Us', link: 'about/' },
  ];
  isMenuOpen: boolean | undefined;
  innerWidth: number = 768;

  constructor(
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @HostListener('window:resize', ['$event'])
  ngOnInit() {
    this.isMenuOpen = window.innerWidth >= 768;
    this.innerWidth = window.innerWidth;

    // Scroll to the contact section when the fragment changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.route.snapshot.fragment;
        if (fragment === 'contact') {
          const contactElement = document.getElementById('targetElement4');
          if (contactElement) {
            contactElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });
          }
        }
      });
  }

  scrollToElement() {
    const element =
      this.elementRef.nativeElement.querySelector('#targetElement4');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
    // if(this.innerWidth <= 768){
    //   this.isMenuOpen = false
    // }
  }
}

interface NavLink {
  name: string;
  link?: string;
  subLinks?: NavLink[];
}
