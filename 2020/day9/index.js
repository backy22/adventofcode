const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n')

function findPair(lastIndex, sum){
    for(let i=lastIndex - 25; i<lastIndex; i++){
        let rest = sum - lines[i]
        for (let k=i; k<lastIndex; k++){
            if (parseInt(lines[k], 10) === rest) {
                return true
            }
        }
    }
    return false
}

function findRnage(sum) {
    for(let i=0; i<lines.length; i++){
        let stack = 0;
        let k = i
        let min = sum;
        let max = 0;
        while(stack<=sum){
            stack += parseInt(lines[k], 10)
            min = Math.min(min, parseInt(lines[k], 10))
            max = Math.max(max, parseInt(lines[k], 10))
            if (stack === sum) {
                return stack
            }
            k++;
        }
    }
}

/*for(let i=25; i<lines.length; i++){
    if(!findPair(i, lines[i])){
        console.log(lines[i])
        break;
    }
}*/

findRnage(466456641)

//findRnage(127)