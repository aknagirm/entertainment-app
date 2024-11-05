import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  BehaviorSubject,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs'
import { environment } from 'src/environments/environment'
import {
  ContentItemDetails,
  ContentListDetails,
  VideoItemContentDetails,
  VideoItemDetails,
  VideoListContentDetails,
  VideoListDetails,
  VideoType,
} from './model/videoDetails.interface'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  nextPageToken: string = ''
  videoType: BehaviorSubject<VideoType> = new BehaviorSubject<VideoType>('any')
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  goToTop: Subject<undefined> = new Subject()

  constructor(private http: HttpClient) {}

  getVideoType(): Observable<VideoType> {
    return this.videoType.asObservable()
  }

  setVideoType(videoType: VideoType): void {
    this.videoType.next(videoType)
  }

  getGoToTop(): Observable<undefined> {
    return this.goToTop.asObservable()
  }

  setGoToTop(event: undefined): void {
    this.goToTop.next(event)
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable()
  }

  setIsLoading(event: boolean): void {
    this.isLoading.next(event)
  }

  searchVideo(
    videoLoadType: VideoType,
    searchString: string,
    nextPageToken: string
  ): Observable<VideoListContentDetails> {
    return this.http
      .get<VideoListDetails>(environment.search, {
        params: {
          videoType: videoLoadType,
          key: environment.key,
          q: searchString,
          pageToken: nextPageToken,
        },
      })
      .pipe(
        switchMap((data: VideoListDetails) => {
          const idList: string = data.items
            .map((item) => item.id.videoId)
            .join(',')
          return forkJoin([
            of(data),
            this.http.get<ContentListDetails>(environment.list, {
              params: { key: environment.key, id: idList },
            }),
          ])
        }),
        map(
          ([videoListDetails, contentListDetails]: [
            VideoListDetails,
            ContentListDetails,
          ]) => {
            const videoListContentDetails: VideoListContentDetails =
              videoListDetails
            videoListContentDetails.items.forEach(
              (videoItem: VideoItemContentDetails) => {
                const duration = contentListDetails.items.find(
                  (contentItem: ContentItemDetails) =>
                    contentItem.id === videoItem.id.videoId
                )?.contentDetails.duration
                if (duration === 'P0D') {
                  videoItem.duration = 'live'
                } else {
                  videoItem.duration = duration
                    ?.replace('PT', '')
                    .replace('H', 'h ')
                    .replace('M', 'm ')
                    .replace('S', 's ')
                }
              }
            )
            return videoListContentDetails
          }
        )
      )
  }
}
