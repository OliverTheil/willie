import { Injectable } from '@angular/core';
import { Answers } from './models/answers.class';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ErrorcatchService {
  answers = new Answers();
  noError = false;
  constructor() {}

  test() {
    let answers = localStorage.getItem('answers');
    this.answers = JSON.parse(answers);
    this.checkAnswers();
  }

  checkAnswers() {
    if (this.answers.userName.length < 3) {
      this.errorMessage('Please enter a valid name!');
      this.noError = false;
    } else if (this.answers.userName.length > 10) {
      this.errorMessage('Please enter a shorter name!');
      this.noError = false;
    } else if (this.answers.userAge == null) {
      this.errorMessage('Please enter your age!');
      this.noError = false;
    } else if (this.answers.userAge < 6) {
      this.errorMessage('You are a little bit too young!');
      this.noError = false;
    } else if (this.answers.userAge > 100) {
      this.errorMessage('You are older than 100?');
      this.noError = false;
    } else if (this.answers.userTopic.length < 3) {
      this.errorMessage('Please enter a valid topic!');
      this.noError = false;
    } else if (this.answers.userTopic.length > 10) {
      this.errorMessage('Please enter a shorter topic!');
      this.noError = false;
    } else if (this.answers.workPerWeek < 0) {
      this.errorMessage('You cant work less than 0 hours!');
      this.noError = false;
    } else if (this.answers.workPerWeek > 60) {
      this.errorMessage('You work a little bit too much!');
      this.noError = false;
    } else if (this.answers.level == null) {
      this.errorMessage('Please choose the level of your topic');
      this.noError = false;
    } else if (this.answers.notPossibleDays.length > 6) {
      this.errorMessage('At least one day!');
      this.noError = false;
    } else if (this.answers.lifePerDay == null) {
      this.errorMessage('A field is missing!');
      this.noError = false;
    } else if (this.answers.minutesPerDay == null) {
      this.errorMessage('A field is missing!');
      this.noError = false;
    } else if (this.answers.maxMinutesPerWeek == null) {
      this.errorMessage('A field is missing!');
      this.noError = false;
    } else {
      this.noError = true;
    }
    // for (let i = 0; i <= this.answers.notPossibleDays.length; i++) {
    //   if (this.answers.goodDays.includes(this.answers.notPossibleDays[i])) {
    //     this.errorMessage(
    //       'Your good and bad days are the same! Please change that.'
    //     );
    //   }
    // }
  }

  errorMessage(error) {
    Swal.fire({
      position: 'center',
      background: 'rgb(134, 202, 8)',
      icon: 'error',
      title: error,
      heightAuto: false,
      showConfirmButton: false,
      timer: 3000,
    });
  }
}
