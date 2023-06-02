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
    doencas_Transmitidas: string;
    tempo_Vida: number;
    modos_Combate: string;

    constructor(codigo: number, nome: string, doencas_Transmitidas: string, tempo_Vida: number, modos_Combate: string) {
        this.codigo = codigo;
        this.nome = nome;
        this.doencas_Transmitidas = doencas_Transmitidas;
        this.tempo_Vida = tempo_Vida;
        this.modos_Combate = modos_Combate;
    }
}

class Contaminacao {
    local: Local;
    praga: Praga;
    data: Date;
    acoes: string;
    dataExterminio: Date;
    chave: string;

    constructor(local: Local, praga: Praga, data: Date, acoes?: string, dataExterminio?: Date) {
        this.local = local;
        this.praga = praga;
        this.data = data;
        this.acoes = acoes ?? "";
        this.dataExterminio = dataExterminio ?? new Date(1900, 0, 1);
        this.chave = this.GeraChave();
    }

    GeraChave(): string {
        let chave: string = "";
        return chave.concat(this.local.cep, '-', this.praga.codigo.toString(), '-', this.data.toString());
    }
}

class Admin {
    ListaDeLocais: Array<Local>;
    ListaDePragas: Array<Praga>;
    ListaDeContms: Array<Contaminacao>;

    constructor() {
        this.ListaDeLocais = JSON.parse(localStorage.getItem("lista-locais")) ?? new Array<Local>;
        this.ListaDePragas = JSON.parse(localStorage.getItem("lista-pragas")) ?? new Array<Praga>;
        this.ListaDeContms = JSON.parse(localStorage.getItem("lista-contms")) ?? new Array<Contaminacao>;
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

//localStorage.clear();

Listas.InsereLocal(new Local("12345-678", 36, 280000, "Blau"));
Listas.InserePraga(new Praga(23, "Mickey", "Laptopspirose", 200, "Fogo"));
Listas.InsereContaminacao(new Contaminacao(Listas.LocalPorCEP("12345-678"), Listas.PragaPorCodigo(23), new Date(2020, 2, 23), "Fazer Pizza", new Date(2022, 4, 19)));

function Teste() {
    
    Listas.InsereLocal(new Local("12345-679", 6, 280000, "Blau"));
    
    const loca: Local = Listas.LocalPorCEP("12345-678");
    const prag: Praga = Listas.PragaPorCodigo(23);
    
    console.log("Local Por CEP: ", loca);
    console.log("Praga Por Cod: ", prag);
    
    const cont: Contaminacao = new Contaminacao(loca, prag, new Date(2020, 2, 23));
    
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
    const place = document.getElementById("listar_um");
    const input = document.getElementById("cep-lista-um") as HTMLInputElement;
    const foo   = document.getElementById("lista-um-child");

    const local: Local = Listas.LocalPorCEP(input.value);
    
    if (!local) {
        if (foo) {
            place?.removeChild(document.getElementById("lista-um-child"));
        }
        return;
    }
 
    if (foo) {
        foo.innerHTML = LocalToHTML(local);
        return;
    }

    const p = document.createElement("p");
    p.setAttribute("id", "lista-um-child");

    p.innerHTML = LocalToHTML(local);
    place?.appendChild(p);
}

function LocalToHTML(local: Local): string {
    let str: string = "";
    return str.concat("<p>CEP: ",        local.cep,
                      "<br>Raio: ",      local.raio.toString(),
                      "<br>População: ", local.populacao.toString(),
                      "<br>Detalhes: ",  local.detalhes,
                      "</p>");
}

function ListarTodosLocais() {
    const place = document.getElementById("listar_todos");
    const lista = Listas.ListaDeLocais;

    let index: string;
    
    for (let i = 0; i < lista.length; i++) {
        index = "lista-todos-child-".concat(i.toString())
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
    const cep = (document.getElementById("cep-local-e") as HTMLInputElement).value;
    const rai = (document.getElementById("rai-local-e") as HTMLInputElement).value;
    const pop = (document.getElementById("pop-local-e") as HTMLInputElement).value;
    const det = (document.getElementById("det-local-e") as HTMLInputElement).value;

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