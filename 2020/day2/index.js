const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n');
var res = 0
var invalid = 0


// Part 1
/*for(let line of lines) {
    let times = line.split(' ')[0].split('-')
    let least = parseInt(times[0], 10)
    let most = parseInt(times[1], 10)
    let letter = line.split(' ')[1].charAt(0)
    let word = line.split(' ')[2]
    let count = word.split('').filter(x => x == letter).length
    if (count >= least && count <= most) {
        res++;
    }
}*/

// Part2
for(let line of lines) {
    let times = line.split(' ')[0].split('-')
    let first = parseInt(times[0], 10)
    let second = parseInt(times[1], 10)
    let letter = line.split(' ')[1].charAt(0)
    let word = line.split(' ')[2].split('')
    console.log(line, word[first-1], word[second-1], res)
    if (word[first-1] == letter || word[second-1] == letter){
        res++;
    }
    if (word[first-1] == letter && word[second-1] == letter) {
        invalid++;
    }
}

console.log(res-invalid)