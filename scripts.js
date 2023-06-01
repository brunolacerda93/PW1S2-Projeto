var Local = /** @class */ (function () {
    function Local(CEP, raio, populacao, detalhes) {
        this.cep = CEP;
        this.raio = raio;
        this.populacao = populacao;
        this.detalhes = detalhes;
    }
    Object.defineProperty(Local.prototype, "CEP", {
        get: function () {
            return this.cep;
        },
        enumerable: false,
        configurable: true
    });
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
    Object.defineProperty(Praga.prototype, "Codigo", {
        get: function () {
            return this.codigo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Praga.prototype, "Nome", {
        get: function () {
            return this.nome;
        },
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
        this.acoes = acoes !== null && acoes !== void 0 ? acoes : "";
        this.data_Exterminio = data_Exterminio !== null && data_Exterminio !== void 0 ? data_Exterminio : new Date(1900, 0, 1);
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
        this.chave = this.GeraChave();
    };
    Contaminacao.prototype.GeraChave = function () {
        var chave = "";
        return chave.concat(this.local.cep, '-', this.praga.codigo.toString(), '-', this.data.toString());
    };
    return Contaminacao;
}());
var Admin = /** @class */ (function () {
    function Admin() {
        var _a, _b, _c;
        this.ListaDeLocais = (_a = JSON.parse(localStorage.getItem("lista-locais"))) !== null && _a !== void 0 ? _a : new Array;
        this.ListaDePragas = (_b = JSON.parse(localStorage.getItem("lista-pragas"))) !== null && _b !== void 0 ? _b : new Array;
        this.ListaDeContms = (_c = JSON.parse(localStorage.getItem("lista-contms"))) !== null && _c !== void 0 ? _c : new Array;
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
    Admin.prototype.LocalPorCEP = function (Cep) {
        return this.ListaDeLocais.filter(function (e) { return e.cep == Cep; })[0];
    };
    Admin.prototype.PragaPorCodigo = function (codigo) {
        return this.ListaDePragas.filter(function (e) { return e.codigo == codigo; })[0];
    };
    Admin.prototype.PragaPorNome = function (nome) {
        return this.ListaDePragas.filter(function (e) { return e.nome == nome; })[0];
    };
    Admin.prototype.ContmPorChave = function (chave) {
        return this.ListaDeContms.filter(function (e) { return e.chave == chave; })[0];
    };
    Admin.prototype.InsereLocal = function (Local) {
        if (this.LocalPorCEP(Local.CEP)) {
            console.log("ERRO: Local informado já se encontra no sistema!!!");
            return;
        }
        this.ListaDeLocais.push(Local);
        localStorage.setItem("lista-locais", JSON.stringify(this.ListaDeLocais));
    };
    Admin.prototype.InserePraga = function (Praga) {
        if (this.PragaPorCodigo(Praga.Codigo)) {
            console.log("ERRO: Praga informada já se encontra no sistema!!!");
            return;
        }
        this.ListaDePragas.push(Praga);
        localStorage.setItem("lista-pragas", JSON.stringify(this.ListaDePragas));
    };
    Admin.prototype.InsereContaminacao = function (Contaminacao) {
        if (this.ContmPorChave(Contaminacao.Chave)) {
            console.log("ERRO: Contaminação informada já se encontra no sistema!!!");
            return;
        }
        this.ListaDeContms.push(Contaminacao);
        localStorage.setItem("lista-contms", JSON.stringify(this.ListaDeContms));
    };
    Admin.prototype.RemoveLocal = function (Local) {
        this.ListaDeLocais.splice(this.ListaDeLocais.indexOf(Local), 1);
        localStorage.setItem("lista-locais", JSON.stringify(this.ListaDeLocais));
    };
    Admin.prototype.RemovePraga = function (Praga) {
        this.ListaDePragas.splice(this.ListaDePragas.indexOf(Praga), 1);
        localStorage.setItem("lista-pragas", JSON.stringify(this.ListaDePragas));
    };
    Admin.prototype.RemoveContm = function (Contaminacao) {
        this.ListaDeContms.splice(this.ListaDeContms.indexOf(Contaminacao), 1);
        localStorage.setItem("lista-contms", JSON.stringify(this.ListaDeContms));
    };
    return Admin;
}());
var Listas = new Admin();
Listas.InsereLocal(new Local("12345-678", 36, 280000, "Blau"));
Listas.InserePraga(new Praga(23, "Mickey", "Laptopspirose", 200, "Fogo"));
Listas.InsereContaminacao(new Contaminacao(Listas.LocalPorCEP("12345-678"), Listas.PragaPorCodigo(23), new Date(2020, 2, 23), "Fazer Pizza", new Date(2022, 4, 19)));
function Teste() {
    Listas.InsereLocal(new Local("12345-679", 6, 280000, "Blau"));
    var loca = Listas.LocalPorCEP("12345-678");
    var prag = Listas.PragaPorCodigo(23);
    console.log("Local Por CEP: ", loca);
    console.log("Praga Por Cod: ", prag);
    var cont = new Contaminacao(loca, prag, new Date(2020, 2, 23));
    console.log("Contm Por Chave: ", Listas.ContmPorChave(cont.Chave));
    Listas.ContmPorChave(cont.Chave).DataExterminio = new Date(2022, 9, 20);
    console.log("Contm Update: ", Listas.ContmPorChave(cont.Chave));
    console.table(Listas.GetLocais);
    console.table(Listas.GetPragas);
    console.table(Listas.GetContaminacoes);
    // Listas.RemoveLocal(Listas.LocalPorCEP("12345-679"));
    // console.table(Listas.GetLocais);
}
//# sourceMappingURL=scripts.js.map