import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { VideoListDetails, VideoType } from './model/videoDetails.interface'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  nextPageToken: string = ''
  videoType: BehaviorSubject<VideoType> = new BehaviorSubject<VideoType>('any')

  constructor(private http: HttpClient) {}

  getVideoType(): Observable<VideoType> {
    return this.videoType.asObservable()
  }

  setVideoType(videoType: VideoType): void {
    this.videoType.next(videoType)
  }

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
