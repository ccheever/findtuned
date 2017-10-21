import inquirer from "inquirer";

import search, { searchFromQuery, searchTracksFromQuery } from "./search";

async function mainAsync() {
  let { query } = await inquirer.prompt([
    {
      type: "input",
      name: "query",
      message: "Search term"
    }
  ]);

  let results = searchTracksFromQuery(query);
  for (let t of results) {
    console.log(formatTrack(t));
  }
}

function formatTrack(t) {
  return t.name + " - " + t.artists[0].name;
}

export default mainAsync;

if (require.main === module) {
  mainAsync().then(() => {}, console.error);
}
