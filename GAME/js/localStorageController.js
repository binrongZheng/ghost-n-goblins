var platformer = platformer || {};

platformer.localStorageController = {
    
    //Check if browser has localStorage
    checkLocalStorage:function(){
        return ('localStorage' in window) && window['localStorage']!==null;
    },
    
    /*Esta función actualiza las puntuaciones de gameOptions.highScores (es un array ordenado)
      Las puntuaciones estan en objetos que siempre tendrán las propiedades 'name' y 'score' */
    readScores:function(){
        var testScores      = '[{"name":"JEFFK","score":10000},{"name":"ADOLF","score":3000},{"name":"RADEV","score":0}]';
        var defaultScores   = '[{"name":"RADEV","score":0}]';
        var result;
        
        if(this.checkLocalStorage()){
            if(localStorage["highscores"]==null){                //si no hi ha cap puntuació guardada
                localStorage["highscores"] = defaultScores;
            }
            savedScores = localStorage["highscores"];
            result = JSON.parse(savedScores);
        } else{
            result = JSON.parse(defaultScores);                 //si no tenim localStorage, carreguem el default
        }
        gameOptions.highScores = result;
        gameOptions.topScore = result[0].score;
    },
    
    //Guarda la nueva puntuacion en gameOptions.topScore i gameOptions.highScores, y luego en el localStorage si puede
    saveNewScore:function(newScore){
        //Comprovar si no hem arribat al tope de 10 scores (s'afegeix automaticament)
        if(gameOptions.highScores.length < 10){
            gameOptions.highScores.push({"name":gameOptions.userName,"score":newScore});
            
        //Si hi han 10 scores, comprovar que com a mínim és superior a la pitjor score
        }else{
            var lastScore = gameOptions.highScores[gameOptions.highScores.length-1];
            if(lastScore.score < newScore){
                gameOptions.highScores.pop();
                gameOptions.highScores.push({"name":gameOptions.userName,"score":newScore});
            }
        }
        
        //Ordenar les scores (de més gran a més petit)
        gameOptions.highScores.sort(function(a, b){
            return b.score-a.score;
        });
        
        //Guardar-les
        if(this.checkLocalStorage()){
            localStorage["highscores"] = JSON.stringify(gameOptions.highScores);
        }
    }
}


