import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyComponent } from './study.component';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CardService } from '../services/card/card.service';

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
      const id = '0';
      return of(cardArray.find((card:any) => card.id == id));
    }
  }
}

describe('StudyComponent', () => {
  let component: StudyComponent;
  let fixture: ComponentFixture<StudyComponent>;
  let service: CardService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyComponent ],
      providers: [{provide:HttpClient, useValue:MockHttpClient}]
    })
    .compileComponents();

    service = TestBed.inject(CardService);
    fixture = TestBed.createComponent(StudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle answer', () => {
    expect(component.showAnswer).toBeFalsy();
    component.toggleAnswer();
    expect(component.showAnswer).toBeTruthy();
  });

  it('should increase index', () => {
    expect(component.index).toBe(0);
    component.clickArrowRight();
    expect(component.index).toBe(1);
  });

  it('should decrease index', () => {
    component.index = 1;
    expect(component.index).toBe(1);
    component.clickArrowLeft();
    expect(component.index).toBe(0);
  });
});
