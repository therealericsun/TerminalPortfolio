// Fortune cookie style quotes for programmers

const fortunes = [
    "The best way to predict the future is to implement it.",
    "Code is like humor. When you have to explain it, it's bad.",
    "Programming isn't about what you know; it's about what you can figure out.",
    "The most disastrous thing that you can ever learn is your first programming language.",
    "First, solve the problem. Then, write the code.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Experience is the name everyone gives to their mistakes.",
    "In order to be irreplaceable, one must always be different.",
    "Java is to JavaScript what car is to carpet.",
    "It's not a bug – it's an undocumented feature.",
    "Before software can be reusable it first has to be usable.",
    "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.",
    "The computer was born to solve problems that did not exist before.",
    "Talk is cheap. Show me the code.",
    "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.",
    "Walking on water and developing software from a specification are easy if both are frozen.",
    "Debugging is twice as hard as writing the code in the first place.",
    "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
    "There are only two hard things in Computer Science: cache invalidation and naming things.",
    "The only way to learn a new programming language is by writing programs in it.",
    "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
    "Nine people can't make a baby in a month.",
    "Real programmers count from 0.",
    "There are 10 types of people in the world: those who understand binary and those who don't.",
    "It works on my machine.",
    "Deleted code is debugged code.",
    "If debugging is the process of removing bugs, then programming must be the process of putting them in.",
    "Documentation is like sex: when it is good, it is very good; and when it is bad, it is better than nothing.",
    "Some people, when confronted with a problem, think 'I know, I'll use regular expressions.' Now they have two problems.",
    "The question of whether computers can think is like the question of whether submarines can swim."
];

export function getFortune(): string {
    const index = Math.floor(Math.random() * fortunes.length);
    return fortunes[index];
}
