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
  cardArray:any = [];
  columnArray:any=["action", "question", "answer"];
  @ViewChild(MatTable) table:MatTable<Card>= {} as MatTable<Card>;
  
  constructor(private cardService:CardService, public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    this.cardArray = await this.cardService.getAll();
  }

  openCreateDialog(): void {
    const dialog = this.dialog.open(CreateComponent, {data:{question:"", answer:""}});
    dialog.afterClosed().subscribe(async result => {
      if (result)
      {
        const response = await this.cardService.post(result);
        this.cardArray.push(response);
        this.table.renderRows();
      }
    });
  }

  openEditDialog(id:string): void {
    const card = this.cardArray.find((i:any) => i.id == id);
    const dialog = this.dialog.open(EditComponent, {data:card});
    dialog.afterClosed().subscribe(result => {
      if(result)
        this.cardService.put(result.id, {id:result.id, question:result.question, answer:result.answer});
    });
  }

  openDeleteDialog(id:string): void {
    const dialog = this.dialog.open(DeleteComponent, {data:{delete:false}});
    dialog.afterClosed().subscribe(result => {
      if (result && result.delete)
      {
        this.cardArray = this.cardArray.filter((c:Card) => c.id != id);
        this.table.renderRows();
        this.cardService.delete(id);
      }
    });
  }
}