const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n')

let shippos = [0,0]
let waypoint = [0,10,1]
for(let line of lines) {
    let action = line.slice(0,1)
    let move = parseInt(line.slice(1), 10)
    switch(action){
        case 'F':
            shippos[0] += move * waypoint[1]
            shippos[1] += move * waypoint[2]
            break;
        case 'N':
            waypoint[2] += move
            break;
        case 'S':
            waypoint[2] -= move
            break;
        case 'E':
            waypoint[1] += move
            break;
        case 'W':
            waypoint[1] -= move
            break;
        case 'R':
            waypoint[0] += move
            waypoint[0] = waypoint[0] % 360
            if (move === 90) {
                waypoint = [waypoint[0], waypoint[2], -waypoint[1]]
            } else if (move === 180) {
                waypoint = [waypoint[0], -waypoint[1], -waypoint[2]]
            } else if (move === 270) {
                waypoint = [waypoint[0], -waypoint[2], waypoint[1]]
            }
            break;
        case 'L':
            waypoint[0] -= move
            if (waypoint[0] < 0) waypoint[0] = waypoint[0]  + 360
            if (move == 90) {
                waypoint = [waypoint[0], -waypoint[2], waypoint[1]]
            } else if (move == 180) {
                waypoint = [waypoint[0], -waypoint[1], -waypoint[2]]
            } else if (move == 270) {
                waypoint = [waypoint[0], waypoint[2], -waypoint[1]]
            }
            break;
        default:
            break;
    }
    console.log(shippos, waypoint)
}