import { Component, OnInit } from '@angular/core'
import { VideoType } from '../model/videoDetails.interface'
import { HttpService } from '../http.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  videoType!: VideoType

  constructor(public httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getVideoType().subscribe({
      next: (data) => (this.videoType = data),
    })
  }

  loadData(videoType: VideoType) {
    this.httpService.setVideoType(videoType)
  }

  goToTopCall() {
    this.httpService.setGoToTop(undefined)
  }

  goToProfile(): void {
    window.open('https://aknagirm.github.io/portfolio/', '_blank')
  }
}
