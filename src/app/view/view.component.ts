import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Card } from '../models/card';
import { CardService } from '../services/card/card.service';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  cardArray:any;
  displayedColumns:any;
  @ViewChild(MatTable) table:MatTable<Card>= {} as MatTable<Card>;
  constructor(private cardService:CardService, public dialog: MatDialog) { 
    cardService.getAll().subscribe(cards => {
      this.cardArray = cards;
    })
    this.cardArray = [];
    this.displayedColumns=["action", "question", "answer"];
  }

  ngOnInit(): void {
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent, {data:{question:"", answer:""}});
    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.cardService.post(result).subscribe(response => {
          this.cardArray.push(response);
          this.table.renderRows();
        });
      }
    });
  }

  openEditDialog(id:string): void {
    const card = this.cardArray.find((i:any) => i.id == id);
    const dialogRef = this.dialog.open(EditComponent, {data:card});
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.cardService.put(result.id, {id:result.id, question:result.question, answer:result.answer}).subscribe();
    });
  }

  openDeleteDialog(id:string): void {
    const dialogRef = this.dialog.open(DeleteComponent, {data:{delete:false}});
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.delete)
      {
        this.cardArray = this.cardArray.filter((c:Card) => c.id != id);
        this.table.renderRows();
        this.cardService.delete(id).subscribe();
      }
    });
  }
}