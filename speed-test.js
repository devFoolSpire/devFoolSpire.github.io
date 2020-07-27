$(document).ready(function() {

    var originalText = document.querySelector("#origin-text p").innerHTML;
    
    let req = new XMLHttpRequest();
    var content;

    req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {

        content = JSON.parse(req.responseText);
        //console.log(content);
        // random = Math.floor(Math.random() * 5);  
        // originalText = content[random].text;
        // document.querySelector('#origin-text h3').innerHTML = "TOPIC : " + content[random].category;
        // document.querySelector("#origin-text p").innerHTML = originalText;

    }
    };

    req.open("GET", "https://api.jsonbin.io/b/5f18049bc58dc34bf5d86dc7/2", true);
    req.setRequestHeader("secret-key", "$2b$10$DPrnLP4OXkXIJHTnv1xyOuNp1A/9b.C28jmXAZGy8F/BZjczbDag.");
    req.send();
    
    // console.log(req);

    // document.onload = function () {
    //     console.log("after conn");
    // }

    const testWrapper = document.querySelector("#test-wrapper");
    const testArea = document.querySelector("#test-area");
    //const originalText = document.querySelector("#origin-text p").innerHTML;
    const resetButton = document.querySelector("#reset");
    const theTimer = document.querySelector("#timer");
    const speed = document.querySelector('#wordPerMin');
    const errors = document.querySelector('#errorsPerMin');
    
    // console.log(testWrapper);
    // console.log(testArea);
    // console.log(originText);
    // console.log(resetButton);
    // console.log(theTimer);
    // console.log(errors);
    // originalText = content[0].text;
    
    
    
    
    var timer = [0,0,0,0];
    var interval;
    var timerRunning = false;
    
    //variables fun func speed
    var textCount = 0;
    var errorsCount = 0;
    
    // Add leading zero to numbers 9 or below (purely for aesthetics):
    function leadingZero(time) {
        if (time <= 9) {
            time = "0" + time;
        }
        return time;
    }
    
    // Run a standard minute/second/hundredths timer:
    function runTimer() {
        let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
        theTimer.innerHTML = currentTime;
        timer[3]++;
    
        timer[0] = Math.floor((timer[3]/100)/60);
        timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
        timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
    }
    
    // Match the text entered with the provided text on the page:
    function spellCheck() {
        originText = originalText.trim();
    
        let textEntered = testArea.value;
        let originTextMatch = originText.substring(0,textEntered.length);
    
        if (textEntered == originText) {
            clearInterval(interval);
            stopKeyboard();
            testWrapper.style.borderColor = "#429890";
        } else {
            if (textEntered == originTextMatch) {
                testWrapper.style.borderColor = "#65CCf3";
    
                textCount = originTextMatch.split(" ").length;
                testSpeed(textCount,timer[0]);
            } else {
                testWrapper.style.borderColor = "#E95D0F";
    
                errorsCount++;
                showErrors(errorsCount,timer[0]);
            }
        }
    }
    
    //Stop keyboard input after success
    function stopKeyboard(){
        document.onkeydown = function(e) {
            return false;
        }
        // testArea.addEventListener("keydown", function(event){
        //     event.preventDefault();
        //     return false;
        // });
    }
    
    
    // Start the timer:
    function start() {
        let textEnterdLength = testArea.value.length;
        if (textEnterdLength === 0 && !timerRunning) {
            timerRunning = true;
            interval = setInterval(runTimer, 10);
        }
    }
    
    // Reset everything:
    function reset() {
        clearInterval(interval);
        interval = null;
        timer = [0,0,0,0];
        timerRunning = false;
    
        testArea.value = "";
        theTimer.innerHTML = "00:00:00";
        testWrapper.style.borderColor = "#85cdcb";
        
        testCount = 0;
        errorsCount = 0;
        speed.innerHTML = "0";
        errors.innerHTML = "0";
    
       //to enable keyoard again
       document.onkeydown = function (e) {
           return true;
       }

       //reset original text
        random = Math.floor(Math.random() * 18);  
        originalText = content[random].text;
        document.querySelector('#origin-text h3').innerHTML = "TOPIC : " + content[random].category;
        document.querySelector("#origin-text p").innerHTML = originalText;
    }
    
    // Typing Speed
    function testSpeed(textCount,min) {
        textCount = textCount - 1;
        min = min + 1;
        var s = textCount/min;
        speed.innerHTML = s + "";
    }
    
    //errors count
    function showErrors(errorsCount,min){
        min = min + 1;
        var s = errorsCount/min;
        errors.innerHTML = s + "";
    }
    
    
    
    // Event listeners for keyboard input and the reset
    testArea.addEventListener("keydown", start, false);
    testArea.addEventListener("keyup", spellCheck);
    resetButton.addEventListener("click", reset, false);
    


});
  

   
    
    
