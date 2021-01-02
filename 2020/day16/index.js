const fs = require('fs');
const { parse } = require('path');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n\n')

var ranges = lines[0].split('\n')
var all = []
var rangeMap = new Map()
for(let range of ranges) {
    let name = range.split(':')[0]
    let nums = range.split(' ')
    nums = [nums[nums.length - 1], nums[nums.length - 3]]
    let pairs = []
    for(let num of nums){
        let r = num.split('-').map((item) => parseInt(item, 10))
        pairs.push(r)
    }
    rangeMap.set(name, pairs)
}

for(let key of rangeMap.keys()){
    all.push(rangeMap.get(key))
}

all = all.flat().sort((a,b) => a[0] - b[0])

var tickets = lines[2].split('\n')
tickets.shift()
tickets = tickets.join(',').split(',')
tickets = tickets.sort((a,b) => a - b)
tickets = tickets.map((t) => parseInt(t,10))

function inBetween(ticket, ranges) {
    for(let range of ranges) {
        if (ticket >= range[0] && ticket <= range[1]) return true
    }
    return false
}

var invalid = []
for(let ticket of tickets) {
    if (!inBetween(ticket, all)) {
        invalid.push(ticket)
    }
    if (all[0] && all[0][1] < ticket) all.shift()
}

// part2
function findValid(num){
    let names = []
    for(let key of rangeMap.keys()) {
        let ranges = rangeMap.get(key)
        if ((num >= ranges[0][0] && num <= ranges[0][1]) ||
            (num >= ranges[1][0] && num <= ranges[1][1])) names.push(key)
    }
    return names
}

var cards = lines[2].split('\n')
cards.shift()
var cardMap = new Map()
for(let card of cards) {
    let arr = card.split(',')
    for(let i=0; i<arr.length; i++){
        if (cardMap.get(i) && cardMap.get(i).length === 1) continue;
        let num = parseInt(arr[i], 10)
        if (invalid.includes(num)) continue;
        let invalidNames = findValid(num)
        if (cardMap.get(i)) {
            invalidNames = invalidNames.filter((item) => cardMap.get(i).includes(item))
            cardMap.set(i, invalidNames)
        } else {
            cardMap.set(i, invalidNames)
        }
    }
}


let newMap = new Map([...cardMap.entries()].sort((a,b) => a[1].length - b[1].length))

for(let key of newMap.keys()){
    let val = newMap.get(key)[0]
    for(let key of newMap.keys()) {
        if (newMap.get(key).length === 1) continue;
        let newVal = newMap.get(key).filter((v) => v !== val)
        newMap.set(key, newVal)
    }
}

var rows = []
for(let key of newMap.keys()) {
    if (newMap.get(key)[0].match('departure')) rows.push(key)
}

console.log(rows)

let myTickets = lines[1].split('\n')
myTickets.shift()
myTickets = myTickets.join(',').split(',')
myTickets = myTickets.map((t) => parseInt(t, 10))
var res = 1
for(let i=0; i<myTickets.length; i++){
    if(rows.includes(i)) res *= myTickets[i]
}
console.log(myTickets, res)
