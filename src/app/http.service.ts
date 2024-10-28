import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { VideoListDetails } from './model/videoDetails.interface'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  searchVideo(searchString: string = ''): Observable<VideoListDetails> {
    return this.http.get<VideoListDetails>(environment.search, {
      params: { key: environment.key, q: searchString },
    })
  }
}
