
const events = require('events');
const fs = require('fs');
const readline = require('readline');

let suma = 0;

const MAX = 140;
let symbols = [];


(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('test.txt'),
      crlfDelay: Infinity
    });
    let first = 0
    let second = 0
    let f =-1
    let s = -1
    
    let i = 0;
    rl.on('line', (line) => {
      for (let j=0; j<line.length; j++){
        if (line.at(j) !== '.' && !+line.at(j) ) {
          symbols.push({i,j})
        }
      }
      i = i+1;
    });

    await events.once(rl, 'close');

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  } catch (err) {
    console.error(err);
  }
})().finally(() => {
  console.log('Suma', suma)
  console.log(symbols)

});

