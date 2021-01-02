const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n')

let mask;
let mem = new Map()
let res = []

function makeComp(start, comp, array){
    if (comp.length > array.length) return
    if (comp.length == array.length){
        res.push(comp.slice())
        return
    }
    if (array[start] !== 'X') {
        comp.push(array[start])
        makeComp(start+1, comp, array)
        comp.pop()
    } else {
        for(let k=0; k<2; k++){
            comp.push(k.toString())
            makeComp(start+1, comp, array)
            comp.pop()
        }
    }
}
//makeComp(0, [])

for(let line of lines) {
    if (line.match('mask')){
        mask = line.replace('mask =', '').trim()
        mask = mask.split('')
    } else {
        line = line.split(/\[|\]/)
        let key = parseInt(line[1], 10).toString(2)
        key = '0'.repeat(36 - key.length) + key
        key = key.split('')
        let val = line[2].replace('=','').trim()
        val = parseInt(val, 10)
        let modKey = mask.map((char, index) => {
            if (char === 'X' || char === '1') return char
            return key[index]
        })
        res = []
        makeComp(0, [], modKey)
        res.map((comb) => {
            let combStr = comb.join('')
            mem.set(combStr, val)
        })
        /*val = parseInt(val, 10).toString(2)
        val = '0'.repeat(36 - val.length) + val
        val = val.split('')
        let modVal = mask.map((char,index) => {
            if (char !== 'X') return char
            return val[index]
        })
        modVal = modVal.join('')
        mem.set(key, modVal)*/
    }
}

console.log(mem)

var sum = 0
for(let key of mem.keys()) {
    let num = mem.get(key)
    sum += num
}

console.log(sum)
