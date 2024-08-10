import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface MediaItem {
  media_url: any;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class InstagramServiceService {
  accessToken = environment.instagramAccessToken;

  // Array to hold the Instagram image URLs
  images: string[] = [];
  nextPageCursor: any;
  private cache: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  getInstagramImages(page: number, pageSize: number): Observable<any> {
    const cacheKey = `page:${page},pageSize:${pageSize}`;
    const cachedData = this.cache[cacheKey];
    if (cachedData) {
      return of(cachedData);
    } else {
      let url = `https://graph.instagram.com/me/media?fields=media_url,caption,timestamp&access_token=${this.accessToken}`;
      // If the page number is greater than 1, append the 'after' query parameter to fetch the next page
      if (page > 1) {
        url += `&after=${this.nextPageCursor}`;
      }

      return this.http.get<any>(url).pipe(
        tap((response: any) => {
          this.nextPageCursor = response.paging.cursors.after; // Save the 'after' cursor for the next page
          this.cache[cacheKey] = response.data;
        }),
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      );
    }
  }
}
