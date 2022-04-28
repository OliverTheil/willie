import { Component, OnInit, ɵisListLikeIterable } from '@angular/core';
import { Answers } from '../models/answers.class';
import { Plan } from '../models/plan.class';
import { ErrorcatchService } from '../errorcatch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  answers: Answers;
  plan: Plan;

  constructor(private errorCatch: ErrorcatchService, private router: Router) {}

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

  /**
   * * The button that starts the calculation of the plan if no error occurs
   */
  createPlanBtn() {
    let answers = this.answers;
    localStorage.setItem('answers', JSON.stringify(answers));
    this.errorCatch.test();
    if (this.errorCatch.noError == true) {
      this.router.navigate(['/plan']);
    }
  }

  /**
   * * Push of the not possible days. If the day has already been added, it will be removed again.
   * * The same with good days. The user can't choose a day two times or choose that a day is good and not possible.
   */
  pushNotPossibleDays(days: string) {
    let noDay = this.answers.notPossibleDays;
    if (days && !noDay.includes(days)) {
      noDay.push(days);
    } else {
      noDay.splice(noDay.indexOf(days), 1);
    }
    if (this.answers.goodDays.includes(days)) {
      this.answers.goodDays.splice(this.answers.goodDays.indexOf(days), 1);
    }
  }

  pushGoodDays(days: string) {
    let goodDays = this.answers.goodDays;
    if (days && !goodDays.includes(days)) {
      goodDays.push(days);
    } else {
      goodDays.splice(goodDays.indexOf(days), 1);
    }
    if (this.answers.notPossibleDays.includes(days)) {
      this.answers.notPossibleDays.splice(
        this.answers.notPossibleDays.indexOf(days),
        1
      );
    }
  }
}
