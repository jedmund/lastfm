import type {
  LastfmOriginalUserInfoResponse,
  LastfmOriginalUserRecentTracksResponse,
  LastfmOriginalUserTopAlbumsResponse,
  LastfmUserInfo,
  LastfmUserTopAlbum,
  UserTopArtists,
  UserTopTracks,
  UserWeeklyAlbumChart
} from './packages/user'
import {
  LastfmOriginalTrackInfoResponse,
  LastfmTrackInfo
} from './packages/track'
import {
  LastfmAlbumInfo,
  LastfmOriginalAlbumInfoResponse
} from './packages/album'
import {
  LastfmArtistInfo,
  LastfmOriginalArtistInfoResponse
} from './packages/artist'
import {
  LastfmAuthGetSessionResponse,
  LastfmAuthGetTokenResponse,
  LastfmOriginalAuthGetSessionResponse
} from './packages/auth'
import { PaginatedResponse } from './packages/common'

export interface LastfmErrorResponse {
  error: number
  message: string
}

export type LastfmResponse<ORIGINAL, FORMATTED = ORIGINAL> = {
  original: ORIGINAL
  formatted: FORMATTED
}

export type GetOriginalResponse<R extends LastfmResponse<unknown, unknown>> =
  R['original']

export type GetFormattedResponse<R extends LastfmResponse<unknown, unknown>> =
  R['formatted']

export type LastfmResponses = {
  'user.getInfo': LastfmResponse<LastfmOriginalUserInfoResponse, LastfmUserInfo>
  'user.getRecentTracks': LastfmResponse<
    LastfmOriginalUserRecentTracksResponse<true | false>
  >
  'user.getTopArtists': LastfmResponse<
    UserTopArtists.OriginalResponse,
    PaginatedResponse<{ artists: UserTopArtists.Artist[] }>
  >
  'user.getTopTracks': LastfmResponse<
    UserTopTracks.OriginalResponse,
    PaginatedResponse<{ tracks: UserTopTracks.Track[] }>
  >
  'user.getTopAlbums': LastfmResponse<
    LastfmOriginalUserTopAlbumsResponse,
    PaginatedResponse<{ albums: LastfmUserTopAlbum[] }>
  >
  'user.getWeeklyAlbumChart': LastfmResponse<
    UserWeeklyAlbumChart.OriginalResponse,
    UserWeeklyAlbumChart.Response
  >
  'track.getInfo': LastfmResponse<
    LastfmOriginalTrackInfoResponse,
    LastfmTrackInfo
  >
  'album.getInfo': LastfmResponse<
    LastfmOriginalAlbumInfoResponse,
    LastfmAlbumInfo
  >
  'artist.getInfo': LastfmResponse<
    LastfmOriginalArtistInfoResponse,
    LastfmArtistInfo
  >
  'auth.getToken': LastfmResponse<LastfmAuthGetTokenResponse>
  'auth.getSession': LastfmResponse<
    LastfmOriginalAuthGetSessionResponse,
    LastfmAuthGetSessionResponse
  >
  'track.love': LastfmResponse<undefined>
  'track.unlove': LastfmResponse<undefined>
}

export type LastfmApiMethod = keyof LastfmResponses
