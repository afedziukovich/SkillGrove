INSERT INTO "public"."users" (
    "id",
    "login",
    "password_hash",
    "salt",
    "experience",
    "level"
  )
VALUES (
    1,
    'admin',
    '$2b$10$laVV8abMmEdY2T/gomxcm.bi00YrkeIggT1cOtoJtn8G6.vBNB0mi',
    '$2b$10$laVV8abMmEdY2T/gomxcm.',
    0,
    1
  );
INSERT INTO "public"."task_categories" ("id", "name")
VALUES (1, 'JavaScript'),
  (2, 'TypeScript'),
  (3, 'DOM Manipulation'),
  (4, 'Asynchronous JavaScript'),
  (5, 'Arrays and Objects'),
  (6, 'ES6+ Features'),
  (7, 'Algorithms'),
  (8, 'Testing'),
  (9, 'Web APIs');
INSERT INTO "public"."task_difficulties" ("id", "name", "max_experience")
VALUES (1, 'Basic', 5),
  (2, 'Advanced', 10),
  (3, 'Expert', 15);
INSERT INTO "public"."tasks" (
    "id",
    "type",
    "answer_type",
    "title",
    "description",
    "category_id",
    "difficulty_id"
  )
VALUES (
    1,
    'question',
    'text',
    'let, const, var in JavaScript',
    '**Question:** What is the difference between `let`, `const`, and `var` in JavaScript? Explain with examples.',
    1,
    1
  ),
  (
    2,
    'task',
    'js',
    'Write a greet function',
    '**Task:** Write a function `greet` that takes a `name` (string) and returns `"Hello, [name]!"`.

**Example:**
```javascript
greet(''Alice''); // => "Hello, Alice!"
```',
    1,
    1
  ),
  (
    3,
    'question',
    'js',
    'JavaScript type coercion',
    '**Question:** What will the following code output?

```javascript
let a = 5;
let b = ''5'';
console.log(a == b);
console.log(a === b);
```',
    1,
    1
  ),
  (
    4,
    'question',
    'text',
    'Hoisting in JavaScript',
    '**Question:** What is hoisting in JavaScript? Provide examples for variables and functions.',
    1,
    1
  ),
  (
    5,
    'task',
    'js',
    'Object destructuring',
    '**Task:** Use destructuring to extract `name` and `age` from the object below:

```javascript
const person = { name: ''Alice'', age: 25, city: ''New York'' };
```',
    1,
    1
  ),
  (
    6,
    'question',
    'text',
    'Closures in JavaScript',
    '**Question:** What is a closure in JavaScript? Explain with an example.',
    1,
    2
  ),
  (
    7,
    'task',
    'js',
    'Counter with closures',
    '**Task:** Write a function `createCounter` that returns an object with methods `increment`, `decrement`, and `getValue`. Use closures to maintain state.

**Example:**
```javascript
const counter = createCounter();
counter.increment(); // => 1
counter.getValue();   // => 1
```',
    1,
    2
  ),
  (
    8,
    'question',
    'js',
    'Closure state output',
    '**Question:** What will the following code output?

```javascript
function outer() {
  let x = 10;
  return function inner() {
    console.log(x++);
  };
}
const fn = outer();
fn(); // ?
fn(); // ?
```',
    1,
    2
  ),
  (
    9,
    'question',
    'text',
    'call, apply, bind',
    '**Question:** Explain the difference between `call`, `apply`, and `bind` in JavaScript. Provide examples.',
    1,
    2
  ),
  (
    10,
    'task',
    'js',
    'Sum any number of arguments',
    '**Task:** Write a function `sum` that takes any number of arguments and returns their sum.

**Example:**
```javascript
sum(1, 2, 3); // => 6
```',
    1,
    2
  ),
  (
    11,
    'question',
    'text',
    'Event loop in JavaScript',
    '**Question:** What is the event loop in JavaScript? Explain how `setTimeout`, `Promise`, and `microtasks` interact.',
    1,
    3
  ),
  (
    12,
    'task',
    'js',
    'Implement debounce',
    '**Task:** Implement a debounce function that delays invoking a function until after `wait` milliseconds have elapsed since the last time it was called.

**Example:**
```javascript
function debounce(func, wait) {
  // Your code here
}
```',
    1,
    3
  ),
  (
    13,
    'question',
    'js',
    'Event loop execution order',
    '**Question:** What will the following code output? Explain the order of execution.

```javascript
console.log(''Start'');
setTimeout(() => console.log(''Timeout''), 0);
Promise.resolve().then(() => console.log(''Promise''));
console.log(''End'');
```',
    1,
    3
  ),
  (
    14,
    'question',
    'text',
    'Generators in JavaScript',
    '**Question:** What are generators in JavaScript? Explain how `function*` and `yield` work.',
    1,
    3
  ),
  (
    15,
    'task',
    'js',
    'Generator for number range',
    '**Task:** Write a generator function `range` that yields numbers from `start` to `end` (inclusive).

**Example:**
```javascript
function* range(start, end) {
  // Your code here
}
const gen = range(1, 3);
console.log([...gen]); // => [1, 2, 3]
```',
    1,
    3
  ),
  (
    16,
    'question',
    'text',
    'interface vs type in TypeScript',
    '**Question:** What is the difference between `interface` and `type` in TypeScript?',
    2,
    1
  ),
  (
    17,
    'task',
    'ts',
    'Define a User interface',
    '**Task:** Define a TypeScript interface `User` with properties `id` (number) and `name` (string). Create an object of type `User`.',
    2,
    1
  ),
  (
    18,
    'question',
    'ts',
    'TypeScript union type error',
    '**Question:** What will the following TypeScript code output?

```typescript
type MyType = ''A'' | ''B'' | ''C'';
const value: MyType = ''D''; // Error?
```',
    2,
    1
  ),
  (
    19,
    'question',
    'text',
    'Union types in TypeScript',
    '**Question:** What are union types in TypeScript? Provide an example.',
    2,
    1
  ),
  (
    20,
    'task',
    'ts',
    'Handle string or number input',
    '**Task:** Write a TypeScript function that accepts a union type `string | number` and returns its length (for strings) or value (for numbers).

**Example:**
```typescript
function getLengthOrValue(input: string | number): number {
  // Your code here
}
```',
    2,
    1
  ),
  (
    21,
    'question',
    'text',
    'TypeScript generics',
    '**Question:** What are TypeScript generics? Explain with an example.',
    2,
    2
  ),
  (
    22,
    'task',
    'ts',
    'Generic identity function',
    '**Task:** Implement a generic function `identity` that returns its input.

**Example:**
```typescript
function identity<T>(arg: T): T {
  return arg;
}
```',
    2,
    2
  ),
  (
    23,
    'question',
    'ts',
    'TypeScript intersection types',
    '**Question:** What will the following TypeScript code output?

```typescript
type A = { a: number };
type B = { b: string };
type C = A & B;
const obj: C = { a: 1, b: ''hello'' };
console.log(obj.a, obj.b);
```',
    2,
    2
  ),
  (
    24,
    'question',
    'text',
    'TypeScript utility types',
    '**Question:** What are TypeScript utility types? Provide examples of `Partial`, `Pick`, and `Omit`.',
    2,
    2
  ),
  (
    25,
    'task',
    'ts',
    'Nullable type in TypeScript',
    '**Task:** Create a TypeScript type `Nullable<T>` that makes all properties of `T` nullable.

**Example:**
```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```',
    2,
    2
  ),
  (
    26,
    'question',
    'text',
    'TypeScript decorators',
    '**Question:** What are TypeScript decorators? Explain how they work with classes and methods.',
    2,
    3
  ),
  (
    27,
    'task',
    'ts',
    'Logging decorator',
    '**Task:** Write a TypeScript decorator `@log` that logs the arguments and return value of a method.

**Example:**
```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // Your code here
}
```',
    2,
    3
  ),
  (
    28,
    'question',
    'ts',
    'Deep readonly type',
    '**Question:** What will the following TypeScript code output?

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface Nested {
  a: { b: number };
}

type ReadonlyNested = DeepReadonly<Nested>;
const obj: ReadonlyNested = { a: { b: 1 } };
obj.a.b = 2; // Error?
```',
    2,
    3
  ),
  (
    29,
    'question',
    'text',
    'Declaration merging',
    '**Question:** What is declaration merging in TypeScript? Provide an example with interfaces.',
    2,
    3
  ),
  (
    30,
    'task',
    'ts',
    'Extend global Window',
    '**Task:** Extend the global `Window` interface to add a custom property `myApp` of type `{ version: string }`.

**Example:**
```typescript
declare global {
  interface Window {
    myApp: { version: string };
  }
}
```',
    2,
    3
  ),
  (
    31,
    'question',
    'text',
    'DOM vs HTML',
    '**Question:** What is the DOM? Explain the difference between the DOM and HTML.',
    3,
    1
  ),
  (
    32,
    'task',
    'js',
    'Select and modify element',
    '**Task:** Select the element with ID `myElement` and change its text content to `"Hello, World!"`.

**Example:**
```javascript
// Your code here
```',
    3,
    1
  ),
  (
    33,
    'question',
    'js',
    'DOM element creation output',
    '**Question:** What will the following code output?

```javascript
const div = document.createElement(''div'');
div.id = ''test'';
document.body.appendChild(div);
console.log(document.getElementById(''test''));
```',
    3,
    1
  ),
  (
    34,
    'question',
    'text',
    'innerHTML vs textContent',
    '**Question:** What is the difference between `innerHTML` and `textContent`?',
    3,
    1
  ),
  (
    35,
    'task',
    'html',
    'Create and append a button',
    '**Task:** Create a new `<button>` element with the text `"Click Me"` and append it to the `<body>`.

**Example:**
```javascript
// Your code here
```',
    3,
    1
  ),
  (
    36,
    'question',
    'text',
    'Event delegation',
    '**Question:** What is event delegation? Explain how it improves performance.',
    3,
    2
  ),
  (
    37,
    'task',
    'js',
    'Implement event delegation',
    '**Task:** Implement event delegation for a list of buttons inside a `<div id="buttonContainer">`. Log the clicked button’s text.

**Example:**
```javascript
document.getElementById(''buttonContainer'').addEventListener(''click'', (e) => {
  // Your code here
});
```',
    3,
    2
  ),
  (
    38,
    'question',
    'js',
    'Event bubbling output',
    '**Question:** What will the following code output?

```javascript
const div = document.querySelector(''div'');
div.addEventListener(''click'', () => console.log(''Div''));
div.children[0].addEventListener(''click'', () => console.log(''Child''));
// User clicks the child element
```',
    3,
    2
  ),
  (
    39,
    'question',
    'text',
    'addEventListener vs onclick',
    '**Question:** What is the difference between `addEventListener` and `onclick`?',
    3,
    2
  ),
  (
    40,
    'task',
    'js',
    'Toggle class on click',
    '**Task:** Write a function to toggle the class `active` on an element with ID `myElement` when clicked.

**Example:**
```javascript
document.getElementById(''myElement'').addEventListener(''click'', () => {
  // Your code here
});
```',
    3,
    2
  ),
  (
    41,
    'question',
    'text',
    'Shadow DOM',
    '**Question:** What is the Shadow DOM? Explain its use cases.',
    3,
    3
  ),
  (
    42,
    'task',
    'html',
    'Custom element with Shadow DOM',
    '**Task:** Create a custom element `<hello-world>` with a Shadow DOM that displays `"Hello, World!"` in a `<p>` tag.

**Example:**
```javascript
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    // Your code here
  }
}
customElements.define(''hello-world'', HelloWorld);
```',
    3,
    3
  ),
  (
    43,
    'question',
    'js',
    'Template content output',
    '**Question:** What will the following code output?

```javascript
const template = document.createElement(''template'');
template.innerHTML = ''<div>Template</div>'';
const content = template.content.cloneNode(true);
console.log(content.querySelector(''div'').textContent);
```',
    3,
    3
  ),
  (
    44,
    'question',
    'text',
    'Web Components',
    '**Question:** What are Web Components? Explain the role of `CustomElementRegistry` and `ShadowRoot`.',
    3,
    3
  ),
  (
    45,
    'task',
    'html',
    'Counter Web Component',
    '**Task:** Create a Web Component `<counter-element>` with a button that increments a counter displayed in a `<span>`.

**Example:**
```javascript
class CounterElement extends HTMLElement {
  // Your code here
}
customElements.define(''counter-element'', CounterElement);
```',
    3,
    3
  ),
  (
    46,
    'question',
    'text',
    'setTimeout vs setInterval',
    '**Question:** What is the difference between `setTimeout` and `setInterval`?',
    4,
    1
  ),
  (
    47,
    'task',
    'js',
    'Print numbers with delay',
    '**Task:** Write a function that uses `setTimeout` to print numbers 1 to 5 with a 1-second delay between each.

**Example:**
```javascript
function printNumbers() {
  // Your code here
}
```',
    4,
    1
  ),
  (
    48,
    'question',
    'js',
    'setTimeout zero delay output',
    '**Question:** What will the following code output?

```javascript
console.log(''Start'');
setTimeout(() => console.log(''Timeout''), 0);
console.log(''End'');
```',
    4,
    1
  ),
  (
    49,
    'question',
    'text',
    'Callback functions',
    '**Question:** What is a callback function? Provide an example.',
    4,
    1
  ),
  (
    50,
    'task',
    'js',
    'Simulate data fetching',
    '**Task:** Write a function `fetchData` that takes a callback and simulates fetching data after 1 second.

**Example:**
```javascript
function fetchData(callback) {
  // Your code here
}
```',
    4,
    1
  ),
  (
    51,
    'question',
    'text',
    'Promises in JavaScript',
    '**Question:** What are Promises in JavaScript? Explain the states (`pending`, `fulfilled`, `rejected`).',
    4,
    2
  ),
  (
    52,
    'task',
    'js',
    'Convert callback to Promise',
    '**Task:** Rewrite the following callback-based function to use Promises:

```javascript
function fetchData(callback) {
  setTimeout(() => callback(null, { data: ''Hello'' }), 1000);
}
```',
    4,
    2
  ),
  (
    53,
    'question',
    'js',
    'Promise error handling',
    '**Question:** What will the following code output?

```javascript
Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { throw new Error(''Oops!'') })
  .catch(e => console.log(e.message))
  .then(() => console.log(''Done''));
