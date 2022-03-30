export class Plan {
  monday: string[] = [];
  tuesday: string[] = [];
  wednesday: string[] = [];
  thursday: string[] = [];
  friday: string[] = [];
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
