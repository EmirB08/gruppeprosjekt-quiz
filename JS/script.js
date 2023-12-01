import quizObject from './quizData.js';

// I tried to make it as modular as possible so its easy to add/remove things as possible to the functionality so maybe it takes up a bit more code than necessary atm
// maybe some of the functions can be combined into one but I think its easier to read this way currently, so if you have any suggestions on how to make it more efficient please let me know!

// Global state variables for the current quiz category, question index, and user's score.
let currentQuizCategory, currentQuizQuestionIndex = 0, userQuizScore = 0;

//these are just some utility functions to make it easier to create elements and append them to the DOM, you can use these if you want!

// Function to create a new container element with a specified ID. - can be used to create additional  elements with a specified ID
const createContainer = (containerId) => {
    const container = document.createElement("div");
    container.id = containerId;
    return container;
};





// Function to create a new button element with specified text and an event handler. - can be used to create additional elements with specified text and event handler
const createQuizButton = (buttonText, eventHandler) => {
    const button = document.createElement("button");
    button.textContent = buttonText;
    button.addEventListener("click", eventHandler);
    button.classList.add("quiz-button"); 
    return button;
};

// Function to create a new element with specified tag name and text content. - can be used to create additional elements with specified tag name and text content
const createElementWithText = (tagName, textContent) => {
    const element = document.createElement(tagName);
    element.textContent = textContent;
    return element;
};

