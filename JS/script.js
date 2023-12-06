import quizObject from "./quizData.js";

// I tried to make it as modular as possible so its easy to add/remove things as possible to the functionality so maybe it takes up a bit more code than necessary atm
// maybe some of the functions can be combined into one but I think its easier to read this way currently, so if you have any suggestions on how to make it more efficient please let me know!

// Global state variables for the current quiz category, question index, and user's score.
let currentQuizCategory,
  currentQuizQuestionIndex = 0,
  userQuizScore = 0;
let quizStartTime; // Variable to store the start time of the quiz

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
const quizCategoryContainer =
  document.getElementById("quiz-category-container") ||
  createContainer("quiz-category-container");
const quizQuestionContainer =
  document.getElementById("quiz-question-container") ||
  createContainer("quiz-question-container");

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
  quizCategoryContainer.appendChild(
    createElementWithText("h1", "Choose Your Quiz")
  );

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("category-button-container");

  quizObject.categoryArray.forEach((quizCategory) => {
    const categoryButton = createQuizButton(quizCategory.categoryName, () =>
      selectQuizCategory(quizCategory.categoryName)
    );
    //had to add some new classes to make it easier to style the buttons
    categoryButton.classList.add("category-button");
    buttonContainer.appendChild(categoryButton);
  });

  quizCategoryContainer.appendChild(buttonContainer);
  quizQuestionContainer.style.display = "none";
};

// Function to handle selection of a quiz category.
const selectQuizCategory = (selectedCategoryName) => {
  const selectedCategory = quizObject.categoryArray.find(
    (categoryItem) => categoryItem.categoryName === selectedCategoryName
  );
  if (!selectedCategory) {
    console.error("Category not found:", selectedCategoryName);
    return;
  }
  // Record the start time when the quiz category is selected
  quizStartTime = new Date();

  currentQuizCategory = selectedCategory;
  currentQuizQuestionIndex = 0;
  userQuizScore = 0;

  // Save the selected category to local storage
  localStorage.setItem("selectedCategory", JSON.stringify(currentQuizCategory));
  quizCategoryContainer.style.display = "none";
  quizQuestionContainer.style.display = "grid"; // Hide category container
  displayQuizQuestion(); // Display the first question of the selected category
};

// Function to display the quiz progress (current question number and total number of questions).(ilakia)
const displayQuizProgress = () => {
  const progressText = `Question ${currentQuizQuestionIndex + 1} of ${
    currentQuizCategory.questionArray.length
  }`;
  const progressElement = createElementWithText("p", progressText);
  quizQuestionContainer.appendChild(progressElement);
};
// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
// Function to display the current quiz question and answer options.
const displayQuizQuestion = () => {
  clearContainerChildren(quizQuestionContainer);

  // Shuffle the questions array for random order.
  const shuffledQuestions = shuffleArray(currentQuizCategory.questionArray);

  // to select the current question based on the current index.
  const currentQuestion = shuffledQuestions[currentQuizQuestionIndex];

  // Main container for the content
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("quiz-content");
  quizQuestionContainer.appendChild(contentContainer);

  // Container for the question, title, and progress
  const questionInfoContainer = document.createElement("div");
  questionInfoContainer.classList.add("question-info");
  contentContainer.appendChild(questionInfoContainer);

  // Append the category title
  const categoryTitle = createElementWithText(
    "h2",
    currentQuizCategory.categoryName
  );
  categoryTitle.classList.add("category-title");
  questionInfoContainer.appendChild(categoryTitle);

  // Display and append quiz progress
  const progressText = `Question ${currentQuizQuestionIndex + 1} of ${
    currentQuizCategory.questionArray.length
  }`;
  const progressElement = createElementWithText("p", progressText);
  questionInfoContainer.appendChild(progressElement);

  // Append the current question
  questionInfoContainer.appendChild(
    createElementWithText("h2", currentQuestion.questionText)
  );

  // Container for the answer buttons
  const answerButtonsContainer = document.createElement("div");
  answerButtonsContainer.classList.add("answer-buttons");
  contentContainer.appendChild(answerButtonsContainer);

  // Create and append buttons for each answer option
  currentQuestion.answers.forEach((answer) => {
    const answerButton = createQuizButton(answer.answerText, () =>
      handleAnswerSelection(answerButton, answer.isCorrect)
    );
    answerButton.classList.add("answer-button");
    answerButtonsContainer.appendChild(answerButton);
  });

  // Append 'Previous' button if applicable
  if (currentQuizQuestionIndex > 0) {
    const prevButton = createQuizButton("Previous", previousQuizQuestion);
    prevButton.classList.add("nav-button", "prev-button"); // Assign class for grid area "prev"
    quizQuestionContainer.appendChild(prevButton);
  }

  // Append 'Next' or 'Finish Quiz' button
  //had to make some new classes to make it easier to style the quiz content
  const nextOrFinishButton =
    currentQuizQuestionIndex < currentQuizCategory.questionArray.length - 1
      ? createQuizButton("Next", nextQuizQuestion)
      : createQuizButton("Finish Quiz", showQuizEndPage);
  nextOrFinishButton.classList.add(
    "nav-button",
    currentQuizQuestionIndex < currentQuizCategory.questionArray.length - 1
      ? "next-button"
      : "finish-button"
  ); // Assign class for grid area "next"
  quizQuestionContainer.appendChild(nextOrFinishButton);
};

