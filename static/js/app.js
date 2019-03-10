
// Variables
var newQuote = d3.select("#shuffle_button");
var quoteText = d3.select("#quote");
var msgCon = d3.select('#scroll_container')
var doc; 
var quote;
var ml_character;
var javascript_data = {};
var colorCartman = ['#00B8C4','#FFE11D','#FFEEC3','#EE3253'
        ,'#844D38','#302E3C'];
var colorStan = ['#4D7DBD','#EE324B','#FFEBC0','#DF8A7A'
        ,'#4E4648'];
var colorKyleLtd = ['#297B78','#48464B'];
var tUserCorrect = 0
var tMachCorrect = 0
var tTotal = 0

// Button selection logic
var b1 = d3.select("#name_1");
var b2 = d3.select("#name_2");
var b3 = d3.select("#name_3");
var b4 = d3.select("#name_4");
var b5 = d3.select("#name_5");
var b6 = d3.select("#name_6");
var submit = d3.select("#answer_button");
var selected;

// New Quote Button
newQuote.on("click", function() {
    
    console.log("buttonClick");
    d3.queue()
    .defer(d3.json, "/quotes")
    .await(insertQuote);
    function insertQuote (error,appData) {
        
        
    console.log( appData.length);
    var totalQuotes = appData.length;
    var rand = Math.floor((Math.random() * totalQuotes) + 1);
    console.log(rand);
    console.log(appData);
   
        for (var q in appData){
            // console.log(appData[q].key);
        
        if (appData[q].key== rand){
            doc = appData[q];
            quote = appData[q].Line;
            console.log(quote);
            // console.log(document);
            quoteText.text(quote);

                            
            // Python model results
            console.log("/ml/"+quote);
            d3.queue()
            .defer(d3.json, "/ml/"+quote)
            .await(callbackFunc);


            function callbackFunc(error,response) {
            // do something with the response
            
            ml_character = response.quote;
            console.log(ml_character);

            }

            break;
        };
    };
};
d3.select('#jigsaw').remove()
    
  });




// Character Selections

b1.on("click",function(){
    selected = 1;
    character = 'Stan';
  });
b2.on("click",function(){
    selected = 2;
    character = 'Kyle';
});
b3.on("click",function(){
    selected = 3;
    character = 'Cartman';
});
b4.on("click",function(){
    selected = 4;
    character = 'Butters';
});
b5.on("click",function(){
    selected = 5;
    character = 'Mr. Garrison';
});
b6.on("click",function(){
    selected = 6;
    character = 'Randy';
});

// Submit Button
submit.on("click",function(){
tTotal +=1

console.log(doc);
console.log(selected);
//  Update User Counts
    if (doc.Character == character){
        console.log('character match');
        // if(isNaN(doc.User) ){
        //     console.log('nan');
        //     doc.User = 1
        // }
        // else {
        // doc.User = doc.User + 1
        doc.User += 1
        tUserCorrect +=1
        


    // };
        
    };
// Update computer Counts
if (doc.Character == ml_character){
    console.log('Computer match');
//     if(isNaN(doc.Computer) ){
//         console.log('nan');
//         doc.Computer = 1
//     }
//     else {
//     doc.Computer = doc.Computer + 1
// };
    doc.Computer +=1
    tMachCorrect +=1
};
// Update Total Counts
// if(isNaN(doc.Count) ){
//     doc.Count = 1
// }
// else {
doc.Count = doc.Count + 1
// };


console.log(doc);
// Update mongo
// $.post( "/postdata", {
//     // javascript_data: {'document':doc }
//     javascript_data: [doc]
// });
$.ajax({    
    url :  '/postdata',
    dataType: 'json',
    data: JSON.stringify({
        javascript_data: doc
       }),
    type : "POST",
    contentType: 'application/json;charset=UTF-8'

});
makeGraph();
});

