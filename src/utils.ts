const today = new Date();
export const startOfTodayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
export const endOfTodayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999));
export const startOfMonth = new Date(today.getUTCFullYear(), today.getUTCMonth(), 1)
export const endOfMonth = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999)

export const badWords = ["Alienado", "AnimaldeTeta", "Anormal", "Arregassado", "Arrombado", "Babaca", "Baitola", "Baleia", "Barril", "Benfiquista", "Biba", "Bicha", "BIOS", "Biroska", "Bobo", "Bocal", "bolagato", "Boqueteiro", "Bosta", "Buceta", "Bundao", "Burro", "Cabaco", "Cacete", "Cadelona", "Cafona", "Cambista", "Capiroto", "Caralho", "Catraia", "Cepo", "Cocodrilo", "Cocozento", "Cu", "DebilMental", "Demente", "Desciclope", "Desgracado", "Drogado", "EGUENORANTE", "Endemoniado", "Energumeno", "Enfianocu", "EngoleRola", "Escroto", "Esdruxulo", "Esporrado", "Estigalhado", "Estrume", "Estrunxado", "Estupido", "FDP", "Fidumaegua", "FilhodaPuta", "Fiofo", "Foda", "Fuder", "Fudido", "Fulera", "Galinha", "Gambiarra", "GeisyArruda", "Gnu", "Gonorreia", "GordoEscroto", "Gozado", "Herege", "Idiota", "Ignorante", "Imbecil", "Imundo", "Inascivel", "Inseto", "Invertebrado", "Jacu", "Jegue", "Jumento", "KCT", "Komodo", "Ku", "lazarento", "Lazaro!", "Leproso", "lerdo", "lesma", "Lezado", "lico", "Limpezaanal", "lixo", "lombriga", "Macaco", "MariMoon", "Merda", "Meretriz", "MiolodeCu", "Mocorongo", "MontedeMerda", "Morfetico", "Mulambo", "n00b", "Nazista", "Nerd", "Newbie", "Nhaca", "Nonsense", "Ogro", "Olhodocu", "OlhoGordo", "Otario", "Palhaco", "Panaca", "Paraguaio", "Passaralho", "PauNoCu", "Periquita", "Pimenteira", "Pipoca", "Piranha", "Piroca", "Pistoleira", "Porra", "prostituta", "Punheta", "Puta", "PutaQuePariu", "Quasimodo", "Quenga", "Quirguistao", "Rampero", "Rapariga", "Raspadinha", "Retardado", "Rusguento", "Sanguesuga", "Sujo", "Tapado", "Tarado", "Tesao", "Tetuda", "Tetudo", "Tosco", "Tragado", "Travesti", "Trepadeira", "Troglodita", "Urubu", "Vaca", "Vadia", "Vagabundo", "Vagaranha", "Vaiamerda", "vaisefuder", "Vaitomarnocu", "Vascaino", "Verme", "Viado", "Xavasca", "Xereca", "Xixizento", "Xoxota", "Xupetinha", "Xupisco", "Xurupita", "Xuxexo", "XXT", "XXX", "ZeBuceta", "Ziguizira", "Zina", "Zoado", "Zoiudo", "Zoneira", "Zuado", "Zuera", "Zulu", "Zureta", "aidético", "aidética", "aleijado", "aleijada", "analfabeto", "analfabeta", "anus", "anão", "anã", "arrombado", "apenado", "apenada", "baba-ovo", "babaca", "babaovo", "bacura", "bagos", "baianada", "baitola", "barbeiro", "barraco", "beata", "bebum", "besta", "bicha", "bisca", "bixa", "boazuda", "boceta", "boco", "boiola", "bokete", "bolagato", "bolcat", "boquete", "bosseta", "bosta", "bostana", "boçal", "branquelo", "brecha", "brexa", "brioco", "bronha", "buca", "buceta", "bugre", "bunda", "bunduda", "burra", "burro", "busseta", "bárbaro", "bêbado", "bêbedo", "caceta", "cacete", "cachorra", "cachorro", "cadela", "caga", "cagado", "cagao", "cagão", "cagona", "caipira", "canalha", "canceroso", "caralho", "casseta", "cassete", "ceguinho", "checheca", "chereca", "chibumba", "chibumbo", "chifruda", "chifrudo", "chochota", "chota", "chupada", "chupado", "ciganos", "clitoris", "clitóris", "cocaina", "cocaína", "coco", "cocô", "comunista", "corna", "cornagem", "cornisse", "corno", "cornuda", "cornudo", "cornão", "corrupta", "corrupto", "coxo", "cretina", "cretino", "criolo", "crioulo", "cruz-credo", "cu", "cú", "culhao", "culhão", "curalho", "cuzao", "cuzão", "cuzuda", "cuzudo", "debil", "débil", "debiloide", "debilóide", "deficiente", "defunto", "demonio", "demônio", "denegrir", "denigrir", "detento", "difunto", "doida", "doido", "egua", "égua", "elemento", "encostado", "esclerosado", "escrota", "escroto", "esporrada", "esporrado", "esporro", "estupida", "estúpida", "estupidez", "estupido", "estúpido", "facista", "fanatico", "fanático", "fascista", "fedida", "fedido", "fedor", "fedorenta", "feia", "feio", "feiosa", "feioso", "feioza", "feiozo", "felacao", "felação", "fenda", "foda", "fodao", "fodão", "fode", "fodi", "fodida", "fodido", "fornica", "fornição", "fudendo", "fudeção", "fudida", "fudido", "furada", "furado", "furnica", "furnicar", "furo", "furona", "furão", "gai", "gaiata", "gaiato", "gay", "gilete", "goianada", "gonorrea", "gonorreia", "gonorréia", "gosmenta", "gosmento", "grelinho", "grelo", "gringo", "homo-sexual", "homosexual", "homosexualismo", "homossexual", "homossexualismo", "idiota", "idiotice", "imbecil", "inculto", "iscrota", "iscroto", "japa", "judiar", "ladra", "ladrao", "ladroeira", "ladrona", "ladrão", "lalau", "lazarento", "leprosa", "leproso", "lesbica", "lésbica", "louco", "macaca", "macaco", "machona", "macumbeiro", "malandro", "maluco", "maneta", "marginal", "masturba", "meleca", "meliante", "merda", "mija", "mijada", "mijado", "mijo", "minorias", "mocrea", "mocreia", "mocréia", "moleca", "moleque", "mondronga", "mondrongo", "mongol", "mongoloide", "mongolóide", "mulata", "mulato", "naba", "nadega", "nádega", "nazista", "negro", "nhaca", "nojeira", "nojenta", "nojento", "nojo", "olhota", "otaria", "otario", "otária", "otário", "paca", "palhaco", "palhaço", "paspalha", "paspalhao", "paspalho", "pau", "peia", "peido", "pemba", "pentelha", "pentelho", "perereca", "perneta", "peru", "peão", "pica", "picao", "picão", "pilantra", "pinel", "pinto", "pintudo", "pintão", "piranha", "piroca", "piroco", "piru", "pivete", "porra", "prega", "preso", "prequito", "priquito", "prostibulo", "prostituta", "prostituto", "punheta", "punhetao", "punhetão", "pus", "pustula", "puta", "puto", "puxa-saco", "puxasaco", "penis", "pênis", "rabao", "rabão", "rabo", "rabuda", "rabudao", "rabudão", "rabudo", "rabudona", "racha", "rachada", "rachadao", "rachadinha", "rachadinho", "rachado", "ramela", "remela", "retardada", "retardado", "ridícula", "roceiro", "rola", "rolinha", "rosca", "sacana", "safada", "safado", "sapatao", "sapatão", "sifilis", "sífilis", "siririca", "tarada", "tarado", "testuda", "tesuda", "tesudo", "tezao", "tezuda", "tezudo", "traveco", "trocha", "trolha", "troucha", "trouxa", "troxa", "tuberculoso", "tupiniquim", "turco", "vaca", "vadia", "vagal", "vagabunda", "vagabundo", "vagina", "veada", "veadao", "veado", "viada", "viadagem", "viadao", "viadão", "viado", "viadão", "víado", "xana", "xaninha", "xavasca", "xerereca", "xexeca", "xibiu", "xibumba", "xiíta", "xochota", "xota", "xoxota"];

