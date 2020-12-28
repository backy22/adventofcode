const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n')

function run(instructions) {
    var order = []
    var res = 0
    for(let i=0; i<instructions.length;) {
        if (order.includes(i)) return false
        order.push(i)
        let ope = instructions[i].split(' ')[0]
        let num = instructions[i].split(' ')[1]
        num = parseInt(num, 10)
        if (ope === 'acc') {
            res += num
        }
        if (ope === 'jmp') {
            i = i + num
        } else {
            i++;
        }
        if (i === instructions.length - 1) {
            return res
        }
    }
}

for(let i=0; i<lines.length; i++){
    let ope = lines[i].split(' ')[0]
    let num = lines[i].split(' ')[1]
    if(['nop', 'jmp'].includes(ope)) {
        let modification = [...lines]
        let modope = ope === 'nop' ? 'jmp' : 'nop'
        modification[i] = modope + ' ' + num
        if (run(modification)){
            console.log(run(modification))
            break;
        }
    }
}