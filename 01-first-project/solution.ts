// TS additions are used to evaluate code, but it is then
// compiled into regular JS code withthe TS snippets removed

const button = document.querySelector('button')
// We could put ! at the end to force TS to know that this query will
// always yield an element and then put as HTMLInputElement to indicate
// That it will have that .value property
const input1 = document.getElementById('num1')! as HTMLInputElement
const input2 = document.getElementById('num2')! as HTMLInputElement

// Here TS doesn't know what type of variable these parameters are
function add(num1: number, num2: number) {
  return num1 + num2
}

button.addEventListener('click', function () {
  console.log(add(+input1.value, +input2.value))
})