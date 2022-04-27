import { Component, OnInit, ɵisListLikeIterable } from '@angular/core';
import { Answers } from '../models/answers.class';
import { Plan } from '../models/plan.class';
import Swal from 'sweetalert2';
import { ErrorcatchService } from '../errorcatch.service';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  answers: Answers;
  plan: Plan;

  constructor(private errorCatch: ErrorcatchService) {}

  ngOnInit(): void {
    this.answers = new Answers();
    if (localStorage.getItem('answers') === null) {
      let emptyTemplate = this.answers;
      localStorage.setItem('answers', JSON.stringify(emptyTemplate));
    } else {
      let retrievedAnswers = localStorage.getItem('answers');
      this.answers = JSON.parse(retrievedAnswers);
    }
  }

  createPlanBtn() {
    this.errorCatch.checkAnswers();
    let answers = this.answers;
    localStorage.setItem('answers', JSON.stringify(answers));
  }

  pushNotPossibleDays(days: string) {
    let noDay = this.answers.notPossibleDays;
    if (days && !noDay.includes(days)) {
      noDay.push(days);
    } else {
      noDay.splice(noDay.indexOf(days), 1);
    }
  }

  pushGoodDays(days: string) {
    let goodDays = this.answers.goodDays;
    if (days && !goodDays.includes(days)) {
      goodDays.push(days);
    } else {
      goodDays.splice(goodDays.indexOf(days), 1);
    }
  }
}
