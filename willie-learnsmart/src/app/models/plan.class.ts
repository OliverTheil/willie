export class Plan {
  week1 = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };
  week2 = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };
  week3 = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };
  week4 = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  // Monday = {
  //   min50: [],
  //   min25: [],
  //   eat: [],
  //   repeat: [],
  //   optional: [],
  // };
  // Tuesday = {
  //   min50: [],
  //   min25: [],
  //   eat: [],
  //   repeat: [],
  //   optional: [],
  // };
  // Wednesday = {
  //   min50: [],
  //   min25: [],
  //   eat: [],
  //   repeat: [],
  //   optional: [],
  // };
  // Thursday = {
  //   min50: [],
  //   min25: [],
  //   eat: [],
  //   repeat: [],
  //   optional: [],
  // };
  // Friday = {
  //   min50: [],
  //   min25: [],
  //   eat: [],
  //   repeat: [],
  //   optional: [],
  // };
  // Saturday = {
  //   min50: [],
  //   min25: [],
  //   eat: [],
  //   repeat: [],
  //   optional: [],
  // };
  // Sunday = {
  //   min50: [],
  //   min25: [],
  //   eat: [],
  //   repeat: [],
  //   optional: [],
  // };
  goodDays: string[] = [];
  notPossibleDays: string[] = [];
  days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  weeks: string[] = [];
  weekNumbers: string[] = ['week1', 'week2', 'week3', 'week4'];
  strict: boolean = false;
}
