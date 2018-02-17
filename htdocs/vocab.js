/* file created on 10/02/2018
*  A library with functions regarding the words we can put into the network.
*/

class vocab {
  constructor(){
    this.words = new Array();
    this.trainingData = new Array();
  }

  /* We will need a function to evaluate wether there are any new words
  *  being passed as an input. If not recognized, we need to call the neural network
  *  to change the input sizes.
  *  nn stand for neural network. The network which we give the words as input.
  */

   evaluate(input, nn){
    let subInput = input.split(" ");
    for(let i = 0; i < subInput.length; i++){
      if(this.words.indexOf(subInput[i]) == -1){
        this.words.push(subInput[i]);

        //Loop through all the inputs to add 0's
        if(this.trainingData.length > 0){
          for(let j = 0; j < this.trainingData.length; j++){
            for(let k = 0; k < this.trainingData[j][0].length; k++){
              this.trainingData[j][0][k].push(0);
            }
          }
        }

        nn.addInput();
      }
    }
  }
/* A function which takes a string as input and will split it up.
* We can take the size of the words.length because the NeuralNetwork will be adapted
* To the input length.
*/

  createData(input){
    let subInput = input.split(" ");
    let result = new Array();
    for(let i = 0; i < subInput.length; i++){
      let temp = new Array(this.words.length);
      temp.fill(0);
      temp[this.words.indexOf(subInput[i])] = 1;
      result.push(temp);
    }
    return result;
  }

  static fromJSON(data){
    let result = new vocab();

    result.words = data.words;
    result.trainingData = data.trainingData;
    
    return result;
  }
  /* Just to show the words in a nice table.
  */

  show(){
    console.table(this.words);
  }
}
