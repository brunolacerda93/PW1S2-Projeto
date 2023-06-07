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
    function Praga(codigo, nome, doencasTransmitidas, tempoVida, modosCombate) {
        this.codigo = codigo;
        this.nome = nome;
        this.doencasTransmitidas = new Array();
        this.doencasTransmitidas.push(doencasTransmitidas);
        this.tempoVida = tempoVida;
        this.modosCombate = modosCombate;
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
        this.chave = "".concat(this.local.cep, "-", this.praga.codigo.toString(), "-", this.data.toString());
    }
    return Contaminacao;
}());
var Admin = /** @class */ (function () {
    function Admin() {
        var _a, _b, _c;
        this.ListaDeLocais =
            (_a = JSON.parse(localStorage.getItem("lista-locais"))) !== null && _a !== void 0 ? _a : new Array();
        this.ListaDePragas =
            (_b = JSON.parse(localStorage.getItem("lista-pragas"))) !== null && _b !== void 0 ? _b : new Array();
        this.ListaDeContms =
            (_c = JSON.parse(localStorage.getItem("lista-contms"))) !== null && _c !== void 0 ? _c : new Array();
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
function Reset() {
    localStorage.clear();
    Listas.InsereLocal(new Local("12345-678", 36, 280000, "Blau"));
    Listas.InserePraga(new Praga(23, "Mickey", "Laptopspirose", 200, "Fogo"));
    Listas.InsereContaminacao(new Contaminacao(Listas.LocalPorCEP("12345-678"), Listas.PragaPorCodigo(23), new Date(2020, 2, 23), "Fazer Pizza", new Date(2022, 4, 19)));
}
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
}
function ListarUmLocal() {
    var place = document.getElementById("listar_um");
    var child = document.getElementById("lista-um-child");
    var cep = document.getElementById("cep-lista-um")
        .value;
    // if (cep == "") return;
    var local = Listas.LocalPorCEP(cep);
    if (!local) {
        if (child) {
            place === null || place === void 0 ? void 0 : place.removeChild(document.getElementById("lista-um-child"));
        }
        return;
    }
    if (child) {
        child.innerHTML = LocalToHTML(local);
        return;
    }
    var p = document.createElement("p");
    p.setAttribute("id", "lista-um-child");
    p.innerHTML = LocalToHTML(local);
    place === null || place === void 0 ? void 0 : place.appendChild(p);
}
function LocalToHTML(local) {
    var str = "";
    return str.concat("CEP: ", local.cep, "<br>Raio: ", local.raio.toString(), "<br>População: ", local.populacao.toString(), "<br>Detalhes: ", local.detalhes);
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
function IncluirLocal() {
    var cep = document.getElementById("cep-local").value;
    var rai = document.getElementById("rai-local").value;
    var pop = document.getElementById("pop-local").value;
    var det = document.getElementById("det-local").value;
    if (cep == "" || +rai == 0 || +pop == 0)
        return;
    Listas.InsereLocal(new Local(cep, +rai, +pop, det));
}
function AlterarLocal() {
    var cep = document.getElementById("cep-local-e")
        .value;
    var rai = document.getElementById("rai-local-e")
        .value;
    var pop = document.getElementById("pop-local-e")
        .value;
    var det = document.getElementById("det-local-e")
        .value;
    if (cep == "")
        return;
    var local = Listas.LocalPorCEP(cep);
    if (rai != "") {
        local.raio = +rai;
    }
    if (pop != "") {
        local.populacao = +pop;
    }
    if (det != "") {
        local.detalhes = det;
    }
    localStorage.setItem("lista-locais", JSON.stringify(Listas.ListaDeLocais));
}
function RemoverLocal() {
    var place = document.getElementById("remover");
    var child = document.getElementById("lista-rem-child");
    var cchil = document.getElementById("rem-conf");
    var cep = document.getElementById("cep-lista-rem")
        .value;
    if (cep == "")
        return;
    var local = Listas.LocalPorCEP(cep);
    if (!local) {
        if (child) {
            place === null || place === void 0 ? void 0 : place.removeChild(child);
            place === null || place === void 0 ? void 0 : place.removeChild(cchil);
        }
        return;
    }
    if (child) {
        child.innerHTML = LocalToHTML(local);
        return;
    }
    var p = document.createElement("p");
    p.setAttribute("id", "lista-rem-child");
    p.innerHTML = LocalToHTML(local);
    place === null || place === void 0 ? void 0 : place.appendChild(p);
    var c = document.createElement("p");
    c.setAttribute("id", "rem-conf");
    c.innerHTML = "Tem certeza?";
    place === null || place === void 0 ? void 0 : place.append(c);
    var botaoSim = document.createElement("button");
    var botaoNao = document.createElement("button");
    botaoSim.innerHTML = "Sim";
    botaoSim.onclick = function () {
        Listas.RemoveLocal(Listas.LocalPorCEP(cep));
        var d = document.createElement("p");
        d.innerHTML = "Removido!";
        place === null || place === void 0 ? void 0 : place.append(d);
        setTimeout(function () {
            place === null || place === void 0 ? void 0 : place.removeChild(d);
            botaoNao.click();
        }, 3500);
    };
    botaoNao.innerHTML = "Não";
    botaoNao.onclick = function () {
        place === null || place === void 0 ? void 0 : place.removeChild(p);
        place === null || place === void 0 ? void 0 : place.removeChild(c);
        place === null || place === void 0 ? void 0 : place.removeChild(botaoSim);
        place === null || place === void 0 ? void 0 : place.removeChild(botaoNao);
    };
    place === null || place === void 0 ? void 0 : place.append(botaoSim);
    place === null || place === void 0 ? void 0 : place.append(botaoNao);
}
function ListarUmaPraga() {
    var place = document.getElementById("listar_uma");
    var child = document.getElementById("lista-uma-child");
    var cod = document.getElementById("cod-lista-uma")
        .value;
    // if (cod == "") return;
    var praga = Listas.PragaPorCodigo(+cod);
    if (!praga) {
        if (child) {
            place === null || place === void 0 ? void 0 : place.removeChild(document.getElementById("lista-uma-child"));
        }
        return;
    }
    if (child) {
        child.innerHTML = PragaToHTML(praga);
        return;
    }
    var p = document.createElement("p");
    p.setAttribute("id", "lista-uma-child");
    p.innerHTML = PragaToHTML(praga);
    place === null || place === void 0 ? void 0 : place.appendChild(p);
}
function PragaToHTML(praga) {
    var str = "";
    return str.concat("Código: ", praga.codigo.toString(), "<br>Nome: ", praga.nome, "<br>Doenças Transmitidas: ", praga.doencasTransmitidas.toString(), "<br>Tempo de Vida: ", praga.tempoVida.toString(), " anos", "<br>Modos de Combate: ", praga.modosCombate);
}
function ListarTodasPragas() {
    var place = document.getElementById("listar_todas");
    var lista = Listas.ListaDePragas;
    var index;
    for (var i = 0; i < lista.length; i++) {
        index = "lista-todos-child-".concat(i.toString());
        if (document.getElementById(index))
            break;
        var p = document.createElement("p");
        p.setAttribute("id", index);
        p.innerHTML = PragaToHTML(lista[i]);
        place === null || place === void 0 ? void 0 : place.appendChild(p);
    }
}
function IncluirPraga() {
    var cod = document.getElementById("cod-praga").value;
    var nom = document.getElementById("nom-praga").value;
    var dot = document.getElementById("dot-praga").value;
    var tev = document.getElementById("tev-praga").value;
    var moc = document.getElementById("moc-praga").value;
    if (+cod == 0 || nom == "" || dot == "" || +tev == 0 || moc == "")
        return;
    Listas.InserePraga(new Praga(+cod, nom, dot, +tev, moc));
}
function AlterarPraga() {
    var cod = document.getElementById("cod-praga-e").value;
    var nom = document.getElementById("nom-praga-e").value;
    var dot = document.getElementById("dot-praga-e").value;
    var tev = document.getElementById("tev-praga-e").value;
    var moc = document.getElementById("moc-praga-e").value;
    if (+cod == 0)
        return;
    var praga = Listas.PragaPorCodigo(+cod);
    if (nom != "") {
        praga.nome = nom;
    }
    if (dot != "") {
        praga.doencasTransmitidas.push(dot);
    }
    if (+tev != 0) {
        praga.tempoVida = +tev;
    }
    if (moc != "") {
        praga.modosCombate = moc;
    }
    localStorage.setItem("lista-pragas", JSON.stringify(Listas.ListaDePragas));
}
function RemoverPraga() {
    var place = document.getElementById("remover");
    var child = document.getElementById("lista-rem-child");
    var cchil = document.getElementById("rem-conf");
    var cod = document.getElementById("cod-praga-rem")
        .value;
    if (cod == "")
        return;
    var praga = Listas.PragaPorCodigo(+cod);
    if (!praga) {
        if (child) {
            place === null || place === void 0 ? void 0 : place.removeChild(child);
            place === null || place === void 0 ? void 0 : place.removeChild(cchil);
        }
        return;
    }
    if (child) {
        child.innerHTML = PragaToHTML(praga);
        return;
    }
    var p = document.createElement("p");
    p.setAttribute("id", "lista-rem-child");
    p.innerHTML = PragaToHTML(praga);
    place === null || place === void 0 ? void 0 : place.appendChild(p);
    var c = document.createElement("p");
    c.setAttribute("id", "rem-conf");
    c.innerHTML = "Tem certeza?";
    place === null || place === void 0 ? void 0 : place.append(c);
    var botaoSim = document.createElement("button");
    var botaoNao = document.createElement("button");
    botaoSim.innerHTML = "Sim";
    botaoSim.onclick = function () {
        Listas.RemovePraga(Listas.PragaPorCodigo(+cod));
        var d = document.createElement("p");
        d.innerHTML = "Removido!";
        place === null || place === void 0 ? void 0 : place.append(d);
        setTimeout(function () {
            place === null || place === void 0 ? void 0 : place.removeChild(d);
            botaoNao.click();
        }, 3500);
    };
    botaoNao.innerHTML = "Não";
    botaoNao.onclick = function () {
        place === null || place === void 0 ? void 0 : place.removeChild(p);
        place === null || place === void 0 ? void 0 : place.removeChild(c);
        place === null || place === void 0 ? void 0 : place.removeChild(botaoSim);
        place === null || place === void 0 ? void 0 : place.removeChild(botaoNao);
    };
    place === null || place === void 0 ? void 0 : place.append(botaoSim);
    place === null || place === void 0 ? void 0 : place.append(botaoNao);
}
function ListarUmaContm() {
}
function ContmToHTML(contm) {
}
function ListarTodasContms() {
}
function IncluirContm() {
}
function AlterarContm() {
}
function RemoverContm() {
}
function DoencasEtPragas(n) {
}
function PragasEtDoencas() {
}
function ContmsEtDatas() {
}
//# sourceMappingURL=scripts.js.map