// Function to clear all child elements from a given container.
const clearContainerChildren = (container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

// Containers for quiz categories and questions.
const quizCategoryContainer = document.getElementById("quiz-category-container") || createContainer("quiz-category-container");
const quizQuestionContainer = document.getElementById("quiz-question-container") || createContainer("quiz-question-container");

// Function to set up the main containers for the quiz categories and questions.
const setupQuizContainers = () => {
    quizCategoryContainer.id = "quiz-category-container";
    quizQuestionContainer.id = "quiz-question-container";
    document.body.appendChild(quizCategoryContainer);
    document.body.appendChild(quizQuestionContainer);
    
};

// Function to initialize and display quiz categories.
const initializeQuizCategories = () => {
    clearContainerChildren(quizCategoryContainer);
    quizCategoryContainer.appendChild(createElementWithText("h1", "Choose Your Quiz"));

    // Create and append buttons for each quiz category.
    quizObject.categoryArray.forEach(quizCategory => {
        quizCategoryContainer.appendChild(createQuizButton(quizCategory.categoryName, () => selectQuizCategory(quizCategory.categoryName)));
    });
};
let quizStartTime; // Variable to store the start time of the quiz

// Function to handle selection of a quiz category.
const selectQuizCategory = (selectedCategoryName) => {
    const selectedCategory = quizObject.categoryArray.find(categoryItem => categoryItem.categoryName === selectedCategoryName);
    if (!selectedCategory) {
        console.error("Category not found:", selectedCategoryName);
        return;
    }
 // Record the start time when the quiz category is selected
  quizStartTime = new Date();


    currentQuizCategory = selectedCategory;
    currentQuizQuestionIndex = 0;
    userQuizScore = 0;
    quizCategoryContainer.style.display = "none"; // Hide category container

    displayQuizQuestion(); // Display the first question of the selected category
};

// Function to display the quiz progress (current question number and total number of questions).(ilakia)
const displayQuizProgress = () => {
    const progressText = `Question ${currentQuizQuestionIndex + 1} of ${currentQuizCategory.questionArray.length}`;
    const progressElement = createElementWithText("p", progressText);
    quizQuestionContainer.appendChild(progressElement);
};



// Function to display the current quiz question and answer options.
const displayQuizQuestion = () => {
    clearContainerChildren(quizQuestionContainer);

    const categoryTitle = createElementWithText("h2", currentQuizCategory.categoryName);
    quizQuestionContainer.appendChild(categoryTitle);

    // Display quiz progress
    displayQuizProgress();

    const currentQuestion = currentQuizCategory.questionArray[currentQuizQuestionIndex];
    quizQuestionContainer.appendChild(createElementWithText("h2", currentQuestion.questionText));

    // Create and append buttons for each answer option.
    currentQuestion.answers.forEach(answer => {
        const answerButton = createQuizButton(answer.answerText, () => handleAnswerSelection(answerButton, answer.isCorrect));
        answerButton.classList.add("answer-button");
        quizQuestionContainer.appendChild(answerButton);
    });

   // Append 'Previous' and 'Next' or 'Finish Quiz' buttons based on the current question index.
   if (currentQuizQuestionIndex > 0) {
    quizQuestionContainer.appendChild(createQuizButton("Previous", previousQuizQuestion));
   }
   if (currentQuizQuestionIndex < currentQuizCategory.questionArray.length - 1) {
        quizQuestionContainer.appendChild(createQuizButton("Next", nextQuizQuestion));

        // Automatically go to the next question after 10 seconds(ilakia)
        setTimeout(() => {
            // Check if the quiz is not finished to avoid going to the next question after the last one
            if (currentQuizQuestionIndex < currentQuizCategory.questionArray.length - 1) {
                nextQuizQuestion();
            }
        }, 10000); // 10000 milliseconds = 10 seconds
   } else {
        quizQuestionContainer.appendChild(createQuizButton("Finish Quiz", showQuizEndPage));
        finishQuizButton.id = "review-button"; // Set the ID for the review button
        finishQuizButton.disabled = true; // Disable the review button initially
        quizQuestionContainer.appendChild(finishQuizButton);
   }
};

// Function to handle the selection of an answer.
const handleAnswerSelection = (selectedButton, isCorrect) => {
    const answerButtons = quizQuestionContainer.querySelectorAll(".answer-button");
    answerButtons.forEach(button => button.classList.remove("selected-answer"));
    selectedButton.classList.add("selected-answer");
    if (isCorrect) userQuizScore++;
    
    // Enable the review button after an answer is selected(ilakia)
    enableReviewButton();
};


// Function to enable the review button.(ilakia)
const enableReviewButton = () => {
    const reviewButton = document.getElementById("review-button");
    if (reviewButton) {
        reviewButton.disabled = false;
    }
};

// Functions to navigate to the previous and next quiz questions.
const previousQuizQuestion = () => {
    currentQuizQuestionIndex--;
    displayQuizQuestion();
};

const nextQuizQuestion = () => {
    currentQuizQuestionIndex++;
    displayQuizQuestion();
};


const showQuizEndPage = () => {
    clearContainerChildren(quizQuestionContainer);
    quizQuestionContainer.appendChild(createElementWithText("h2", "Quiz Completed!"));
    quizQuestionContainer.appendChild(createElementWithText("p", `Your score: ${userQuizScore}/${currentQuizCategory.questionArray.length}`));

    // Calculate the time taken(ilakia)
    const quizEndTime = new Date();
    const timeTaken = (quizEndTime - quizStartTime) / 1000; // Convert milliseconds to seconds

    // Display the time taken
    quizQuestionContainer.appendChild(createElementWithText("p", `Time taken: ${timeTaken} seconds`));

};


// Function to finish the quiz and return to the category selection or home.
const finishQuiz = (autoFinish) => {
    // Clear the container
    clearContainerChildren(quizQuestionContainer);

    if (autoFinish) {
        // Automatically finish the quiz after displaying the results
        setTimeout(() => {
            resetQuiz();
        }, 10000); //
    } else {
        // Keep the results displayed until the user clicks home
        quizCategoryContainer.style.display = "";
        initializeQuizCategories();
    }
};


// Function to reset the quiz and return to the category selection.
const resetQuiz = () => {
    currentQuizCategory = null;
    currentQuizQuestionIndex = 0;
    userQuizScore = 0;
    quizCategoryContainer.style.display = "";
    clearContainerChildren(quizQuestionContainer);
    initializeQuizCategories();
};


// Function to create a home button with an event handler.(ilakia)
const createHomeButton = (eventHandler) => {
    const homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.addEventListener("click", eventHandler);
    return homeButton;
};



// Initialize the quiz containers and display categories.
setupQuizContainers();
initializeQuizCategories();


// Create and append the home button.(ilakia)
const homeButton = createHomeButton(resetQuiz); 
document.body.appendChild(homeButton);



// Set the style for the home button
homeButton.style.position = "absolute";
homeButton.style.top = "10px"; 
homeButton.style.right = "10px"; 

// Function to review the selected answers (added)
const reviewAnswers = () => {
    clearContainerChildren(quizQuestionContainer);

    // Display each question with user's selected answer and correct answer
    currentQuizCategory.questionArray.forEach((question, index) => {
        const questionContainer = createContainer(`question-${index}`);
        questionContainer.appendChild(createElementWithText("h3", question.questionText));

        // Display user's selected answer
        const userAnswer = createElementWithText("p", `Your Answer: ${question.answers.find(answer => answer.isSelected)?.answerText || "Not answered"}`);
        questionContainer.appendChild(userAnswer);

        // Display correct answer
        const correctAnswer = createElementWithText("p", `Correct Answer: ${question.answers.find(answer => answer.isCorrect)?.answerText}`);
        questionContainer.appendChild(correctAnswer);

        quizQuestionContainer.appendChild(questionContainer);
    });

    // Create and append 'Finish Quiz' button
    quizQuestionContainer.appendChild(createQuizButton("Finish Quiz", () => finishQuiz(true)));
};
// Create the review button (added)
const finishQuizButton = createQuizButton("Review Answers", reviewAnswers);
finishQuizButton.id = "review-button"; // Set the ID for the review button
finishQuizButton.disabled = true; // Disable the review button initially






