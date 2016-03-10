# playground-webtorrent [![stability][0]][1]
[![build status][4]][5] [![test coverage][6]][7] [![js-standard-style][10]][11]

experimenting with webtorrent.

## Todo
- [x] create asset infra
- [x] download arbitrary torrent
- [x] create torrent from file
- [ ] create a tracker
- [ ] seed torrent from server
- [ ] stream torrent from client

## FAQ
### Why shouldn't we use electron-hybrid?
[Chromium can't be built with the latest version of
xcode](https://github.com/js-platform/node-webrtc/issues/235#issuecomment-152447773).
It's generally safer to depend on prebuilt, platform-specific binaries than it
is to depend on tools to exist. I'd happily use a prebuilt `wrtc` package, but
given that it's not available we settle for the slightly bigger
`electron-prebuilt`.

## Which ICE servers are you using?
No idea to be honest. Concepts like ICE and NAT are quite new to me, so we're
just going with what `webtorrent` provides us out of the box.

## Why create your own tracker?
The packages are readily available, and it's probably good to have control over
all the things. That said, it's perfectly feasible to use a public tracker;
we're just getting everything across here (':

## Why not use a DHT?
WebRTC can only have 30 or so connections before it melts your computer. In
order to cope with that constraint there needs to be some sort of gossip
protocol. People simply haven't gotten around to making it work yet. So
trackers only for now.
- https://github.com/feross/webtorrent/issues/288

## Installation
```sh
$ git clone https://github.com/yoshuawuyts/playground-webtorrent
```

## See Also
- [electron-spawn](https://github.com/maxogden/electron-spawn)
- [electro](https://github.com/dominictarr/electro)
- [electron-prebuilt](https://www.npmjs.com/package/electron-prebuilt)
- [electron-userland](https://github.com/electron-userland)
- [node-webrtc](https://github.com/js-platform/node-webrtc)
- [webtorrent-hybrid](https://github.com/feross/webtorrent-hybrid)
- [create-torrent](https://github.com/feross/create-torrent)
- [webtorrent-www](https://github.com/feross/webtorrent-www)
- [awesome-peer-to-peer](https://github.com/kgryte/awesome-peer-to-peer)
- [bittorrent-tracker](https://github.com/feross/bittorrent-tracker)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[4]: https://img.shields.io/travis/yoshuawuyts/playground-webtorrent/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/playground-webtorrent
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/playground-webtorrent/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/playground-webtorrent
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
