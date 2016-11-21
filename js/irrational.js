function Irrational(value, name) {
    this.value = value;
    this.name = name;
}

IRRATIONALS = Object.freeze({
    PI: new Irrational(Math.PI, "π"),
    E: new Irrational(Math.E, "e"),
    PHI: new Irrational((Math.sqrt(5) + 1) / 2.0, "φ (golden ratio)"),
    CHAPERNOWNE_NR: new Irrational(0.12345678910111213, "Chapernowne Number"),
    LN_2: new Irrational(Math.log(2), "ln(2)"),
    HILBERT_NR: new Irrational(Math.pow(2, Math.sqrt(2)), "Hilbert Number"),
    EXP_E_PI: new Irrational(Math.pow(Math.E, Math.PI), "e^π"),
    EXP_PI_E: new Irrational(Math.pow(Math.PI, Math.E), "π^e"),
    EXP_I_I: new Irrational(0.207879576, "i^i"),
    FEIGENBAUM_NR: new Irrational(4.669201609102, "Feigenbaum Number"),
    SQRT_2: new Irrational(Math.sqrt(2), "sqrt(2)"),
    SQRT_3: new Irrational(Math.sqrt(3), "sqrt(3)"),
    LN_3: new Irrational(Math.log(3), "ln(3)"),
    EULER_MASCHERONI_CONSTANT: new Irrational(0.577215664901, "Euler-Mascheroni Constant"),
    CATALAN_CONSTANT: new Irrational(0.915965594177, "Catalan Constant"),
    SQRT_7: new Irrational(Math.sqrt(7), "sqrt(7)")
});

IRRATIONALS_ARRAY = Object.keys(IRRATIONALS).map(function (key) { return IRRATIONALS[key]; });

Irrational.prototype.makeBst = function (nrElements) {
    var curr = this.value % 1.0;
    var bst = new BinarySearchTree();
    for (var i = 0; i < nrElements; i++) {
        bst.push(curr);
        curr = (curr + this.value) % 1.0;
    }
    return bst;
};