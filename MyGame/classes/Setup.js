const rasendestroyer = require('./rasendestroyer.js')

function löschObjekt(zeile,spalte,array) {
    for(let i =0;i<array.length;i++){
      	let gras = array[i]
        if(gras.zeile === zeile && gras.spalte === spalte){
          array.splice(i,1)
          return;
        }
    }
}

module.exports = {löschObjekt}