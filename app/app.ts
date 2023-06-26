//************************************
//to run code type: npx ts-node app.ts
//all methods are public for tests
//************************************

import { matches } from "./matches"
import { Match, Sports, Event } from "./models"

export class EventParser {
    private matchesArray: Match[] = []

    constructor() {
        this.makeMatchesArray()
    }

    private makeMatchesArray() {
        for(let match of matches) {
            if(!match.sport || !match.participant1 || !match.participant2 || !match.score) {
                continue
            }
            if(match.sport === Sports.Basketball) {
                match.score = JSON.stringify(match.score).replace(/[\[\]'"]+/g,'')
            }
            this.matchesArray.push(match as Match)
        }
    }

    public validateSport(match: Match): boolean {
        if(match.sport === Sports.Handball || match.sport === Sports.Tennis || match.sport === Sports.Basketball 
            || match.sport === Sports.Soccer || match.sport === Sports.Volleyball) 
            {
                return true
            }
        return false
    }

    public makeEventName(match: Match): string {
        if(match.sport === Sports.Handball || match.sport === Sports.Tennis) {
            return `${match.participant1} vs ${match.participant2}`
        }
        return `${match.participant1} - ${match.participant2}`
    }

    public formatScore(match: Match): string {
        if(match.sport === Sports.Volleyball || match.sport === Sports.Tennis) {
            const scores: string[] = match.score.toString().split(",")
            let summary = `Main score: ${scores[0]}`
            scores.shift()
            for(let i = 0; i < scores.length; i++) {
                scores[i] = `set${i+1} ${scores[i]}`
            }
            summary = `${summary} (${scores.join(", ")})`
            return summary
        }
        return match.score.toString()
    }

    public parseEvents() {
        const events: Event[] = []
        this.matchesArray.forEach(match => {
            if(this.validateSport(match)) {
                events.push({
                    name: this.makeEventName(match),
                    score: this.formatScore(match)
                }) 
            } else {
                events.push({
                    name: "Exception: invalid sport",
                    score: "Exception: invalid sport"
                })
            }
                                   
        })
        return events
    }
}

let parser = new EventParser()
console.log(parser.parseEvents())
