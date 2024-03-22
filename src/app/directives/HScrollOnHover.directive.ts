import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHScrollOnHover]',
  // standalone: true,
})
export class HScrollOnHoverDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'overflow-y',
      'hidden'
    );
    this.renderer.setStyle(this.elementRef.nativeElement, 'overflow-x', 'auto');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'overflow-y', 'auto');
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'overflow-x',
      'hidden'
    );
  }

  @HostListener('wheel', ['$event']) onWheel(event: WheelEvent) {
    if (event.deltaY !== 0) {
      event.preventDefault();
      const direction = Math.sign(event.deltaY);
      window.scrollBy({
        left: direction * 100, // Adjust the scroll speed as needed
        behavior: 'smooth',
      });
    }
  }
}
