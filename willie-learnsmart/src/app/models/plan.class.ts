export class Plan {
  monday: string[] = [];
  tuesday: string[] = [];
  wednesday: string[] = ['50min', '50min'];
  thursday: string[] = [];
  friday: string[] = ['50min'];
  saturday: string[] = [];
  sunday: string[] = [];
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

  50: string = '50min';
  25: string = '25min';
  eat: string = 'eat';
  repeat: string = 'string';
  optional: string = 'optional';
}
