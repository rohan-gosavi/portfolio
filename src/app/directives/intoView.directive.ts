import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appIntoView]',
  // standalone: true,
})
export class IntoViewDirective implements OnInit, OnDestroy{
  @Output() insideViewport = new EventEmitter<boolean>();
  private observer!: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      this.insideViewport.emit(entry.isIntersecting);
    });
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
