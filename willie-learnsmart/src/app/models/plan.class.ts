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
}
