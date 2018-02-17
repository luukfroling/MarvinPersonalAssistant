class graphicInterface {
  constructor(){
    var fs = fullscreen();
    fullscreen(!fs);
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);

  }
}
