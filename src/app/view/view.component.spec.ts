import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatDialogHarness} from '@angular/material/dialog/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';

let loader: HarnessLoader;

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

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide:HttpClient, useValue:MockHttpClient}],
      imports:[MatDialogModule, MatFormFieldModule, NoopAnimationsModule],
      declarations: [ ViewComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open create dialog box', async () => {
    component.openCreateDialog();
    fixture.detectChanges();
    await fixture.whenStable().then(async () => {
      const matDialog = await loader.getHarness(MatDialogHarness);
      const inputArray = fixture.debugElement.queryAll(By.css('textarea'))
      const matFormFieldArray = await matDialog.getAllHarnesses(MatFormFieldHarness); // await loader.getHarness(MatFormFieldHarness);

      console.log("The matFormFieldHarnesses Array:")
      console.log(JSON.stringify(inputArray)); 
      //const control = await matForm.getControl();
      //expect(control).toBeTruthy();
      //const control = await matForm.
      expect(matDialog).toBeTruthy();
      matDialog.close();
    });
  });

  it('should open edit dialog box', async () => {
    component.openEditDialog('0');
    const matDialog = await loader.getHarness(MatDialogHarness);
    expect(matDialog).toBeTruthy();
    matDialog.close();
  });

  it('should open delete dialog box', async () => {
    component.openDeleteDialog('0');
    const matDialog = await loader.getHarness(MatDialogHarness);
    expect(matDialog).toBeTruthy();
    matDialog.close();
  });
});
