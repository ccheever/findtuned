import tracks from "./tracks.json";

export default function searchIndex() {
  let full = {};
  let partial = {};

  for (let id in tracks) {
    let t = tracks[id];
    let strings = [t.name, t.artist];
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

  return {
    full,
    partial
  };
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

function splitStringToTokens(s) {
  let x = s.toLowerCase();
  let y = x.replace(/[^a-z ]/g, "");
  let z = y.split(/\s/);
  return z;
}

if (require.main === module) {
  let start = Date.now();
  searchIndex();
  let end = Date.now();
  console.log(end - start);
}
