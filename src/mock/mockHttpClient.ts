import MockCardDb from "./mockCardDb";
import { Observable, of } from 'rxjs';

export default class MockHttpClient {
    cardDb:MockCardDb;

    constructor(CardDb:MockCardDb) {
        this.cardDb = CardDb;
    }

    get(url:string):Observable<any> {
        const slashCount = (url.match(/\//g) || []).length;
        // A rudimentary way to tell if we are getting all cards or getting a card by id is to count the number of slashes
        // likely to break in production ;)
        if (slashCount == 3)
            return of(this.cardDb.getAll());
        else
        {
            let id = url[url.length-1];
            return of(this.cardDb.getById(id));
        }
    }

    post(card:any):Observable<any> {
        this.cardDb.create(card);
        return of(card);
    }

    put(url:string, card:any):Observable<any> {
        let id = url[url.length-1];
        this.cardDb.update(id, card);
        return of();
    }

    delete(url:string):Observable<any> {
        let id = url[url.length-1];
        this.cardDb.delete(id);
        return of();
    }
}