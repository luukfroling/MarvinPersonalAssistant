/* tarted on the 8th of januari 2018.
*  A class to store all the functions for the API calls.
*  API key = appid=5274b9fbb9b79e2751717ecb18f68636
*/

class Weather {
  //Get the temperature for a specific city:
  getTemp(city = 'Eindhoven', voice){
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=5274b9fbb9b79e2751717ecb18f68636';
    let APIdata = loadJSON(url, Weather.giveResponse);
  }
  //Get overall weather. This is just a matter of what information we put into our neural network.
  getWeather(city){

  }
  //Get the weather forecast. up to 5 days every 3 hours.
  getForecast(city, time = false){ //TODO time.

  }

  static giveResponse(){
    let temp = Math.round(APIdata.main.temp);
    fill(255);
    textSize(75);
    text(temp.toString() + "°", 100, 100);
    voice.speak("the weather in eindhoven is" + temp.toString() + "degrees");
    //TODO call neural network giving response.
  }
}
