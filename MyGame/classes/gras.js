const LivingCreature = require("./LivingCreature.js");
module.exports = class Gras extends LivingCreature{
    constructor(z,s) {
        super(z, s)
        this.energie = 0
        this.grassArr = []
    };
    
    zug(){
        this.energie++
        if(this.energie >= 6){
            let umgebungGefiltert = this.umgebungFiltern(0)
            if(umgebungGefiltert.length > 0){
                let randomIndex = Math.floor(Math.random() * umgebungGefiltert.length);
                let newPos = umgebungGefiltert[randomIndex]; // [x,y]
                let koordinate = newPos;
                let newZeile = koordinate[0];
                let newSpalte = koordinate[1];
                this.grassArr.push(new Gras(newZeile, newSpalte));
            }
            this.energie = 0
        }
    }
};