function init() {
    
    d3.select("#bar").text('');
    d3.select("#pie").text('');

    d3.queue()
        .defer(d3.json,'/characters')
        .await(getData);
    function getData (error,charData) {
        for (c in charData){
            cName = charData[c].Character.Name
            cImg = charData[c].Character.Image
            if(cName == 'Stan Marsh') {
                var stan = cImg;
                b1.text('Stan');
                b1.append("img")
                    .attr('src', stan)
                    .attr('width','100%');
            } else if (cName == 'Kyle Broflovski') {
                var kyle = cImg
                b2.text('Kyle');
                b2.append("img")
                    .attr('src', kyle)
                    .attr('width','100%');
            } else if (cName == 'Eric Cartman') {
                var cartman = cImg;
                b3.text('Cartman');
                b3.append("img")
                    .attr('src', cartman)
                    .attr('width','100%');
            } else if (cName == 'Butters Stotch') {
                var butters = cImg
                b4.text('Butters');
                b4.append("img")
                    .attr('src', butters)
                    .attr('width','100%');
            } else if (cName == 'Herbert Garrison') {
                var garrison = cImg
                b5.text('Mr. Garrison');
                b5.append("img")
                    .attr('src', garrison)
                    .attr('width','100%');
            } else if (cName == 'Randy Marsh') {
                var randy = cImg
                b6.text('Randy');
                b6.append("img")
                    .attr('src', randy)
                    .attr('width','100%');
            } else {
                
            };
            };
        };
        makeGraph();
        quoteText.text("Let's Play a Game")
        msgCon.append('img')
            .attr('src'
            ,'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e557c74b-f5d2-4586-a936-41cffcb04282/d36h0yo-430f4a14-ca63-4493-a9fd-69e38c4c5adf.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U1NTdjNzRiLWY1ZDItNDU4Ni1hOTM2LTQxY2ZmY2IwNDI4MlwvZDM2aDB5by00MzBmNGExNC1jYTYzLTQ0OTMtYTlmZC02OWUzOGM0YzVhZGYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.H-6N3v27Q7GEo-qK1kra_b067KtS2vwYC-AJ4XREuD0')
            .attr('width','25%')
            .attr('id','jigsaw');

        
        
    };

    function makeGraph() {
        console.log('loading graph');
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          }
        var xvars = ['Kyle','Stan','Cartman','Randy','Mr. Garrison','Butters'];   
        var yvars = [];
    
        // Visuals
    
        d3.select('#viz_1').text('')
        Plotly.newPlot('viz_1',[{
            values:[tUserCorrect,tTotal-tUserCorrect],
            labels:["Correct","Incorrect"],
            type: 'pie',
            marker: {
                colors: colorCartman
            }
        }],
            {
                title: 'Human % Correct'           
            })
        d3.select('#viz_2').text('')
        Plotly.newPlot('viz_2',[{
            values:[tMachCorrect,tTotal-tMachCorrect],
            labels:["Correct","Incorrect"],
            type: 'pie',
            marker: {
                colors: colorStan
            } 
        }],
            {
                title: 'Machine % Correct'
            })
        d3.select('#viz_3').text('')
        
        var yValue = [getRandomInt(5)
            ,getRandomInt(5)
            ,getRandomInt(5)
            ,getRandomInt(5)
            ,getRandomInt(5)
            ,getRandomInt(5)];
        var y2Value = [getRandomInt(5)
            ,getRandomInt(5)
            ,getRandomInt(5)
            ,getRandomInt(5)
            ,getRandomInt(5)
            ,getRandomInt(5)];
    
        var trace1 = {
            x: xvars,
            y: yValue,
            name: 'User Count',
            type: 'bar',
            text: yValue.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: colorKyleLtd[0]
            }
          };
          var trace2 = {
            x: xvars,
            y: y2Value,
            name: 'Machine Count',
            type: 'bar',
            text: y2Value.map(String),
            textposition:'auto',
            hoverinfo: 'none',
            marker: {
                color: colorKyleLtd[1]
            }
          };
        var barData = [trace1,trace2]
        var barLayout = {barmode: 'stack',title: 'Count of Selections by Character'
                        ,yaxis:{
                            title: 'Number of Selections'
                        },
                        xaxis:{
                            title: 'Character',
                            tickangle: -45
                        }}
    
        Plotly.newPlot('viz_3',barData,barLayout);
    
    };
    

//initialize
init();