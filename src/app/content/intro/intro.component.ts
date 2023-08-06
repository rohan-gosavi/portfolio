import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstagramServiceService } from 'src/app/services/instagram-service.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  accessToken =
    'IGQVJYMG8zNno5SVhpZATVlZAGZAMbkNON0RwcS1yRGgtQjBzS2xZAN3B3VjRLb1g2UVRTR3ZA3UFVRQ3F4N2lHY21NSWZAUaXNSUnkxY2ZANUTBqNDEwTEtDS3VIMEJvelc4cWNkWTFEWnFBdS1raEgxY3RRagZDZD';
  posts: any = [];
  reels: any;
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 10;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight && !this.isLoading) {
      this.loadMorePosts();
    }
  }
  constructor(
    private http: HttpClient,
    private igService: InstagramServiceService
  ) {
    this.loadMorePosts();
  }

  ngOnInit(): void {
    // this.igService.getInstagramImages().subscribe(
    //   (res: string[]) => {
    //     this.posts = res;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  loadMorePosts() {
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
