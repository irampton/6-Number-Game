/*function go2(y) {
    let guess = [-1, -1, -1, -1, -1, -1];
    let prob = [];
    for (let i = 0; i < 6; i++) {
        guess = [-1, -1, -1, -1, -1, -1];
        let statList = [];
        guess[i] = y;
        for (let j = 0; j < 10; j++) {
            guess[(i + 1) % 6] = j;
            for (let k = 0; k < 10; k++) {
                guess[(i + 2) % 6] = k;
                for (let l = 0; l < 10; l++) {
                    guess[(i + 3) % 6] = l;
                    for (let m = 0; m < 10; m++) {
                        guess[(i + 4) % 6] = m;
                        for (let n = 0; n < 10; n++) {
                            guess[(i + 5) % 6] = n;
                            let y = (guess[0] * 100) + (guess[1] * 10) + guess[2];
                            let z = (guess[3] * 100) + (guess[4] * 10) + guess[5];
                            let x = y - z;
                            statList.push(x < 0 ? 1000 : x);
                        }
                    }
                }
            }
        }
        prob.push(statList.reduce((a, b) => a + b, 0) / statList.length);
    }
    console.log(prob);
}*/
//Global Vars
let output = [null, null, null, null, null, null];
let testResults;
let f = false;

//User interaction functions
function step() {
    let guess = Array.of(...output);
    let locked = [];
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] !== null) {
            locked.push(i);
        }
    }
    if (document.getElementById("i" + (locked.length)).value !== "") {
        runTheNumbers(6 - locked.length);
    }
}

function clearInput() {
    for (let i = 0; i < 6; i++) {
        document.getElementById("i" + i).value = "";
    }
}

function clearOutput() {
    output = [null, null, null, null, null, null];
    updateOutput();
}

function go() {
    output = [null, null, null, null, null, null];
    if (countLists.length === 0) {
        createCountLists();

    }
    for (let i = 6; i > 0; i--) {
        runTheNumbers(i);
    }
}

function randAndGo() {
    clearOutput();
    randomize();
    go();
}

function clearAll() {
    clearInput();
    clearOutput();
}


function runTheNumbers(spaces) {
    let y = Number(document.getElementById("i" + (6 - spaces)).value);
    let prob = findPosition(spaces, y);
    //console.log(prob);
    output[prob.reduce((acc, cur, ind) => [cur < acc[0] ? cur : acc[0], cur < acc[0] ? ind : acc[1]], [1001, -1])[1]] = y;
    updateOutput();
    //console.log(output);
}

function findPosition(spaces, y) {
    let guess = Array.of(...output);
    let prob = [];
    let locked = [];
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] !== null) {
            locked.push(i);
        }
    }
    //console.log(locked);
    for (let i = 0; i < 6; i++) {
        let doNotTouch = Array.of(...locked);
        if (locked.includes(i)) {
            prob.push(1001);
            continue;
        }
        doNotTouch.push(i);
        guess = Array.of(...output);
        let statList = [];
        guess[i] = y;
        //do stuff
        let it = count(spaces - 1);
        for (let j = 0; j < it.length; j++) {
            let index = 0;
            for (let k = 0; k < it[j].length; k++) {
                if (doNotTouch.includes(index)) {
                    index++;
                }
                guess[index] = it[j][k];
                index++;
            }
            let y = (guess[0] * 100) + (guess[1] * 10) + guess[2];
            let z = (guess[3] * 100) + (guess[4] * 10) + guess[5];
            let x = y - z;
            statList.push(x < 0 ? 1000 : x);
        }
        //Calculate the stats (mean)
        //prob.push(statList.reduce((a, b) => a + b, 0) / statList.length);
        prob.push(ss.quantile(statList, 0.75));
    }
    //console.log(prob);
    return prob;
}

function count(x) {
    x--;
    if (countLists[x] !== undefined) {
        return countLists[x];
    } else {
        let list = [];
        for (let i = 0; i < 10; i++) {
            if (x > 0) {
                let l2 = count(x);
                for (let j = 0; j < l2.length; j++) {
                    l2[j].push(i);
                }
                list.push(...l2);
            } else {
                list.push([i]);
            }
        }
        return list;
    }
}

let countLists = [];

function createCountLists() {
    let templist = [];
    for (let i = 0; i < 6; i++) {
        templist.push(count(i));
    }
    countLists = templist;
}

function updateOutput() {
    let print = [];
    let flag = false;
    for (let i = 0; i < output.length; i++) {
        if (output[i] === null) {
            print[i] = "_";
            flag = true;
        } else {
            print[i] = output[i];
        }
    }
    let result = "";
    if (!flag) {
        let y = (output[0] * 100) + (output[1] * 10) + output[2];
        let z = (output[3] * 100) + (output[4] * 10) + output[5];
        let x = y - z;
        result = x;
    }
    document.getElementById("output").innerHTML = "" + print[0] + print[1] + print[2] + "<br>" + print[3] + print[4] + print[5] + "<br><br>" + result;
}

function randomize() {
    for (let i = 0; i < 6; i++) {
        document.getElementById("i" + i).value = getRandomInt(10);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

function testIt(x) {
    let results = [];
    for (let i = 0; i < x; i++) {
        randomize();
        go();
        let y = (output[0] * 100) + (output[1] * 10) + output[2];
        let z = (output[3] * 100) + (output[4] * 10) + output[5];
        let x = y - z;
        x = x < 0 ? 1000 : x;
        results.push(x);
        //console.log(x);
    }
    testResults = results;
    console.log(testResults);
}

function reallyTestIt() {
    let results = [];
    //loop through all the numbers
    for (let i = 0; i < x; i++) {
        let arr = count(6);
        for (let i = 0; i < 6; i++) {
            document.getElementById("i" + i).value = getRandomInt(10);
        }
        go();
        let y = (output[0] * 100) + (output[1] * 10) + output[2];
        let z = (output[3] * 100) + (output[4] * 10) + output[5];
        let x = y - z;
        x = x < 0 ? 1000 : x;
        results.push(x);
        //console.log(x);
    }
    console.log(results);
    return results;
}

function average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length
}