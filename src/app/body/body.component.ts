import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { HttpService } from '../http.service'
import {
  VideoItemDetails,
  VideoListDetails,
  VideoType,
} from '../model/videoDetails.interface'
import { dummyResult } from '../model/dummy.const'
import { debounceTime, fromEvent, take } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { FormControl } from '@angular/forms'
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser'

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit, OnChanges {
  videoListDetails: VideoListDetails | undefined
  videoList: VideoItemDetails[] = []
  nextPageToken: string = ''
  errorMessage: string = ''
  prevDataLoadInProgress: boolean = false
  searchInputValue: string | undefined

  videoWindowHeight = 350
  videoWindowWidth = 550
  selectedVideoId!: SafeResourceUrl

  @Input() videoLoadType: VideoType | undefined = 'any'

  constructor(
    private httpService: HttpService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnChanges(): void {
    this.resetSearch()
    this.loadData()
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.videoListDetails = dummyResult
    this.videoList.push(...dummyResult.items)
    console.log(this.videoList)
    /* this.httpService
      .searchVideo(
        this.videoLoadType ?? 'any',
        this.searchInputValue ?? '',
        this.nextPageToken
      )
      .pipe(take(1))
      .subscribe({
        next: (data: VideoListDetails) => {
          this.videoListDetails = data
          this.videoList.push(...data.items)
          this.nextPageToken = data.nextPageToken
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.errorMessage = 'quotaOver'
          }
          console.log(this.errorMessage)
        },
      }) */
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
    this.resetSearch(false)
    this.loadData()
    console.log(this.searchInputValue)
  }

  playVideo(video: VideoItemDetails) {
    console.log(video.id)
    this.selectedVideoId = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1&enablejsapi=1`
    )
  }

  resetSearch(resetSearch: boolean = true): void {
    this.videoList = []
    this.videoListDetails = undefined
    this.nextPageToken = ''
    this.errorMessage = ''
    resetSearch ? (this.searchInputValue = undefined) : null
  }
}
