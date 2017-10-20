import fs from "fs";
import tracks from "./tracks";

function buildTracksIndex() {
  let index = {};
  for (let i = 0; i < tracks.length; i++) {
    let t = tracks[i];
    index[t.id] = t;
  }
  fs.writeFileSync("./tracks-index.json", JSON.stringify(index), "utf-8");
}

if (require.main === module) {
  buildTracksIndex();
}
