import lodash from "lodash";

import tracks from "./tracks";

for (id in tracks) {
  tracks[id].id = id;
  tracks[id].key = id;
}

import buildSearchIndex from "./build-search-index";
const searchIndex = buildSearchIndex();

function search(full, partial) {
  let results = [];
  for (let i = 0; i < full.length; i++) {
    let ft = full[i];
    results.push(searchIndex.full[ft] || []);
  }

  for (let i = 0; i < partial.length; i++) {
    let pt = partial[i];
    let cr = [].concat(
      searchIndex.partial[pt] || [],
      searchIndex.full[pt] || []
    );
    results.push(cr);
  }

  return lodash.intersection.apply(null, results);
}

export function trackInfo(trackId) {
  let t = tracks[trackId];
  return {
    id: trackId,
    ...t
  };
}

export function trackInfoForResults(trackIds) {
  return trackIds.map(trackInfo);
}

export function searchFromQuery(q) {
  let limit = 200;

  // Special case empty string query -- we'll show everything
  if (q === "") {
    return Object.keys(tracks).slice(0, limit);
  }
  let x = q.toLowerCase();
  let y = x.replace(/[^A-Za-z ]/g, "");
  let tokens = y.split(/\s/);
  let ft = tokens.slice(0, tokens.length - 1);
  let last = tokens[tokens.length - 1];
  let pt = [last];

  // If the last thing in the query is a space, the partial token at the
  // end will be an empty string, but we don't to search for that; it's just
  // confusing
  if (last === "") {
    pt = [];
  }
  // console.log("ft=", ft, "pt=", pt);
  let results = search(ft, pt);
  return results.slice(0, limit);
}

export function searchTracksFromQuery(q) {
  return trackInfoForResults(searchFromQuery(q));
}

if (require.main === module) {
  let results = searchFromQuery("Dukes men domin");
  console.log("results.length", results.length);
  console.log(results);
  let ti = trackInfo(results[0]);
  console.log(ti);
}

export default search;
