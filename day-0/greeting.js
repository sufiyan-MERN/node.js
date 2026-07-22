const args = process.argv.slice(2);
const name = args[0];
const age = args[1];

console.log(`hello ${name}`);
if (age) {
  console.log(`you are ${age} years old.`);
  const yearBorn = new Date().getFullYear() - parseInt(age);
  console.log(`you were born around ${yearBorn}`);
}
