class Local {
    CEP: string;
    raio: number;
    populacao: number;
    detalhes: string;

    constructor(CEP: string, raio: number, populacao: number, detalhes: string) {
        this.CEP = CEP;
        this.raio = raio;
        this.populacao = populacao;
        this.detalhes = detalhes;
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

    constructor(local: Local, praga: Praga, data: Date, acoes: string, data_Exterminio: Date) {
        this.local = local;
        this.praga = praga;
        this.data = data;
        this.acoes = acoes;
        this.data_Exterminio = data_Exterminio;
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
    }

    GeraChave(): string {
        let chave: string = "";
        return chave.concat(this.local.CEP, '-', this.praga.codigo.toString(), '-', this.data.toString());
    }
}

class Admin {
    ListaDeLocais: Array<Local>;
    ListaDePragas: Array<Praga>;
    ListaDeContms: Array<Contaminacao>;

    constructor() {
        this.ListaDeLocais = new Array<Local>;
        this.ListaDePragas = new Array<Praga>;
        this.ListaDeContms = new Array<Contaminacao>;
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

    LocalPorCEP(CEP: string) {
        return this.ListaDeLocais.filter((e: { CEP: string; }) => e.CEP === CEP)[0];
    }

    PragaPorCodigo(Codigo: number) {
        return this.ListaDePragas.filter((e: { codigo: number; }) => e.codigo === Codigo)[0];
    }

    PragaPorNome(Nome: string) {
        return this.ListaDePragas.filter((e: { nome: string; }) => e.nome === Nome)[0];
    }

    ContmPorChave(Chave: string) {
        return this.ListaDeContms.filter((e: { chave: string; }) => e.chave === Chave)[0];
    }

    InsereLocal(Local: Local) {
        this.ListaDeLocais.push(Local);
    }

    InserePraga(Praga: Praga) {
        this.ListaDePragas.push(Praga);
    }

    InsereContaminacao(Contaminacao: Contaminacao) {
        this.ListaDeContms.push(Contaminacao);
    }

    RemoveLocal(Local: Local) {
        this.ListaDeLocais.splice(this.ListaDeLocais.indexOf(Local), 1);
    }

    RemovePraga(Praga: Praga) {
        this.ListaDePragas.splice(this.ListaDePragas.indexOf(Praga), 1);
    }
}

function Teste() {
    let Listas = new Admin();

    Listas.InsereLocal(new Local("12345-678", 6, 280000, "Blau"));
    Listas.InsereLocal(new Local("12345-679", 6, 280000, "Blau"));
    Listas.InserePraga(new Praga(23, "Mickey", "Laptopspirose", 200, "Fogo"));

    const cont: Contaminacao = new Contaminacao(Listas.LocalPorCEP("12345-678"), Listas.PragaPorCodigo(23), new Date(2020, 2, 23), "Fazer Pizza", new Date(2022, 4, 19));
    Listas.InsereContaminacao(cont);

    console.log("Local Por CEP: ", Listas.LocalPorCEP("12345-678"));
    console.log("Praga Por Cod: ", Listas.PragaPorCodigo(23));
    console.log("Contm Por Chave: ", Listas.ContmPorChave(cont.Chave));
    
    Listas.ContmPorChave(cont.Chave).DataExterminio = new Date(2022, 9, 20);
    console.log("Contm Update: ", Listas.ContmPorChave(cont.Chave));

    Listas.ListaDeContms

    console.table(Listas.GetLocais);
    console.table(Listas.GetPragas);
    console.table(Listas.GetContaminacoes);
    
    Listas.RemoveLocal(Listas.LocalPorCEP("12345-678"));
    console.table(Listas.GetLocais);
}