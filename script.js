document.addEventListener('DOMContentLoaded', function() {        
		let counter = 0;
        let intervalId;
		let time = null;
        let pressed = false;
        let fastest = 1000;

		

        function startCounting() {
            const interval = 4;
            if (intervalId) {
                stopCounting();
            }
            
            intervalId = setInterval(() => {
                time += 4;
                if(time >= 1000){
                    if(counter.toString().includes('7') || counter % 7 === 0 && counter != 0){
                        if(pressed == false){
                        stopCounting();
                        document.getElementById("time").innerText = "Przegrałeś\nNajszybszy czas reakcji: " + fastest;
                        }
                    } else {
                        pressed = false;
                    }
                    counter++;
                    document.getElementById("counter").innerText = counter;
                    time = 0;
                }
            }, interval);
        }

        function stopCounting() {
            clearInterval(intervalId);
        }
        document.getElementById("start").addEventListener('click', startCounting);
        document.getElementById("stop").addEventListener('click', stopCounting);
		document.getElementById("addScore").addEventListener('click', addToList);
		document.getElementById("dzik").addEventListener('click', function(){

			if(counter.toString().includes('7') || counter % 7 === 0 && counter != 0){
                if(time < fastest){
                    fastest = time;
                }
				document.getElementById("time").innerText = "Najszybszy czas reakcji: " + fastest;
                pressed = true;
			} else{
                time = 1000;
                stopCounting();
				document.getElementById("time").innerText = "Przegrałeś\nNajszybszy czas reakcji: " + fastest;
			}
		});
        function addToList(){
            inputText = document.getElementById("inputText").value;
            if(inputText === ""){
                alert("Proszę podać imie!");
                return;
            }
			scoreList = document.getElementById("scoreList");
			existingItems = Array.from(scoreList.getElementsByTagName("li"));
			exists = existingItems.some(item => item.textContent === fastest + " - " + inputText);
			if(exists){
				alert("Taki wynik jest już dodany");
				return;
			}
			
            if(fastest == 1000){
                return;
            }
            listItem = document.createElement("li");
            listItem.textContent = fastest + " - " + inputText;
            scoreList.appendChild(listItem);


        }        
}); 