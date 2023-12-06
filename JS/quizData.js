// created an object to hold the quiz questions and answers for all three categories, just used some generated questions as placeholders!! replace with your own questions and answers for each category and add more (I'm thinking 15 per category!) you have been assigned but follow the same format as the example below

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
                        { answerText: "Hyperlinks and Text Markup Language", isCorrect: false },
                        { answerText: "Home Tool Markup Language", isCorrect: false }
                    ]
                },
                {
                    questionText: "Which HTML element represents the root of an HTML document?",
                    answers: [
                        { answerText: "<root>", isCorrect: false },
                        { answerText: "<base>", isCorrect: false },
                        { answerText: "<html>", isCorrect: true },
                        { answerText: "<head>", isCorrect: false }
                    ]
                },
                {
                    questionText: "Which element is used to specify a footer for a document or section?",
                    answers: [
                        { answerText: "<bottom>", isCorrect: false },
                        { answerText: "<footer>", isCorrect: true },
                        { answerText: "<section>", isCorrect: false },
                        { answerText: "<div>", isCorrect: false }
                    ]
                }
            ]
        },
        {
            categoryName: "CSS",
            questionArray: [
                {
                    questionText: "Specific colors properties can be specified in hexadecimal, RGB or HSL format.",
                    answers: [
                        { answerText: "False", isCorrect: false },
                        { answerText: "True", isCorrect: true }
                    ]
                },
                {
                    questionText: "Which of the following position properties makes an element stay at the same place regardless of scrolling?",
                    answers: [
                        { answerText: "Relative", isCorrect: false },
                        { answerText: "Static", isCorrect: false },
                        { answerText: "Absolute", isCorrect: false },
                        { answerText: "Fixed", isCorrect: true }
                    ]
                },
                {
                    questionText: "Paragraph borders can only have pointed corners, not rounded corners.",
                    answers: [
                        { answerText: "True", isCorrect: false },
                        { answerText: "False", isCorrect: true }
                    ]
                },
                {
                    questionText: "The following CSS code gives the code a dashed, red border on all sides of the paragraph element:\n\np {\n    border-bottom: 10px dashed red;\n}",
                    answers: [
                        { answerText: "True", isCorrect: false },
                        { answerText: "False", isCorrect: true }
                    ]
                },
                {
                    questionText: "Which of the following HMTL elements keeps its formatting, in the case of the browser window being resized?",
                    answers: [
                        { answerText: "'<p>'", isCorrect: false },
                        { answerText: "'<pre>'", isCorrect: true }
                    ]
                },
                {
                    questionText: "What is displayed if the image is not loaded correctly, in the following HTML code?\n\n<body>\n    <img src=\"www.images.com/umbrella.jpg\" alt=\"Umbrella\">\n</body>",
                    answers: [
                        { answerText: "Nothing is displayed", isCorrect: false },
                        { answerText: "The text 'Umbrella'", isCorrect: true },
                        { answerText: "A blank square", isCorrect: false }
                    ]
                },
                {
                    questionText: "Fill in the missing property:\n\nWhat property can be used to make an element, such as a Search bar, stick to the right of the navigation bar?\n\n#searchbar {\n    (Enter your Answer): right;\n}",
                    answers: [
                        { answerText: "float", isCorrect: true },
                        { answerText: "var", isCorrect: false },
                        { answerText: "const", isCorrect: false }
                    ]
                },
                {
                    questionText: "Putting a <button> inside <a> element is considered bad practice, violating the HTML5 specification.",
                    answers: [
                        { answerText: "True", isCorrect: true },
                        { answerText: "False", isCorrect: false }
                    ]
                },
                {
                    questionText: "The following code can be used to open YouTube webpage in a new browser tab:\n\n<a href=\"https://www.youtube.com\" target=\"_blank\"> YouTube </a>",
                    answers: [
                        { answerText: "True", isCorrect: true },
                        { answerText: "False", isCorrect: false }
                    ]
                },
                {
                    questionText: "The <br> element is an empty HTML element, which contains no content.",
                    answers: [
                        { answerText: "True", isCorrect: true },
                        { answerText: "False", isCorrect: false }
                    ]
                },
                {
                    questionText: "By default, margins are set to auto – the browser calculates them.",
                    answers: [
                        { answerText: "True", isCorrect: true },
                        { answerText: "False", isCorrect: false }
                    ]
                },
                {
                    questionText: "Which of the following functions allow us to bind a JS function to a button being pressed?",
                    answers: [
                        { answerText: "onhover()", isCorrect: false },
                        { answerText: "onclick()", isCorrect: true },
                        { answerText: "onpress()", isCorrect: false },
                        { answerText: "onselect()", isCorrect: false }
                    ]
                },
                {
                    questionText: "Which of the following tags in the code below refers to Table Cell data?\n\n<table>\n    <tr>\n        <th>Name</th>\n        <th>Weight (in kg)</th>\n        <th>Price (in Euro)</th>\n    </tr>\n    <tr>\n        <td>Banana</td>\n        <td>0.3</td>\n        <td>2</td>\n    </tr>\n</table>",
                    answers: [
                        { answerText: "'<tr>'", isCorrect: false },
                        { answerText: "'<table>'", isCorrect: false },
                        { answerText: "'<td>'", isCorrect: true },
                        { answerText: "'<th>'", isCorrect: false }
                    ]
                },
                {
                    questionText: "Which of the following text formatting tags is used to make text bold?",
                    answers: [
                        { answerText: "'<b>'", isCorrect: true },
                        { answerText: "'<del>'", isCorrect: false },
                        { answerText: "'<mark>'", isCorrect: false },
                        { answerText: "'<sub>'", isCorrect: false }
                    ]
                },
                {
                    questionText: "Which of the following creates spacing around HTML elements?",
                    answers: [
                        { answerText: "Margins", isCorrect: true },
                        { answerText: "Padding", isCorrect: false },
                        { answerText: "Borders", isCorrect: false }
                    ]
                },
                {
                    questionText: "What kind of HTML list is displayed below:\n\n1. Dog\n2. Cat\n3. Bird",
                    answers: [
                        { answerText: "Numbered/Ordered List", isCorrect: true },
                        { answerText: "Description List", isCorrect: false },
                        { answerText: "Unnumbered/Unordered List", isCorrect: false }
                    ]
                },
                {
                    questionText: "Which transition-timing-function property can be used to change the size of the div by starting slowly?\n\n(div {\n    width: 100px;\n    height: 100px;\n    transition-property: width, height, transform;\n    transition-duration: 2s, 2s, 2s;\n    transition-timing-function: _______;\n    transition-delay: 1s;\n})",
                    answers: [
                        { answerText: "linear", isCorrect: false },
                        { answerText: "ease-out", isCorrect: false },
                        { answerText: "ease-in", isCorrect: true }
                    ]
                },
                {
                    questionText: "'.large' in the following CSS code segment refers to the id of an element.\n\n.large {\n    font-size: 300%;\n}",
                    answers: [
                        { answerText: "True", isCorrect: false },
                        { answerText: "False", isCorrect: true }
                    ]
                },
                {
                    questionText: "CSS styling can be both inline, as well as in a separate CSS file.",
                    answers: [
                        { answerText: "True", isCorrect: true },
                        { answerText: "False", isCorrect: false }
                    ]
                }
            ]
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
                        { answerText: "#", isCorrect: false }
                    ]
                },
                // ... (add more JavaScript questions here)
            ]
        }
    ]
};

console.log("Quiz Object:", quizObject);

export default quizObject;
