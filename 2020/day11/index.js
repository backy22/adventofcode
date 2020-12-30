const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n')

let seats = lines.map((line) => line.split(''))
let column = seats.length;
let row = seats[0].length;

function getAround(i,k,array){
    /*let occupied = 0;
    if (array[i-1]) {
        if (array[i-1][k-1] && array[i-1][k-1] === '#') occupied++
        if (array[i-1][k] && array[i-1][k] === '#') occupied++
        if (array[i-1][k+1] && array[i-1][k+1] === '#') occupied++
    }
    if (array[i][k-1] && array[i][k-1] === '#') occupied++
    if (array[i][k+1] && array[i][k+1] === '#') occupied++
    if (array[i+1]) {
        if (array[i+1][k-1] && array[i+1][k-1] === '#') occupied++
        if (array[i+1][k] && array[i+1][k] === '#') occupied++
        if (array[i+1][k+1] && array[i+1][k+1] === '#') occupied++
    }
    return occupied*/

    return [
        [-1,-1], [-1,0], [-1,1],
        [0, -1], [0,1],
        [1,-1], [1,0], [1,1]
    ]
    .map(([drow, dcol]) => {
        return [
            i + drow,
            k + dcol
        ]
    })
    .filter(([nrow, ncol]) => {
        return (nrow >= 0 && nrow < array.length) &&
            (ncol >= 0 && ncol < array[nrow].length)
    })
    .filter(([nrow, ncol]) => {
        return array[nrow][ncol] === '#'
    })
    .length;
}

function getAroundL(i,k,array) {
    /*let occupied = 0;
    for(let m=i-1; m>=0; m--){
        if (array[m][k] == 'L') break
        if (array[m][k] == '#') {
            occupied++;
            break;
        }
    }
    for (let m=i+1; m<column; m++){
        if (array[m][k] == 'L') break
        if (array[m][k] == '#') {
            occupied++;
            break;
        }
    }
    for (let n=k-1; n>=0; n--){
        if (array[i][n] == 'L') break
        if (array[i][n] == '#'){
            occupied++;
            break;
        }
    }
    for(let n=k+1; n<row; n++){
        if (array[i][n] == 'L') break
        if (array[i][n] == '#'){
            occupied++;
            break;
        }
    }
    m = i-1;
    n = k-1;
    while(array[m] && array[m][n]){
        if (array[m][n] == 'L') break
        if (array[m][n] == '#') {
            occupied++;
            break;
        }
        m--;
        n--;
    }
    m = i+1;
    n = k-1;
    while (array[m] && array[m][n]) {
        if (array[m][n] == 'L') break
        if (array[m][n] == '#') {
            occupied++;
            break;
        }
        m++;
        n--;
    }
    m = i+1;
    n = k+1;
    while (array[m] && array[m][n]) {
        if (array[m][n] == 'L') break
        if (array[m][n] == '#') {
            occupied++;
            break;
        }
        m++;
        n++;
    }
    m = i-1;
    n = k+1;
    while (array[m] && array[m][n]) {
        if (array[m][n] == 'L') break
        if (array[m][n] == '#') {
            occupied++;
            break;
        }
        m--;
        n++;
    }
    return occupied*/
    return [
        [-1,-1], [-1,0], [-1,1],
        [0, -1], [0,1],
        [1,-1], [1,0], [1,1]
    ]
    .map(([drow, dcol]) => {
        let nrow = i + drow;
        let ncol = k + dcol;
        let seat = null
        while((nrow >= 0 && nrow < array.length) && (ncol >= 0 && ncol < array[nrow].length)) {
            seat = array[nrow][ncol];
            if (seat !== '.') break;
            nrow += drow;
            ncol += dcol;
        }
        return seat;
    })
    .filter((seat) => {
        return seat && seat == '#'
    })
    .length;
}

function applyRules(array){
    var clone = array.map(function(arr) {
        return arr.slice();
    });
    let moved = 0
    for(let i=0; i<column; i++){
        for(let k=0; k<row; k++){
            if (array[i][k] === 'L' && getAroundL(i,k,array) === 0) {
                clone[i][k] = '#'
                moved++;
            }
            if (array[i][k] === '#' && getAroundL(i,k,array) >= 5){
                clone[i][k] = 'L'
                moved++;
            }
        }
    }
    array = clone
    if (moved > 0) return applyRules(array)
    return array
}

var res = applyRules(seats)

var occupied = 0;
for(let i=0; i<column; i++){
    for(let k=0; k<row; k++){
        if (res[i][k] === '#') occupied++;
    }
}

console.log(occupied)