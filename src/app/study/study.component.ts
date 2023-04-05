import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card/card.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {
  cardArray:any = [];
  index:number = 0;
  showAnswer:boolean = false;
  constructor(private cardService:CardService) { }

  async ngOnInit(): Promise<void> {
    this.cardArray = await this.cardService.getAll();
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  clickArrowRight() {
    if (this.index+1 < this.cardArray.length)
    {
      this.index++;
      this.showAnswer = false;
    }
  }

  clickArrowLeft() {
    if (this.index-1 >= 0)
    {
      this.index--;
      this.showAnswer = false;
    }
  }

  isFirstCard() {
    return (this.index == 0);
  }

  isLastCard() {
    return (this.index == this.cardArray.length-1);
  }



}
