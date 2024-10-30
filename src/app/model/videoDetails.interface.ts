export type VideoType = 'any' | 'episode' | 'movie'

export interface VideoListDetails {
  etag: string
  kind: string
  nextPageToken: string
  regionCode: string
  pageInfo: PageInfo
  items: VideoItemDetails[]
}

export interface VideoItemDetails {
  etag: string
  kind: string
  snippet: Snippet
  id: Id
}

export interface Id {
  kind: string
  playlistId?: string
  videoId?: string
}

export interface Snippet {
  channelId: string
  channelTitle: string
  description: string
  liveBroadcastContent: string
  publishTime: string
  publishedAt: string
  thumbnails: ThumbnailsTypes
  title: string
}

export interface ThumbnailsTypes {
  default: ThumbnailsDetails
  high: ThumbnailsDetails
  medium: ThumbnailsDetails
}

export interface ThumbnailsDetails {
  height: number
  width: number
  url: string
}

export interface PageInfo {
  resultsPerPage: number
  totalResults: number
}
