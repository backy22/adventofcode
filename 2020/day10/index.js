const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n')

let adapters = lines.concat([0]).sort((a,b) => a - b).map((a, index) => {
    return {index, min: parseInt(a, 10), max: parseInt(a, 10) + 3}
})

const last = adapters[adapters.length - 1]
adapters.push({
    index: adapters.length,
    min: last.min + 3,
    max: last.max + 3
})

const pathWays = []

function traverse(current) {
    if (current.index === adapters.length - 1) return 1;

    // すでにキャッシュに入れてたらそれを使う
    if (current.index in pathWays)  return pathWays[current.index];

    let pathCount = 0;
    // currentより先で＋３以下のadaptersを全部とってきてtraverse
    adapters.slice(current.index + 1).filter((adapter) => {
        return current.max >= adapter.min && current.max <= adapter.max
    }).forEach((adapter) => {
        pathCount += traverse(adapter)
    })

    pathWays[current.index] = pathCount;
    return pathCount
}

let res = traverse(adapters[0])
console.log(res)
/*for(let i=1; i<adapters.length; i++) {
    let diff = adapters[i] - adapters[i-1]
    if (diff == 1) {
        one++;
    }else if (diff == 3){
        three++
    }
}

let res = one * three*/

