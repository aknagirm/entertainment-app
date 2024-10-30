import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { VideoListDetails, VideoType } from './model/videoDetails.interface'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  nextPageToken: string = ''
  constructor(private http: HttpClient) {}

  searchVideo(
    videoLoadType: VideoType,
    searchString: string,
    nextPageToken: string
  ): Observable<VideoListDetails> {
    return this.http.get<VideoListDetails>(environment.search, {
      params: {
        videoType: videoLoadType,
        key: environment.key,
        q: searchString,
        pageToken: nextPageToken,
      },
    })
  }
}
