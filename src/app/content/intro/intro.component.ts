import { Component, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstagramServiceService } from 'src/app/services/instagram-service.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  accessToken =
    'IGQVJXYTBlNmhpR0hEVlRRdGxJSW45TEpjMEFjcU4zZA0g4TXp4eHhZAbTVKMFVMR2lhNFBzT0FzdWVfU3FsenJ4YmtLY1YyYjRwUkxSRzNDTXV0TWhEd3FGV3U1U19IUTlqYlBpUndmYzR4TW9yLUk2bQZDZD';
  posts: any = [];
  reels: any;
  private observer!: IntersectionObserver;

  isLoading = false;
  currentPage = 1;
  itemsPerPage = 10;
  
  constructor(
    private http: HttpClient,
    private igService: InstagramServiceService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Adjust this threshold to your preference for triggering the intersection event
    };

    this.observer = new IntersectionObserver(this.handleIntersection, options);
    this.observer.observe(this.elementRef.nativeElement);
    // this.igService.getInstagramImages().subscribe(
    //   (res: string[]) => {
    //     this.posts = res;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  private handleIntersection = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.loadContent();
        observer.unobserve(entry.target);
      }
    });
  };

  private loadContent() {
    this.isLoading = true;

    this.igService
      .getInstagramImages(this.currentPage, this.itemsPerPage)
      .subscribe(
        (res: any[]) => {
          this.posts?.push(...res);
          this.currentPage++;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }

  extractCaption(text: string): string {
    const regex = /::(.*?)::/;
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  }
}
