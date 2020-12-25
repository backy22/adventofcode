const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n');
const width = lines[0].length


function getTrees(right, down){
    var tree = 0
    for(let i=0; i<Math.floor(lines.length/down)+1; i++){
        if (i*down >= lines.length) break
        console.log(i, i*down, i*right%width)
        if (lines[i*down][i*right%width]) {
            if(lines[i*down][i*right%width] == '#') tree += 1;
        }
    }
    return tree
}

console.log(getTrees(1,1) * getTrees(3,1) * getTrees(5,1) * getTrees(7,1) * getTrees(1,2))