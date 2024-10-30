import { Component } from '@angular/core'
import { VideoType } from './model/videoDetails.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'entertainment-app'

  videoLoadType: VideoType | undefined
}

// AIzaSyCPZLMlGmIJMf99rcmJ65KkcS7yokPdt-4
