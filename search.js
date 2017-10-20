import lodash from "lodash";

import searchIndex from "./search-index";
import tracks from "./tracks";

function search(full, partial) {
  let results = [];
  for (let i = 0; i < full.length; i++) {
    let ft = full[i];
    results.push(searchIndex.full[ft] || []);
  }

  for (let i = 0; i < partial.length; i++) {
    let pt = partial[i];
    results.push(searchIndex.partial[pt] || []);
  }

  return lodash.intersection.apply(null, results);
}

function trackInfo(trackId) {
  return tracks[trackId];
}

function trackInfoForResults(trackIds) {
  return trackIds.map(trackInfo);
}

function searchFromQuery(q) {
  let x = q.toLowerCase();
  let y = x.replace(/[^A-Za-z ]/g, "");
  let tokens = y.split(/\s/);
  let ft = tokens.slice(0, tokens.length - 1);
  let pt = [tokens[tokens.length - 1]];
  return search(ft, pt);
}

if (require.main === module) {
  let results = searchFromQuery("Dukes men domin");
  console.log("results.length", results.length);
  console.log(results);
  let ti = trackInfo(results[0]);
  console.log(ti);
}

export default search;
