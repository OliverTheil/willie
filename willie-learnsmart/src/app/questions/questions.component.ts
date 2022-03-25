import { Component, OnInit } from '@angular/core';
import { Answers } from '../models/answers.class';
import { Plan } from '../models/plan.class';

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
    this.plan = new Plan();
  }

  createPlanBtn() {
    console.table(this.answers);
    console.table(this.plan);
  }

  addName(userName: string) {
    if (userName) {
      this.answers.userName = userName;
    }
  }

  addAge(userAge: number) {
    if (userAge) {
      this.answers.userAge = userAge;
    }
  }

  addTopic(userTopic: string) {
    if (userTopic) {
      this.answers.userTopic = userTopic;
    }
  }

  addGoal(userGoal: string) {
    if (userGoal) {
      this.answers.userGoal = userGoal;
    }
  }

  addWorkPerDay() {}

  addLifePerDay() {}
}
