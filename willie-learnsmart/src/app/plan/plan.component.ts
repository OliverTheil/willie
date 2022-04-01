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
  minutesPerWeek: number = 10080;
  minutesEssential: number = 3360;
  userAge: number = 0;

  /**
   * * Standardfactor = 1. Stands for the learning ability. Smallest = 0.5, Highest 1.5. Everything outside this range will be adjusted.
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
  maxMinPW: number; //*maxMinutesPerWeek;
  maxUMin: number; //*maxUserMinutes;
  maxUD: number; //*maxUserDays;
  maxUMinPD: number; //*maxUserMinutesPerDay;
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
  }

  setUserAbility() {
    this.checkUserAge();
    this.checkTopicLevel();
    this.checkUserFeeling();
    this.calculateLearningAbility();
    this.checkPlan();
  }

  getValues() {
    this.minPW = this.minutesPerWeek;
    this.maxMinPW = this.answers.maxMinutesPerWeek;
    this.maxUMin = this.maxUserMinutes;
    this.maxUD = this.maxUserDays;
    this.maxUMinPD = this.maxUserMinutesPerDay;
    this.minPD = this.answers.minutesPerDay;
    console.log('Minutes per Week:', this.minPW);
    console.log('Max. Minutes per Week:', this.maxMinPW);
    console.log('Max. User Min:', this.maxUMin);
    console.log('Max. User Days:', this.maxUD);
    console.log('Max. User Min. per Day:', this.maxUMinPD);
    console.log('Min. per Day:', this.minPD);
    console.log(this.answers);
    console.log(this.plan);
    console.log(this.userLearningAbility);
  }

  calculateMinutes() {
    let minutesMinusLife =
      this.minPW - this.answers.lifePerDay * 7 - this.minutesEssential;
    let minMinusW = minutesMinusLife - this.answers.workPerWeek * 60 - 300;
    if (minMinusW >= this.maxMinPW) {
      this.maxUMin = this.maxMinPW;
    }
    if (minMinusW < this.maxMinPW && minMinusW > 120) {
      this.maxUMin = minMinusW;
    }
    if (this.maxUMin <= 120) {
      this.maxUMin = 120;
    }
    this.maxUserMinutes = this.maxUMin;
  }

  calculateMinutesPerDay() {
    this.maxUD = this.maxDays - this.answers.notPossibleDays.length;
    this.maxUMinPD = this.maxUserMinutes / this.maxUD;
    if (this.minPD <= this.maxUMinPD) {
      this.maxUMinPD = this.minPD;
    }
  }

  calculateLearningAbility() {
    let userLA = this.userLearningAbility;
    userLA =
      this.levelFactor *
      this.ageFactor *
      this.feelingSpeed *
      this.feelingEndurance *
      this.feelingLove;
    this.userLearningAbility = +userLA.toFixed(2);
  }

  checkUserAge() {
    let age = this.answers.userAge;
    if (age <= 20) {
      this.ageFactor = 1.4;
    } else if (age > 20 && age < 30) {
      this.ageFactor = 1.2;
    } else if (age >= 30 && age < 40) {
      this.ageFactor = 0.9;
    } else if (age >= 40) {
      this.ageFactor = 0.8;
    }
  }

  checkTopicLevel() {
    let lv = this.answers.level;

    if (lv == 1) {
      this.levelFactor = 1.5;
    } else if (lv == 2) {
      this.levelFactor = 1.2;
    } else if (lv == 3) {
      this.levelFactor = 0.8;
    } else if (lv == 4) {
      this.levelFactor = 0.6;
    }
  }

  checkUserFeeling() {
    let feelingSpeed = this.answers.learningSlow;
    let feelingEndurance = this.answers.learningEnduranceGood;
    let feelingLove = this.answers.learningLove;

    if (feelingSpeed) {
      this.feelingSpeed = 0.85;
    } else if (!feelingSpeed) {
      this.feelingSpeed = 1.1;
    } else if (!feelingEndurance) {
      this.feelingEndurance = 0.85;
    } else if (feelingEndurance) {
      this.feelingEndurance = 1.1;
    } else if (!feelingLove) {
      this.feelingLove = 0.85;
    } else if (feelingLove) {
      this.feelingLove = 1.1;
    }
  }

  checkGoodDays() {
    let gDay = this.answers.goodDays;
    for (let i = 0; i < this.plan.days.length; i++) {
      let day = this.plan.days[i];
      if (gDay.includes(day)) {
        this.plan.goodDays.push(day);
      }
    }
  }

  checkNotPossibleDays() {
    let nDay = this.answers.notPossibleDays;
    for (let i = 0; i < this.plan.days.length; i++) {
      let day = this.plan.days[i];
      if (nDay.includes(day)) {
        this.plan[day].optional = ['optional'];
      }
    }
  }

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
