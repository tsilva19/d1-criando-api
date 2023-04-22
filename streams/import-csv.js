import { parse } from 'csv-parse';
import fs from 'node:fs';
import axios from 'axios';

const csvPath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2 // skip the header line
});

async function run() {
  const linesParse = stream.pipe(csvParse);

  for await (const line of linesParse) {
    const [title, description] = line;

    await axios.post('http://localhost:3333/tasks', {
      title,
      description,
    
    })

    // Uncomment this line to see the import working in slow motion (open the db.json)
    // await wait(1000)
  }

}

run()

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}