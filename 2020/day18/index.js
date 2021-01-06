const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n')

function solve(string) {
    let tokens = string.split(' ');
    while(tokens.length > 1) {
        tokens = [eval(tokens.slice(0,3).join(''))].concat(tokens.slice(3))
    }
    return tokens[0]
}

function solve2(string){
    while(/\+/.test(string)) {
        string = string.replace(/(\d+) \+ (\d+)/g, (match, firstNumber, secondNumber) => { // + の部分を見つけて計算
            console.log(match, firstNumber, secondNumber)
            return parseInt(firstNumber) + parseInt(secondNumber)
        })
    }
    return eval(string)
}

function solveWithParenthesis(string, solve) {
    while(/\(/.test(string)){
        string = string.replace(/\(([^()]+)\)/g, (match, group) => { // 最初の()の組み合わせが取れる
            return solve(group)
        })
    }
    return solve(string)
}

let sum = 0;
lines.forEach(line => {
    sum += solveWithParenthesis(line, solve)
})

console.log(sum)

let sum2 = 0;
lines.forEach(line => {
    sum2 += solveWithParenthesis(line, solve2)
})

console.log(sum2)