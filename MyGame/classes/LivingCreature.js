module.exports = class LivingCreature{
    constructor(z, s){
        this.zeile = z;
        this.spalte = s;
        this.umgebung = [[this.zeile + 1, this.spalte],
            [this.zeile, this.spalte + 1],
            [this.zeile - 1, this.spalte],
            [this.zeile, this.spalte - 1]]
    }
    updateUmgebung(){
        this.umgebung = [[this.zeile + 1, this.spalte],
        [this.zeile, this.spalte + 1],
        [this.zeile - 1, this.spalte],
        [this.zeile, this.spalte - 1]]
    }
    umgebungFiltern(target){
        let umgebungGefiltert = [];
        for (let i = 0; i < this.umgebung.length; i++) {
            let koordinate = this.umgebung[i]
            // hier, überprüfe ob die koordinate außerhalb der Matrix liegt
            if (koordinate[0] < 0 || koordinate[0] >= matrix.length || koordinate[1] < 0 || koordinate[1] >= matrix[0].length) {

            } else if (matrix[koordinate[0]][koordinate[1]] === target) {
                umgebungGefiltert.push(koordinate);
            }
        };
        return umgebungGefiltert
    }   
}