// Function to handle the selection of an answer.
const handleAnswerSelection = (selectedButton, isCorrect) => {
  const answerButtons =
    quizQuestionContainer.querySelectorAll(".answer-button");

  // Check if an answer is already selected
  const alreadySelected = selectedButton.classList.contains("selected-answer");

  // Remove "selected-answer" class from all answer buttons
  answerButtons.forEach((button) => button.classList.remove("selected-answer"));

  // Add "selected-answer" class to the newly selected answer if it wasn't already selected
  if (!alreadySelected) {
    selectedButton.classList.add("selected-answer");
  }

  if (isCorrect) userQuizScore++;
  // removed some redundant code here, there was a call to a button we removed
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

/* ---------------
!!! End page !!!
---------------- */

const showQuizEndPage = () => {
  clearContainerChildren(quizQuestionContainer);
  quizQuestionContainer.appendChild(
    createElementWithText("h2", "Quiz Completed!")
  );
  quizQuestionContainer.appendChild(
    createElementWithText(
      "p",
      `Your score: ${userQuizScore}/${currentQuizCategory.questionArray.length}`
    )
  );

  // Calculate the time taken(ilakia)
  const quizEndTime = new Date();
  const timeTaken = (quizEndTime - quizStartTime) / 1000; // Convert milliseconds to seconds

  // Display the time taken
  quizQuestionContainer.appendChild(
    createElementWithText("p", `Time taken: ${timeTaken} seconds`)
  );
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

// Calculate the time taken(ilakia)
const quizEndTime = new Date();
const timeTaken = (quizEndTime - quizStartTime) / 1000; // Convert milliseconds to seconds

// Display the time taken
quizQuestionContainer.appendChild(
  createElementWithText("p", `Time taken: ${timeTaken} seconds`)
);

// Function to reset the quiz and return to the category selection.
const resetQuiz = () => {
  currentQuizCategory = null;
  currentQuizQuestionIndex = 0;
  userQuizScore = 0;
  quizCategoryContainer.style.display = "";
  clearContainerChildren(quizQuestionContainer);
  initializeQuizCategories();
  localStorage.removeItem("selectedCategory");
};
// Function to create a home button with an event handler.(ilakia)
//had to make some new classes to make it easier to style the quiz content
const createHomeButton = (eventHandler) => {
  const homeButton = document.createElement("button");
  homeButton.textContent = "Home";
  homeButton.addEventListener("click", eventHandler);
  homeButton.classList.add("home-button");
  return homeButton;
};
// Create and append the home button.(ilakia)
const homeButton = createHomeButton(resetQuiz);
document.body.appendChild(homeButton);

// Initialize the quiz containers and display categories.
setupQuizContainers();

// Check if there is a previously selected category in local storage
const storedCategory = localStorage.getItem("selectedCategory");
if (storedCategory) {
  currentQuizCategory = JSON.parse(storedCategory);
  displayQuizQuestion();
} else {
  initializeQuizCategories();
}
/* ---------------
!!! Working on (André) !!!
---------------- */
// Function to restart the quiz
const restartQuiz = () => {
  // Clear user answers and reset quiz variables
  userAnswers = []; // Assuming you have an array to store user answers
  currentQuizCategory = null;
  currentQuizQuestionIndex = 0;
  userQuizScore = 0;

  // Clear the quiz question container
  clearContainerChildren(quizQuestionContainer);

  // Display the first question of the current category
  displayQuizQuestion();
};

// Function to create a restart quiz button
const createRestartButton = () => {
  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Quiz";
  restartButton.addEventListener("click", restartQuiz);
  restartButton.classList.add("restart-btn");
  return restartButton;
};
// Create and append the restart button to the document body
const restartQuizButton = createRestartButton();
document.body.appendChild(restartQuizButton);
//
//

let userAnswers = [];
const createSummaryButton = (eventHandler) => {
  const summaryButton = document.createElement("button");
  summaryButton.textContent = "Your Summary";
  summaryButton.addEventListener("click", eventHandler);
  summaryButton.classList.add("summary-btn");
  return summaryButton;
};

//  display the user's answers and correct answers
const displaySummary = () => {
  clearContainerChildren(quizQuestionContainer);

  // Loop through each question
  currentQuizCategory.questionArray.forEach((question, index) => {
    const questionText = createElementWithText(
      "h3",
      `${index + 1}. ${question.questionText}`
    );
    quizQuestionContainer.appendChild(questionText);
    //
    // Handel the selection of answer.
    const handleAnswerSelection = (selectedButton, isCorrect) => {
      const answerIndex = Array.from(
        selectedButton.parentNode.children
      ).indexOf(selectedButton);
      userAnswers[currentQuizQuestionIndex] = answerIndex;
    };
    // Display user's chosen answer
    const userAnswerSummary = userAnswers[index];
    const userChosenAnswer =
      userAnswerSummary !== undefined
        ? question.answers[userAnswerSummary].answerText
        : "Not answered";
    const userAnswer = createElementWithText(
      "p",
      `Your Answer: ${userChosenAnswer}`
    );
    quizQuestionContainer.appendChild(userAnswer);

    // Display correct answer
    const correctAnswerIndex = question.answers.findIndex(
      (answer) => answer.isCorrect
    );
    const correctAnswer = question.answers[correctAnswerIndex].answerText;
    const correctAnswerText = createElementWithText(
      "p",
      `Correct Answer: ${correctAnswer}`
    );
    quizQuestionContainer.appendChild(correctAnswerText);
  });
};
// Create the summary button
const summaryButton = createSummaryButton(displaySummary);
document.body.appendChild(summaryButton);

//removed some css styling here, css not related to js functionality shoudl be kept in the css file
