class Local {
  cep: string;
  raio: number;
  populacao: number;
  detalhes: string;

  constructor(CEP: string, raio: number, populacao: number, detalhes: string) {
    this.cep = CEP;
    this.raio = raio;
    this.populacao = populacao;
    this.detalhes = detalhes;
  }
}

class Praga {
  codigo: number;
  nome: string;
  doencasTransmitidas: Array<string>;
  tempoVida: number;
  modosCombate: string;

  constructor(
    codigo: number,
    nome: string,
    doencasTransmitidas: string,
    tempoVida: number,
    modosCombate: string
  ) {
    this.codigo = codigo;
    this.nome = nome;
    this.doencasTransmitidas = new Array<string>();
    this.doencasTransmitidas.push(doencasTransmitidas);
    this.tempoVida = tempoVida;
    this.modosCombate = modosCombate;
  }
}

class Contaminacao {
  local: Local;
  praga: Praga;
  data: string;
  acoes: string;
  dataExterminio: string;
  chave: string;

  constructor(
    local?: Local,
    praga?: Praga,
    data?: string,
    acoes?: string,
    dataExterminio?: string
  ) {
    this.local = local;
    this.praga = praga;
    this.data = data;
    this.acoes = acoes ?? "";
    this.dataExterminio = dataExterminio ?? new Date(1900, 0, 1).toUTCString();
    this.chave = "".concat(
      this.local?.cep,
      "-",
      this.praga?.codigo.toString(),
      "-",
      this.data
    );
  }
}

class Admin {
  ListaDeLocais: Array<Local>;
  ListaDePragas: Array<Praga>;
  ListaDeContms: Array<Contaminacao>;

  constructor() {
    this.ListaDeLocais =
      JSON.parse(localStorage.getItem("lista-locais")) ?? new Array<Local>();
    this.ListaDePragas =
      JSON.parse(localStorage.getItem("lista-pragas")) ?? new Array<Praga>();
    this.ListaDeContms =
      JSON.parse(localStorage.getItem("lista-contms")) ??
      new Array<Contaminacao>();
  }

  LocalPorCEP(Cep: string) {
    return this.ListaDeLocais.filter((e: Local) => e.cep == Cep)[0];
  }

  PragaPorCodigo(codigo: number) {
    return this.ListaDePragas.filter((e: Praga) => e.codigo == codigo)[0];
  }

  PragaPorNome(nome: string) {
    return this.ListaDePragas.filter((e: Praga) => e.nome == nome)[0];
  }

  ContmPorChave(chave: string) {
    return this.ListaDeContms.filter((e: Contaminacao) => e.chave == chave)[0];
  }

  InsereLocal(Local: Local) {
    if (this.LocalPorCEP(Local.cep)) {
      console.log("ERRO: Local informado já se encontra no sistema!!!");
      return;
    }
    this.ListaDeLocais.push(Local);
    localStorage.setItem("lista-locais", JSON.stringify(this.ListaDeLocais));
  }

  InserePraga(Praga: Praga) {
    if (this.PragaPorCodigo(Praga.codigo)) {
      console.log("ERRO: Praga informada já se encontra no sistema!!!");
      return;
    }
    this.ListaDePragas.push(Praga);
    localStorage.setItem("lista-pragas", JSON.stringify(this.ListaDePragas));
  }

  InsereContaminacao(Contaminacao: Contaminacao) {
    if (this.ContmPorChave(Contaminacao.chave)) {
      console.log("ERRO: Contaminação informada já se encontra no sistema!!!");
      return;
    }
    this.ListaDeContms.push(Contaminacao);
    localStorage.setItem("lista-contms", JSON.stringify(this.ListaDeContms));
  }

  RemoveLocal(Local: Local) {
    this.ListaDeLocais.splice(this.ListaDeLocais.indexOf(Local), 1);
    localStorage.setItem("lista-locais", JSON.stringify(this.ListaDeLocais));
  }

  RemovePraga(Praga: Praga) {
    this.ListaDePragas.splice(this.ListaDePragas.indexOf(Praga), 1);
    localStorage.setItem("lista-pragas", JSON.stringify(this.ListaDePragas));
  }

