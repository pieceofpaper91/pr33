

const Gras = require("./classes/gras.js");
const RasenDestroyer = require("./classes/rasendestroyer.js");
const Virus = require("./classes/virus.js");

const express = require("express");
const app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

let clients = [];
let isGameRunning = false;
let interValID;

app.use(express.static('./client'));

app.get('/', function (req, res){
    res.redirect('index.html');
});

server.listen(3000, function (){
    console.log("Der Server läuft auf port 3000...");
    // initGame();
    // setInterval(function(){
    //     updateGame();
    // }, 1000);

    io.on('connection', function(socket){
        console.log('ws connection established...');
        clients.push(socket.id);
        // socket.emit('matrix', matrix);

        // Spielstart - NEU
        if(clients.length == 1 && isGameRunning == false){
            console.log("Starte Spiel... wenn noch nicht gestartet...");
            initGame();
            interValID= setInterval(updateGame, 100);
            isGameRunning = true;
            //setInterval(raining, 4000);
        }

        // Verhalten wenn Clients verlassen
        socket.on('disconnect', function(){
            console.log('client left...');
            const foundIndex = clients.findIndex(id => id === socket.id);
            if(foundIndex >= 0){
                clients.splice(foundIndex, 1);
            } 
            if(clients.length === 0){
                isGameRunning = false;
                clearInterval(interValID);  
                console.log("Spiel gestoppt: keine Clients", clients.length); 
            }
        });
    });
   
});

// game logic on server
matrix = [
 ];

GrasArr = [];
RasenDestroyerArr = [];
VirusArr =[];

function getRandMatrix(zeile, spalte){
    let matrix = [];
    for(let y = 0; y <= spalte; y++){
        matrix.push([]);
        for(let x = 0; x <= zeile; x++){
            matrix[y][x] = Math.floor(Math.random() * 2);
        }
    }
    return matrix;
}

function addMoreCreatures(){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if(y == x){
                matrix[y][x] =2;
            }
        }
    }
}

function initGame(){
    console.log('init game....');
    matrix = getRandMatrix(109,50);
    addMoreCreatures();
    // durch Matrix laufen und Lebewesen erstellen
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] == 1){
                let GrasObj = new Gras(x,y);
                GrasArr.push(GrasObj);
            }else if(matrix[y][x] == 2){
                let RasendestroyerObj = new RasenDestroyer(x,y);
                RasenDestroyerArr.push(RasendestroyerObj);
            }else if(matrix[y][x] == 3){
                let VirusObj = new Virus(x,y);
                VirusArr.push(VirusObj);
            } 
        }   
    }
    
}

function updateGame(){
    console.log("update game...");
    for(let i = 0; i < GrasArr.length; i++){
        let grassObj = GrasArr[i];
        grassObj.zug();
    }
    for(let i = 0; i < VirusArr.length; i++){
        let VirusObj = VirusArr[i];
        VirusObj.spielzug();
    }
    for(let i = 0; i < RasenDestroyerArr.length; i++){
        let grazerObj = RasenDestroyerArr[i];
        grazerObj.spielzug();
    }
    //console.log(matrix);
    io.sockets.emit('matrix', matrix)
}