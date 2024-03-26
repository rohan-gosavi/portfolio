import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHScrollOnHover]',
  // standalone: true,
})
export class HScrollOnHoverDirective {
  constructor(private element: ElementRef<HTMLElement>) {}

  @HostListener('wheel', ['$event'])
  public onScroll(event: WheelEvent) {
    event.preventDefault();
    const scrollLeft = this.element.nativeElement.scrollLeft;
    const scrollWidth = this.element.nativeElement.scrollWidth;
    const clientWidth = this.element.nativeElement.children[0]?.clientWidth;
    const snapWidth = clientWidth; // Assuming each snap point is the same width as the container's visible width
    let targetScrollLeft;

    if (event.deltaY < 0) {
      // Scrolling to the left
      targetScrollLeft = Math.max(0, scrollLeft - snapWidth);
    } else {
      // Scrolling to the right
      targetScrollLeft = Math.min(scrollWidth - clientWidth, scrollLeft + snapWidth);
    }

    this.element.nativeElement.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth' // Optional: Add smooth scrolling behavior
    });
  }
}
