import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit, OnDestroy {
  @ViewChild('interest')
  interest!: ElementRef;
  private observer!: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const interest = document.querySelectorAll('.interest')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('in-view', entry.isIntersecting);
        });
      },
      {
        threshold: 1,
      }
    );

    interest.forEach(i => {
      observer.observe(i)
    })
  }

  ngOnDestroy() {
  }
}
