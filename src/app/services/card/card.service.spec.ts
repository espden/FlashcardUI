import { TestBed } from '@angular/core/testing';
import { CardService } from './card.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

let cardArray = [
  {id:'0', question:"What is OOP?", answer:"Object oriented programming."},
  {id:'1', question:"What is a boolean?", answer:"A value that is true or false."},
]

let MockHttpClient = {
  get(url:string):Observable<any> {
    const slashCount = (url.match(/\//g) || []).length;
    // A rudimentary way to tell if we are getting all cards or getting a card by id is to count the number of slashes
    // likely to break in production ;)
    if (slashCount == 3)
      return of(cardArray);
    else
    {
      let id = url[url.length-1];
      return of(cardArray.find((card:any) => card.id == id));
    }
  },

  post(card:any):Observable<any> {
    cardArray.push(card);
    return of(card);
  },

  put(url:string, card:any):Observable<any> {
    let id = url[url.length-1];
    cardArray = cardArray.map((existingCard:any) => {
      if (existingCard.id == id) {
        return card;
      }
      else {
        return existingCard;
      }
    });
    return of();
  },

  delete(url:string):Observable<any> {
    let id = url[url.length-1];
    cardArray = cardArray.filter((card:any) => card.id != id);
    return of();
  }
}

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{provide:HttpClient, useValue:MockHttpClient}]});
    service = TestBed.inject(CardService);
    cardArray = [
      {id:'0', question:"What is OOP?", answer:"Object oriented programming."},
      {id:'1', question:"What is a boolean?", answer:"A value that is true or false."},
    ]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all cards', async () => {
    const result:any = await service.getAll();
    expect(result.length).toBe(2);
  });

  it('should get a card by id', async () => {
    const id = '0'
    const result:any = await service.getById(id);
    expect(result.id).toBe(id);
  });

  it('should create (post) a new card', async() => {
    const card = {id:'2', question:"What is an integer?", answer:"A value that represents a whole number."};
    await service.post(card);
    expect(card.id).toBe('2');
    expect(cardArray.length).toBe(3);
  });

  it('should update (put) a card', async () => {
    const id = '0'
    const question = "What is an integer?";
    const card = {id, question, answer:"A value that represents a whole number."};
    service.put(id, card);
    expect(cardArray[0].question).toBe(question);
  });

  it('should delete a card', async () => {
    const id = '0'
    service.delete(id);
    expect(cardArray.length).toBe(1);
  });
});
