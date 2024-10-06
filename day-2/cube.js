
const events = require('events');
const fs = require('fs');
const readline = require('readline');

let suma = 0;
let sumPower = 0;

const RED = 12;
const GREEN = 13;
const BLUE = 14;

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('input.txt'),
      crlfDelay: Infinity
    });

    
    rl.on('line', (line) => {
      const [game, subsets] = line.split(':');
      const id = +game.split(' ')[1]

      
      let minRed = 0;
      let minGreen = 0;
      let minBlue = 0;

      let rounds = 0;

      let power = 0;

      subsets.split(';').forEach((subset) => {
        let sround = 0;
        subset.split(',').forEach((set) => {
          const num = +set.split(' ')[1];
          const color = set.split(' ')[2].trim();
          
          switch (color) {
            case 'red': 
              if (num <= RED) {
                sround = sround + 1;
              }
              if (num > minRed) {
                minRed = num;
              }
              break;
            case 'green': 
              if (num <= GREEN) {
                sround = sround + 1;
              }
              if (num > minGreen) {
                minGreen = num;
              }
              break;
            case 'blue': 
              if (num <= BLUE) {
                sround = sround + 1;
              }
              if (num > minBlue) {
                minBlue = num;
              }
              break;
          }
        })

        if (sround === subset.split(',').length) {
          rounds = rounds + 1;
        }

        power = minRed * minBlue * minGreen;
      })

      if (rounds === subsets.split(';').length) {
        suma = suma + id;
      }

      sumPower = sumPower + power;

    });

    await events.once(rl, 'close');

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  } catch (err) {
    console.error(err);
  }
})().finally(() => {
  console.log('Suma', suma)
  console.log('Power', sumPower)

});



