import quizObject from "./quizData.js";

// I tried to make it as modular as possible so its easy to add/remove things as possible to the functionality so maybe it takes up a bit more code than necessary atm
// maybe some of the functions can be combined into one but I think its easier to read this way currently, so if you have any suggestions on how to make it more efficient please let me know!

// Global state variables for the current quiz category, question index, and user's score.
let currentQuizCategory,
  currentQuizQuestionIndex = 0,
  userQuizScore = 0;

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

/* -----------------------
!!!! Quiz categories !!!! 
------------------------*/

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

  // Create and append buttons for each quiz category.
  quizObject.categoryArray.forEach((quizCategory) => {
    quizCategoryContainer.appendChild(
      createQuizButton(quizCategory.categoryName, () =>
        selectQuizCategory(quizCategory.categoryName)
      )
    );
  });
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

  currentQuizCategory = selectedCategory;
  currentQuizQuestionIndex = 0;
  userQuizScore = 0;
  quizCategoryContainer.style.display = "none"; // Hide category container

  displayQuizQuestion(); // Display the first question of the selected category
};

/* -----------------------------------------
!!!! Quiz Question and answer options !!!! 
-------------------------------------------*/

// Function to display the current quiz question and answer options.
const displayQuizQuestion = () => {
  clearContainerChildren(quizQuestionContainer);

  const categoryTitle = createElementWithText(
    "h2",
    currentQuizCategory.categoryName
  );
  quizQuestionContainer.appendChild(categoryTitle);

  const currentQuestion =
    currentQuizCategory.questionArray[currentQuizQuestionIndex];
  quizQuestionContainer.appendChild(
    createElementWithText("h2", currentQuestion.questionText)
  );

  // Create and append buttons for each answer option.
  currentQuestion.answers.forEach((answer) => {
    const answerButton = createQuizButton(answer.answerText, () =>
      handleAnswerSelection(answerButton, answer.isCorrect)
    );
    answerButton.classList.add("answer-button");
    quizQuestionContainer.appendChild(answerButton);
  });

  // Append 'Previous' and 'Next' or 'Finish Quiz' buttons based on the current question index.
  if (currentQuizQuestionIndex > 0) {
    quizQuestionContainer.appendChild(
      createQuizButton("Previous", previousQuizQuestion)
    );
  }
  if (currentQuizQuestionIndex < currentQuizCategory.questionArray.length - 1) {
    quizQuestionContainer.appendChild(
      createQuizButton("Next", nextQuizQuestion)
    );
  } else {
    quizQuestionContainer.appendChild(
      createQuizButton("Finish Quiz", showQuizEndPage)
    );
  }
};

// Function to handle the selection of an answer.
const handleAnswerSelection = (selectedButton, isCorrect) => {
  const answerButtons =
    quizQuestionContainer.querySelectorAll(".answer-button");
  answerButtons.forEach((button) => button.classList.remove("selected-answer"));
  selectedButton.classList.add("selected-answer");
  if (isCorrect) userQuizScore++;
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

/* ----------------
!!!! End page !!!! 
-----------------*/

// Function to display the end page of the quiz showing the user's score.
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
  quizQuestionContainer.appendChild(
    createQuizButton("Restart Quiz", resetQuiz)
  );
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
// Answer summary
// const summary = document.createElement("section");
// summary.classList.add("summaryArray");
// const createParagraf = document.createElement("p");
// const quizSummary = () => {
//   for (let i = 0; i < questionArray.length; i++) {
//     console.log("questionArray");
//         createContainer.innerHTML = `
//     createParagraf = ${questionArray[i].questionText};
//     `;
//   }
// };
// Initialize the quiz containers and display categories.
setupQuizContainers();
initializeQuizCategories();
