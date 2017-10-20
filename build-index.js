import fs from "fs";

import tracks from "./tracks";

async function mainAsync() {
  let full = {};
  let partial = {};

  for (let i = 0; i < tracks.length; i++) {
    let t = tracks[i];
    let id = t.id;
    let strings = stringsFromItem(t);
    for (let j = 0; j < strings.length; j++) {
      let tokens = splitStringToTokens(strings[j]);
      for (let k = 0; k < tokens.length; k++) {
        let t = tokens[k];
        if (!full[t]) {
          full[t] = [];
        }
        full[t].push(id);
        for (let ii = 1; ii < t.length; ii++) {
          let p = t.substr(0, ii);
          if (!partial[p]) {
            partial[p] = [];
          }
          partial[p].push(id);
        }
      }
    }
  }

  let data = {
    full,
    partial
  };

  fs.writeFileSync("./search-index.json", JSON.stringify(data), "utf8");
  return data;
}

function stringsFromItem(track) {
  let s = [];
  s.push(track.name);
  for (let i = 0; i < track.artists.length; i++) {
    s.push(track.artists[i].name);
  }
  // s.push(track.album.name);
  return s;
}

export function splitStringToTokens(s) {
  let x = s.toLowerCase();
  let y = x.replace(/[^a-z ]/g, "");
  let z = y.split(/\s/);
  return z;
}

if (require.main === module) {
  mainAsync().then(() => {}, console.error);
}

export default mainAsync;
