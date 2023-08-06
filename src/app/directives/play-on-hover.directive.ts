import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[playOnHover]',
})
export class PlayOnHoverDirective {
  constructor(private el: ElementRef<HTMLVideoElement>) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.play();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.pause();
  }
}
