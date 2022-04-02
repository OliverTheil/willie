import { Component, OnInit } from '@angular/core';
import { Answers } from '../models/answers.class';
import { Plan } from '../models/plan.class';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  answers: Answers;
  plan: Plan;

  maxDays: number = 7;
  minutesPerWeek: number = 5880; //10080 - 4200  --> 7 * 24 * 60(max min per week) - 7 * 10 * 60(10 hours rest every day)
  userAge: number = 0;

  /**
   * * Standardfactor = 1. Stands for the learning ability. Smallest = 0.5, Highest 1.5.
   * * After the calculation, 0.5 is subtracted to simplify the factor for the user.
   */
  userLearningAbility = 1;
  levelFactor = 1;
  ageFactor = 1;
  feelingSpeed = 1;
  feelingEndurance = 1;
  feelingLove = 1;

  maxUserMinutes: number = 0;
  maxUserDays: number = 7;
  maxUserMinutesPerDay: number = 0;

  minPW: number; //*minutesPerWeek;
  maxMinPWeek: number; //*maxMinutesPerWeek;
  maxUMin: number; //*maxUserMinutes;
  maxUDays: number; //*maxUserDays;
  maxUMinPDay: number; //*maxUserMinutesPerDay;
  minPD: number; //*answers.minutesPerDay;

  constructor() {}

  ngOnInit(): void {
    this.answers = new Answers();
    this.plan = new Plan();
    let retrievedAnswers = localStorage.getItem('answers');
    this.answers = JSON.parse(retrievedAnswers);
    this.getValues();
    this.calculationPlan();
  }

  calculationPlan() {
    this.calculateMinutes();
    this.calculateMinutesPerDay();
    this.checkGoodDays();
    this.checkNotPossibleDays();
    this.setUserAbility();
    this.organizePlan();
  }

  setUserAbility() {
    this.checkUserAge();
    this.checkTopicLevel();
    this.checkUserFeeling();
    this.calculateLearningAbility();
    this.checkPlan();
  }

  organizePlan() {
    console.log(this.minPD);

    console.log(this.plan);
  }

  getValues() {
    this.minPW = this.minutesPerWeek;
    this.maxMinPWeek = this.answers.maxMinutesPerWeek;
    this.maxUMin = this.maxUserMinutes;
    this.maxUDays = this.maxUserDays;
    this.maxUMinPDay = this.maxUserMinutesPerDay;
    this.minPD = this.answers.minutesPerDay;
  }

  /**
   * * Calculates the minutes per week
   */

  calculateMinutes() {
    let workPerWeekMin = this.answers.workPerWeek * 60;
    let minutesMinusLife = this.minPW - this.answers.lifePerDay * 7;
    let minMinusW = minutesMinusLife - workPerWeekMin;
    if (minMinusW >= this.maxMinPWeek) {
      this.maxUMin = this.maxMinPWeek;
    }
    if (minMinusW < this.maxMinPWeek && minMinusW > 120) {
      this.maxUMin = minMinusW;
    }
    if (this.maxUMin <= 120) {
      this.maxUMin = 120;
    }
    this.maxUserMinutes = this.maxUMin;
  }

  /**
   * * Calculates the max. minutes per Day. The Plan is based on this value.
   */

  calculateMinutesPerDay() {
    this.maxUDays = this.maxDays - this.answers.notPossibleDays.length;
    this.maxUMinPDay = this.maxUserMinutes / this.maxUDays;
    if (this.minPD <= this.maxUMinPDay) {
      this.maxUMinPDay = this.minPD;
    }
  }

  /**
   * * The complete factor calculation
   */

  calculateLearningAbility() {
    let userLA = this.userLearningAbility;
    userLA =
      this.levelFactor *
        this.ageFactor *
        this.feelingSpeed *
        this.feelingEndurance *
        this.feelingLove -
      0.5;
    this.userLearningAbility = +userLA.toFixed(2);
    if (this.userLearningAbility <= 0) {
      this.userLearningAbility = 0;
    } else if (this.userLearningAbility >= 1) {
      this.userLearningAbility = 1;
    }
  }

  /**
   * calc age factor
   */

  checkUserAge() {
    let age = this.answers.userAge;

    age <= 20
      ? (this.ageFactor = 1.4)
      : age > 20 && age < 30
      ? (this.ageFactor = 1.2)
      : age >= 30 && age < 40
      ? (this.ageFactor = 0.9)
      : age >= 40
      ? (this.ageFactor = 0.8)
      : (this.ageFactor = 1);
  }

  /**
   * calc topic level factor
   */

  checkTopicLevel() {
    let lv = this.answers.level;
    lv == 1
      ? (this.levelFactor = 1.5)
      : lv == 2
      ? (this.levelFactor = 1.2)
      : lv == 3
      ? (this.levelFactor = 0.8)
      : lv == 4
      ? (this.levelFactor = 0.6)
      : (this.levelFactor = 1);
  }

  /**
   * calc feeling factor
   */

  checkUserFeeling() {
    let feelingSpeed = this.answers.learningSlow;
    let feelingEndurance = this.answers.learningEnduranceGood;
    let feelingLove = this.answers.learningLove;

    feelingSpeed ? (this.feelingSpeed = 0.85) : (this.feelingSpeed = 1.1);
    !feelingEndurance
      ? (this.feelingEndurance = 0.85)
      : (this.feelingEndurance = 1.1);
    !feelingLove ? (this.feelingLove = 0.85) : (this.feelingLove = 1.1);
  }

  /**
   * * checks the days that are good. At good days is a extra 50 min session.
   */

  checkGoodDays() {
    let gDay = this.answers.goodDays;
    for (let i = 0; i < this.plan.days.length; i++) {
      let day = this.plan.days[i];
      if (gDay.includes(day)) {
        this.plan.goodDays.push(day);
        this.plan[day].min50.push('50min');
      }
    }
  }

  /**
   * * Checks the days that are not possible
   */

  checkNotPossibleDays() {
    let nDay = this.answers.notPossibleDays;
    for (let i = 0; i < this.plan.days.length; i++) {
      let day = this.plan.days[i];
      if (nDay.includes(day)) {
        this.plan[day].optional = ['optional'];
      }
    }
  }

  /**
   * * Changes the setup of the plan
   */

  checkPlan() {
    this.answers.planned
      ? (this.plan.strict = true)
      : (this.plan.strict = false);

    !this.answers.month
      ? (this.plan.weeks = ['Your Week'])
      : (this.plan.weeks = [
          'First Week',
          'Second Week',
          'Third Week',
          'Last Week',
        ]);

    if (!this.plan.strict) {
      this.plan.weeks = [];
    }
  }
}
