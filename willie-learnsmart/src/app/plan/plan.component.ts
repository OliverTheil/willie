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
    console.log(this.maxUserHours);
  }

  calculateHoursPerDay() {
    this.maxUserDays = this.maxDays - this.answers.notPossibleDays.length;
  }

  checkNotPossibleDays() {
    if (this.answers.notPossibleDays.includes('monday')) {
      this.plan.monday = [];
    }
  }
}
