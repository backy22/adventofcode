const fs = require('fs');
const { serialize } = require('v8');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n')
var res = 0;
var seats = []

function getSeat(range, rest){
    if (rest.length === 1) {
        if (['F', 'L'].includes(rest[0])) return range[0]
        if (['B', 'R'].includes(rest[0])) return range[1]
    }
    let char = rest.splice(0,1)
    let middle = (range[0] + range[1] + 1) / 2
    if (['F', 'L'].includes(char[0])) {
        return getSeat([range[0], middle - 1], rest)
    } else if (['B', 'R'].includes(char[0])) {
        return getSeat([middle, range[1]], rest)
    }
}

for (let line of lines) {
    line = line.split('')
    let rows = line.splice(0, 7)
    let row = getSeat([0,127], rows)
    let column = getSeat([0,7], line)
    let id = row*8 + column
    seats.push(parseInt(id, 10))
    res = Math.max(res, row*8 + column)
}

seats.sort((a,b) => a - b)
for (let i=1; i<seats.length; i++) {
    let diff = seats[i] - seats[i-1]
    console.log(diff, seats[i], seats[i-1])
    if (diff > 1) {
        console.log(seats[i])
        break;
    }
}
