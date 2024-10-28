import { Component, OnInit } from '@angular/core'
import { HttpService } from '../http.service'
import { VideoListDetails } from '../model/videoDetails.interface'
import { dummyResult } from '../model/dummy.const'

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  videoList: VideoListDetails | undefined

  constructor(private httpService: HttpService) {}

  itemSize = 25

  ngOnInit(): void {
    this.videoList = dummyResult
    /* this.httpService.searchVideo().subscribe({
      next: (data) => {
        console.log(data)
        this.videoList = data
      },
    }) */
  }

  scrolledIndexChange(event: any) {
    console.log(event)
  }
}
