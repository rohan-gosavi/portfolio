import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener } from '@angular/core';
import { InstagramServiceService } from 'src/app/services/instagram-service.service';

@Component({
  selector: 'app-photography-work',
  templateUrl: './photography-work.component.html',
  styleUrls: ['./photography-work.component.scss']
})
export class PhotographyWorkComponent {
  accessToken =
  'IGQWROX1hMRHZAKNXFsNk5Sb1p2QXV5SDRBOGIzQVdTakIyUWE0bW9aZAnp5Skd6QUZABaUhwak1lSV9PNWg5MmxnMERHYWllaHE1VmFqZAE81VmEzTWl0ZAFlWMVAtejMzQlpuaDdIZA0VfQk40WkVvUGhmYnVXNkpCaDgZD';
posts: any = [];
reels: any;
private observer!: IntersectionObserver;

isLoading = false;
currentPage = 1;
itemsPerPage = 10;
page: number = 1;
pageSize: number = 10;
instagramImages: any[] = [];

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
  this.fetchInstagramImages();

  // this.observer = new IntersectionObserver(this.handleIntersection, options);
  // this.observer.observe(this.elementRef.nativeElement);
  // this.igService.getInstagramImages().subscribe(
  //   (res: string[]) => {
  //     this.posts = res;
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );
}

// private handleIntersection = (
//   entries: IntersectionObserverEntry[],
//   observer: IntersectionObserver
// ) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       this.loadContent();
//       observer.unobserve(entry.target);
//     }
//   });
// };

// private loadContent() {
//   this.isLoading = true;

//   this.igService
//     .getInstagramImages(this.currentPage, this.itemsPerPage)
//     .subscribe(
//       (res: any[]) => {
//         this.posts?.push(...res);
//         this.currentPage++;
//         this.isLoading = false;
//       },
//       (error) => {
//         console.log(error);
//         this.isLoading = false;
//       }
//     );
// }
@HostListener('window:scroll', [])
onScroll(): void {
  if (
    !this.isLoading &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight
  ) {
    this.fetchInstagramImages();
  }
}

private fetchInstagramImages(): void {
  if (!this.isLoading) {
    this.isLoading = true;
    this.igService.getInstagramImages(this.page, this.pageSize).subscribe(
      (response: any) => {
        this.posts.push(...response.data.filter((d: { media_url: string | string[]; }) => {
          return d.media_url.includes('.webp')
        }));
        this.page++;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching Instagram images:', error);
        this.isLoading = false;
      }
    );
  }
}

extractCaption(text: string): string {
  const regex = /::(.*?)::/;
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}
}