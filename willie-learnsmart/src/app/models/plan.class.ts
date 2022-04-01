export class Plan {
  Monday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  Tuesday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  Wednesday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  Thursday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  Friday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  Saturday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  Sunday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
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
  strict: boolean = false;
}
