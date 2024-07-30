import type {
  LastfmDate,
  LastfmImage,
  LastfmRawImage,
  PaginatedResponseAttributes,
  Period,
  StringRecord
} from './common.js'

// user.getInfo
export interface LastfmOriginalUserInfoResponse {
  user: {
    name: string
    realname: string
    url: string
    country: string
    age: string
    playcount: string
    registered: {
      unixtime: string
      '#text': number
    }
    image: LastfmRawImage[]
    bootstrap: string
    subscriber: string
    playlists: string
    type: string
    gender: string
  }
}

export interface LastfmUserInfo {
  name: string
  realName: string
  url: string
  country: string
  age: number
  playCount: number
  registered: Date
  images: LastfmImage[]
  subscriber: boolean
  gender: string
}

// user.getRecentTracks
/**
 * Recent track listened by the user (from user.getRecentTracks).
 *
 * {@link https://www.last.fm/api/show/user.getRecentTracks API Reference}
 */
export interface LastfmUserRecentTracksParams {
  /**
   * The number of results to fetch per page. Defaults to 50
   */
  limit?: number
  /**
   * The page number to fetch. Defaults to first page
   */
  page?: number
  /**
   * Beginning timestamp of a range - only display scrobbles after this time
   */
  from?: Date
  /**
   *  End timestamp of a range - only display scrobbles before this time
   */
  to?: Date
  /**
   * Extended response includes whether the user has loved each track
   * The API also returns images for the artists of each track, but this is omitted since it defaults to a default image
   */
  extended?: boolean
}

export interface LastfmUserRecentTracksResponseTrack {
  artist: StringRecord<'mbid' | 'name' | 'url' | '#text'>
  streamable: '0' | '1'
  image: LastfmRawImage[]
  mbid: string
  album: StringRecord<'mbid' | '#text'>
  name: string
  url: string
  date?: LastfmDate
  '@attr'?: {
    nowplaying: 'true'
  }
}

export interface LastfmUserRecentTracksResponseTrackExtended
  extends LastfmUserRecentTracksResponseTrack {
  artist: StringRecord<'mbid' | 'name' | 'url' | '#text'> & {
    image: LastfmRawImage[]
  }
  loved: '1' | '0'
}

export type LastfmUserRecentTrackResponseResource<EXTENDED extends boolean> =
  EXTENDED extends true
    ? LastfmUserRecentTracksResponseTrackExtended
    : LastfmUserRecentTracksResponseTrack

export interface LastfmOriginalUserRecentTracksResponse<
  EXTENDED extends boolean
> {
  recenttracks: {
    track:
      | LastfmUserRecentTrackResponseResource<EXTENDED>
      | LastfmUserRecentTrackResponseResource<EXTENDED>[]
    '@attr': PaginatedResponseAttributes<'user'>
  }
}

export interface LastfmRecentTracksTrack {
  name: string
  mbid?: string
  streamable: boolean
  artist: {
    name: string
    mbid?: string
  }
  images: LastfmImage[]
  album: {
    name: string
    mbid?: string
  }
  url: string
  date?: Date
  nowPlaying?: boolean
}

export interface LastfmRecentTracksTrackExtended
  extends LastfmRecentTracksTrack {
  loved: boolean
}

export type LastfmRecentTracksTrackResource<EXTENDED extends boolean> =
  EXTENDED extends true
    ? LastfmRecentTracksTrackExtended
    : LastfmRecentTracksTrack

export interface LastfmRecentTracksResponse<EXTENDED extends boolean> {
  tracks: LastfmRecentTracksTrackResource<EXTENDED>[]
  attr: PaginatedResponseAttributes<'user'>
}

// user.getTopArtists
export module UserTopArtists {
  export interface Params {
    /**
     * The time period over which to retrieve top artists for. Defaults for overall
     */
    period?: Period
    /**
     * The number of results to fetch per page. Defaults to 50
     */
    limit?: number
    /**
     * The page number to fetch. Defaults to first page
     */
    page?: number
  }

  export interface OriginalResponse {
    topartists: {
      artist: {
        name: string
        mbid?: string
        url: string
        playcount: string
        streamable: string
        '@attr': StringRecord<'rank'>
        image: LastfmRawImage[]
      }[]
      '@attr': PaginatedResponseAttributes<'user'>
    }
  }

  export interface Artist {
    name: string
    mbid?: string
    url: string
    playCount: number
    streamable: boolean
    rank: number
    images: LastfmImage[]
  }
}

// user.getTopAlbums

export interface LastfmUserTopAlbumsParams {
  /**
   * The time period over which to retrieve top albums for. Defaults for overall
   */
  period?: Period
  /**
   * The number of results to fetch per page. Defaults to 50
   */
  limit?: number
  /**
   * The page number to fetch. Defaults to first page
   */
  page?: number
}

export interface LastfmOriginalUserTopAlbumsResponse {
  topalbums: {
    album: {
      artist: {
        url: string
        name: string
        mbid?: string
      }
      image: LastfmRawImage[]
      mbid?: string
      url: string
      playcount: string
      name: string
      '@attr': {
        rank: string
      }
    }[]
    '@attr': PaginatedResponseAttributes<'user'>
  }
}

export interface LastfmUserTopAlbum {
  artist: {
    url: string
    name: string
    mbid?: string
  }
  name: string
  mbid?: string
  images: LastfmImage[]
  playCount: number
  rank: number
}

// user.getTopTracks
export module UserTopTracks {
  export interface Params {
    /**
     * The time period over which to retrieve top tracks for. Defaults for overall
     */
    period?: Period
    /**
     * The number of results to fetch per page. Defaults to 50
     */
    limit?: number
    /**
     * The page number to fetch. Defaults to first page
     */
    page?: number
  }

  export interface OriginalResponse {
    toptracks: {
      track: {
        name: string
        mbid?: string
        url: string
        duration?: string
        playcount: string
        streamable: StringRecord<'fulltrack'>
        artist: {
          url: string
          name: string
          mbid?: string
        }
        '@attr': StringRecord<'rank'>
        image: LastfmRawImage[]
      }[]
      '@attr': PaginatedResponseAttributes<'user'>
    }
  }

  export interface Track {
    name: string
    mbid?: string
    url: string
    playCount: number
    /**
     * Duration of the track in seconds
     */
    duration?: number
    artist: {
      url: string
      name: string
      mbid?: string
    }
    streamable: boolean
    rank: number
    images: LastfmImage[]
  }
}

// user.getWeeklyAlbumChart
export module UserWeeklyAlbumChart {
  export interface Params {
    /**
     * The date at which the chart should start from.
     * This should be in unix timestamp format.
     */
    from?: number
    /**
     * The date at which the chart should end on.
     * This should be in unix timestamp format.
     */
    to?: number
  }

  export interface OriginalResponse {
    weeklyalbumchart: {
      album: {
        artist: {
          mbid?: string
          '#text': string
        }
        name: string
        mbid?: string
        playcount: string
        url: string
        '@attr': {
          rank: string
        }
      }[]
      '@attr': {
        user: string
        from: string
        to: string
      }
    }
  }

  export interface Album {
    artist: {
      name: string
      mbid?: string
    }
    name: string
    mbid?: string
    playCount: number
    url: string
    rank: number
  }

  export interface Response {
    albums: Album[]
    attr: {
      user: string
      from: Date
      to: Date
    }
  }
}
