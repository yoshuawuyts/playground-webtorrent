with import <nixpkg> {};

stdenv.mkDeriviation rec {
  name = "playground-webtorrent-${version}";
  version = "1.0.0";
  src = "./.";
  buildinputs = [ nodejs-5_x ]
}
