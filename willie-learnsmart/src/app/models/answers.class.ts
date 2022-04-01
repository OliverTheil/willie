export class Answers {
  public userName: string = '';
  public userAge: number;
  public userTopic: string = '';
  public userGoal: string = '';

  public workPerWeek: number;
  public lifePerDay: number;
  public level: number;

  public learningSlow: boolean = true;
  public learningEnduranceGood: boolean = false;
  public learningLove: boolean = false;

  public minutesPerDay: number;
  public maxMinutesPerWeek: number;

  public notPossibleDays: string[] = [];
  public goodDays: string[] = [];

  public month: boolean = true;
  public planned: boolean = true;

  days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  lifePerDaySteps = [120, 240, 360, 480];
  lvSteps = [1, 2, 3, 4];
  minPerDaySteps = [30, 60, 90, 120, 150, 180];
  maxTimePerWeekSteps = [120, 240, 360, 480, 600, 720, 840, 960];
}
