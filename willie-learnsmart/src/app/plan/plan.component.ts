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
  minutesPerWeek: number = 10080;
  minutesEssential: number = 3360;
  userAge: number = 0;

  /**
   * * Standardfactor = 1. Stands for the learning ability. Smallest = 0.5, Highest 1.5.
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
    this.checkNotPossibleDays();
    this.setUserAbility();
  }

  setUserAbility() {
    this.checkUserAge();
    this.checkTopicLevel();
    this.checkUserFeeling();
    this.calculateLearningAbility();
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
    console.log(
      'USERLEARNINGABILITY VOR BERECHNUNG:',
      this.userLearningAbility
    );
    this.userLearningAbility =
      this.levelFactor *
      this.ageFactor *
      this.feelingSpeed *
      this.feelingEndurance *
      this.feelingLove;
    console.log(
      'USERLEARNINGABILITY NACH BERECHNUNG:',
      this.userLearningAbility
    );
  }

  checkUserAge() {
    let age = this.answers.userAge;

    if (age <= 20) {
      this.ageFactor = 1.4;
    }
    if (age > 20 && age < 30) {
      this.ageFactor = 1.2;
    }
    if (age >= 30 && age < 40) {
      this.ageFactor = 0.9;
    }
    if (age >= 40) {
      this.ageFactor = 0.8;
    }
    console.log('FAKTOR ALTER:', this.ageFactor);
  }

  checkTopicLevel() {
    let lv = this.answers.level;

    if (lv == 1) {
      this.levelFactor = 1.5;
    }
    if (lv == 2) {
      this.levelFactor = 1.2;
    }
    if (lv == 3) {
      this.levelFactor = 0.8;
    }
    if (lv == 4) {
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
      console.log('Der Nutzer lernt langsam.');
    }
    if (!feelingSpeed) {
      this.feelingSpeed = 1.1;
      console.log('Der Nutzer lernt schnell');
    }
    if (!feelingEndurance) {
      this.feelingEndurance = 0.85;
      console.log('Die Ausdauer des Nutzers ist schlecht.');
    }
    if (feelingEndurance) {
      this.feelingEndurance = 1.1;
      console.log('Die Ausdauer des Nutzers ist gut.');
    }
    if (!feelingLove) {
      this.feelingLove = 0.85;
      console.log('Der Nutzer hasst lernen');
    }
    if (feelingLove) {
      this.feelingLove = 1.1;
      console.log('Der Nutzer liebt lernen');
    }
    console.log(
      'FAKTOR FEELING',
      this.feelingSpeed,
      this.feelingEndurance,
      this.feelingLove
    );
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
      this.plan.monday = ['optional'];
    }
    if (nDay.includes('tuesday')) {
      this.plan.tuesday = ['optional'];
    }
    if (nDay.includes('wednesday')) {
      this.plan.wednesday = ['optional'];
    }
    if (nDay.includes('thursday')) {
      this.plan.thursday = ['optional'];
    }
    if (nDay.includes('friday')) {
      this.plan.friday = ['optional'];
    }
    if (nDay.includes('saturday')) {
      this.plan.saturday = ['optional'];
    }
    if (nDay.includes('sunday')) {
      this.plan.sunday = ['optional'];
    }
    console.log(this.answers.notPossibleDays);
    console.table(this.plan);
  }
}
