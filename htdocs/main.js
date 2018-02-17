/* file from 10/02/2018
*  Main file for the personal assistant. AKA marvin or apollo.
*  First we create a couple of objects we need later.
*/

/* gui we use to draw to the window, weather is connected to openweathermap,
*  vocabulary is where we store all the words (data), ears listens, voice speaks,
*  brain is connected to the neural network and trainingdata
*/

let gui;
let weather = new Weather();
let vocabulary = new vocab();
let ears;
let voice;
let brain;
let trainingData = new Array();
let training = true;
let end = false;
let init = 0;
let brainData; let vocabData;

/* The preload function so that the program does not start without having loaded
*  all the files/objects needed to run properly.
*/

function preload(){
  vocabData = loadJSON("PHPhandlers/vocab.json", initVocab, initNewVocab);
  brainData = loadJSON("PHPhandlers/neuralnetwork.json", initNetwork, initNewNetwork);
}

/* The setup function. P5.js functions and objects must be inside setup or draw.
*  This is a must because they will not work otherwise.
*/

function setup(){
  gui = new graphicInterface();
  voice = new p5.Speech();
  voice.setVoice(5);
  voice.setRate(0.8);
  voice.setLang('en-US');
  ears = new p5.SpeechRec('en-US');
  ears.onResult = resultMain;
  ears.onEnd = ending
  ears.start(true, false);
}

/* As resultMain will be called whenever a voice input is detected,
*  we can mostly write the core part of the program in here.
*  After we take the input we need to process it in the network.
*  First we process the data in the vocab class.
*  Use the confirm() and prompt() to get user interaction data.
*  We will use the draw function for things like overall training.
*/

function resultMain(){
  //Setup:
  let result = ears.resultString;
  console.log("updated");
  fill(255);
  background(0);
  textSize(40);
  text(result, 100, 250);
  console.log(brain);
  vocabulary.evaluate(result, brain);
  let textInput = vocabulary.createData(result);

  //Process:
  let resultNetwork = brain.runResult(textInput);
  console.log("the result = " + resultNetwork);


  //Evaluate for training:
  if(training){
    let desired = Number(prompt("What should it be? 1: the weather, 2: clear screen, 3:stop listening"));

    let output = new Array(brain.netconfig[2]);
    output.fill(0);

    switch(desired) {
      case 1:
      output[desired] = 1;
      break;
      case 2:
      output[desired] = 1;
      break;
      case 3:
      output[desired] = 1;
      break;
      case 4:
      output[desired] = 1;
      break;
      default:
      output[0] = 1;
      break;
    }

    let temp = new Array();
    temp.push(textInput);
    temp.push(output);
    vocabulary.trainingData.push(temp);
    delete temp;

    resultNetwork = output;
    safeJSON(vocabulary, "PHPhandlers/vocab.php");
    safeJSON(brain, "PHPhandlers/neuralnetwork.php");

  }

  //Make a move based on the result:
  let action = resultNetwork.indexOf(1);
  switch(action){
    case 1:
    weather.getTemp("Eindhoven", voice);
    break;
    case 2:
    background(0);
    break;
    case 3:
    end = true;
    break;
  }

}

//So whenever we press the arrow up we want to stop training, arrow down we want to continue.
function keyPressed(){
  if (keyCode === LEFT_ARROW) {
    training = true;
  } else if (keyCode === RIGHT_ARROW) {
    training = false;
  }
}

function draw(){
  for(let i = 0; i < vocabulary.trainingData.length; i++){
    brain.train(vocabulary.trainingData[i][0], vocabulary.trainingData[i][1]);
  }
}

/* Function called when the speech recognizer stops working:
*/

function ending(){
  if(!end){
    ears.start(true, false);
  } else {
    voice.speak("Goodbye");
  }
}

function safeJSON(data, path){
  console.log("safing!");
  jsonString = JSON.stringify(data);
  $.ajax({
    url: path,
    data : {'jsonString':jsonString},
    type: 'POST'
  });
}

function initVocab(){
  vocabulary = vocab.fromJSON(vocabData);
  console.log(vocabulary);
}

function initNewVocab(){
  let vocabulary = new vocab();
  safeJSON(vocabulary, "PHPhandlers/vocab.php");
  console.log(vocabulary);
}

function initNetwork(){
  brain = neuralNetwork.fromJSON(brainData);
  console.log(brain);
}

function initNewNetwork(){
  let brain = new neuralNetwork([0,100,5]);
  safeJSON(brain, "PHPhandlers/neuralnetwork.php");
  console.log(brain);
}


/* A function we can use to check wether the specific input has been passed as an
*  input before so we can see if we need to add it to the data.
*  This function did not really belong to a class so I decided to write a normal one.
*  First we loop through all the trainingData, then because it is recurrent we get the sequence out for further checks.
* TODO finish when less braindead.
*/

// function checkInput(input){
//   let found = true;
//   for(let i = 0; i < trainingData.length; i++){
//     let checkdata = trainingData[i][0];
//     for(let j = 0; j < checkData.length; j++){
//       for(let k = 0 k < checkData[j].length; k++){
//         if(checkData[j][k] !== input[j][k]){
//           found = false;
//         }
//       }
//     }
//   }
//   return found;
// }


/* TODO: Make an array with all the actions corresponding to the output of the network.
*  TODO: Make a system which can come up with actions themselfs.
*/

/* TODO: Actions:
* - Weather:
*   -Get weather in eindhoven.
*   -Get weather tomorrow.
*   -Raining.
*   -Rain tomorrow:
* -Music:
*   -Spotify.
*   -Youtube.
*   -Playlist.
* - Youtube Videos:
*   -Video.
*   -Music.
* - News:
*   -English newspapers (makes it easier for googles vocie).
* - Alarm:
*   -Timer.
*   -Alarm.
*/
