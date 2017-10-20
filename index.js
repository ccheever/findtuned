import fs from "fs";

import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "12a806ca69d149eab75b47760c97d06c",
  clientSecret: "c7fb86607821483387d91f7cb15c4e31"
});
spotifyApi.setAccessToken(
  "BQCsQXO4cpULhMvWnH0C_pxWHLXWEnts-LsvF_e81a4uFzndDrtuQt34H1gX_nLErWGdN7GRI0xOgimkMMmqDZ24CRz-K3ofiUkVPrH6U5R3Sejk584IpyGQJgEeAJ0zcakNR4LalAVv1uI"
);

async function getSomeTracksAsync(offset, step, num) {
  let j = offset;
  let awaitables = [];
  for (let i = 0; i < num; i++) {
    awaitables.push(getAcaTracksAsync(step, j));
    j += step;
  }
  let results = await Promise.all(awaitables);
  return [].concat.apply([], results);
}

async function getTracksByGroupsAsync() {
  let step = 50;
  let groupSize = 6;
  let total = 12312;
  let offset = 0;
  let results = [];
  for (let i = 0; i < total; i += groupSize * step) {
    console.log("getting", i, step, groupSize);
    let result = await getSomeTracksAsync(i, step, groupSize);
    results = [].concat.apply([], [results, result]);
    console.log("done.");
  }
  return results;
}

async function getAllAcaTracksAsync() {
  let step = 50;
  let total = 12312; // Gotten from web API
  let results = [];
  for (let i = 0; i < total; i += step) {
    console.log("starting ", i, step, "...");
    let result = await getAcaTracksAsync(step, i);
    results = [].concat.apply([], [results, result]);
    console.log("done.");
  }
  return results;
}

async function getAcaTracksAsync(limit = 50, offset = 0) {
  let result = await spotifyApi.searchTracks('genre:"a cappella"', {
    limit,
    offset
  });
  let items = result.body.tracks.items;
  return items;
}

async function mainAsync() {
  //   let x = await getAllAcaTracksAsync();
  let x = await getTracksByGroupsAsync();
  fs.writeFileSync("tracks.json", JSON.stringify(x), "utf8");
  console.log("wrote tracks.json");
  return x;
}

if (require.main === module) {
  mainAsync().then(x => {
    console.log(JSON.stringify(x));
  }, console.error);
}
