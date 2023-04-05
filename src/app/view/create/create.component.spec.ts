import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from 'src/app/models/card';
import { CreateComponent } from './create.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {HarnessLoader } from '@angular/cdk/testing'
import {TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'


class MockMatDialog {

}

let loader:HarnessLoader;

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ CreateComponent ],
      providers:[{provide: MatDialogRef<CreateComponent>, useClass:MockMatDialog},
      {provide:MAT_DIALOG_DATA, useClass:{}}]
    })
    .compileComponents();


    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
