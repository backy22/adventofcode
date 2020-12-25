const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n\n')
var res = 0

for (let line of lines) {
    let hash = {}
    line = line.split(/\n| /)
    let people = line.length
    line = line.join('')
    for (let c of line) hash[c] = hash[c] + 1 || 1
    //res += Object.keys(hash).length
    for (let key of Object.keys(hash)) {
        if (hash[key] === people) res++
    }
}

console.log(res)