  RemoveContm(Contaminacao: Contaminacao) {
    this.ListaDeContms.splice(this.ListaDeContms.indexOf(Contaminacao), 1);
    localStorage.setItem("lista-contms", JSON.stringify(this.ListaDeContms));
  }
}

let Listas = new Admin();

function Reset() {
  localStorage.clear();

  Listas.InsereLocal(new Local("12345-678", 36, 280000, "Blau"));
  Listas.InserePraga(new Praga(23, "Mickey", "Laptopspirose", 200, "Fogo"));
  Listas.InsereContaminacao(
    new Contaminacao(
      Listas.LocalPorCEP("12345-678"),
      Listas.PragaPorCodigo(23),
      new Date("2020-03-23").toUTCString(),
      "Fazer Pizza",
      new Date("2022-04-19").toUTCString()
    )
  );
}

function Teste() {
  Listas.InsereLocal(new Local("12345-679", 6, 280000, "Blau"));

  const loca: Local = Listas.LocalPorCEP("12345-678");
  const prag: Praga = Listas.PragaPorCodigo(23);

  console.log("Local Por CEP: ", loca);
  console.log("Praga Por Cod: ", prag);

  const cont: Contaminacao = new Contaminacao(loca, prag, new Date("2020-03-23").toUTCString());

  console.log("Contm Por Chave: ", Listas.ContmPorChave(cont.chave));

  Listas.ContmPorChave(cont.chave).dataExterminio = new Date("2022-10-20").toUTCString();
  console.log("Contm Update: ", Listas.ContmPorChave(cont.chave));

  console.table(Listas.ListaDeLocais);
  console.table(Listas.ListaDePragas);
  console.table(Listas.ListaDeContms);
}

