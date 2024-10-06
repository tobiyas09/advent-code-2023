
const events = require('events');
const fs = require('fs');
const readline = require('readline');

const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

let suma = 0;

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('input.txt'),
      crlfDelay: Infinity
    });
    let first = 0
    let second = 0
    let f =-1
    let s = -1
    
    rl.on('line', (line) => {
      const n = line.length
      first = 0;
      second = 0;
      f = -1
      s = -1
      
      for (let i = 0; i<n; i++) {
        if ((!!+line.at(i) || +line.at(i) === 0)  && f===-1) {
          first = +line.at(i);
          f = i

        }
      }

      for (let i = n-1; i>=0; i--) {
        if ((!!+line.at(i) || +line.at(i) === 0 ) && s===-1) {
          second = +line.at(i);
          s = i
        }
      }

      digits.forEach((digit, index) => {
        const dn = digit.length
        for (let i = 0; i<=n; i++) {
          const word = line.substring(i, i + dn);
          if (word === digit && (i<=f || f === -1)) {
            first = index+1;
            f = i;
          } 
        }

        for (let i = n; i>=0; i--) {
          const word = line.substring(i-dn, i);
          if (word === digit && (i>=s || s === -1)) {
            console.log(word, digit, i, s)
            second = index+1;
            s = i;
          } 
        }
      })

      console.log(first + '' + second + ' <- ' + line + '\n')

      suma = suma + first * 10 + second
    });

    await events.once(rl, 'close');

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  } catch (err) {
    console.error(err);
  }
})().finally(() => {
  console.log('Suma', suma)

});


// (async function processLineByLine() {
//   try {
//     const rl = readline.createInterface({
//       input: fs.createReadStream('test2.txt'),
//       crlfDelay: Infinity
//     });
//     let first = 0
//     let second = 0
//     let f =false
//     let s = false
    
//     rl.on('line', (line) => {
//       const n = line.length
//       first = 0;
//       second = 0;
//       f =false
//       s = false
      
//       for (let i = 0; i<n; i++) {
//         if ((!!+line.at(i) || +line.at(i) === 0)  && !f) {
//           first = +line.at(i) * 10;
//           f = true

//         }
//       }

//       for (let i = n-1; i>=0; i--) {
//         if ((!!+line.at(i) || +line.at(i) === 0 ) && !s) {
//           second = +line.at(i);
//           s = true
//         }
//       }

//       suma = suma + first + second


//     });

//     await events.once(rl, 'close');

//     console.log('Reading file line by line with readline done.');
//     const used = process.memoryUsage().heapUsed / 1024 / 1024;
//     console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
//   } catch (err) {
//     console.error(err);
//   }
// })().finally(() => {
//   console.log('Suma', suma)
// });

console.log('hell')