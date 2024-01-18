
function main(){
    const socket = io();

    console.log('ready to display GoL...');

    function gotMatrix(data){
        console.log(data);
        matrix = data;
    }
    socket.on('matrix', gotMatrix);

}

matrix = []

function quadrat(zeile, spalte, sw) {
    if (sw === 1) {
        fill(34, 139, 34)
    } else if (sw === 2) {
        fill(255, 0, 0)
    } else if (sw === 3) {
        fill(0,255,0)
    } else {
        fill(209, 188, 138)
    }
    let seite = 23;
    rect( spalte * seite,zeile *seite, seite, seite)
};

function setup() {
    createCanvas(2600, 1700);  
    frameRate(60);
}


function draw() {
    //console.log(matrix.length,matrix[0].length)
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            //console.log(j)
            quadrat(i, j, matrix[i][j])
        }
    }
}


window.onload = main