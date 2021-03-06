import { Component, OnInit } from '@angular/core';
import { Answers } from '../models/answers.class';
import { Plan } from '../models/plan.class';
import Swal from 'sweetalert2';
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

  /**
   * * Depending on the answers, the user gets 25 or 50 min tasks. True means that the particular task is possible.
   * * Example: If the the userLearningAbility < 0,25, a 50min task is not possible.
   */
  min25 = true;
  min50 = false;

  changeDay = false;
  addModuleActive = false;
  deleteModuleActive = false;

  constructor() {}

  ngOnInit(): void {
    this.answers = new Answers();
    this.plan = new Plan();
    let retrievedAnswers = localStorage.getItem('answers');
    this.answers = JSON.parse(retrievedAnswers);
    this.getValues();
    this.calculationUser();
    if (localStorage.getItem('plan') === null) {
      let emptyPlan = this.plan;
      localStorage.setItem('plan', JSON.stringify(emptyPlan));
      this.calculationPlan();
    } else {
      let retrievedPlan = localStorage.getItem('plan');
      this.plan = JSON.parse(retrievedPlan);
    }
    console.log(this.minPD);
  }

  calculationUser() {
    this.forceScroll();
    this.calculateMinutes();
    this.calculateMinutesPerDay();
    this.setUserAbility();
  }

  calculationPlan() {
    this.organizePlan();
    this.checkGoodDays();
    this.checkNotPossibleDays();
    this.checkPlan();
    this.checkPause();
    this.savePlan();
  }

  setUserAbility() {
    this.checkUserAge();
    this.checkTopicLevel();
    this.checkUserFeeling();
    this.calculateLearningAbility();
  }

  forceScroll() {
    window.scroll(0, 0);
  }

  savePlan() {
    let plan = this.plan;
    localStorage.setItem('plan', JSON.stringify(plan));
  }

  resetPlan() {
    window.localStorage.removeItem('plan');
  }

  /**
   * * Open the edit window of the clicked day
   */
  thisDay(clickedDay) {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < this.plan.weeks.length; number++) {
        document.getElementById(
          this.plan.weekNumbers[number] + [this.plan.days[i]]
        ).style.display = 'none';
      }
    }
    document.getElementById(clickedDay).style.display = 'flex';
  }

  closeWindow(week, day, clickedDay) {
    this.deleteModuleActive = false;
    this.addModuleActive = false;
    document
      .getElementById('delete' + week + day)
      .classList.remove('highlighted');
    document.getElementById('add' + week + day).classList.remove('highlighted');
    document.getElementById(clickedDay).style.display = 'none';
    this.savePlan();
  }
  /**
   * * Starts the add function
   */
  addModule(week, day) {
    this.deleteModuleActive = false;
    document
      .getElementById('delete' + week + day)
      .classList.remove('highlighted');
    if (!this.addModuleActive) {
      document.getElementById('add' + week + day).classList.add('highlighted');
      this.addModuleActive = true;
    } else if (this.addModuleActive) {
      document
        .getElementById('add' + week + day)
        .classList.remove('highlighted');
      this.addModuleActive = false;
    }
  }
  /**
   * * Starts the delete function
   */
  deleteModule(week, day) {
    this.addModuleActive = false;
    document.getElementById('add' + week + day).classList.remove('highlighted');
    if (!this.deleteModuleActive) {
      document
        .getElementById('delete' + week + day)
        .classList.add('highlighted');
      this.deleteModuleActive = true;
    } else if (this.deleteModuleActive) {
      document
        .getElementById('delete' + week + day)
        .classList.remove('highlighted');
      this.deleteModuleActive = false;
    }
  }
  /**
   * * Deletes the chosen module
   */
  chooseModule(week, day, moduleNumber) {
    if (this.deleteModuleActive) {
      this.plan[week][day].splice(moduleNumber, 1);
    }
    this.savePlan();
  }

  deleteDay(week, day) {
    this.plan[week][day] = [];
    this.savePlan();
  }
  /**
   * * Adds the clicked module
   */
  clickedModule(clickedModule, week, day) {
    if (this.addModuleActive) {
      this.plan[week][day].push(clickedModule);
    }
    if (clickedModule != 'eat') {
      this.checkChangedDay(week, day);
    }
    this.savePlan();
  }
  /**
   * * If the user changes a day, the function adds an eat symbol
   */
  checkChangedDay(week, day) {
    let count = 0;

    this.plan[week][day].forEach((element) => {
      if (element == 'eat') {
        count += 1;
      }
    });
    if (this.plan[week][day].length > 3 && count == 0) {
      this.plan[week][day].splice(3, 0, 'eat');
    }
    if (this.plan[week][day].length > 6 && count < 2) {
      this.plan[week][day].splice(7, 0, 'eat');
    }
    if (this.plan[week][day].length > 9 && count < 3) {
      this.plan[week][day].splice(10, 0, 'eat');
    }
    if (this.plan[week][day].length > 11) {
      Swal.fire({
        position: 'center',
        background: 'rgb(134, 202, 8)',
        icon: 'warning',
        title: 'Do not overexert yourself!',
        heightAuto: false,
        showConfirmButton: false,
        timer: 3000,
      });
    }
    this.savePlan();
  }

  /**
   * * executes the different functions
   */
  organizePlan() {
    if (this.minPD <= 30) {
      this.organizeTo30();
    }
    if (this.minPD > 30 && this.minPD <= 40) {
      this.organize30To40();
    }
    if (this.minPD > 40 && this.minPD <= 60) {
      this.organize40To60();
    }
    if (this.minPD > 60 && this.minPD <= 90) {
      this.organize60To90();
    }
    if (this.minPD > 90 && this.minPD <= 120) {
      this.organize90To120();
    }
    if (this.minPD > 120 && this.minPD <= 150) {
      this.organize120To150();
    }
    if (this.minPD > 150 && this.minPD <= 180) {
      this.organize150To180();
    }
  }

  /**
   * * If the user has between 30 and 60 min per day
   */
  organizeTo30() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
          '25min'
        );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('optional');
      }
    }
  }

  organize30To40() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
          '25min'
        );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  organize40To60() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
          '25min'
        );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('25min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  /**
   * * If the user has between 60 and 90 min per day
   */
  organize60To90() {
    if (this.min50 && this.userLearningAbility >= 0.75) {
      this.organize60To90_075_1();
    }
    if (
      this.min50 &&
      this.userLearningAbility >= 0.5 &&
      this.userLearningAbility < 0.75
    ) {
      this.organize60To90_050_075();
    }
    if (
      this.min50 &&
      this.userLearningAbility >= 0.25 &&
      this.userLearningAbility < 0.5
    ) {
      this.organize60To90_025_050();
    }
    if (
      this.min50 &&
      this.userLearningAbility >= 0 &&
      this.userLearningAbility < 0.25
    ) {
      this.organize60To90False();
    }
    if (!this.min50) {
      this.organize60To90False();
    }
  }

  organize60To90_075_1() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
          '50min'
        );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  organize60To90_050_075() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
          '50min'
        );
      }
    }
    for (let i = 0; i < 1; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 3)]
        ].push('25min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(4, 6)]
        ].push('25min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  organize60To90_025_050() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        for (let runTime = 0; runTime < 2; runTime++)
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
            '25min'
          );
      }
    }
    for (let i = 0; i < 1; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('50min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  organize60To90False() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        for (let runTime = 0; runTime < 2; runTime++)
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
            '25min'
          );
      }
    }
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
          '25min'
        );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  /**
   * * If the user has between 90 and 120 min per day
   */
  organize90To120() {
    if (this.min50 && this.userLearningAbility >= 0.75) {
      this.organize90To120_075_1();
    }
    if (
      this.min50 &&
      this.userLearningAbility >= 0.5 &&
      this.userLearningAbility < 0.75
    ) {
      this.organize90To120_050_075();
    }
    if (
      this.min50 &&
      this.userLearningAbility >= 0.25 &&
      this.userLearningAbility < 0.5
    ) {
      this.organize90To120_025_050();
    }
    if (
      this.min50 &&
      this.userLearningAbility >= 0 &&
      this.userLearningAbility < 0.25
    ) {
      this.organize90To120False();
    }
    if (!this.min50) {
      this.organize90To120False();
    }
  }

  organize90To120_075_1() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
          '25min'
        );
        this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
          '50min'
        );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('25min');
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  organize90To120_050_075() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
          '25min'
        );
        this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
          '50min'
        );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('25min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  organize90To120_025_050() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        for (let runTime = 0; runTime < 3; runTime++)
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
            '25min'
          );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('50min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  organize90To120False() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        for (let runTime = 0; runTime < 3; runTime++)
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
            '25min'
          );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  /**
   * * If the user has between 120 and 150 min per day
   */

  organize120To150() {
    if (this.min50 && this.userLearningAbility >= 0.75) {
      this.organize120To150_075_1();
    }
    if (
      this.min50 &&
      this.userLearningAbility >= 0.5 &&
      this.userLearningAbility < 0.75
    ) {
      this.organize120To150_050_075();
    }
    if (
      this.min50 &&
      this.userLearningAbility >= 0.25 &&
      this.userLearningAbility < 0.5
    ) {
      this.organize120To150_025_050();
    }
    if (
      this.min50 &&
      this.userLearningAbility >= 0 &&
      this.userLearningAbility < 0.25
    ) {
      this.organize120To150False();
    }
    if (!this.min50) {
      this.organize120To150False();
    }
  }

  organize120To150_075_1() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        for (let runTime = 0; runTime < 2; runTime++)
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
            '50min'
          );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  organize120To150_050_075() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        for (let runTime = 0; runTime < 3; runTime++)
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
            '25min'
          );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 4)]
        ].push('50min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(5, 6)]
        ].push('50min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
    this.checkModules();
  }

  organize120To150_025_050() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        for (let runTime = 0; runTime < 2; runTime++)
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
            '25min'
          );
      }
    }
    for (let i = 0; i < 1; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 4)]
        ].push('50min');
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(5, 6)]
        ].push('25min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
    this.checkModules();
  }

  organize120To150False() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        for (let runTime = 0; runTime < 5; runTime++)
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
            '25min'
          );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  /**
   * * If the user has between 150 and 180 min per day
   */

  organize150To180() {
    if (this.min50 && this.userLearningAbility >= 0.75) {
      this.organize150To180_075_1();
    }
    if (
      this.min50 &&
      this.userLearningAbility >= 0.5 &&
      this.userLearningAbility < 0.75
    ) {
      this.organize150To180_050_075();
    }
    if (
      this.min50 &&
      this.userLearningAbility >= 0.25 &&
      this.userLearningAbility < 0.5
    ) {
      this.organize150To180_025_050();
    }
    if (
      this.min50 &&
      this.userLearningAbility >= 0 &&
      this.userLearningAbility < 0.25
    ) {
      this.organize150To180False();
    }
    if (!this.min50) {
      this.organize150To180False();
    }
  }

  organize150To180_075_1() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        for (let runTime = 0; runTime < 3; runTime++)
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
            '50min'
          );
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  organize150To180_050_075() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        for (let runTime = 0; runTime < 2; runTime++)
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
            '25min'
          );
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 4)]
        ].push('50min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(5, 6)]
        ].push('50min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
    this.checkModules();
  }

  organize150To180_025_050() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        for (let runTime = 0; runTime < 3; runTime++)
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
            '25min'
          );
      }
    }
    for (let i = 0; i < 1; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 4)]
        ].push('50min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(5, 6)]
        ].push('25min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
    this.checkModules();
  }

  organize150To180False() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        for (let runTime = 0; runTime < 5; runTime++)
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].push(
            '25min'
          );
      }
    }
    for (let i = 0; i < 1; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('50min');
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let number = 0; number < 4; number++) {
        this.plan[this.plan.weekNumbers[number]][
          this.plan.days[this.getRndInteger(1, 6)]
        ].push('repeat');
      }
    }
  }

  /**
   * * adds a 25min module if possible
   */
  checkModules() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        if (
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].length < 3
        ) {
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].splice(
            3,
            0,
            '25min',
            '25min'
          );
        }
      }
    }
  }

  /**
   * * If the time per day exceeds 60 minutes a break is inserted.
   */
  checkPause() {
    for (let i = 0; i < this.plan.days.length; i++) {
      for (let number = 0; number < 4; number++) {
        if (
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].length > 3
        ) {
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].splice(
            3,
            0,
            'eat'
          );
        }
        if (
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].length > 6
        ) {
          this.plan[this.plan.weekNumbers[number]][this.plan.days[i]].splice(
            6,
            0,
            'eat'
          );
        }
      }
    }
  }

  /**
   *
   * *returns a random number between min and max
   */
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    if (this.userLearningAbility <= 0.25) {
      this.min50 = false;
      this.min25 = true;
    } else if (this.userLearningAbility > 0.25) {
      this.min50 = true;
      this.min25 = true;
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
        for (let i = 0; i < 4; i++) {
          this.plan[this.plan.weekNumbers[i]][day].push('50min');
        }
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
        for (let i = 0; i < 4; i++) {
          this.plan[this.plan.weekNumbers[i]][day] = ['optional'];
        }
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
