import { Component, OnInit, ɵisListLikeIterable } from '@angular/core';
import { Answers } from '../models/answers.class';
import { Plan } from '../models/plan.class';
import Swal from 'sweetalert2';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  answers: Answers;
  plan: Plan;

  constructor() {}

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
    this.checkAnswers();
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

  checkAnswers() {
    if (this.answers.userName.length < 3) {
      this.errorMessage('Please enter a valid name!');
    }
    if (this.answers.userName.length > 10) {
      this.errorMessage('Please enter a shorter name!');
    }
    if (this.answers.userAge < 6) {
      this.errorMessage('You are a little bit too young!');
    }
    if (this.answers.userAge > 100) {
      this.errorMessage('You are older than 100?');
    }
    if (this.answers.userTopic.length < 3) {
      this.errorMessage('Please enter a valid topic!');
    }
    if (this.answers.userTopic.length > 10) {
      this.errorMessage('Please enter a shorter topic!');
    }
    if (this.answers.workPerWeek < 0) {
      this.errorMessage('You cant work less than 0 hours!');
    }
    if (this.answers.workPerWeek > 50) {
      this.errorMessage('You work a little bit too much!');
    }
    if (this.answers.level == null) {
      this.errorMessage('Please choose a level of your topic');
    }
  }
  errorMessage(error) {
    Swal.fire({
      position: 'center',
      background: 'rgb(134, 202, 8)',
      icon: 'error',
      title: error,
      heightAuto: false,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
