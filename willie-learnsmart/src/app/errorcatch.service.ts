import { Injectable } from '@angular/core';
import { Answers } from './models/answers.class';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ErrorcatchService {
  answers: Answers;
  constructor() {}

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
    if (this.answers.workPerWeek > 60) {
      this.errorMessage('You work a little bit too much!');
    }
    if (this.answers.level == null) {
      this.errorMessage('Please choose the level of your topic');
    }
    if (this.answers.notPossibleDays.length > 6) {
      this.errorMessage('At least one day!');
    }
    if (this.answers.lifePerDay == null) {
      this.errorMessage('A field is missing!');
    }
    if (this.answers.minutesPerDay == null) {
      this.errorMessage('A field is missing!');
    }
    if (this.answers.maxMinutesPerWeek == null) {
      this.errorMessage('A field is missing!');
    }
    for (let i = 0; i <= this.answers.notPossibleDays.length; i++) {
      if (this.answers.goodDays.includes(this.answers.notPossibleDays[i])) {
        this.errorMessage(
          'Your good and bad days are the same! Please change that.'
        );
      }
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
      timer: 3000,
    });
  }
}
