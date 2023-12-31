import quizObject from './quizData.js';

// I tried to make it as modular as possible so its easy to add/remove things as possible to the functionality so maybe it takes up a bit more code than necessary atm
// maybe some of the functions can be combined into one but I think its easier to read this way currently, so if you have any suggestions on how to make it more efficient please let me know!

let currentQuizCategory, // Global state variables for the current quiz category, question index, and user's score.
currentQuizQuestionIndex = 0, 
userQuizScore = 0; 
let quizStartTime; // Variable to store the start time of the quiz (ilakia)
let userAnswers = {}; 

//these are just some utility functions to make it easier to create elements and append them to the DOM, you can use these if you want!
const createContainer = (containerId) => { // Function to create a new container element with a specified ID
    const container = document.createElement("div");
    container.id = containerId;
    return container;
};

const createQuizButton = (buttonText, eventHandler) => { // Function to create a new button element with specified text and an event handler.
    const button = document.createElement("button");
    button.textContent = buttonText;
    button.addEventListener("click", eventHandler);
    button.classList.add("quiz-button");
    return button;
};

const createElementWithText = (tagName, textContent, className) => { // Function to create a new element with text - added class
    const element = document.createElement(tagName);
    element.textContent = textContent;
    if (className) {
        element.classList.add(className);
    }
    return element;
};