```',
    4,
    2
  ),
  (
    54,
    'question',
    'text',
    'Promise.all vs Promise.race',
    '**Question:** What is `Promise.all`? Explain how it differs from `Promise.race`.',
    4,
    2
  ),
  (
    55,
    'task',
    'js',
    'Parallel data fetching',
    '**Task:** Use `Promise.all` to fetch data from two URLs in parallel and log the combined results.

**Example:**
```javascript
const urls = [''https://api.example.com/data1'', ''https://api.example.com/data2''];
// Your code here
```',
    4,
    2
  ),
  (
    56,
    'question',
    'text',
    'Async/await in JavaScript',
    '**Question:** What are async/await? How do they relate to Promises?',
    4,
    3
  ),
  (
    57,
    'task',
    'js',
    'Convert Promise to async/await',
    '**Task:** Rewrite the following Promise chain using `async/await`:

```javascript
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```',
    4,
    3
  ),
  (
    58,
    'question',
    'js',
    'Async/await output',
    '**Question:** What will the following code output?

```javascript
async function foo() {
  console.log(await Promise.resolve(''A''));
  console.log(await ''B'');
  return ''C'';
}
foo().then(console.log);
```',
    4,
    3
  ),
  (
    59,
    'question',
    'text',
    'Event loop microtasks/macrotasks',
    '**Question:** What is the event loop in JavaScript? Explain how `microtasks` and `macrotasks` are processed.',
    4,
    3
  ),
  (
    60,
    'task',
    'js',
    'Retry failed API call',
    '**Task:** Write an async function that retries a failed API call up to 3 times with a 1-second delay between retries.

**Example:**
```javascript
async function fetchWithRetry(url, retries = 3) {
  // Your code here
}
```',
    4,
    3
  ),
  (
    61,
    'question',
    'text',
    'map vs forEach',
    '**Question:** What is the difference between `map` and `forEach` in JavaScript? Provide examples.',
    5,
    1
  ),
  (
    62,
    'task',
    'js',
    'Double array elements',
    '**Task:** Use `map` to double each number in the array `[1, 2, 3]`.

**Example:**
```javascript
const numbers = [1, 2, 3];
// Your code here
```',
    5,
    1
  ),
  (
    63,
    'question',
    'js',
    'map output',
    '**Question:** What will the following code output?

```javascript
const arr = [1, 2, 3];
const doubled = arr.map(x => x * 2);
console.log(doubled);
```',
    5,
    1
  ),
  (
    64,
    'question',
    'text',
    'filter vs find',
    '**Question:** What is the difference between `filter` and `find` in JavaScript?',
    5,
    1
  ),
  (
    65,
    'task',
    'js',
    'Filter even numbers',
    '**Task:** Use `filter` to return only even numbers from the array `[1, 2, 3, 4]`.

**Example:**
```javascript
const numbers = [1, 2, 3, 4];
// Your code here
```',
    5,
    1
  ),
  (
    66,
    'question',
    'text',
    'reduce method',
    '**Question:** What is the `reduce` method in JavaScript? Provide an example.',
    5,
    2
  ),
  (
    67,
    'task',
    'js',
    'Sum array with reduce',
    '**Task:** Use `reduce` to calculate the sum of the array `[1, 2, 3, 4]`.

**Example:**
```javascript
const numbers = [1, 2, 3, 4];
// Your code here
```',
    5,
    2
  ),
  (
    68,
    'question',
    'js',
    'reduce output',
    '**Question:** What will the following code output?

```javascript
const arr = [1, 2, 3];
const sum = arr.reduce((acc, x) => acc + x, 0);
console.log(sum);
```',
    5,
    2
  ),
  (
    69,
    'question',
    'text',
    'Shallow vs deep copy',
    '**Question:** What is the difference between shallow and deep copying of objects?',
    5,
    2
  ),
  (
    70,
    'task',
    'js',
    'Deep clone function',
    '**Task:** Write a function `deepClone` that creates a deep copy of an object.

**Example:**
```javascript
function deepClone(obj) {
  // Your code here
}
```',
    5,
    2
  ),
  (
    71,
    'question',
    'text',
    'Sorting time complexity',
    '**Question:** What is the time complexity of sorting an array in JavaScript? Explain how `Array.prototype.sort` works.',
    5,
    3
  ),
  (
    72,
    'task',
    'js',
    'Custom sort function',
    '**Task:** Implement a custom `mySort` function that sorts an array of numbers in ascending order.

**Example:**
```javascript
function mySort(arr) {
  // Your code here
}
```',
    5,
    3
  ),
  (
    73,
    'question',
    'js',
    'Array sort output',
    '**Question:** What will the following code output?

```javascript
const arr = [3, 1, 4, 2];
arr.sort((a, b) => a - b);
console.log(arr);
```',
    5,
    3
  ),
  (
    74,
    'question',
    'text',
    'Iterators and iterables',
    '**Question:** What are iterators and iterables in JavaScript? Provide an example of a custom iterable.',
    5,
    3
  ),
  (
    75,
    'task',
    'js',
    'Custom iterable object',
    '**Task:** Create a custom iterable object that yields values from 1 to `n`.

**Example:**
```javascript
const iterable = {
  [Symbol.iterator]: function*() {
    // Your code here
  }
};
```',
    5,
    3
  ),
  (
    76,
    'question',
    'text',
    'Binary search time complexity',
    '**Question:** What is the time complexity of the binary search algorithm?',
    7,
    1
  ),
  (
    77,
    'task',
    'js',
    'Implement binary search',
    '**Task:** Implement binary search on a sorted array.

**Example:**
```javascript
function binarySearch(arr, target) {
  // Your code here
}
```',
    7,
    1
  ),
  (
    78,
    'question',
    'js',
    'Palindrome check output',
    '**Question:** What will the following code output?

```javascript
function isPalindrome(str) {
  return str === str.split('''').reverse().join('''');
}
console.log(isPalindrome(''racecar''));
```',
    7,
    1
  ),
  (
    79,
    'question',
    'text',
    'Fibonacci sequence',
    '**Question:** What is the Fibonacci sequence? Write a recursive function to calculate the nth Fibonacci number.',
    7,
    1
  ),
  (
    80,
    'task',
    'js',
    'Check for anagrams',
    '**Task:** Write a function to check if a string is an anagram of another string.

**Example:**
```javascript
function areAnagrams(str1, str2) {
  // Your code here
}
```',
    7,
    1
  ),
  (
    81,
    'question',
    'text',
    'Linked list basics',
    '**Question:** What is a linked list? Explain its advantages over arrays.',
    7,
    2
  ),
  (
    82,
    'task',
    'js',
    'Implement a linked list',
    '**Task:** Implement a linked list with methods `append`, `prepend`, and `toArray`.

**Example:**
```javascript
class LinkedList {
  constructor() {
    this.head = null;
  }
  // Your code here
}
```',
    7,
    2
  ),
  (
    83,
    'question',
    'text',
    'Bubble sort time complexity',
    '**Question:** What is the time complexity of bubble sort? Explain how it works.',
    7,
    2
  ),
  (
    84,
    'task',
    'js',
    'Implement bubble sort',
    '**Task:** Implement bubble sort for an array of numbers.

**Example:**
```javascript
function bubbleSort(arr) {
  // Your code here
}
```',
    7,
    2
  ),
  (
    85,
    'question',
    'text',
    'Binary tree traversals',
    '**Question:** What is a binary tree? Explain in-order, pre-order, and post-order traversal.',
    7,
    2
  ),
  (
    86,
    'question',
    'text',
    'Dynamic programming basics',
    '**Question:** What is dynamic programming? Explain with the Fibonacci sequence example.',
    7,
    3
  ),
  (
    87,
    'task',
    'js',
    'Memoized Fibonacci',
    '**Task:** Implement a memoized version of the Fibonacci function.

**Example:**
```javascript
function fib(n, memo = {}) {
  // Your code here
}
```',
    7,
    3
  ),
  (
    88,
    'question',
    'text',
    'Dijkstra’s algorithm time complexity',
    '**Question:** What is the time complexity of Dijkstra’s algorithm?',
    7,
    3
  ),
  (
    89,
    'task',
    'js',
    'Implement Dijkstra’s algorithm',
    '**Task:** Implement Dijkstra’s algorithm to find the shortest path in a weighted graph.

**Example Graph:**
```javascript
const graph = {
  ''A'': { ''B'': 1, ''C'': 4 },
  ''B'': { ''A'': 1, ''C'': 2, ''D'': 5 },
  ''C'': { ''A'': 4, ''B'': 2, ''D'': 1 },
  ''D'': { ''B'': 5, ''C'': 1 }
};
```

**Example Solution:**
```javascript
function dijkstra(graph, start) {
  // Your code here
}
```',
    7,
    3
  ),
  (
    90,
    'question',
    'text',
    'Knapsack Problem',
    '**Question:** What is the Knapsack Problem? Explain the dynamic programming approach to solve it.',
    7,
    3
  ),
  (
    91,
    'question',
    'text',
    'Unit testing basics',
    '**Question:** What is unit testing? Explain the AAA pattern (Arrange, Act, Assert).',
    8,
    1
  ),
  (
    92,
    'task',
    'js',
    'Unit test for sum function',
    '**Task:** Write a unit test for a function that adds two numbers using Jest.

**Example:**
```javascript
test(''adds 1 + 2 to equal 3'', () => {
  // Your code here
});
```',
    8,
    1
  ),
  (
    93,
    'question',
    'text',
    'Test coverage',
    '**Question:** What is test coverage? How do you measure it?',
    8,
    1
  ),
  (
    94,
    'task',
    'js',
    'Test palindrome function',
    '**Task:** Write a test for a function that checks if a string is a palindrome.

**Example:**
```javascript
function isPalindrome(str) {
  return str === str.split('''').reverse().join('''');
}
```',
    8,
    1
  ),
  (
    95,
    'question',
    'text',
    'Unit vs integration testing',
    '**Question:** What is the difference between unit testing and integration testing?',
    8,
    1
  ),
  (
    96,
    'question',
    'text',
    'Mocking in testing',
    '**Question:** What is mocking in testing? Explain the difference between stubs and spies.',
    8,
    2
  ),
  (
    97,
    'task',
    'js',
    'Mock a Promise function',
    '**Task:** Mock a function `fetchData` that returns a Promise resolving to `{ data: ''test'' }` using Jest.

**Example:**
```javascript
jest.mock(''./api'', () => ({
  fetchData: jest.fn()
}));
```',
    8,
    2
  ),
  (
    98,
    'question',
    'text',
    'Snapshot testing',
    '**Question:** What is snapshot testing? When would you use it?',
    8,
    2
  ),
  (
    99,
    'task',
    'js',
    'Snapshot test for React',
    '**Task:** Write a snapshot test for a React component.

**Example:**
```javascript
import renderer from ''react-test-renderer'';
test(''renders correctly'', () => {
  const tree = renderer.create(<MyComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
```',
    8,
    2
  ),
  (
    100,
    'question',
    'text',
    'Test-Driven Development',
    '**Question:** What is Test-Driven Development (TDD)? Explain the red-green-refactor cycle.',
    8,
    2
  ),
  (
    101,
    'question',
    'text',
    'Property-based testing',
    '**Question:** What is property-based testing? How does it differ from example-based testing?',
    8,
    3
  ),
  (
    102,
    'task',
    'js',
    'Property-based test for even numbers',
    '**Task:** Use `fast-check` to write a property-based test for a function that checks if a number is even.

**Example:**
```javascript
import { check } from ''fast-check'';
check(
  // Your code here
);
```',
    8,
    3
  ),
  (
    103,
    'question',
    'text',
    'Testing async code',
    '**Question:** What are the challenges of testing asynchronous code? How do you handle them?',
    8,
    3
  ),
  (
    104,
    'task',
    'js',
    'Test async API fetch',
    '**Task:** Write a test for an async function that fetches data from an API and handles errors.

**Example:**
```javascript
test(''fetches data'', async () => {
  // Your code here
});
```',
    8,
    3
  ),
  (
    105,
    'question',
    'text',
    'End-to-end testing',
    '**Question:** What is end-to-end testing? How does it differ from unit and integration testing?',
    8,
    3
  ),
  (
    106,
    'question',
    'text',
    'Fetch API vs XMLHttpRequest',
    '**Question:** What is the Fetch API? How does it differ from XMLHttpRequest?',
    9,
    1
  ),
  (
    107,
    'task',
    'js',
    'Fetch data with Fetch API',
    '**Task:** Use the Fetch API to GET data from `https://jsonplaceholder.typicode.com/posts/1` and log the response.

**Example:**
```javascript
fetch(''https://jsonplaceholder.typicode.com/posts/1'')
  .then(response => response.json())
  .then(data => console.log(data));
```',
    9,
    1
  ),
  (
    108,
    'question',
    'js',
    'Fetch API output',
    '**Question:** What will the following code output?

```javascript
fetch(''https://jsonplaceholder.typicode.com/posts/1'')
  .then(response => response.json())
  .then(data => console.log(data.id));
```',
    9,
    1
  ),
  (
    109,
    'question',
    'text',
    'localStorage vs sessionStorage',
    '**Question:** What is localStorage? How does it differ from sessionStorage?',
    9,
    1
  ),
  (
    110,
    'task',
    'js',
    'Save to localStorage',
    '**Task:** Save the object `{ name: ''Alice'' }` to `localStorage` under the key `user` and retrieve it.

**Example:**
```javascript
// Your code here
```',
    9,
    1
  ),
  (
    111,
    'question',
    'text',
    'WebSockets vs HTTP',
    '**Question:** What are WebSockets? How do they differ from HTTP?',
    9,
    2
  ),
  (
    112,
    'task',
    'js',
    'WebSocket connection',
    '**Task:** Create a WebSocket connection to `wss://echo.websocket.org` and send/receive the message `"Hello"`.

**Example:**
```javascript
const socket = new WebSocket(''wss://echo.websocket.org'');
socket.onmessage = (event) => console.log(event.data);
// Your code here
```',
    9,
    2
  ),
  (
    113,
    'question',
    'text',
    'Service Worker API',
    '**Question:** What is the Service Worker API? Explain its lifecycle.',
    9,
    2
  ),
  (
    114,
    'task',
    'js',
    'Register a service worker',
    '**Task:** Register a service worker and log a message when it’s installed.

**Example:**
```javascript
if (''serviceWorker'' in navigator) {
  navigator.serviceWorker.register(''/sw.js'').then(
    registration => console.log(''ServiceWorker registered'')
  );
}
```',
    9,
    2
  ),
  (
    115,
    'question',
    'text',
    'Geolocation API',
    '**Question:** What is the Geolocation API? How do you handle errors in geolocation?',
    9,
    2
  ),
  (
    116,
    'question',
    'text',
    'WebAssembly basics',
    '**Question:** What is WebAssembly? How does it interact with JavaScript?',
    9,
    3
  ),
  (
    117,
    'task',
    'js',
    'Load WebAssembly module',
    '**Task:** Load a WebAssembly module that exports a function `add(a, b)` and call it from JavaScript.

**Example (WASM):**
```wat
(module
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add)
  (export "add" (func $add))
)
```

**Example (JS):**
```javascript
WebAssembly.instantiateStreaming(fetch(''add.wasm''))
  .then(obj => {
    const add = obj.instance.exports.add;
    console.log(add(2, 3)); // Should log 5
  });
```',
    9,
    3
  ),
  (
    118,
    'question',
    'text',
    'Web Crypto API',
    '**Question:** What is the Web Crypto API? Provide an example of generating a random UUID.',
    9,
    3
  ),
  (
    119,
    'task',
    'js',
    'Measure function time',
    '**Task:** Use the Performance API to measure the execution time of a function.

**Example:**
```javascript
function measureTime(fn) {
  const start = performance.now();
  fn();
  const end = performance.now();
  return end - start;
}
```',
    9,
    3
  ),
  (
    120,
    'question',
    'text',
    'Intersection Observer API',
    '**Question:** What is the Intersection Observer API? Provide an example use case.',
    9,
    3
  ),
  (
    121,
    'question',
    'text',
    'Promise.all vs Promise.allSettled',
    '**Question:** What is the difference between `Promise.all` and `Promise.allSettled`?',
    4,
    3
  ),
  (
    122,
    'task',
    'js',
    'Handle multiple promises',
    '**Task:** Use `Promise.allSettled` to handle multiple promises and log their statuses (fulfilled/rejected).

**Example:**
```javascript
const promises = [
  Promise.resolve(1),
  Promise.reject(''Error''),
  Promise.resolve(3)
];
Promise.allSettled(promises).then(results => {
  // Your code here
});
```',
    4,
    3
  ),
  (
    123,
    'question',
    'text',
    'AbortController API',
    '**Question:** What is the `AbortController` API? How does it help with canceling fetch requests?',
    4,
    3
  ),
  (
    124,
    'task',
    'js',
    'Cancel fetch request',
    '**Task:** Use `AbortController` to cancel a `fetch` request after 2 seconds.

**Example:**
```javascript
const controller = new AbortController();
const { signal } = controller;
setTimeout(() => controller.abort(), 2000);
fetch(''https://api.example.com/data'', { signal })
  .then(...)
  .catch(err => {
    if (err.name === ''AbortError'') {
      console.log(''Fetch aborted'');
    }
  });
```',
    4,
    3
  ),
  (
    125,
    'question',
    'text',
    'Microtasks and macrotasks',
    '**Question:** What are microtasks and macrotasks in the event loop? Provide examples of each.',
    4,
    3
  ),
  (
    126,
    'question',
    'text',
    'forEach vs map',
    '**Question:** What is the difference between `Array.prototype.forEach` and `Array.prototype.map`?',
    5,
    3
  ),
  (
    127,
    'task',
    'js',
    'Custom map function',
    '**Task:** Implement a custom `myMap` function that mimics `Array.prototype.map`.

**Example:**
```javascript
Array.prototype.myMap = function(callback) {
  // Your code here
};
```',
    5,
    3
  ),
  (
    128,
    'question',
    'text',
    'Time complexity of array operations',
    '**Question:** What is the time complexity of the following operations in JavaScript: `Array.push`, `Array.unshift`, `Array.splice`?',
    5,
    3
  ),
  (
    129,
    'task',
    'js',
    'Flatten nested array',
    '**Task:** Write a function to flatten a nested array using recursion.

**Example:**
```javascript
function flatten(arr) {
  // Your code here
}
flatten([1, [2, [3, 4], 5]]); // => [1, 2, 3, 4, 5]
```',
    5,
    3
  ),
  (
    130,
    'question',
    'text',
    'Typed arrays in JavaScript',
    '**Question:** What are typed arrays in JavaScript? Provide an example of creating a `Uint8Array`.',
    5,
    3
  ),
  (
    131,
    'question',
    'text',
    'Knapsack Problem NP-Hard',
    '**Question:** What is the Knapsack Problem? Why is it classified as NP-Hard?',
    7,
    3
  ),
  (
    132,
    'task',
    'js',
    'Traveling Salesman heuristic',
    '**Task:** Implement a heuristic solution for the Traveling Salesman Problem (e.g., Nearest Neighbor).

**Example Input:**
```javascript
const cities = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 3, y: 1 },
  { x: 2, y: 3 }
];
```

**Example Solution:**
```javascript
function travelingSalesman(cities) {
  // Your code here
}
```',
    7,
    3
  ),
  (
    133,
    'question',
    'text',
    'Dijkstra’s algorithm explained',
    '**Question:** What is Dijkstra’s algorithm? Explain how it works and its time complexity.',
    7,
    3
  ),
  (
    134,
    'task',
    'js',
    'Implement A* algorithm',
    '**Task:** Implement the A* search algorithm for pathfinding in a grid.

**Example:**
```javascript
function aStar(grid, start, end) {
  // Your code here
}
```',
    7,
    3
  ),
  (
    135,
    'question',
    'text',
    'Trie data structure',
    '**Question:** What is a trie data structure? Explain its use cases and time complexity.',
    7,
    3
  ),
  (
    136,
    'question',
    'text',
    'Arrow functions vs regular functions',
    '**Question:** What are the key differences between arrow functions and regular functions in JavaScript? Provide examples.',
    6,
    1
  ),
  (
    137,
    'task',
    'js',
    'Template literals usage',
    '**Task:** Use template literals to create a string that includes the variables `name` and `age`:

```javascript
const name = ''Alice'';
const age = 25;
// Your code here
```',
    6,
    1
  ),
  (
    138,
    'question',
    'text',
    'Default parameters in functions',
    '**Question:** What is the purpose of default parameters in ES6? How do they improve function definitions?',
    6,
    1
  ),
  (
    139,
    'question',
    'text',
    'Rest and spread operators',
    '**Question:** Explain the difference between the rest operator and the spread operator in ES6. Provide examples for both.',
    6,
    1
  ),
  (
    140,
    'task',
    'js',
    'Destructuring assignment',
    '**Task:** Use object destructuring to extract `title` and `author` from the following object:

```javascript
const book = { title: ''ES6 Guide'', author: ''John Doe'', year: 2020 };
```',
    6,
    1
  ),
  (
    141,
    'question',
    'text',
    'Classes and inheritance',
    '**Question:** How do ES6 classes differ from constructor functions in ES5? Explain the concept of inheritance in ES6 classes.',
    6,
    2
  ),
  (
    142,
    'question',
    'text',
    'Modules in ES6',
    '**Question:** What are ES6 modules? How do `import` and `export` work, and what are the benefits of using modules?',
    6,
    2
  ),
  (
    143,
    'question',
    'text',
    'Promises and async/await',
    '**Question:** What are Promises in ES6, and how do they help with asynchronous operations? Explain how `async/await` simplifies working with Promises.',
    6,
    2
  ),
  (
    144,
    'task',
    'js',
    'Generators and iterators',
    '**Task:** Write a generator function `range` that yields numbers from `start` to `end` (inclusive).

**Example:**
```javascript
function* range(start, end) {
  // Your code here
}
```',
    6,
    2
  ),
  (
    145,
    'question',
    'text',
    'Symbols in ES6',
    '**Question:** What are Symbols in ES6? How are they used, and what makes them unique compared to other primitive types?',
    6,
    2
  ),
  (
    146,
    'question',
    'text',
    'Proxies and reflection',
    '**Question:** What are Proxies in ES6? Explain how they enable meta-programming and provide an example of using the `Reflect` API.',
    6,
    3
  ),
  (
    147,
    'question',
    'text',
    'WeakMap and WeakSet',
    '**Question:** What are `WeakMap` and `WeakSet` in ES6? How do they differ from `Map` and `Set`, and what are their use cases?',
    6,
    3
  ),
  (
    148,
    'question',
    'text',
    'Iterator and iterable protocols',
    '**Question:** What are the iterator and iterable protocols in ES6? How do they enable custom iteration behavior in objects?',
    6,
    3
  ),
  (
    149,
    'question',
    'text',
    'ES6 modules in browsers',
    '**Question:** How do ES6 modules work in browsers? Explain the difference between static and dynamic imports.',
    6,
    3
  ),
  (
    150,
    'question',
    'text',
    'Private class fields',
    '**Question:** What are private class fields in ES6? How do they improve encapsulation in JavaScript classes?',
    6,
    3
  );
ALTER SEQUENCE users_id_seq RESTART WITH 2;
ALTER SEQUENCE task_categories_id_seq RESTART WITH 10;
ALTER SEQUENCE task_difficulties_id_seq RESTART WITH 4;
ALTER SEQUENCE tasks_id_seq RESTART WITH 151;