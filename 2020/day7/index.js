const { Hash } = require('crypto');
const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n')
var res = 0
var bags = new Map()

for(let line of lines) {
    let key = line.split('contain')[0].replace(/bags/, '').trim()
    let values = line.split('contain')[1]
    values = values.split(',')
    values = values.map(v => v.replace(/bags/, '').replace(/bag/, '').replace(/\./, '').trim())
    let insideMap = new Map()
    values.map(v => {
        if (v !== 'no other') {
            let num = v.match(/\d+/)[0]
            let color = v.replace(/\d/, '').trim()
            insideMap.set(color, parseInt(num, 10))
        }
    })
    bags.set(key, insideMap)
}

function shinyGold(key){
    if (!bags.has(key)) return false;
    let insideBags = bags.get(key)
    if (insideBags.has('shiny gold')) return true
    for(let value of insideBags.keys()) {
        console.log(value)
        if (shinyGold(value)) return true
    }
    return false

}

for(let key of bags.keys()) {
    //if (key !== 'shiny gold' && shinyGold(key)) res++;
}

function getBags(key) {
    let num = 0
    for(let [k, v] of bags.get(key)) {
        console.log(k, v, num)
        num += v + v*getBags(k)
    }
    return num
}

let Num = getBags('shiny gold')
console.log(Num)