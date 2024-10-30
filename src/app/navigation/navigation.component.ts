import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { VideoType } from '../model/videoDetails.interface'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Output() videoLoadType: EventEmitter<VideoType> =
    new EventEmitter<VideoType>()

  constructor() {}

  ngOnInit(): void {}

  loadData(videoType: VideoType) {
    this.videoLoadType.emit(videoType)
  }
}
