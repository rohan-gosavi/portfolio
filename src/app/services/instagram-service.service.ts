import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

interface MediaItem {
  media_url: any;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class InstagramServiceService {
  accessToken =
    'IGQVJXVjBVTGhCeC01dmZAWdnBSLXh4YlZAlNmhvZAVRwVXlFSDVqUXRqUnl3eUJOcktZAdjdVMV9JVlpWVmRfWTN3RW9PV2VLRGJJUlNxT2I5MU9WR3FSMkdheWROc0RhZAGpOcUhKaVpNbVoyazhCc2RsRgZDZD';

  // Array to hold the Instagram image URLs
  images: string[] = [];
  nextPageCursor: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
  }

  getInstagramImages(page: number, pageSize: number): Observable<any> {
    let url = `https://graph.instagram.com/me/media?fields=media_url,caption&access_token=${this.accessToken}&limit=${pageSize}`;
  
    // If the page number is greater than 1, append the 'after' query parameter to fetch the next page
    if (page > 1) {
      url += `&after=${this.nextPageCursor}`;
    }
  
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        this.nextPageCursor = response.paging.cursors.after; // Save the 'after' cursor for the next page
        return response.data.map((item: any) => ({
          name: item.caption,
          mediaUrl: item.media_url,
        }));
      }),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }
  
}
