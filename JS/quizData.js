// created an object to hold the quiz questions and answers for all three categories, just used some generated questions as placeholders!! replace with your own questions and answers for each category and add more (I'm thinking 15 per category!) you have been assigned but follow the same format as the example below

const quizObject = {
    categoryArray: [
        {
            categoryName: "HTML",
            questionArray: [
                {   
                    id: 1,
                    questionText: "What does HTML stand for?",
                    answers: [
                        { answerText: "Hyper Trainer Marking Language", isCorrect: false },
                        { answerText: "Hyper Text Markup Language", isCorrect: true },
                        { answerText: "Hyperlinks and Text Markup Language", isCorrect: false },
                        { answerText: "Home Tool Markup Language", isCorrect: false }
                    ]
                },
                {   
                    id: 2,
                    questionText: "Which HTML element represents the root of an HTML document?",
                    answers: [
                        { answerText: "<root>", isCorrect: false },
                        { answerText: "<base>", isCorrect: false },
                        { answerText: "<html>", isCorrect: true },
                        { answerText: "<head>", isCorrect: false }
                    ]
                },
                {   id: 3,
                    questionText: "Which element is used to specify a footer for a document or section?",
                    answers: [
                        { answerText: "<bottom>", isCorrect: false },
                        { answerText: "<footer>", isCorrect: true },
                        { answerText: "<section>", isCorrect: false },
                        { answerText: "<div>", isCorrect: false }
                    ]
                },

                {
                    id: 4,
                    questionText: "What is the purpose of the <title> tag in HTML?",
                    answers: [
                        { answerText: "To create the main title of the webpage", isCorrect: false },
                        { answerText: "To set the title of the webpage as seen in browser tabs", isCorrect: true },
                        { answerText: "To define the header of the webpage", isCorrect: false },
                        { answerText: "To bold text in the webpage", isCorrect: false }
                    ]
                },
                {
                    id: 5,
                    questionText: "Which tag is used to create a hyperlink in HTML?",
                    answers: [
                        { answerText: "<hyperlink>", isCorrect: false },
                        { answerText: "<link>", isCorrect: false },
                        { answerText: "<a>", isCorrect: true },
                        { answerText: "<href>", isCorrect: false }
                    ]
                },
                {
                    id: 6,
                    questionText: "What does the 'alt' attribute in an <img> tag specify?",
                    answers: [
                        { answerText: "Alternate text to be displayed if the image does not load", isCorrect: true },
                        { answerText: "The height of the image", isCorrect: false },
                        { answerText: "A link to the image source", isCorrect: false },
                        { answerText: "The width of the image", isCorrect: false }
                    ]
                },
                {
                    id: 7,
                    questionText: "Which HTML tag is used for creating an ordered list?",
                    answers: [
                        { answerText: "<ul>", isCorrect: false },
                        { answerText: "<ol>", isCorrect: true },
                        { answerText: "<li>", isCorrect: false },
                        { answerText: "<list>", isCorrect: false }
                    ]
                },
                {
                    id: 8,
                    questionText: "Which HTML element is used to define emphasized text?",
                    answers: [
                        { answerText: "<strong>", isCorrect: false },
                        { answerText: "<em>", isCorrect: true },
                        { answerText: "<mark>", isCorrect: false },
                        { answerText: "<italic>", isCorrect: false }
                    ]
                },
                {
                    id: 9,
                    questionText: "What is the correct HTML element for inserting a line break?",
                    answers: [
                        { answerText: "<break>", isCorrect: false },
                        { answerText: "<lb>", isCorrect: false },
                        { answerText: "<br>", isCorrect: true },
                        { answerText: "<line>", isCorrect: false }
                    ]
                },
                {
                    id: 10,
                    questionText: "Which HTML tag is used to define a table header?",
                    answers: [
                        { answerText: "<thead>", isCorrect: false },
                        { answerText: "<th>", isCorrect: true },
                        { answerText: "<header>", isCorrect: false },
                        { answerText: "<top>", isCorrect: false }
                    ]
                },
                {
                    id: 11,
                    questionText: "In HTML, what does the <canvas> element do?",
                    answers: [
                        { answerText: "Displays a 3D model", isCorrect: false },
                        { answerText: "Used to draw graphics via scripting", isCorrect: true },
                        { answerText: "Creates a container for images", isCorrect: false },
                        { answerText: "Generates an animated canvas", isCorrect: false }
                    ]
                },
                {
                    id: 12,
                    questionText: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
                    answers: [
                        { answerText: "src", isCorrect: false },
                        { answerText: "title", isCorrect: false },
                        { answerText: "alt", isCorrect: true },
                        { answerText: "href", isCorrect: false }
                    ]
                },
                {
                    id: 13,
                    questionText: "Which HTML element is used to specify a header for a document or section?",
                    answers: [
                        { answerText: "<header>", isCorrect: true },
                        { answerText: "<top>", isCorrect: false },
                        { answerText: "<head>", isCorrect: false },
                        { answerText: "<section>", isCorrect: false }
                    ]
                },
                {
                    id: 14,
                    questionText: "What is the function of the <iframe> tag in HTML?",
                    answers: [
                        { answerText: "To create an interactive frame within a webpage", isCorrect: false },
                        { answerText: "To display a nested webpage", isCorrect: true },
                        { answerText: "To insert an image into the webpage", isCorrect: false },
                        { answerText: "To frame a section of text", isCorrect: false }
                    ]
                },
                {
                    id: 15,
                    questionText: "What is the correct HTML for creating a checkbox?",
                    answers: [
                        { answerText: "<input type='box'>", isCorrect: false },
                        { answerText: "<check>", isCorrect: false },
                        { answerText: "<input type='checkbox'>", isCorrect: true },
                        { answerText: "<box>", isCorrect: false }
                    ]
                }
                
            ]
        },   

        {
            categoryName: "CSS",
            questionArray: [
                {
                    questionText: "What does CSS stand for?",
                    answers: [
                        { answerText: "linear", isCorrect: false },
                        { answerText: "ease-out", isCorrect: false },
                        { answerText: "ease-in", isCorrect: true }
                    ]
                },
                {
                    questionText: "Which property is used to change the font of an element?",
                    answers: [
                        { answerText: "True", isCorrect: false },
                        { answerText: "False", isCorrect: true }
                    ]
                },
                {
                    questionText: "How do you select an element with the id 'demo'?",
                    answers: [
                        { answerText: "True", isCorrect: true },
                        { answerText: "False", isCorrect: false }
                    ]
        },

        {
            id: 19,
            questionText: "Which CSS property controls the text size?",
            answers: [
                { answerText: "font-style", isCorrect: false },
                { answerText: "text-size", isCorrect: false },
                { answerText: "font-size", isCorrect: true },
                { answerText: "text-style", isCorrect: false }
            ]
        },

        {
            id: 20,
            questionText: "How do you display hyperlinks without an underline?",
            answers: [
                { answerText: "text-decoration: none", isCorrect: true },
                { answerText: "text-decoration: no-underline", isCorrect: false },
                { answerText: "font-style: no-underline", isCorrect: false },
                { answerText: "underline: none", isCorrect: false }
            ]
        },

        {
            id: 21,
            questionText: "Which property changes the color of text?",
            answers: [
                { answerText: "color", isCorrect: true },
                { answerText: "font-color", isCorrect: false },
                { answerText: "text-color", isCorrect: false },
                { answerText: "background-color", isCorrect: false }
            ]
        },
        {
            id: 22,
            questionText: "How do you add a background color for all <h1> elements?",
            answers: [
                { answerText: "h1.all {background-color:#FFFFFF;}", isCorrect: false },
                { answerText: "h1 {background-color:#FFFFFF;}", isCorrect: true },
                { answerText: "all.h1 {background-color:#FFFFFF;}", isCorrect: false },
                { answerText: "h1.background {color:#FFFFFF;}", isCorrect: false }
            ]
        },
        {
            id: 23,
            questionText: "How do you select elements with class name 'example'?",
            answers: [
                { answerText: "#example", isCorrect: false },
                { answerText: ".example", isCorrect: true },
                { answerText: "example", isCorrect: false },
                { answerText: "*example", isCorrect: false }
            ]
        },

        {
            id: 24,
            questionText: "Which property is used to change the left margin of an element?",
            answers: [
                { answerText: "indent", isCorrect: false },
                { answerText: "padding-left", isCorrect: false },
                { answerText: "margin-left", isCorrect: true },
                { answerText: "border-left", isCorrect: false }
            ]
        },
        {
            id: 25,
            questionText: "How do you make the text bold in CSS?",
            answers: [
                { answerText: "font-weight: bold", isCorrect: true },
                { answerText: "style: bold", isCorrect: false },
                { answerText: "font: bold", isCorrect: false },
                { answerText: "text-style: bold", isCorrect: false }
            ]
        },
        {
            id: 26,
            questionText: "How can you make a list that lists its items with squares?",
            answers: [
                { answerText: "list-type: square", isCorrect: false },
                { answerText: "list-style-type: square", isCorrect: true },
                { answerText: "list: square", isCorrect: false },
                { answerText: "list-style: square", isCorrect: false }
            ]
        },
        {
            id: 27,
            questionText: "How do you select all p elements inside a div element?",
            answers: [
                { answerText: "div + p", isCorrect: false },
                { answerText: "div p", isCorrect: true },
                { answerText: "div.p", isCorrect: false },
                { answerText: "div > p", isCorrect: false }
            ]
        },
        {
            id: 28,
            questionText: "Which property is used to change the font of an element?",
            answers: [
                { answerText: "font-family", isCorrect: true },
                { answerText: "typeface", isCorrect: false },
                { answerText: "font-type", isCorrect: false },
                { answerText: "font-style", isCorrect: false }
            ]
        },
        {
            id: 29,
            questionText: "How do you make each word in a text start with a capital letter?",
            answers: [
                { answerText: "transform: capitalize", isCorrect: false },
                { answerText: "text-transform: capitalize", isCorrect: true },
                { answerText: "text-style: capitalize", isCorrect: false },
                { answerText: "font-transform: capitalize", isCorrect: false }
            ]
        },
        {
            id: 30,
            questionText: "Which CSS property controls the text size?",
            answers: [
                { answerText: "text-size", isCorrect: false },
                { answerText: "font-size", isCorrect: true },
                { answerText: "font-weight", isCorrect: false },
                { answerText: "text-style", isCorrect: false }
    ]
}
]
        },
        

        {
            categoryName: "JavaScript",
            questionArray: [
                {   id: 31,
                    questionText: "Which symbol is used for comments in JavaScript?",
                    answers: [
                        { answerText: "//", isCorrect: true },
                        { answerText: "/* */", isCorrect: false },
                        { answerText: "<!-- -->", isCorrect: false },
                        { answerText: "#", isCorrect: false }
                    ]
                },
                {
                    questionText: "Which method is used to write messages in the console?",
                    answers: [
                        { answerText: "console.write()", isCorrect: false },
                        { answerText: "console.log()", isCorrect: true },
                        { answerText: "console.output()", isCorrect: false },
                        { answerText: "console.print()", isCorrect: false }
                    ]
                },
                {
                    questionText: "Which of the following is a JavaScript data type?",
                    answers: [
                        { answerText: "Number", isCorrect: true },
                        { answerText: "Element", isCorrect: false },
                        { answerText: "Tag", isCorrect: false },
                        { answerText: "Link", isCorrect: false }
                    ]
                }
            ]
        }
    ]
};

console.log("Quiz Object:", quizObject);

export default quizObject;
