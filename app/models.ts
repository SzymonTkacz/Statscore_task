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
    static Soccer = "soccer";
    static Volleyball = "volleyball";
    static Handball = "handball";
    static Basketball = "basketball";
    static Tennis = "tennis";
}