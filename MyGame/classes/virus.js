const LivingCreature = require("./LivingCreature.js");
const functions = require('./setup.js');
module.exports = class virus extends LivingCreature{
    energie = 15
    constructor(z,s) {
      super(z, s)
      this.platziereSelbstInMatrix();
      this.VirusArr = []
    }
    platziereSelbstInMatrix() {
        matrix[this.zeile][this.spalte] = 3;
    };
    spielzug() {
      if (this.energie > 30) {
        this.werdegesund();
      } else {
        this.stecke_an()
        this.machSchritt()
        super.updateUmgebung()
      }


    };
    werdegesund () {
      let result = Math.random(0,3)
      console.log(result)
      if(result == 0){
        functions.löschObjekt(this.zeile,this.spalte,this.VirusArr);
        this.VirusArr.push(new RasenDestroyer(this.zeile,this.spalte))
      } else if(result == 1){
        functions.löschObjekt(this.zeile,this.spalte,this.VirusArr);
        this.VirusArr.push(new Gras(this.zeile,this.spalte))
      } else{
        this.energie = 0
      }
    }
    machSchritt() {
      let umgebungGefiltert = super.umgebungFiltern(1)
      if(umgebungGefiltert.length > 0){
        let randomIndex = Math.floor(Math.random() * umgebungGefiltert.length);
        let koordinate = umgebungGefiltert[randomIndex];
        matrix[this.zeile][this.spalte] = 0;
          functions.löschObjekt(koordinate[0],koordinate[1],this.VirusArr);
        this.zeile = koordinate[0];
        this.spalte = koordinate[1];
        matrix[this.zeile][this.spalte] = 3;
        this.energie++
      }
      return;
  };
    stecke_an(){
    	let gefaerdeteUmgebung = [
    	    [this.zeile + 1, this.spalte],
            [this.zeile, this.spalte + 1],
            [this.zeile - 1, this.spalte],
            [this.zeile, this.spalte - 1],
            [this.zeile + 1, this.spalte + 1],
            [this.zeile - 1, this.spalte - 1],
            [this.zeile - 1, this.spalte + 1],
            [this.zeile+ 1, this.spalte - 1],
            [this.zeile + 2, this.spalte],
            [this.zeile + 2, this.spalte - 1],
            [this.zeile + 2, this.spalte - 2],
            [this.zeile + 2, this.spalte + 1],
            [this.zeile + 2, this.spalte + 2],
            [this.zeile - 2, this.spalte],
            [this.zeile - 2, this.spalte - 1],
            [this.zeile - 2, this.spalte - 2],
            [this.zeile - 2, this.spalte + 1],
            [this.zeile - 2, this.spalte + 2],
            [this.zeile - 1, this.spalte - 2],
            [this.zeile - 1, this.spalte + 2],
            [this.zeile + 1, this.spalte - 2],
            [this.zeile + 1, this.spalte + 2],
            [this.zeile, this.spalte - 2],
            [this.zeile, this.spalte + 2]
        ]
        let gefaerdeteUmgebungGefiltert = [];
        for (let i = 0; i < 24; i++) {
          //console.log(i)
            let koordinate = gefaerdeteUmgebung[i]
            
            // hier, überprüfe ob die koordinate außerhalb der Matrix liegt
            if (koordinate[0] < 0 || koordinate[0] >= matrix.length || koordinate[1] < 0 || koordinate[1] >= matrix[0].length ) {
            }
             else if (matrix[koordinate[0]][koordinate[1]] === 2) {
              gefaerdeteUmgebungGefiltert.push(koordinate);
            }
        };
        //console.log(gefaerdeteUmgebungGefiltert.length)
        for (let i = 0; i < gefaerdeteUmgebungGefiltert.length; i++){
          let koordinate = gefaerdeteUmgebungGefiltert[i]
          functions.löschObjekt(koordinate[0],koordinate[1],this.VirusArr);
          this.VirusArr.push(new virus(koordinate[0],koordinate[1]));
        }
        // let i = findeObjektIndex(zeile,spalte,objektArray);
        // let objekt = objekteArray[i];
        // objekt.state = 1;

    }
  }
