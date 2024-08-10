import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstagramServiceService } from 'src/app/services/instagram-service.service';

@Component({
  selector: 'app-photography-work',
  templateUrl: './photography-work.component.html',
  styleUrls: ['./photography-work.component.scss'],
})
export class PhotographyWorkComponent {
  accessToken: string = '';
  posts: any = [];
  reels: any;
  private observer!: IntersectionObserver;

  isLoading = false;
  currentPage = 1;
  itemsPerPage = 10;
  page: number = 1;
  pageSize: number = 10;
  instagramImages: any[] = [];
  accessTokenForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private igService: InstagramServiceService,
    private elementRef: ElementRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.accessTokenForm = this.fb.group({
      accessToken: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.accessTokenForm.valid) {
      this.accessToken = this.accessTokenForm.get('accessToken')?.value;
      this.fetchInstagramImages(this.accessToken);
      this.isLoading = false;
    } else {
      console.log('Form is invalid');
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      !this.isLoading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.accessToken
    ) {
      this.fetchInstagramImages(this.accessToken);
    }
  }

  private fetchInstagramImages(access_token: string): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.igService
        .getInstagramImages(this.page, this.pageSize, access_token)
        .subscribe(
          (response: any) => {
            this.posts.push(
              ...response.data.filter((d: { media_url: string | string[] }) => {
                return d.media_url.includes('.webp');
              })
            );
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
