//created an object to hold the quiz questions and answers for all three categories, just used some generated questions as placeholders!! replace with your own questions and answers for each category and add more (Im thinking 15 per category!) you have been assigned but follow the same format as the example below

const quizObject = {
  categoryArray: [
    {
      categoryName: "HTML",
      questionArray: [
        {
          questionText: "What does HTML stand for?",
          answers: [
            { answerText: "Hyper Trainer Marking Language", isCorrect: false },
            { answerText: "Hyper Text Markup Language", isCorrect: true },
            {
              answerText: "Hyperlinks and Text Markup Language",
              isCorrect: false,
            },
            { answerText: "Home Tool Markup Language", isCorrect: false },
          ],
        },
        {
          questionText:
            "Which HTML element represents the root of an HTML document?",
          answers: [
            { answerText: "<root>", isCorrect: false },
            { answerText: "<base>", isCorrect: false },
            { answerText: "<html>", isCorrect: true },
            { answerText: "<head>", isCorrect: false },
          ],
        },
        {
          questionText:
            "Which element is used to specify a footer for a document or section?",
          answers: [
            { answerText: "<bottom>", isCorrect: false },
            { answerText: "<footer>", isCorrect: true },
            { answerText: "<section>", isCorrect: false },
            { answerText: "<div>", isCorrect: false },
          ],
        },
      ],
    },
    {
      categoryName: "CSS",
      questionArray: [
        {
          questionText: "What does CSS stand for?",
          answers: [
            { answerText: "Colorful Style Sheets", isCorrect: false },
            { answerText: "Creative Style Sheets", isCorrect: false },
            { answerText: "Computer Style Sheets", isCorrect: false },
            { answerText: "Cascading Style Sheets", isCorrect: true },
          ],
        },
        {
          questionText:
            "Which property is used to change the font of an element?",
          answers: [
            { answerText: "font-type", isCorrect: false },
            { answerText: "font-family", isCorrect: true },
            { answerText: "font-weight", isCorrect: false },
            { answerText: "text-style", isCorrect: false },
          ],
        },
        {
          questionText: "How do you select an element with the id 'demo'?",
          answers: [
            { answerText: ".demo", isCorrect: false },
            { answerText: "#demo", isCorrect: true },
            { answerText: "*demo", isCorrect: false },
            { answerText: "demo", isCorrect: false },
          ],
        },
      ],
    },
    {
      categoryName: "JavaScript",
      questionArray: [
        {
          questionText: "Which symbol is used for comments in JavaScript?",
          answers: [
            { answerText: "//", isCorrect: true },
            { answerText: "/* */", isCorrect: false },
            { answerText: "<!-- -->", isCorrect: false },
            { answerText: "#", isCorrect: false },
          ],
        },
        {
          questionText:
            "Which method is used to write messages in the console?",
          answers: [
            { answerText: "console.write()", isCorrect: false },
            { answerText: "console.log()", isCorrect: true },
            { answerText: "console.output()", isCorrect: false },
            { answerText: "console.print()", isCorrect: false },
          ],
        },
        {
          questionText: "Which of the following is a JavaScript data type?",
          answers: [
            { answerText: "Number", isCorrect: true },
            { answerText: "Element", isCorrect: false },
            { answerText: "Tag", isCorrect: false },
            { answerText: "Link", isCorrect: false },
          ],
        },
      ],
    },
  ],
};

console.log("Quiz Object:", quizObject);

export default quizObject;
