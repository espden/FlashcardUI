import { Card } from "src/app/models/card";

export default class MockCardDb {
    cardArray:Card[] = [
        {id:'0', question:"What is OOP?", answer:"Object oriented programming."},
        {id:'1', question:"What is a boolean?", answer:"A value that is true or false."},
    ];

    getAll() {
        return this.cardArray;
    }

    getById(id:string) {
        return this.cardArray.find((card:Card) => card.id == id);
    }

    create(card:Card) {
        this.cardArray.push(card);
    }

    update(id:string, card:Card) {
        this.cardArray = this.cardArray.map((existingCard:any) => {
            if (existingCard.id == id)
              return card;
            else
              return existingCard;
        });
    }

    delete(id:string) {
        this.cardArray = this.cardArray.filter((card:Card) => card.id != id); 
    }
} 