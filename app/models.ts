export interface Match {
    sport: string
    participant1: string
    participant2: string 
    score: string | object
}

export interface Event {
    name: string
    score: string
}


export abstract class Sports {
    static readonly Soccer = "soccer";
    static readonly Volleyball = "volleyball";
    static readonly Handball = "handball";
    static readonly Basketball = "basketball";
    static readonly Tennis = "tennis";
}