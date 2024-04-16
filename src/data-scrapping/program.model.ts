export interface Program {
    [key: string]: any;
    reunions: Meeting[]; 
}

export interface Meeting {
    numOfficiel: string;
    courses: Race[];
    hippodrome: { libelleLong: string }
}

export interface Race {
    numOrdre: string;
    numReunion: string;
    libelle: string;
}

