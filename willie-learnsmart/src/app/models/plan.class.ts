export class Plan {
  monday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  tuesday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  wednesday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  thursday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  friday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  saturday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  sunday = {
    min50: ['50min', '50min'],
    min25: ['25min', '25min'],
    eat: ['eat', 'eat'],
    repeat: ['repeat', 'repeat'],
    optional: ['optional', 'optional'],
  };
  goodDays: string[] = [];
  notPossibleDays: string[] = [];
  days: string[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  weeks: string[] = [];
  strict: boolean = false;
}
