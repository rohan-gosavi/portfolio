import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

interface MediaItem {
  media_url: any;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class InstagramServiceService {
  accessToken =
    'IGQWROX1hMRHZAKNXFsNk5Sb1p2QXV5SDRBOGIzQVdTakIyUWE0bW9aZAnp5Skd6QUZABaUhwak1lSV9PNWg5MmxnMERHYWllaHE1VmFqZAE81VmEzTWl0ZAFlWMVAtejMzQlpuaDdIZA0VfQk40WkVvUGhmYnVXNkpCaDgZD';

  // Array to hold the Instagram image URLs
  images: string[] = [];
  nextPageCursor: any;
  private cache: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // getInstagramImages(page: number, pageSize: number): Observable<any> {
  //   let url = `https://graph.instagram.com/me/media?fields=media_url,caption&access_token=${this.accessToken}`;

  //   // If the page number is greater than 1, append the 'after' query parameter to fetch the next page
  //   if (page > 1) {
  //     url += `&after=${this.nextPageCursor}`;
  //   }

  //   return this.http.get<any>(url).pipe(
  //     map((response: any) => {
  //       this.nextPageCursor = response.paging.cursors.after; // Save the 'after' cursor for the next page
  //       return response.data.map((item: any) => ({
  //         name: item.caption,
  //         mediaUrl: item.media_url,
  //       }));
  //     }),
  //     catchError((error) => {
  //       console.log(error);
  //       return of([]);
  //     })
  //   );
  // }
  // getInstagramImages(page: number, pageSize: number): Observable<any> {
  //   const cacheKey = `page:${page},pageSize:${pageSize}`;
  //   const cachedData = this.cache[cacheKey];

  //   if (cachedData) {
  //     return of(cachedData);
  //   } else {
  //     const url = `https://graph.instagram.com/me/media?fields=media_url,caption&access_token=${this.accessToken}&page=${page}&pageSize=${pageSize}`;

  //     return this.http.get<any>(url).pipe(
  //       tap((response: any) => {
  //         this.cache[cacheKey] = response.data;
  //       }),
  //       catchError((error) => {
  //         console.error('Error fetching Instagram images:', error);
  //         return of(null);
  //       })
  //     );
  //   }
  // }
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
