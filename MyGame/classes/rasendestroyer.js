const functions = require('./setup.js')
const LivingCreature = require("./LivingCreature.js");
module.exports = class RasenDestroyer extends LivingCreature {
    energie = 15;
    constructor(z,s) {
      super(z, s)
      this.platziereSelbstInMatrix()
      this.RasenDestroyerArray = []
    }
    platziereSelbstInMatrix() {
        matrix[this.zeile][this.spalte] = 2;
    };
    
    spielzug() {
      if (this.energie > 30) {
        this.platzierNeuesObjekt();
        this.energie = 15;
      } else if (this.energie > 0) {
        this.machSchritt();
      } else {
          matrix[this.zeile][this.spalte] = 0;
        functions.löschObjekt(this.zeile,this.spalte,this.RasenDestroyerArray);
      }
      this.updateUmgebung()
    };
    platzierNeuesObjekt() {
      let umgebungGefiltert = super.umgebungFiltern(0)

        if(umgebungGefiltert.length > 0){
          let randomIndex = Math.floor(Math.random() * umgebungGefiltert.length);
          let koordinate = umgebungGefiltert[randomIndex];
            this.RasenDestroyerArray.push(new RasenDestroyer(koordinate[0],koordinate[1]));
        }
        return;
    }
    machSchritt() {
        let umgebungGefiltert = super.umgebungFiltern(1)
        if(umgebungGefiltert.length > 0){
          let randomIndex = Math.floor(Math.random() * umgebungGefiltert.length);
          let koordinate = umgebungGefiltert[randomIndex];
          matrix[this.zeile][this.spalte] = 0;
          functions.löschObjekt(koordinate[0],koordinate[1], this.RasenDestroyerArray);
          this.zeile = koordinate[0];
          this.spalte = koordinate[1];
          matrix[this.zeile][this.spalte] = 2;
          this.energie++
        }
          else{
          this.energie--
        }
        
        return;
    };
};
