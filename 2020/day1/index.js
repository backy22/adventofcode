const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n').filter(x => x).map(x => parseInt(x));

for(let i=0; i<lines.length; i++){
    for (let j=i+1; j<lines.length; j++){
        let res = 2020 - (lines[i] + lines[j])
        let index = lines.findIndex(el => el == res)
        if (index > 0 && index !== i && index !== j){
            console.log(lines[i], lines[j], lines[index], lines[i] * lines[j] * lines[index])
            break;
        }
    }
}