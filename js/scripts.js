// Declaração variáveis
const question       = document.querySelector("#question");
const answersBox     = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters        = ["a", "b", "c", "d"];
let points           = 0;
let actualQuestion   = 0;


// Perguntas
const questions = [
  {
    "question": "Quem criou o CSS?",
    "answers": [
      {
        "answer": "Brendan Eich",
        "correct": false
      },
      {
        "answer": "Guido van Rossum",
        "correct": false
      },
      {
        "answer": "Tim Berners-Lee",
        "correct": false
      },
      {
        "answer": "Håkon Wium Lie e Bert Bos",
        "correct": true
      },
    ]
  },
  {
    "question": "Quem criou o HTML?",
    "answers": [
      {
        "answer": "Brendan Eich",
        "correct": false
      },
      {
        "answer": "Guido van Rossum",
        "correct": false
      },
      {
        "answer": "Tim Berners-Lee",
        "correct": true
      },
      {
        "answer": "Bill gates",
        "correct": false
      },
    ]
  },
  {
    "question": "Quem criou o JavaScript?",
    "answers": [
      {
        "answer": "Brendan Eich",
        "correct": true
      },
      {
        "answer": "Guido van Rossum",
        "correct": false
      },
      {
        "answer": "Steve Jobs",
        "correct": false
      },
      {
        "answer": "Bill gates",
        "correct": false
      },
    ]
  },
  {
    "question": "Python foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "Front-end",
        "correct": false
      },
      {
        "answer": "Back-end",
        "correct": true
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de class no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": false
      },
      {
        "answer": ".",
        "correct": true
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
  {
    "question": "PHP foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "Back-end",
        "correct": true
      },
      {
        "answer": "Front-end",
        "correct": false
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar variável em JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de id no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
  {
    "question": "O que é um algoritmo?",
    "answers": [
      {
        "answer": "São ações ditas ao computador para ele executar",
        "correct": false
      },
      {
        "answer": "É a solução de um problema",
        "correct": false
      },
      {
        "answer": " conjunto de instruções para se chegar a um determinado objetivo",
        "correct": true
      },
      {
        "answer": "Permite realizar operações lógicas e aritméticas utilizando apenas dois dígitos",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual linguagem de programação se usa no Fron-End e no Back-End?",
    "answers": [
      {
        "answer": "HTML",
        "correct": false
      },
      {
        "answer": "CSS",
        "correct": false
      },
      {
        "answer": "Python",
        "correct": false
      },
      {
        "answer": "JavaScript",
        "correct": true
      },
    ]
  },
]




// Substituição do quizz para a primeria pergunta
function init() {


  // Criar a primeira pergunta
  createQuestion(0);


}

// Cria uma pergunta
function createQuestion(i) {


  // Limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll("button");


  oldButtons.forEach(function(btn) {
    btn.remove();


  });


  // Alterar o texto da pergunta
  const questionText   = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");


  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;


  // Insere as alternativas
  questions[i].answers.forEach(function(answer, i) {


    // Cria o template do botão do quizz
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);


    const letterBtn  = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");


    letterBtn.textContent  = letters[i];
    answerText.textContent = answer['answer'];


    answerTemplate.setAttribute("correct-answer", answer["correct"]);


    // Remover hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");


    // Inserir a alternativa na tela
    answersBox.appendChild(answerTemplate);


    // Inserir um evento de click no botão
    answerTemplate.addEventListener("click", function() {
      checkAnswer(this);
    });


  });


  // Incrementar o número da questão
  actualQuestion++;


}


// Verificando resposta do usuário
function checkAnswer(btn) {


  // Selecionar todos botões
  const buttons = answersBox.querySelectorAll("button");


  // Verifica se a resposta está correta e adiciona classes nos botões
  buttons.forEach(function(button) {


    if(button.getAttribute("correct-answer") === "true") {


      button.classList.add("correct-answer");


      // Checa se o usuário acertou a pergunta
      if(btn === button) {


        // Incremento dos pontos
        points++;


      }

    } else {


      button.classList.add("wrong-answer");


    }

  });


  // Exibir próxima pergunta
  nextQuestion();


}


// Exibie a próxima pergunta no quizz
function nextQuestion() {


  // Timer para usuário ver as respostas
  setTimeout(function() {


    // Verifica se ainda há perguntas
    if(actualQuestion >= questions.length) {


      // Apresenta a msg de sucesso
      showSucccessMessage();
      return;


    }


    createQuestion(actualQuestion);


  }, 700);


}


// Exibe a tela final
function showSucccessMessage() {


  hideOrShowQuizz();


  // Trocar dados da tela de sucesso


  // Calcular o score
  const score = ((points / questions.length) * 100).toFixed(2);


  const displayScore = document.querySelector("#display-score span");


  displayScore.textContent = score.toString();


  // Alterar o número de perguntas corretas
  const correctAnswers       = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;


  // Alterar o total de perguntas
  const totalQuestions       = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;


}


// Mostra ou esconde o score
function hideOrShowQuizz() {

  
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");


}


// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");


restartBtn.addEventListener("click", function() {


  // Zerar o jogo
  actualQuestion = 0;
  points         = 0;
  hideOrShowQuizz();
  init();


});


// Inicialização do Quizz
init();