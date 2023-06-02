var Local = /** @class */ (function () {
    function Local(CEP, raio, populacao, detalhes) {
        this.cep = CEP;
        this.raio = raio;
        this.populacao = populacao;
        this.detalhes = detalhes;
    }
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
    return Praga;
}());
var Contaminacao = /** @class */ (function () {
    function Contaminacao(local, praga, data, acoes, dataExterminio) {
        this.local = local;
        this.praga = praga;
        this.data = data;
        this.acoes = acoes !== null && acoes !== void 0 ? acoes : "";
        this.dataExterminio = dataExterminio !== null && dataExterminio !== void 0 ? dataExterminio : new Date(1900, 0, 1);
        this.chave = this.GeraChave();
    }
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
        if (this.LocalPorCEP(Local.cep)) {
            console.log("ERRO: Local informado já se encontra no sistema!!!");
            return;
        }
        this.ListaDeLocais.push(Local);
        localStorage.setItem("lista-locais", JSON.stringify(this.ListaDeLocais));
    };
    Admin.prototype.InserePraga = function (Praga) {
        if (this.PragaPorCodigo(Praga.codigo)) {
            console.log("ERRO: Praga informada já se encontra no sistema!!!");
            return;
        }
        this.ListaDePragas.push(Praga);
        localStorage.setItem("lista-pragas", JSON.stringify(this.ListaDePragas));
    };
    Admin.prototype.InsereContaminacao = function (Contaminacao) {
        if (this.ContmPorChave(Contaminacao.chave)) {
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
localStorage.clear();
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
    console.log("Contm Por Chave: ", Listas.ContmPorChave(cont.chave));
    Listas.ContmPorChave(cont.chave).dataExterminio = new Date(2022, 9, 20);
    console.log("Contm Update: ", Listas.ContmPorChave(cont.chave));
    console.table(Listas.ListaDeLocais);
    console.table(Listas.ListaDePragas);
    console.table(Listas.ListaDeContms);
    // Listas.RemoveLocal(Listas.LocalPorCEP("12345-679"));
    // console.table(Listas.GetLocais);
}
function ListarUmLocal() {
    var place = document.getElementById("listar_um");
    var input = document.getElementById("cep-lista-um");
    var foo = document.getElementById("lista-um-child");
    var local = Listas.LocalPorCEP(input.value);
    if (!local) {
        if (foo) {
            place === null || place === void 0 ? void 0 : place.removeChild(document.getElementById("lista-um-child"));
        }
        return;
    }
    if (foo) {
        foo.innerHTML = LocalToHTML(local);
        return;
    }
    var p = document.createElement("p");
    p.setAttribute("id", "lista-um-child");
    p.innerHTML = LocalToHTML(local);
    place === null || place === void 0 ? void 0 : place.appendChild(p);
}
function LocalToHTML(local) {
    var str = "";
    return str.concat("<p>CEP: ", local.cep, "<br>Raio: ", local.raio.toString(), "<br>População: ", local.populacao.toString(), "<br>Detalhes: ", local.detalhes, "</p>");
}
function ListarTodosLocais() {
    var place = document.getElementById("listar_todos");
    var lista = Listas.ListaDeLocais;
    var index;
    for (var i = 0; i < lista.length; i++) {
        index = "lista-todos-child-".concat(i.toString());
        if (document.getElementById(index))
            break;
        var p = document.createElement("p");
        p.setAttribute("id", index);
        p.innerHTML = LocalToHTML(lista[i]);
        place === null || place === void 0 ? void 0 : place.appendChild(p);
    }
}
//# sourceMappingURL=scripts.js.map