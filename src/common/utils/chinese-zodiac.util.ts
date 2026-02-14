export function calculateZodiac(year: number): string {
  const animals = [
    'Monkey',
    'Rooster',
    'Dog',
    'Pig',
    'Rat',
    'Ox',
    'Tiger',
    'Rabbit',
    'Dragon',
    'Snake',
    'Horse',
    'Goat',
  ];

  return animals[year % 12];
}
