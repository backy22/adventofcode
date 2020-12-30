const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n')

var hash = {}
var large = 0;
const ids = lines[0].split(',')
for(let i=0; i<ids.length; i++) {
    if (ids[i] === 'x') continue;
    hash[ids[i]] = (ids.length - i - 1) % ids[i]
    large = Math.max(large, ids[i])
}

console.log(hash)

let founded = false
let time = large + hash[large]
let step = large

while(!founded) {
    let res = Object.keys(hash).map(key => {
        if (time % key == hash[key]) {
            return key
        }
    }).filter((key) => key)


    let mult = 1;
    for(let key of res) {
        mult = mult * key
    }
    step = Math.max(mult, step)

    if (res.length === Object.keys(hash).length) {
        founded = true
    } else {
        time += step
    }
}

console.log(time - ids.length + 1)