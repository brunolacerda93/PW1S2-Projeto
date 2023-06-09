class Local {
    constructor(CEP, raio, populacao, detalhes) {
        this.cep = CEP;
        this.raio = raio;
        this.populacao = populacao;
        this.detalhes = detalhes;
    }
}
class Praga {
    constructor(codigo, nome, doencasTransmitidas, tempoVida, modosCombate) {
        this.codigo = codigo;
        this.nome = nome;
        this.doencasTransmitidas = new Array();
        this.doencasTransmitidas.push(doencasTransmitidas);
        this.tempoVida = tempoVida;
        this.modosCombate = modosCombate;
    }
}
class Contaminacao {
    constructor(local, praga, data, acoes, dataExterminio) {
        var _a, _b, _c;
        this.local = local;
        this.praga = praga;
        this.data = data;
        this.acoes = acoes !== null && acoes !== void 0 ? acoes : "";
        this.dataExterminio = dataExterminio !== null && dataExterminio !== void 0 ? dataExterminio : new Date(1900, 0, 1);
        this.chave = "".concat((_a = this.local) === null || _a === void 0 ? void 0 : _a.cep, "-", (_b = this.praga) === null || _b === void 0 ? void 0 : _b.codigo.toString(), "-", (_c = this.data) === null || _c === void 0 ? void 0 : _c.toUTCString());
    }
}
class Admin {
    constructor() {
        var _a, _b, _c;
        this.ListaDeLocais =
            (_a = JSON.parse(localStorage.getItem("lista-locais"))) !== null && _a !== void 0 ? _a : new Array();
        this.ListaDePragas =
            (_b = JSON.parse(localStorage.getItem("lista-pragas"))) !== null && _b !== void 0 ? _b : new Array();
        this.ListaDeContms =
            (_c = JSON.parse(localStorage.getItem("lista-contms"))) !== null && _c !== void 0 ? _c : new Array();
    }
    LocalPorCEP(Cep) {
        return this.ListaDeLocais.filter((e) => e.cep == Cep)[0];
    }
    PragaPorCodigo(codigo) {
        return this.ListaDePragas.filter((e) => e.codigo == codigo)[0];
    }
    PragaPorNome(nome) {
        return this.ListaDePragas.filter((e) => e.nome == nome)[0];
    }
    ContmPorChave(chave) {
        return this.ListaDeContms.filter((e) => e.chave == chave)[0];
    }
    InsereLocal(Local) {
        if (this.LocalPorCEP(Local.cep)) {
            console.log("ERRO: Local informado já se encontra no sistema!!!");
            return;
        }
        this.ListaDeLocais.push(Local);
        localStorage.setItem("lista-locais", JSON.stringify(this.ListaDeLocais));
    }
    InserePraga(Praga) {
        if (this.PragaPorCodigo(Praga.codigo)) {
            console.log("ERRO: Praga informada já se encontra no sistema!!!");
            return;
        }
        this.ListaDePragas.push(Praga);
        localStorage.setItem("lista-pragas", JSON.stringify(this.ListaDePragas));
    }
    InsereContaminacao(Contaminacao) {
        if (this.ContmPorChave(Contaminacao.chave)) {
            console.log("ERRO: Contaminação informada já se encontra no sistema!!!");
            return;
        }
        this.ListaDeContms.push(Contaminacao);
        localStorage.setItem("lista-contms", JSON.stringify(this.ListaDeContms));
    }
    RemoveLocal(Local) {
        this.ListaDeLocais.splice(this.ListaDeLocais.indexOf(Local), 1);
        localStorage.setItem("lista-locais", JSON.stringify(this.ListaDeLocais));
    }
    RemovePraga(Praga) {
        this.ListaDePragas.splice(this.ListaDePragas.indexOf(Praga), 1);
        localStorage.setItem("lista-pragas", JSON.stringify(this.ListaDePragas));
    }
    RemoveContm(Contaminacao) {
        this.ListaDeContms.splice(this.ListaDeContms.indexOf(Contaminacao), 1);
        localStorage.setItem("lista-contms", JSON.stringify(this.ListaDeContms));
    }
}
let Listas = new Admin();
function Reset() {
    localStorage.clear();
    Listas.InsereLocal(new Local("12345-678", 36, 280000, "Blau"));
    Listas.InserePraga(new Praga(23, "Mickey", "Laptopspirose", 200, "Fogo"));
    Listas.InsereContaminacao(new Contaminacao(Listas.LocalPorCEP("12345-678"), Listas.PragaPorCodigo(23), new Date("2020-03-23"), "Fazer Pizza", new Date("2022-04-19")));
}
function Teste() {
    Listas.InsereLocal(new Local("12345-679", 6, 280000, "Blau"));
    const loca = Listas.LocalPorCEP("12345-678");
    const prag = Listas.PragaPorCodigo(23);
    console.log("Local Por CEP: ", loca);
    console.log("Praga Por Cod: ", prag);
    const cont = new Contaminacao(loca, prag, new Date("2020-03-23"));
    console.log("Contm Por Chave: ", Listas.ContmPorChave(cont.chave));
    Listas.ContmPorChave(cont.chave).dataExterminio = new Date("2022-10-20");
    console.log("Contm Update: ", Listas.ContmPorChave(cont.chave));
    console.table(Listas.ListaDeLocais);
    console.table(Listas.ListaDePragas);
    console.table(Listas.ListaDeContms);
}
function ListarUmLocal() {
    const place = document.getElementById("listar_um");
    const child = document.getElementById("lista-um-child");
    const cep = document.getElementById("cep-lista-um").value;
    const local = Listas.LocalPorCEP(cep);
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
    const p = document.createElement("p");
    p.setAttribute("id", "lista-um-child");
    p.innerHTML = LocalToHTML(local);
    place === null || place === void 0 ? void 0 : place.appendChild(p);
}
function LocalToHTML(local) {
    let str = "";
    return str.concat("CEP: ", local.cep, "<br>Raio: ", local.raio.toString(), "<br>População: ", local.populacao.toString(), "<br>Detalhes: ", local.detalhes);
}
function ListarTodosLocais() {
    const place = document.getElementById("listar_todos");
    const lista = Listas.ListaDeLocais;
    let index;
    for (let i = 0; i < lista.length; i++) {
        index = "lista-todos-child-".concat(i.toString());
        if (document.getElementById(index))
            break;
        const p = document.createElement("p");
        p.setAttribute("id", index);
        p.innerHTML = LocalToHTML(lista[i]);
        place === null || place === void 0 ? void 0 : place.appendChild(p);
    }
}
function IncluirLocal() {
    const cep = document.getElementById("cep-local").value;
    const rai = document.getElementById("rai-local").value;
    const pop = document.getElementById("pop-local").value;
    const det = document.getElementById("det-local").value;
    if (cep == "" || +rai == 0 || +pop == 0)
        return;
    Listas.InsereLocal(new Local(cep, +rai, +pop, det));
}
function AlterarLocal() {
    const cep = document.getElementById("cep-local-e")
        .value;
    const rai = document.getElementById("rai-local-e")
        .value;
    const pop = document.getElementById("pop-local-e")
        .value;
    const det = document.getElementById("det-local-e")
        .value;
    if (cep == "")
        return;
    const local = Listas.LocalPorCEP(cep);
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
    const place = document.getElementById("remover");
    const child = document.getElementById("lista-rem-child");
    const cchil = document.getElementById("rem-conf");
    const cep = document.getElementById("cep-lista-rem")
        .value;
    if (cep == "")
        return;
    const local = Listas.LocalPorCEP(cep);
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
    const p = document.createElement("p");
    p.setAttribute("id", "lista-rem-child");
    p.innerHTML = LocalToHTML(local);
    place === null || place === void 0 ? void 0 : place.appendChild(p);
    const c = document.createElement("p");
    c.setAttribute("id", "rem-conf");
    c.innerHTML = "Tem certeza?";
    place === null || place === void 0 ? void 0 : place.append(c);
    const botaoSim = document.createElement("button");
    const botaoNao = document.createElement("button");
    botaoSim.innerHTML = "Sim";
    botaoSim.onclick = () => {
        Listas.RemoveLocal(Listas.LocalPorCEP(cep));
        const d = document.createElement("p");
        d.innerHTML = "Removido!";
        place === null || place === void 0 ? void 0 : place.append(d);
        setTimeout(() => {
            place === null || place === void 0 ? void 0 : place.removeChild(d);
            botaoNao.click();
        }, 3500);
    };
    botaoNao.innerHTML = "Não";
    botaoNao.onclick = () => {
        place === null || place === void 0 ? void 0 : place.removeChild(p);
        place === null || place === void 0 ? void 0 : place.removeChild(c);
        place === null || place === void 0 ? void 0 : place.removeChild(botaoSim);
        place === null || place === void 0 ? void 0 : place.removeChild(botaoNao);
    };
    place === null || place === void 0 ? void 0 : place.append(botaoSim);
    place === null || place === void 0 ? void 0 : place.append(botaoNao);
}
function ListarUmaPraga() {
    const place = document.getElementById("listar_uma");
    const child = document.getElementById("lista-uma-child");
    const cod = document.getElementById("cod-lista-uma").value;
    const praga = Listas.PragaPorCodigo(+cod);
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
    const p = document.createElement("p");
    p.setAttribute("id", "lista-uma-child");
    p.innerHTML = PragaToHTML(praga);
    place === null || place === void 0 ? void 0 : place.appendChild(p);
}
function PragaToHTML(praga) {
    let str = "";
    return str.concat("Código: ", praga.codigo.toString(), "<br>Nome: ", praga.nome, "<br>Doenças Transmitidas: ", praga.doencasTransmitidas.toString(), "<br>Tempo de Vida: ", praga.tempoVida.toString(), " anos", "<br>Modos de Combate: ", praga.modosCombate);
}
function ListarTodasPragas() {
    const place = document.getElementById("listar_todas");
    const lista = Listas.ListaDePragas;
    let index;
    for (let i = 0; i < lista.length; i++) {
        index = "lista-todos-child-".concat(i.toString());
        if (document.getElementById(index))
            break;
        const p = document.createElement("p");
        p.setAttribute("id", index);
        p.innerHTML = PragaToHTML(lista[i]);
        place === null || place === void 0 ? void 0 : place.appendChild(p);
    }
}
function IncluirPraga() {
    const cod = document.getElementById("cod-praga").value;
    const nom = document.getElementById("nom-praga").value;
    const dot = document.getElementById("dot-praga").value;
    const tev = document.getElementById("tev-praga").value;
    const moc = document.getElementById("moc-praga").value;
    if (+cod == 0 || nom == "" || dot == "" || +tev == 0 || moc == "")
        return;
    Listas.InserePraga(new Praga(+cod, nom, dot, +tev, moc));
}
function AlterarPraga() {
    const cod = document.getElementById("cod-praga-e").value;
    const nom = document.getElementById("nom-praga-e").value;
    const dot = document.getElementById("dot-praga-e").value;
    const tev = document.getElementById("tev-praga-e").value;
    const moc = document.getElementById("moc-praga-e").value;
    if (+cod == 0)
        return;
    const praga = Listas.PragaPorCodigo(+cod);
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
    const place = document.getElementById("remover");
    const child = document.getElementById("lista-rem-child");
    const cchil = document.getElementById("rem-conf");
    const cod = document.getElementById("cod-praga-rem").value;
    if (cod == "")
        return;
    const praga = Listas.PragaPorCodigo(+cod);
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
    const p = document.createElement("p");
    p.setAttribute("id", "lista-rem-child");
    p.innerHTML = PragaToHTML(praga);
    place === null || place === void 0 ? void 0 : place.appendChild(p);
    const c = document.createElement("p");
    c.setAttribute("id", "rem-conf");
    c.innerHTML = "Tem certeza?";
    place === null || place === void 0 ? void 0 : place.append(c);
    const botaoSim = document.createElement("button");
    const botaoNao = document.createElement("button");
    botaoSim.innerHTML = "Sim";
    botaoSim.onclick = () => {
        Listas.RemovePraga(Listas.PragaPorCodigo(+cod));
        const d = document.createElement("p");
        d.innerHTML = "Removido!";
        place === null || place === void 0 ? void 0 : place.append(d);
        setTimeout(() => {
            place === null || place === void 0 ? void 0 : place.removeChild(d);
            botaoNao.click();
        }, 3500);
    };
    botaoNao.innerHTML = "Não";
    botaoNao.onclick = () => {
        place === null || place === void 0 ? void 0 : place.removeChild(p);
        place === null || place === void 0 ? void 0 : place.removeChild(c);
        place === null || place === void 0 ? void 0 : place.removeChild(botaoSim);
        place === null || place === void 0 ? void 0 : place.removeChild(botaoNao);
    };
    place === null || place === void 0 ? void 0 : place.append(botaoSim);
    place === null || place === void 0 ? void 0 : place.append(botaoNao);
}
function ListarUmaContm() {
    const place = document.getElementById("listar_uma");
    const child = document.getElementById("lista-uma-child");
    const cep = document.getElementById("cep-lista-uma").value;
    const cod = +document.getElementById("cod-lista-uma").value;
    const dat = new Date(document.getElementById("dat-lista-uma").value);
    const local = Listas.LocalPorCEP(cep);
    const praga = Listas.PragaPorCodigo(cod);
    const aux = new Contaminacao(local, praga, dat);
    const contm = Listas.ContmPorChave(aux.chave);
    if (!contm) {
        if (child) {
            place === null || place === void 0 ? void 0 : place.removeChild(child);
        }
        return;
    }
    if (child) {
        child.innerHTML = ContmToHTML(contm);
        return;
    }
    const p = document.createElement("p");
    p.setAttribute("id", "lista-uma-child");
    p.innerHTML = ContmToHTML(contm);
    place === null || place === void 0 ? void 0 : place.appendChild(p);
}
function ContmToHTML(contm) {
    let str = "";
    return str.concat("Local: ", contm.local.cep, "<br>Praga: ", contm.praga.nome, "<br>Data: ", contm.data.toString(), "<br>Ações: ", contm.acoes, "<br>Data de Extermínio: ", contm.dataExterminio.toString());
}
function ListarTodasContms() {
    const place = document.getElementById("listar_todas");
    const lista = Listas.ListaDeContms;
    let index;
    for (let i = 0; i < lista.length; i++) {
        index = "lista-todos-child-".concat(i.toString());
        if (document.getElementById(index))
            break;
        const p = document.createElement("p");
        p.setAttribute("id", index);
        p.innerHTML = ContmToHTML(lista[i]);
        place === null || place === void 0 ? void 0 : place.appendChild(p);
    }
}
function IncluirContm() {
    const cep = document.getElementById("cep-contm").value;
    const cod = +document.getElementById("cod-contm").value;
    const dat = new Date(document.getElementById("dat-contm").value);
    const aco = document.getElementById("aco-contm").value;
    const datE = new Date(document.getElementById("date-contm").value);
    if (cep == "" || cod == 0 || !dat || aco == "" || !datE)
        return;
    Listas.InsereContaminacao(new Contaminacao(Listas.LocalPorCEP(cep), Listas.PragaPorCodigo(cod), dat, aco, datE));
}
function AlterarContm() {
    const cep = document.getElementById("cep-contm-e").value;
    const cod = +document.getElementById("cod-contm-e").value;
    const dat = new Date(document.getElementById("dat-contm-e").value);
    const aco = document.getElementById("aco-contm-e").value;
    const datE = document.getElementById("date-contm-e").value;
    if (cep == "" || cod == 0 || !dat)
        return;
    const contm = Listas.ContmPorChave((new Contaminacao(Listas.LocalPorCEP(cep), Listas.PragaPorCodigo(cod), dat).chave));
    if (aco != "") {
        contm.acoes = aco;
    }
    if (datE != "") {
        contm.dataExterminio = new Date(datE);
    }
    localStorage.setItem("lista-contms", JSON.stringify(Listas.ListaDeContms));
}
function RemoverContm() {
    const place = document.getElementById("remover");
    const child = document.getElementById("list-rem-child");
    const cchil = document.getElementById("rem-conf");
    const cep = document.getElementById("cep-contm-rem").value;
    const cod = +document.getElementById("cod-contm-rem").value;
    const dat = new Date(document.getElementById("dat-contm-rem").value);
    if (cep == "" || cod == 0 || !dat)
        return;
    const contm = Listas.ContmPorChave((new Contaminacao(Listas.LocalPorCEP(cep), Listas.PragaPorCodigo(cod), dat).chave));
    if (!contm) {
        if (child) {
            place === null || place === void 0 ? void 0 : place.removeChild(child);
            place === null || place === void 0 ? void 0 : place.removeChild(cchil);
        }
        return;
    }
    if (child) {
        child.innerHTML = ContmToHTML(contm);
        return;
    }
    const p = document.createElement("p");
    p.setAttribute("id", "lista-rem-child");
    p.innerHTML = ContmToHTML(contm);
    place === null || place === void 0 ? void 0 : place.appendChild(p);
    const c = document.createElement("p");
    c.setAttribute("id", "rem-conf");
    c.innerHTML = "Tem certeza?";
    place === null || place === void 0 ? void 0 : place.append(c);
    const botaoSim = document.createElement("button");
    const botaoNao = document.createElement("button");
    botaoSim.innerHTML = "Sim";
    botaoSim.onclick = () => {
        Listas.RemoveContm(Listas.ContmPorChave(contm.chave));
        const d = document.createElement("p");
        d.innerHTML = "Removido!";
        place === null || place === void 0 ? void 0 : place.append(d);
        setTimeout(() => {
            place === null || place === void 0 ? void 0 : place.removeChild(d);
            botaoNao.click();
        }, 3500);
    };
    botaoNao.innerHTML = "Não";
    botaoNao.onclick = () => {
        place === null || place === void 0 ? void 0 : place.removeChild(p);
        place === null || place === void 0 ? void 0 : place.removeChild(c);
        place === null || place === void 0 ? void 0 : place.removeChild(botaoSim);
        place === null || place === void 0 ? void 0 : place.removeChild(botaoNao);
    };
    place === null || place === void 0 ? void 0 : place.append(botaoSim);
    place === null || place === void 0 ? void 0 : place.append(botaoNao);
}
function DoencasEtPragas() {
    const n = +document.getElementById("relat-num").value;
    const lista = Listas.ListaDePragas;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].doencasTransmitidas.length > n) {
            console.log(lista[i]);
            // TODO: Exibir detalhes!
        }
    }
}
function PragasEtDoencas() {
    const doe = document.getElementById("relat-doe").value;
    const listaPrag = Listas.ListaDePragas;
    const lista = [];
    for (let i = 0; i < listaPrag.length; i++) {
        let lista_doen = listaPrag[i].doencasTransmitidas;
        for (let j = 0; j < lista_doen.length; j++) {
            if (lista_doen[j].toLowerCase().includes(doe.toLowerCase())) {
                lista.push(listaPrag[i]);
                break;
            }
        }
    }
    console.table(lista);
    // TODO: Exibir detalhes!
}
function ContmsEtDatas() {
    const data_ini = new Date("2019-01-01").valueOf();
    const data_fim = new Date("2019-03-31").valueOf();
    const lista = Listas.ListaDeContms;
    for (let i = 0; i < lista.length; i++) {
        let data_contm = new Date(lista[i].data).valueOf();
        if (data_contm >= data_ini && data_contm <= data_fim) {
            console.log(lista[i].local);
            console.log(lista[i].praga);
            // TODO: Exibir detalhes!
        }
    }
}
