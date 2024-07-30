import { LastClient } from '../src/LastClient.js'

const client = new LastClient(process.env.LASTFM_KEY!)

async function main() {
  const user = await client.user.getInfo('metye')

  console.log('User', user.realName)

  const albums = await client.user.getTopAlbums('metye')
  const artists = await client.user.getTopArtists('metye')
  const tracks = await client.user.getTopTracks('metye')

  const weeklyAlbums = await client.user.getWeeklyAlbumChart('metye', {
    from: 1721692800,
    to: 1722211199
  })

  console.log('Top album of', albums.pagination.total, ':', albums.albums[0])
  console.log(
    'Top artist of',
    artists.pagination.total,
    ':',
    artists.artists[0]
  )
  console.log('Top track of', tracks.pagination.total, ':', tracks.tracks[0])

  // Log weekly album chart information
  console.log('Weekly Album Chart:')
  console.log(
    '  Time period:',
    weeklyAlbums.attr.from.toDateString(),
    'to',
    weeklyAlbums.attr.to.toDateString()
  )
  console.log('  Total albums:', weeklyAlbums.albums.length)
  console.log('  Top 3 albums:')
  weeklyAlbums.albums.slice(0, 3).forEach((album, index) => {
    console.log(
      `    ${index + 1}. "${album.name}" by ${album.artist.name} (${
        album.playCount
      } plays)`
    )
  })
}

main()
