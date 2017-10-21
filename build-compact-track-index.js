import fs from "fs";
import tracks from "./tracks";

function buildTracksIndex() {
  let index = {};
  for (let i = 0; i < tracks.length; i++) {
    let t = tracks[i];
    let image = undefined;
    try {
      image = t.album.images[2].url;
    } catch (e) {
      console.warn("No image for ", t.name, t.album.images);
    }
    index[t.id] = {
      url: t.external_urls.spotify,
      name: t.name,
      artist: t.artists[0].name,
      duration: t.duration_ms,
      album: t.album.name,
      popularity: t.popularity,
      image: image
    };
  }
  fs.writeFileSync(
    "./tracks-compact-index.json",
    JSON.stringify(index),
    "utf-8"
  );
}

if (require.main === module) {
  buildTracksIndex();
}