const clearContainerChildren = (container) => { // Function to clear all child elements from a given container.
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

const quizCategoryContainer = document.getElementById("quiz-category-container") || createContainer("quiz-category-container"); // Containers for quiz categories and questions, these two are the main containers for the quiz
const quizQuestionContainer = document.getElementById("quiz-question-container") || createContainer("quiz-question-container");

const setupQuizContainers = () => { // Function to set up the main containers for the quiz categories and questions.
    quizCategoryContainer.id = "quiz-category-container";
    quizQuestionContainer.id = "quiz-question-container";
    document.body.appendChild(quizCategoryContainer);
    document.body.appendChild(quizQuestionContainer);
};

const initializeQuizCategories = () => { // Function to initialize and display quiz categories.
    clearContainerChildren(quizCategoryContainer);
    quizCategoryContainer.appendChild(createElementWithText("h1", "Front-End Quiz", "select-title"));

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("category-button-container");

    quizObject.categoryArray.forEach(quizCategory => {
    const categoryButton = createQuizButton(quizCategory.categoryName, () => selectQuizCategory(quizCategory.categoryName));
    categoryButton.classList.add("category-button"); //had to add some new classes to make it easier to style the buttons
    buttonContainer.appendChild(categoryButton);
    });

    quizCategoryContainer.appendChild(buttonContainer);
    quizQuestionContainer.style.display = "none"; // Hide the quiz question container
};

const selectQuizCategory = (selectedCategoryName) => { // Function to handle selection of a quiz category.
    const selectedCategory = quizObject.categoryArray.find(categoryItem => categoryItem.categoryName === selectedCategoryName);
    if (!selectedCategory) {
    console.error("Category not found:", selectedCategoryName);
    return;
}

    quizStartTime = new Date(); // Record the start time when the quiz category is selected
    currentQuizCategory = selectedCategory;
    currentQuizQuestionIndex = 0;
    userQuizScore = 0;

    localStorage.setItem("selectedCategory", JSON.stringify(currentQuizCategory)); // Save the selected category to local storage
    quizCategoryContainer.style.display = "none";
    quizQuestionContainer.style.display = "flex";
    currentQuizCategory.questionArray = shuffleArray(currentQuizCategory.questionArray); // Hide category container
    displayQuizQuestion(); // Display the first question of the selected category
};

const shuffleArray = (array) => { // Function to shuffle an array to randomize the order of the questions.
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const displayQuizQuestion = () => { // Function to display the current quiz question - big refactor happened here
    clearContainerChildren(quizQuestionContainer);

    const currentQuestion = currentQuizCategory.questionArray[currentQuizQuestionIndex];
    const totalQuestions = currentQuizCategory.questionArray.length; // moving title progress function in here
    
    const titleAndProgressText = `${currentQuizCategory.categoryName} - Question ${currentQuizQuestionIndex + 1} of ${totalQuestions}`;
    const titleElement = createElementWithText("h2", titleAndProgressText);
    titleElement.classList.add("quiz-title");
    quizQuestionContainer.appendChild(titleElement);
    quizQuestionContainer.appendChild(createElementWithText("h2", currentQuestion.questionText, "question-text")); //added a class to make it easier to style the question text

    currentQuestion.answers.forEach(answer => {
        const answerButton = createQuizButton(answer.answerText, () => handleAnswerSelection(answerButton, currentQuestion.id, answer.answerText, answer.isCorrect));
        answerButton.classList.add("answer-button");
        quizQuestionContainer.appendChild(answerButton);
    });

    const nextButton = createQuizButton("Next", nextQuizQuestion);
    nextButton.classList.add("nav-button", "next-button");
    nextButton.disabled = true; // Disable the next button until an answer is selected
    quizQuestionContainer.appendChild(nextButton);
};

const handleAnswerSelection = (selectedButton, questionId, selectedAnswerText, isCorrect) => { // Function to handle selection of an answer, has added parameters to use for the userAnswers object
    const answerButtons = quizQuestionContainer.querySelectorAll(".answer-button");
    
    answerButtons.forEach(button => button.classList.remove("selected-answer")); // Remove "selected-answer" class from all answer buttons
    selectedButton.classList.add("selected-answer");  // Add "selected-answer" class to the newly selected answer

    
    userAnswers[questionId] = { // questionId is the id of the current question, could be used for test summary in the future
        userAnswer: selectedAnswerText,
        isCorrect: isCorrect
    };

    const nextButton = document.querySelector(".next-button");
    if (nextButton) {
        nextButton.disabled = false; // Enable the next button to make clicking possible
    }
};

const nextQuizQuestion = () => { // function to navigate to the next question, takes in the logic for the quiz end page and score which was moved from the previous function
    const currentQuestion = currentQuizCategory.questionArray[currentQuizQuestionIndex];
    const answerData = userAnswers[currentQuestion.id];

    if (answerData) { // Update the score if the user's answer is correct
        
        if (answerData.isCorrect && !answerData.scoreUpdated) {
            userQuizScore++;
            answerData.scoreUpdated = true; // Ensure score is updated only once per question
        }

        
        const selectedButton = answerData.selectedButton || quizQuestionContainer.querySelector(".selected-answer"); // function to handle feedback for the user's answer
        if (selectedButton) {
            selectedButton.classList.add(answerData.isCorrect ? "correct-answer" : "incorrect-answer");

            
            if (answerData.isCorrect) { // Apply blinking only for correct answers
                selectedButton.classList.add("correct-blink");

                setTimeout(() => {
                    selectedButton.classList.remove("correct-blink");
                }, 1500);
            }
        }

        const nextButton = document.querySelector(".next-button");
        if (nextButton) {
        nextButton.disabled = true; // Disable the button after use
    }

        setTimeout(() => { // Delay before moving to the next question
            moveToNextQuestion();
        }, 1500); //changed this to 1 second for now, can be changed later
    } else {
        moveToNextQuestion();
    }
};

const moveToNextQuestion = () => { // Function to move to the next question or show the quiz end page if there are no more questions.
    if (currentQuizQuestionIndex < currentQuizCategory.questionArray.length - 1) {
        currentQuizQuestionIndex++;
        displayQuizQuestion();
    } else {
        showQuizEndPage();
    }
};

const showQuizEndPage = () => { // shows the quiz end page
    clearContainerChildren(quizQuestionContainer); //css here for the quiz end page in case Andre finishes, easier for me to keep track of the styling
    
    quizQuestionContainer.appendChild(createElementWithText("h2", "Quiz Completed!", "quiz-end-title"));
    quizQuestionContainer.appendChild(createElementWithText("p", `Score: ${userQuizScore}/${currentQuizCategory.questionArray.length}`, "quiz-end-score"));                                  
    
    const quizEndTime = new Date(); // Calculate the time taken(ilakia)
    const timeTaken = (quizEndTime - quizStartTime) / 1000;
    
    const timeTakenRemove = Math.floor(timeTaken); // added this to remove the decimal places from the time taken, needed a quick fix
    quizQuestionContainer.appendChild(createElementWithText("p", `Time: ${timeTakenRemove} seconds`,"quiz-end-time")); // Display the time taken
    
    const restartButton = createQuizButton("Restart Quiz", () => { // restart button for the end page
        quizStartTime = new Date();
        selectQuizCategory(currentQuizCategory.categoryName);
});
    restartButton.classList.add("restart-button");
    quizQuestionContainer.appendChild(restartButton);
    };

const resetQuiz = () => { // Function to reset the quiz and display the quiz categories
    userAnswers = {}; //added this to reset the user answers object
    currentQuizCategory = null;
    currentQuizQuestionIndex = 0;
    userQuizScore = 0;
    quizCategoryContainer.style.display = "";
    clearContainerChildren(quizQuestionContainer);
    initializeQuizCategories();
    localStorage.removeItem("selectedCategory");
};


const createHomeButton = (eventHandler) => { // Function to create a home button with an event handler.(ilakia)
    const homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.addEventListener("click", eventHandler);
    homeButton.classList.add("home-button"); //had to make some new classes to make it easier to style the quiz content - hindsight doing this too much as an afterthought
    return homeButton;
};

const homeButton = createHomeButton(resetQuiz); // Create and append the home button.(ilakia)
document.body.appendChild(homeButton);

const storedCategory = localStorage.getItem("selectedCategory"); // Check if there is a previously selected category in local storage
if (storedCategory) {
currentQuizCategory = JSON.parse(storedCategory);
displayQuizQuestion();
} else {
initializeQuizCategories();
}

setupQuizContainers(); // Initialize the quiz containers and display categories.



