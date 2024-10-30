import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core'
import { HttpService } from '../http.service'
import {
  VideoItemDetails,
  VideoListDetails,
} from '../model/videoDetails.interface'
import { dummyResult } from '../model/dummy.const'
import { debounceTime, fromEvent, take } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  videoListDetails: VideoListDetails | undefined
  videoList: VideoItemDetails[] = []
  nextPageToken: string = ''
  errorMessage: string = ''
  prevDataLoadInProgress: boolean = false
  searchInputValue: string | undefined

  constructor(
    private httpService: HttpService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.videoListDetails = dummyResult
    this.videoList.push(...dummyResult.items)
    console.log(this.videoList)
    //   this.httpService
    //     .searchVideo(this.searchInputValue, this.nextPageToken)
    //     .pipe(take(1))
    //     .subscribe({
    //       next: (data: VideoListDetails) => {
    //         this.videoListDetails = data
    //         this.videoList.push(...data.items)
    //         this.nextPageToken = data.nextPageToken
    //       },
    //       error: (error: HttpErrorResponse) => {
    //         if (error.status === 403) {
    //           this.errorMessage = 'quotaOver'
    //         }
    //         console.log(this.errorMessage)
    //       },
    //     })
  }

  onScroll(event: Event) {
    const el = event.target as HTMLElement
    const scrollBuffer = el.scrollHeight - (el.scrollTop + el.clientHeight)

    if (scrollBuffer < 300 && !this.prevDataLoadInProgress) {
      this.prevDataLoadInProgress = true
      console.log('called', scrollBuffer)
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

  resetSearch(resetSearch: boolean = true): void {
    this.videoList = []
    this.videoListDetails = undefined
    this.nextPageToken = ''
    this.errorMessage = ''
    resetSearch ? (this.searchInputValue = undefined) : null
  }
}