function ListarUmLocal() {
  const place: HTMLElement = document.getElementById("listar_um");
  const child: HTMLElement = document.getElementById("lista-um-child");
  const cep: string = (document.getElementById("cep-lista-um") as HTMLInputElement).value;

  const local: Local = Listas.LocalPorCEP(cep);

  if (!local) {
    if (child) {
      place?.removeChild(document.getElementById("lista-um-child"));
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
  place?.appendChild(p);
}

function LocalToHTML(local: Local): string {
  let str: string = "";
  return str.concat(
    "CEP: ",
    local.cep,
    "<br>Raio: ",
    local.raio.toString(),
    "<br>População: ",
    local.populacao.toString(),
    "<br>Detalhes: ",
    local.detalhes
  );
}

function ListarTodosLocais() {
  const place = document.getElementById("listar_todos");
  const lista = Listas.ListaDeLocais;

  let index: string;

  for (let i = 0; i < lista.length; i++) {
    index = "lista-todos-child-".concat(i.toString());
    if (document.getElementById(index)) break;

    const p = document.createElement("p");
    p.setAttribute("id", index);

    p.innerHTML = LocalToHTML(lista[i]);
    place?.appendChild(p);
  }
}

function IncluirLocal() {
  const cep = (document.getElementById("cep-local") as HTMLInputElement).value;
  const rai = (document.getElementById("rai-local") as HTMLInputElement).value;
  const pop = (document.getElementById("pop-local") as HTMLInputElement).value;
  const det = (document.getElementById("det-local") as HTMLInputElement).value;

  if (cep == "" || +rai == 0 || +pop == 0) return;

  Listas.InsereLocal(new Local(cep, +rai, +pop, det));
}

function AlterarLocal() {
  const cep = (document.getElementById("cep-local-e") as HTMLInputElement)
    .value;
  const rai = (document.getElementById("rai-local-e") as HTMLInputElement)
    .value;
  const pop = (document.getElementById("pop-local-e") as HTMLInputElement)
    .value;
  const det = (document.getElementById("det-local-e") as HTMLInputElement)
    .value;

  if (cep == "") return;

  const local: Local = Listas.LocalPorCEP(cep);

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
  const cep = (document.getElementById("cep-lista-rem") as HTMLInputElement)
    .value;

  if (cep == "") return;

  const local: Local = Listas.LocalPorCEP(cep);

  if (!local) {
    if (child) {
      place?.removeChild(child);
      place?.removeChild(cchil);
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
  place?.appendChild(p);

  const c = document.createElement("p");
  c.setAttribute("id", "rem-conf");

  c.innerHTML = "Tem certeza?";
  place?.append(c);

  const botaoSim = document.createElement("button");
  const botaoNao = document.createElement("button");

  botaoSim.innerHTML = "Sim";
  botaoSim.onclick = () => {
    Listas.RemoveLocal(Listas.LocalPorCEP(cep));
    const d = document.createElement("p");

    d.innerHTML = "Removido!";
    place?.append(d);

    setTimeout(() => {
      place?.removeChild(d);
      botaoNao.click();
    }, 3500);
  };

  botaoNao.innerHTML = "Não";
  botaoNao.onclick = () => {
    place?.removeChild(p);
    place?.removeChild(c);
    place?.removeChild(botaoSim);
    place?.removeChild(botaoNao);
  };

  place?.append(botaoSim);
  place?.append(botaoNao);
}

function ListarUmaPraga() {
  const place: HTMLElement = document.getElementById("listar_uma");
  const child: HTMLElement = document.getElementById("lista-uma-child");
  const cod: string = (document.getElementById("cod-lista-uma") as HTMLInputElement).value;

  const praga: Praga = Listas.PragaPorCodigo(+cod);

  if (!praga) {
    if (child) {
      place?.removeChild(document.getElementById("lista-uma-child"));
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
  place?.appendChild(p);
}

function PragaToHTML(praga: Praga): string {
  let str: string = "";
  return str.concat(
    "Código: ",
    praga.codigo.toString(),
    "<br>Nome: ",
    praga.nome,
    "<br>Doenças Transmitidas: ",
    praga.doencasTransmitidas.toString(),
    "<br>Tempo de Vida: ",
    praga.tempoVida.toString(),
    " anos",
    "<br>Modos de Combate: ",
    praga.modosCombate
  );
}

function ListarTodasPragas() {
  const place = document.getElementById("listar_todas");
  const lista = Listas.ListaDePragas;

  let index: string;

  for (let i = 0; i < lista.length; i++) {
    index = "lista-todos-child-".concat(i.toString());
    if (document.getElementById(index)) break;

    const p = document.createElement("p");
    p.setAttribute("id", index);

    p.innerHTML = PragaToHTML(lista[i]);
    place?.appendChild(p);
  }
}

function IncluirPraga() {
  const cod = (document.getElementById("cod-praga") as HTMLInputElement).value;
  const nom = (document.getElementById("nom-praga") as HTMLInputElement).value;
  const dot = (document.getElementById("dot-praga") as HTMLInputElement).value;
  const tev = (document.getElementById("tev-praga") as HTMLInputElement).value;
  const moc = (document.getElementById("moc-praga") as HTMLInputElement).value;

  if (+cod == 0 || nom == "" || dot == "" || +tev == 0 || moc == "") return;

  Listas.InserePraga(new Praga(+cod, nom, dot, +tev, moc));
}

function AlterarPraga() {
  const cod = (document.getElementById("cod-praga-e") as HTMLInputElement).value;
  const nom = (document.getElementById("nom-praga-e") as HTMLInputElement).value;
  const dot = (document.getElementById("dot-praga-e") as HTMLInputElement).value;
  const tev = (document.getElementById("tev-praga-e") as HTMLInputElement).value;
  const moc = (document.getElementById("moc-praga-e") as HTMLInputElement).value;

  if (+cod == 0) return;

  const praga: Praga = Listas.PragaPorCodigo(+cod);

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
  const cod = (document.getElementById("cod-praga-rem") as HTMLInputElement).value;

  if (cod == "") return;

  const praga: Praga = Listas.PragaPorCodigo(+cod);

  if (!praga) {
    if (child) {
      place?.removeChild(child);
      place?.removeChild(cchil);
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
  place?.appendChild(p);

  const c = document.createElement("p");
  c.setAttribute("id", "rem-conf");

  c.innerHTML = "Tem certeza?";
  place?.append(c);

  const botaoSim = document.createElement("button");
  const botaoNao = document.createElement("button");

  botaoSim.innerHTML = "Sim";
  botaoSim.onclick = () => {
    Listas.RemovePraga(Listas.PragaPorCodigo(+cod));
    const d = document.createElement("p");

    d.innerHTML = "Removido!";
    place?.append(d);

    setTimeout(() => {
      place?.removeChild(d);
      botaoNao.click();
    }, 3500);
  };

  botaoNao.innerHTML = "Não";
  botaoNao.onclick = () => {
    place?.removeChild(p);
    place?.removeChild(c);
    place?.removeChild(botaoSim);
    place?.removeChild(botaoNao);
  };

  place?.append(botaoSim);
  place?.append(botaoNao);
}

function ListarUmaContm() {
  const place: HTMLElement = document.getElementById("listar_uma");

  const cep: string = (document.getElementById("cep-lista-uma") as HTMLInputElement).value;
  const cod: number = +(document.getElementById("cod-lista-uma") as HTMLInputElement).value;
  const dat: string = new Date((document.getElementById("dat-lista-uma") as HTMLInputElement).value).toUTCString();
  
  const local: Local = Listas.LocalPorCEP(cep);
  const praga: Praga = Listas.PragaPorCodigo(cod);
  
  const contm: Contaminacao = Listas.ContmPorChave((new Contaminacao(local, praga, dat)).chave);
  let child: HTMLElement = document.getElementById("lista-uma-child");

  if(!contm) {
    if (child) {
      place?.removeChild(child);
    }
    return;
  }

  if (child) {
    child.innerHTML = ContmToHTML(contm);
    return;
  }

  child = document.createElement("p");
  child.setAttribute("id", "lista-uma-child");
  child.innerHTML = ContmToHTML(contm);
  
  place?.appendChild(child);
}

function ContmToHTML(contm: Contaminacao): string {
  let str: string = "";
  return str.concat(
      "Local: ",
      contm.local.cep,
      "<br>Praga: ",
      contm.praga.nome,
      "<br>Data: ",
      contm.data,
      "<br>Ações: ",
      contm.acoes,
      "<br>Data de Extermínio: ",
      contm.dataExterminio
  );
}

function ListarTodasContms() {
  const div: HTMLElement = document.createElement("div");
  const place: HTMLElement = document.getElementById("listar_todas");
  const lista = Listas.ListaDeContms;

  for (let i = 0; i < lista.length; i++) {
    let index: string = "lista-todos-child-".concat(i.toString());
    if (document.getElementById(index)) break;

    const p = document.createElement("p");
    p.setAttribute("id", index);

    p.innerHTML = ContmToHTML(lista[i]);
    div.appendChild(p);
  }

  place?.appendChild(div);
}

function IncluirContm() {
  const cep: string = (document.getElementById("cep-contm") as HTMLInputElement).value;
  const cod: number = +(document.getElementById("cod-contm") as HTMLInputElement).value;
  const dat: string = new Date((document.getElementById("dat-contm") as HTMLInputElement).value).toUTCString();
  const aco: string = (document.getElementById("aco-contm") as HTMLInputElement).value;
  const datE: string = new Date((document.getElementById("date-contm") as HTMLInputElement).value).toUTCString();

  if (cep == "" || cod == 0 || !dat || aco == "" || !datE) return;

  Listas.InsereContaminacao(new Contaminacao(Listas.LocalPorCEP(cep),
                                             Listas.PragaPorCodigo(cod), dat, aco, datE));
}

function AlterarContm() {
  const cep: string = (document.getElementById("cep-contm-e") as HTMLInputElement).value;
  const cod: number = +(document.getElementById("cod-contm-e") as HTMLInputElement).value;
  const dat: string = new Date((document.getElementById("dat-contm-e") as HTMLInputElement).value).toUTCString();
  const aco: string = (document.getElementById("aco-contm-e") as HTMLInputElement).value;
  const datE: string = (document.getElementById("date-contm-e") as HTMLInputElement).value;

  if (cep == "" || cod == 0 || !dat) return;

  const contm: Contaminacao = Listas.ContmPorChave((new Contaminacao(Listas.LocalPorCEP(cep),
                                                                     Listas.PragaPorCodigo(cod), dat).chave));

  if (aco != "") {
    contm.acoes = aco;
  }

  if (datE != "") {
    contm.dataExterminio = new Date(datE).toUTCString();
  }

  localStorage.setItem("lista-contms", JSON.stringify(Listas.ListaDeContms));
}

function RemoverContm() {  
  const cep: string = (document.getElementById("cep-contm-rem") as HTMLInputElement).value;
  const cod: number = +(document.getElementById("cod-contm-rem") as HTMLInputElement).value;
  const dat: string = new Date((document.getElementById("dat-contm-rem") as HTMLInputElement).value).toUTCString();
  
  if (cep == "" || cod == 0 || !dat) return;
  
  const place: HTMLElement = document.getElementById("remover");
  const contm: Contaminacao = Listas.ContmPorChave((new Contaminacao(Listas.LocalPorCEP(cep), Listas.PragaPorCodigo(cod), dat).chave));
  
  let child: HTMLElement = document.getElementById("list-rem-child");

  if (!contm) {
    if (child) {
      place?.removeChild(child);
    }
    return;
  }

  if (child) {
    child.innerHTML = ContmToHTML(contm);
    return;
  }

  child = document.createElement("div");
  child.setAttribute("id", "lista-rem-child");

  const p = document.createElement("p");
  const c = document.createElement("h3");
  
  p.innerHTML = ContmToHTML(contm);
  c.innerHTML = "Tem certeza?";
  
  child.appendChild(p);
  child.appendChild(c);

  const botaoSim = document.createElement("button");
  const botaoNao = document.createElement("button");

  botaoSim.innerHTML = "Sim";
  botaoNao.innerHTML = "Não";
  
  botaoSim.onclick = () => {
    Listas.RemoveContm(Listas.ContmPorChave(contm.chave));
    const d = document.createElement("h3");
    
    d.innerHTML = "Removido!";
    child.appendChild(d);
    
    setTimeout(() => {
      botaoNao.click();
    }, 3500);
  };
  
  botaoNao.onclick = () => {
    place?.removeChild(child);
  };

  child.appendChild(botaoSim);
  child.appendChild(botaoNao);

  place?.appendChild(child);
}

function DoencasEtPragas() {
  const n: number = +(document.getElementById("relat-num") as HTMLInputElement).value;
  const lista = Listas.ListaDePragas;

  if (document.getElementById("relat-1-child")) return;

  for (let i = 0; i < lista.length; i++) {
    if (lista[i].doencasTransmitidas.length > n) {
      Cegonha("relat-1", PragaToHTML(lista[i]));
    }
  }
}

function Cegonha(relat: string, texto: string) {
  const child = document.createElement("p");

  child.setAttribute("id", relat+"-child");
  child.innerHTML = texto;

  const place = document.getElementById(relat);
  place?.appendChild(child);
}

function PragasEtDoencas() {
  const doe: string = (document.getElementById("relat-doe") as HTMLInputElement).value;

  if (doe == "") return;

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

  if (document.getElementById("relat-2-child")) return;

  for (let i = 0; i < lista.length; i++) {
    Cegonha("relat-2", PragaToHTML(lista[i]));
  }
}

function ContmsEtDatas() {
  if (document.getElementById("relat-3-child")) return;

  const data_ini: number = new Date("2019-01-01").valueOf();
  const data_fim: number = new Date("2019-03-31").valueOf();
  const lista = Listas.ListaDeContms;

  for (let i = 0; i < lista.length; i++) {
    let data_contm: number = new Date(lista[i].data).valueOf();

    if (data_contm >= data_ini && data_contm <= data_fim) {
      let info = "<h3>Contaminação " + i + "</h3>";

      Cegonha("relat-3", info + LocalToHTML(lista[i].local));
      Cegonha("relat-3", PragaToHTML(lista[i].praga));
    }
  }
}
