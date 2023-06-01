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

    get CEP() {
        return this.cep;
    }

    set Raio(value: number) {
        this.raio = value;
    }

    set Populacao(value: number) {
        this.populacao = value;
    }

    set Detalhes(value: string) {
        this.detalhes = value;
    }

    Update(raio: number, populacao: number, detalhes: string) {
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

    get Codigo() {
        return this.codigo;
    }

    get Nome() {
        return this.nome;
    }

    set Nome(value: string) {
        this.nome = value;
    }

    set DoencasTransmitidas(value: string) {
        this.doencas_Transmitidas = value;
    }

    set TempoVida(value: number) {
        this.tempo_Vida = value;
    }

    set ModosCombate(value: string) {
        this.modos_Combate = value;
    }

    Update(nome: string, doencas_Transmitidas: string, tempo_Vida: number, modos_Combate: string) {
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
    data_Exterminio: Date;
    chave: string;

    constructor(local: Local, praga: Praga, data: Date, acoes?: string, data_Exterminio?: Date) {
        this.local = local;
        this.praga = praga;
        this.data = data;
        this.acoes = acoes ?? "";
        this.data_Exterminio = data_Exterminio ?? new Date(1900, 0, 1);
        this.chave = this.GeraChave();
    }

    get Chave() {
        return this.chave;
    }

    set Data(value: Date) {
        this.data = value;
    }

    set Acoes(value: string) {
        this.acoes = value;
    }

    set DataExterminio(value: Date) {
        this.data_Exterminio = value;
    }

    Update(data: Date, acoes: string, data_Exterminio: Date) {
        this.data = data;
        this.acoes = acoes;
        this.data_Exterminio = data_Exterminio;
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

    get GetLocais() {
        return this.ListaDeLocais;
    }

    get GetPragas() {
        return this.ListaDePragas;
    }

    get GetContaminacoes() {
        return this.ListaDeContms;
    }

    Print(Lista: Array<any>) {
        console.log("---------------------------------------------------------------");

        for (let e: number = 0; e < Lista.length; e++) {
            console.log(Lista[e]);
        }
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
        if (this.LocalPorCEP(Local.CEP)) {
            console.log("ERRO: Local informado já se encontra no sistema!!!");
            return;
        }
        this.ListaDeLocais.push(Local);
        localStorage.setItem("lista-locais", JSON.stringify(this.ListaDeLocais));
    }

    InserePraga(Praga: Praga) {
        if (this.PragaPorCodigo(Praga.Codigo)) {
            console.log("ERRO: Praga informada já se encontra no sistema!!!");
            return;
        }
        this.ListaDePragas.push(Praga);
        localStorage.setItem("lista-pragas", JSON.stringify(this.ListaDePragas));
    }

    InsereContaminacao(Contaminacao: Contaminacao) {
        if (this.ContmPorChave(Contaminacao.Chave)) {
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
    
    console.log("Contm Por Chave: ", Listas.ContmPorChave(cont.Chave));
    
    Listas.ContmPorChave(cont.Chave).DataExterminio = new Date(2022, 9, 20);
    console.log("Contm Update: ", Listas.ContmPorChave(cont.Chave));
    
    console.table(Listas.GetLocais);
    console.table(Listas.GetPragas);
    console.table(Listas.GetContaminacoes);
    
    // Listas.RemoveLocal(Listas.LocalPorCEP("12345-679"));
    // console.table(Listas.GetLocais);
}

function ListarUmLocal() {
    let test = document.getElementById("cep-lista-um") as HTMLInputElement;
    console.log(test);
    let temp = Listas.LocalPorCEP(test.value);
    console.log(temp);
}