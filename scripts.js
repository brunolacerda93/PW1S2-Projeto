var Local = /** @class */ (function () {
    function Local(CEP, raio, populacao, detalhes) {
        this.CEP = CEP;
        this.raio = raio;
        this.populacao = populacao;
        this.detalhes = detalhes;
    }
    Object.defineProperty(Local.prototype, "Raio", {
        set: function (value) {
            this.raio = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Local.prototype, "Populacao", {
        set: function (value) {
            this.populacao = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Local.prototype, "Detalhes", {
        set: function (value) {
            this.detalhes = value;
        },
        enumerable: false,
        configurable: true
    });
    Local.prototype.Update = function (raio, populacao, detalhes) {
        this.raio = raio;
        this.populacao = populacao;
        this.detalhes = detalhes;
    };
    return Local;
}());
var Praga = /** @class */ (function () {
    function Praga(codigo, nome, doencas_Transmitidas, tempo_Vida, modos_Combate) {
        this.codigo = codigo;
        this.nome = nome;
        this.doencas_Transmitidas = doencas_Transmitidas;
        this.tempo_Vida = tempo_Vida;
        this.modos_Combate = modos_Combate;
    }
    Object.defineProperty(Praga.prototype, "Nome", {
        set: function (value) {
            this.nome = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Praga.prototype, "DoencasTransmitidas", {
        set: function (value) {
            this.doencas_Transmitidas = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Praga.prototype, "TempoVida", {
        set: function (value) {
            this.tempo_Vida = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Praga.prototype, "ModosCombate", {
        set: function (value) {
            this.modos_Combate = value;
        },
        enumerable: false,
        configurable: true
    });
    Praga.prototype.Update = function (nome, doencas_Transmitidas, tempo_Vida, modos_Combate) {
        this.nome = nome;
        this.doencas_Transmitidas = doencas_Transmitidas;
        this.tempo_Vida = tempo_Vida;
        this.modos_Combate = modos_Combate;
    };
    return Praga;
}());
var Contaminacao = /** @class */ (function () {
    function Contaminacao(local, praga, data, acoes, data_Exterminio) {
        this.local = local;
        this.praga = praga;
        this.data = data;
        this.acoes = acoes;
        this.data_Exterminio = data_Exterminio;
        this.chave = this.GeraChave();
    }
    Object.defineProperty(Contaminacao.prototype, "Chave", {
        get: function () {
            return this.chave;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Contaminacao.prototype, "Data", {
        set: function (value) {
            this.data = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Contaminacao.prototype, "Acoes", {
        set: function (value) {
            this.acoes = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Contaminacao.prototype, "DataExterminio", {
        set: function (value) {
            this.data_Exterminio = value;
        },
        enumerable: false,
        configurable: true
    });
    Contaminacao.prototype.Update = function (data, acoes, data_Exterminio) {
        this.data = data;
        this.acoes = acoes;
        this.data_Exterminio = data_Exterminio;
    };
    Contaminacao.prototype.GeraChave = function () {
        var chave = "";
        return chave.concat(this.local.CEP, '-', this.praga.codigo.toString(), '-', this.data.toString());
    };
    return Contaminacao;
}());
var Admin = /** @class */ (function () {
    function Admin() {
        this.ListaDeLocais = new Array;
        this.ListaDePragas = new Array;
        this.ListaDeContms = new Array;
    }
    Object.defineProperty(Admin.prototype, "GetLocais", {
        get: function () {
            return this.ListaDeLocais;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Admin.prototype, "GetPragas", {
        get: function () {
            return this.ListaDePragas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Admin.prototype, "GetContaminacoes", {
        get: function () {
            return this.ListaDeContms;
        },
        enumerable: false,
        configurable: true
    });
    Admin.prototype.Print = function (Lista) {
        console.log("---------------------------------------------------------------");
        for (var e = 0; e < Lista.length; e++) {
            console.log(Lista[e]);
        }
    };
    Admin.prototype.LocalPorCEP = function (CEP) {
        return this.ListaDeLocais.filter(function (e) { return e.CEP === CEP; })[0];
    };
    Admin.prototype.PragaPorCodigo = function (Codigo) {
        return this.ListaDePragas.filter(function (e) { return e.codigo === Codigo; })[0];
    };
    Admin.prototype.PragaPorNome = function (Nome) {
        return this.ListaDePragas.filter(function (e) { return e.nome === Nome; })[0];
    };
    Admin.prototype.ContmPorChave = function (Chave) {
        return this.ListaDeContms.filter(function (e) { return e.chave === Chave; })[0];
    };
    Admin.prototype.InsereLocal = function (Local) {
        this.ListaDeLocais.push(Local);
    };
    Admin.prototype.InserePraga = function (Praga) {
        this.ListaDePragas.push(Praga);
    };
    Admin.prototype.InsereContaminacao = function (Contaminacao) {
        this.ListaDeContms.push(Contaminacao);
    };
    Admin.prototype.RemoveLocal = function (Local) {
        this.ListaDeLocais.splice(this.ListaDeLocais.indexOf(Local), 1);
    };
    Admin.prototype.RemovePraga = function (Praga) {
        this.ListaDePragas.splice(this.ListaDePragas.indexOf(Praga), 1);
    };
    return Admin;
}());
function Teste() {
    var Listas = new Admin();
    Listas.InsereLocal(new Local("12345-678", 6, 280000, "Blau"));
    Listas.InsereLocal(new Local("12345-679", 6, 280000, "Blau"));
    Listas.InserePraga(new Praga(23, "Mickey", "Laptopspirose", 200, "Fogo"));
    var cont = new Contaminacao(Listas.LocalPorCEP("12345-678"), Listas.PragaPorCodigo(23), new Date(2020, 2, 23), "Fazer Pizza", new Date(2022, 4, 19));
    Listas.InsereContaminacao(cont);
    console.log("Local Por CEP: ", Listas.LocalPorCEP("12345-678"));
    console.log("Praga Por Cod: ", Listas.PragaPorCodigo(23));
    console.log("Contm Por Chave: ", Listas.ContmPorChave(cont.Chave));
    Listas.ContmPorChave(cont.Chave).DataExterminio = new Date(2022, 9, 20);
    console.log("Contm Update: ", Listas.ContmPorChave(cont.Chave));
    Listas.ListaDeContms;
    console.table(Listas.GetLocais);
    console.table(Listas.GetPragas);
    console.table(Listas.GetContaminacoes);
    Listas.RemoveLocal(Listas.LocalPorCEP("12345-678"));
    console.table(Listas.GetLocais);
}
//# sourceMappingURL=scripts.js.map