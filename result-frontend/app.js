var bg1 = $('#background-stats-1');
var bg2 = $('#background-stats-2');
var valueA = $('#a'); 
var valueB = $('#b'); 
var total = $('#result'); 

function animateStats (a,b){
    console.log('**************animateStats inside******************');          
    if(a + b > 0){
        console.log('******* a+b>0*************');          
        var percentA = a/(a+b)*100;
        var percentB = 100-percentA;
        bg1.width((percentA-0.3)+"%");
        bg2.width(percentB+"%");
    }
}

function updateScores (){
    console.log('------------UPDATE SCORES FUNCTION--------------------')
    $.get("https://5y7dfynd34.execute-api.us-east-1.amazonaws.com/results", null, function(result,status){
        if ("success" == status) {
            console.log('****************success***************************');          
            console.log(result);

            data = JSON.parse(result);
            var a = parseInt(data.a || 0);
            var b = parseInt(data.b || 0);
            
            console.log('**********ANIMATE STATS*************');
            animateStats(a, b);
        
            if(a + b > 0){
                valueA.text(Math.round((a/(a+b) * 100) * 10) / 10 + "%");
                valueB.text(Math.round((b/(a+b) * 100) * 10) / 10 + "%");
                total.text("total votes: " + (a + b))
            }
        } else {
            console.log(result);
        }
    });
}

$.ajaxSetup({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
document.body.style.opacity=1;
console.log('------------main html inside--------------------')

updateScores();

setInterval(function() {
    console.log('------------set interval inside--------------------')
    updateScores();
}, 3000);
