importScripts("simple-statistics.min.js");

self.addEventListener('message', function(e) {
    let arr = e.data;
    let results = [];
    for (let i = 0; i < arr.length; i++) {
        input = arr[i];
        go();
        let y = (output[0] * 100) + (output[1] * 10) + output[2];
        let z = (output[3] * 100) + (output[4] * 10) + output[5];
        let x = y - z;
        x = x < 0 ? 1000 : x;
        results.push(x);
    }
    self.postMessage(results);
}, false);

function go() {
    output = [null, null, null, null, null, null];
    if (countLists.length === 0) {
        createCountLists(5);

    }
    for (let i = 6; i > 0; i--) {
        runTheNumbers(i);
    }
}

function runTheNumbers(spaces) {
    let y = input[6 - spaces];
    let prob = findPosition(spaces, y);
    //console.log(prob);
    output[prob.reduce((acc, cur, ind) => [cur < acc[0] ? cur : acc[0], cur < acc[0] ? ind : acc[1]], [1001, -1])[1]] = y;
    //updateOutput();
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
    if(spaces === 6 && round1Results[y] !== null) {
        prob = round1Results[y];
    }else{
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
            //console.log(it.length);
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
            prob.push(ss.quantile(statList, 0.5));
        }
    }
    //console.log(prob);
    if(spaces === 6 && round1Results[y] === null){
        round1Results[y] = prob;
    }
    return prob;
}

function count(x) {
    let list = [];
    if (countLists[x] !== undefined) {
        return countLists[x];
    } else {
        for (let i = 0; i < 10; i++) {
            if (x > 0) {
                let sublist = count(x - 1);
                for (let j = 0; j < sublist.length; j++) {
                    sublist[j].push(i);
                }
                list.push(...sublist);
            } else {
                list = [[]];
            }
        }
    }
    return list;
}

let countLists = [];

function createCountLists(x) {
    countLists = [];
    let templist = [];
    for (let i = 0; i <= x; i++) {
        templist.push(count(i));
    }
    countLists = templist;
}
createCountLists(5);

let output = [null, null, null, null, null, null];
let round1Results = [null, null, null, null, null, null, null, null, null, null];
let input = [null, null, null, null, null, null];