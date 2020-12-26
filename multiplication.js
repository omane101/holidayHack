(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "What is 2 x 2?",
        answers: {
          a: "6",
          b: "2",
          c: "4"
        },
        correctAnswer: "c"
      },
      {
        question: "What is 2 x 4",
        answers: {
          a: "32",
          b: "18",
          c: "8"
        },
        correctAnswer: "c"
      },
      {
        question: "What is 2 x 9",
        answers: {
          a: "34",
          b: "4",
          c: "10",
          d: "18"
        },
        correctAnswer: "d"
      },
      {
        question: "What is 2 x 5?",
        answers: {
          a: "7",
          b: "3",
          c: "10"
        },
        correctAnswer: "c"
      },
      {
        question: "What is 2 x 11",
        answers: {
          a: "22",
          b: "9",
          c: "15"
        },
        correctAnswer: "a"
      },
      {
        question: "What is 2 x 8",
        answers: {
          a: "10",
          b: "16",
          c: "12",
          d: "32"
        },
        correctAnswer: "b"
      },
      {
        question: "What is 2 x 10?",
        answers: {
          a: "8",
          b: "12",
          c: "20"
        },
        correctAnswer: "c"
      },
      {
        question: "What is 2 x 6",
        answers: {
          a: "12",
          b: "15",
          c: "27"
        },
        correctAnswer: "a"
      },
      {
        question: "What is 2 x 3",
        answers: {
          a: "15",
          b: "3",
          c: "9",
          d: "6"
        },
        correctAnswer: "d"
      },
      {
        question: "What is 2 x 0",
        answers: {
          a: "34",
          b: "0",
          c: "10",
          d: "20"
        },
        correctAnswer: "b"
      }

    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  