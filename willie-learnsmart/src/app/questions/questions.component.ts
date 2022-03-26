import { Component, OnInit } from '@angular/core';
import { Answers } from '../models/answers.class';
import { Plan } from '../models/plan.class';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  public answers: Answers;
  public plan: Plan;

  constructor() {}

  ngOnInit(): void {
    this.answers = new Answers();
  }

  createPlanBtn() {
    let answers = this.answers;
    localStorage.setItem('answers', JSON.stringify(answers));
  }

  pushNotPossibleDays(days: string) {
    let noDay = this.answers.notPossibleDays;
    if (days && !noDay.includes(days)) {
      noDay.push(days);
    }
  }

  pushGoodDays(days: string) {
    let goodDays = this.answers.goodDays;
    if (days && !goodDays.includes(days)) {
      goodDays.push(days);
    }
  }
}
