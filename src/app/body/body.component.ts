import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core'
import { HttpService } from '../http.service'
import {
  VideoItemContentDetails,
  VideoItemDetails,
  VideoListContentDetails,
  VideoListDetails,
  VideoType,
} from '../model/videoDetails.interface'
import { dummyResult } from '../model/dummy.const'
import { mergeMap, of, take } from 'rxjs'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  @ViewChild('videoWindow', { static: true }) videoWindow!: ElementRef

  videoListDetails: VideoListDetails | undefined
  videoList: VideoItemContentDetails[] = []
  nextPageToken: string = ''
  errorMessage: string = ''
  prevDataLoadInProgress: boolean = false
  searchInputValue: string | undefined
  searchInputValueChanged: boolean = false

  videoWindowHeight = 350
  videoWindowWidth = 550
  selectedVideoUrl!: SafeResourceUrl

  videoLoadType!: VideoType
  selectedVideo: VideoItemDetails | undefined

  constructor(
    private httpService: HttpService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.httpService
      .getVideoType()
      .pipe(
        mergeMap((videoLoadType) => {
          this.resetSearch()
          this.videoLoadType = videoLoadType
          this.searchInputValue = this.searchInputValueChanged
            ? this.searchInputValue
            : undefined
          this.searchInputValueChanged = false
          return of(this.loadData())
        })
      )
      .subscribe()
  }

  loadData(): void {
    /* this.videoListDetails = dummyResult
    this.videoList.push(...dummyResult.items)
    console.log(this.videoList) */
    this.httpService
      .searchVideo(
        this.videoLoadType ?? 'any',
        this.searchInputValue ?? '',
        this.nextPageToken
      )
      .pipe(take(1))
      .subscribe({
        next: (data: VideoListContentDetails) => {
          console.log(data)
          this.videoListDetails = data
          this.videoList.push(...data.items)
          this.nextPageToken = data.nextPageToken ?? ''
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.errorMessage = 'quotaOver'
          }
          console.log(this.errorMessage)
        },
      })
  }

  onScroll(event: Event) {
    const el = event.target as HTMLElement
    const scrollBuffer = el.scrollHeight - (el.scrollTop + el.clientHeight)

    if (scrollBuffer < 300 && !this.prevDataLoadInProgress) {
      this.prevDataLoadInProgress = true
      this.loadData()
    } else if (scrollBuffer > 300) {
      this.prevDataLoadInProgress = false
    }
  }

  searchVideos() {
    this.resetSearch()
    this.searchInputValueChanged = true
    this.httpService.setVideoType('any')
  }

  playVideo(video: VideoItemDetails) {
    this.selectedVideo = video
    this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1&enablejsapi=1&fs=0`
    )
    this.videoWindow.nativeElement.scrollIntoView({ behavior: 'smooth' })
  }

  resetSearch(): void {
    this.videoList = []
    this.videoListDetails = undefined
    this.nextPageToken = ''
    this.errorMessage = ''
    this.selectedVideo = undefined
  }
}
