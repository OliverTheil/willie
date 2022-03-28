import { Component, OnInit } from '@angular/core';
import { Answers } from '../models/answers.class';
import { Plan } from '../models/plan.class';
import { QuestionsComponent } from '../questions/questions.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  answers: Answers;
  plan: Plan;

  maxDays: number = 7;
  hoursPerWeek: number = 168;
  hoursEssential: number = 56;

  maxUserHours: number = 0;
  maxUserDays: number = 7;
  maxUserHoursPerDay: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.answers = new Answers();
    this.plan = new Plan();
    let retrievedAnswers = localStorage.getItem('answers');
    this.answers = JSON.parse(retrievedAnswers);
    this.calculationPlan();
  }

  calculationPlan() {
    this.calculateHours();
    this.calculateHoursPerDay();
    this.checkNotPossibleDays();
  }

  calculateHours() {
    let hoursMinusLife =
      this.hoursPerWeek - this.answers.lifePerDay * 7 - this.hoursEssential;
    let hoursMinusWork = hoursMinusLife - this.answers.workPerWeek - 5;
    if (hoursMinusWork >= this.answers.maxHoursPerWeek) {
      this.maxUserHours = this.answers.maxHoursPerWeek;
    } else if (
      hoursMinusWork < this.answers.maxHoursPerWeek &&
      hoursMinusWork > 2
    ) {
      this.maxUserHours = hoursMinusWork;
    } else if (this.maxUserHours <= 2) {
      this.maxUserHours = 2;
    }
    console.log(
      'MAX. Stunden die der User insgesamt Zeit hat',
      this.maxUserHours
    );
  }

  calculateHoursPerDay() {
    this.maxUserDays = this.maxDays - this.answers.notPossibleDays.length;
    console.log('MAX. Tage an denen der User Zeit hat:', this.maxUserDays);
    if (this.maxUserDays <= 0) {
      alert('Hey! There is no day where you have time! Please change that.');
    }
    this.maxUserHoursPerDay = this.maxUserHours / this.maxUserDays;
    console.log('Max. Stunden pro Tag:', this.maxUserHoursPerDay);
    if (this.answers.minutesPerDay <= this.maxUserHoursPerDay) {
      this.maxUserHoursPerDay = this.answers.minutesPerDay;
      console.log(
        'User hat max Minuten ausgewählt:',
        this.answers.minutesPerDay,
        'Minuten Pro Tag, nach dem Vergleich:',
        this.maxUserHoursPerDay
      );
    }
  }

  checkGoodDays() {
    let gDay = this.answers.goodDays;
    if (gDay.includes('monday')) {
      console.log('testing');
    }
    if (gDay.includes('tuesday')) {
      console.log('testing');
    }
    if (gDay.includes('wednesday')) {
      console.log('testing');
    }
    if (gDay.includes('thursday')) {
      console.log('testing');
    }
    if (gDay.includes('friday')) {
      console.log('testing');
    }
    if (gDay.includes('saturday')) {
      console.log('testing');
    }
    if (gDay.includes('sunday')) {
      console.log('testing');
    }
  }

  checkNotPossibleDays() {
    let nDay = this.answers.notPossibleDays;
    if (nDay.includes('monday')) {
      this.plan.monday = [];
    }
    if (nDay.includes('tuesday')) {
      this.plan.tuesday = [];
    }
    if (nDay.includes('wednesday')) {
      this.plan.wednesday = [];
    }
    if (nDay.includes('thursday')) {
      this.plan.thursday = [];
    }
    if (nDay.includes('friday')) {
      this.plan.friday = [];
    }
    if (nDay.includes('saturday')) {
      this.plan.saturday = [];
    }
    if (nDay.includes('sunday')) {
      this.plan.sunday = [];
    }
    console.log(this.answers.notPossibleDays);
    console.table(this.plan);
  }
}
