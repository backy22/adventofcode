var res = [5,1,9,18,13,8,0]
var indexMap = new Map()

for(let i=0; i<res.length; i++){
    indexMap.set(res[i], [i])
}

for(let i=7; i<30000000; i++){
    const indexes = indexMap.get(res[res.length-1])
    var newVal = 0
    if (indexes && indexes.length > 1) {
        newVal = indexes[1] - indexes[0]
    }

    res.push(newVal)
    let val = indexMap.get(newVal)
    if (val && val.length > 1) val.shift()
    if (val) {
        val.push(i)
    }else{
        val = [i]
    }
    indexMap.set(newVal, val)

    /*const indexed = res.map((num, index) => num === res[res.length-1] ? index+1 : -1).filter(index => index !== -1);
    if (indexed.length < 2) {
        res.push(0)
    } else {
        const lastIndexed = indexed.slice(-2)
        res.push(lastIndexed[1]- lastIndexed[0])
    }*/
}
console.log(res[res.length-1])