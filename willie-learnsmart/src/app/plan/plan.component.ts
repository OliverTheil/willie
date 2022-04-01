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

  constructor() {}

  ngOnInit(): void {
    this.answers = new Answers();
    this.plan = new Plan();
    let retrievedAnswers = localStorage.getItem('answers');
    this.answers = JSON.parse(retrievedAnswers);
    this.calculationPlan();
  }

  calculationPlan() {
    this.calculateMinutes();
    this.calculateMinutesPerDay();
    this.checkGoodDays();
    this.checkNotPossibleDays();
    this.setUserAbility();
    console.log(this.plan.notPossibleDays);
  }

  setUserAbility() {
    this.checkUserAge();
    this.checkTopicLevel();
    this.checkUserFeeling();
    this.calculateLearningAbility();
    this.checkPlan();
  }

  calculateMinutes() {
    let minPW = this.minutesPerWeek;
    let maxMinPW = this.answers.maxMinutesPerWeek;
    let maxUMin = this.maxUserMinutes;

    let minutesMinusLife =
      minPW - this.answers.lifePerDay * 7 - this.minutesEssential;
    let minMinusW = minutesMinusLife - this.answers.workPerWeek - 300;
    if (minMinusW >= maxMinPW) {
      maxUMin = maxMinPW;
    }
    if (minMinusW < maxMinPW && minMinusW > 120) {
      maxUMin = minMinusW;
    }
    if (maxUMin <= 120) {
      maxUMin = 120;
    }
    this.maxUserMinutes = maxUMin;
    console.log('max Minuten die der User insgesamt Zeit hat', maxUMin);
  }

  calculateMinutesPerDay() {
    let maxUD = this.maxUserDays;
    let maxUMinPD = this.maxUserMinutesPerDay;
    let minPD = this.answers.minutesPerDay;

    maxUD = this.maxDays - this.answers.notPossibleDays.length;
    console.log('max Tage an denen der User Zeit hat:', maxUD);
    if (maxUD <= 0) {
      alert('Hey! There is no day where you have time! Please change that.');
    }
    console.log('MAX USER MINUTES:', this.maxUserMinutes);
    maxUMinPD = this.maxUserMinutes / maxUD;
    console.log('Max. min pro Tag:', maxUMinPD);
    if (minPD <= maxUMinPD) {
      maxUMinPD = minPD;
      console.log(
        'User hat max min ausgewählt:',
        minPD,
        'Min p. Tag, nach dem Vergleich:',
        maxUMinPD
      );
    }
  }

  calculateLearningAbility() {
    let userLA = this.userLearningAbility;
    console.log('USERLEARNINGABILITY VOR BERECHNUNG:', userLA);
    userLA =
      this.levelFactor *
      this.ageFactor *
      this.feelingSpeed *
      this.feelingEndurance *
      this.feelingLove;
    console.log('USERLEARNINGABILITY NACH BERECHNUNG:', userLA);
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
    console.log('FAKTOR ALTER:', this.ageFactor);
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
    console.log('FAKTOR LEVEL', this.levelFactor);
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
    console.log('MÖGLICHE TAGE:', this.plan.goodDays);
  }

  checkNotPossibleDays() {
    let nDay = this.answers.notPossibleDays;
    for (let i = 0; i < this.plan.days.length; i++) {
      let day = this.plan.days[i];
      if (nDay.includes(day)) {
        this.plan[day] = ['optional'];
      }
    }
    console.log(this.plan);
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