export function isThereBadWord(string: string) {
    for (let i = 0; i < badWords.length; i++) {
        if (string.toLowerCase().search(badWords[i].toLocaleLowerCase()) !== -1) {
            return true;
        }
    }

    return false;
}

function isValidBrazilianDDD(ddd: string) {
    const validDDDs = [
        "11", "12", "13", "14", "15", "16", "17", "18", "19",
        "21", "22", "24", "27", "28",
        "31", "32", "33", "34", "35", "37", "38",
        "41", "42", "43", "44", "45", "46", "47", "48", "49",
        "51", "53", "54", "55", 
        "61", "62", "64", "63", "65", "66", "67", "68", "69",
        "71", "73", "74", "75", "77", "79",
        "81", "82", "83", "84", "85", "86", "87", "88", "89",
        "91", "92", "93", "94", "95", "96", "97", "98", "99"
    ];
    return validDDDs.includes(ddd.toString());
}

export function isValidBrazilianPhone(string: string) {
    string = string.replaceAll("(", "").replaceAll(")", "").replaceAll("-", "");
    if (string.length !== 11) return false;
    if (!/^\d+$/.test(string)) return false;
    const firstTwoDigits = string.slice(0, 2);
    if (!isValidBrazilianDDD(firstTwoDigits)) return false;

    return true;
}