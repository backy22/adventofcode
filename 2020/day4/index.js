const fs = require('fs');
const lines = fs.readFileSync('input.text', {encoding: 'utf-8'}).split('\n\n')
const invalidKeys = ['byr','iyr','eyr','hgt','hcl','ecl','pid']
var res = 0
const invalidColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

function validateBirth(birth) {
    if (birth >= 1920 && birth <= 2002) return true
    return false
}

function validateYear(year) {
    if (year >= 2010 && year <= 2020) return true
    return false
}

function validateExpiration(year) {
    if (year >= 2020 && year <= 2030) return true
    return false
}

function validateHeight(height) {
    let unit = height.slice(-2, height.length)
    let num = parseInt(height.slice(0, -2), 10)
    if (unit == 'cm' && num >= 150 && num <= 193) return true
    if (unit == 'in' && num >= 59 && num <= 76) return true
    return false
}

function validateHairColor(color){
    if(color.length === 7 && color.match(/\#+[0-9a-f]{6}/g)) return true
    return false
}

function validateEyeColor(color){
    if(invalidColors.includes(color)) return true;
    return false
}

function validatePassport(id){
    if(id.length === 9 && id.match(/[0-9]{9}/g)) return true
    return false
}

for(let line of lines) {
    let hash = {}
    line = line.split(/\n| /)
    for(let data of line){
        let key = data.split(':')[0]
        let value = data.split(':')[1]
        hash[key] = value
    }
    let hashKeys = Object.keys(hash)
    let valid = invalidKeys.every(k => hashKeys.includes(k))
    if (!valid) continue;
    if (validateBirth(hash['byr']) && validateYear(hash['iyr']) 
    && validateExpiration(hash['eyr']) && validateHeight(hash['hgt'])
    && validateHairColor(hash['hcl']) && validateEyeColor(hash['ecl']) && validatePassport(hash['pid'])) {
        console.log(hash)
        res += 1
    }
}

console.log(res)