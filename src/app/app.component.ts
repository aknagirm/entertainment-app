import { Component } from '@angular/core'
import { VideoType } from './model/videoDetails.interface'
import { HttpService } from './http.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = false
  title = 'entertainment-app'

  videoLoadType: VideoType | undefined

  constructor(private httpService: HttpService) {
    this.httpService.getIsLoading().subscribe((data) => (this.isLoading = data))
  }
}

// AIzaSyCPZLMlGmIJMf99rcmJ65KkcS7yokPdt-4
