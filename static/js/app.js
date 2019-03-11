
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
var colorKyleLtd = ['#00AC51','#55B949','#FDE9C4','#EE6325','#297B78','#48464B'];
var tUserCorrect = 0
var tMachCorrect = 0
var tTotal = 0
var dbTotal
var dbMachCorrect
var dbUserCorrect 

// Button selection logic
var b1 = d3.select("#name_1");
var b2 = d3.select("#name_2");
var b3 = d3.select("#name_3");
var b4 = d3.select("#name_4");
var b5 = d3.select("#name_5");
var b6 = d3.select("#name_6");
var submit = d3.select("#answer_button");
var selected;
var lRow = d3.select("#label_row");
var aRow = d3.select("#answer_row");
var userLabel = d3.select('#userLabel');
var correctLabel = d3.select('#correctLabel');
var machineLabel = d3.select('#machineLabel');
var userAnswer = d3.select('#userAnswer');
var correctAnswer = d3.select('#correctAnswer');
var machineAnswer = d3.select('#machineAnswer');
var stan = [0,0];
var kyle = [0,0];
var cartman = [0,0];
var butters = [0,0];
var garrison = [0,0];
var randy = [0,0];
var unk = [0,0];

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
    dbTotal = 0;
    dbUserCorrect = 0;
    dbMachCorrect = 0;
        for (var a in appData){
            dbTotal += appData[a].Count;
            dbUserCorrect += appData[a].User;
            dbMachCorrect += appData[a].Computer;
            console.log(dbTotal,dbMachCorrect,dbUserCorrect);
        };

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
    d3.select('#jigsaw').remove();
    d3.select('#jigsaw_text').remove();
    userAnswer.text('');
    correctAnswer.text('');
    machineAnswer.text('');
});




// Character Selections
$('.button').on('click', function(){
    console.log("clicked")
    $('.button').removeClass('selected');
    $(this).addClass('selected');
 });

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
    dbTotal +=1

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
            dbUserCorrect +=1


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
        dbMachCorrect +=1
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
    //if statement for appending answers
    if (character == 'Stan') {
        stan[0] += 1;
    } else if (character == 'Kyle') {
        kyle[0] += 1;
    } else if (character == 'Cartman') {
        cartman[0] += 1;
    } else if (character == 'Butters') {
        butters[0] += 1;
    } else if (character == 'Mr. Garrison') {
        garrison[0] += 1;
    } else if (character == 'Randy') {
        randy[0] += 1;
    } else {
        unk[0] +=1;
    };

    if (ml_character == 'Stan') {
        stan[1] += 1;
    } else if (ml_character == 'Kyle') {
        kyle[1] += 1;
    } else if (ml_character == 'Cartman') {
        cartman[1] += 1;
    } else if (ml_character == 'Butters') {
        butters[1] += 1;
    } else if (ml_character == 'Mr. Garrison') {
        garrison[1] += 1;
    } else if (ml_character == 'Randy') {
        randy[1] += 1;
    } else {
        unk[1] +=1;
    };


    // add rows for labels and answers
    userLabel.attr('class','col-sm-4 text-center border')
        .attr('style','color: red; font-size:24px; padding-top:10px')
        .text('Your Answer');
    correctLabel.attr('class','col-sm-4 text-center border')
        .attr('style','color: red; font-size:24px; padding-top: 10px')
        .text('Correct Answer');
    machineLabel.attr('class','col-sm-4 text-center border')
        .attr('style','color: red; font-size:24px; padding-top: 10px')
        .text('Machine Answer');

    userAnswer.attr('class','col-sm-4 text-center')
        .attr('style','font-size:18px; padding-top:10px')
        .text(character);
    correctAnswer.attr('class','col-sm-4 text-center')
        .attr('style','font-size:18px; padding-top: 10px')
        .text(doc.Character);
    machineAnswer.attr('class','col-sm-4 text-center')
        .attr('style','font-size:18px; padding-top: 10px')
        .text(ml_character);
    
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
        // makeGraph();
        quoteText.text("Let's Play a Game...")
        d3.select('#jigsaw')
            .attr('src'
            ,'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e557c74b-f5d2-4586-a936-41cffcb04282/d36h0yo-430f4a14-ca63-4493-a9fd-69e38c4c5adf.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U1NTdjNzRiLWY1ZDItNDU4Ni1hOTM2LTQxY2ZmY2IwNDI4MlwvZDM2aDB5by00MzBmNGExNC1jYTYzLTQ0OTMtYTlmZC02OWUzOGM0YzVhZGYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.H-6N3v27Q7GEo-qK1kra_b067KtS2vwYC-AJ4XREuD0')
            .attr('width','15%');
            // .attr('id','jigsaw');
        d3.select('#jigsaw_text').text('Click "Next Quote" above to generate a quote, and select the character below to guess who it is!');
    };

    function makeGraph() {
        console.log('loading graph');
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          }
        var xvars = ['Stan','Kyle','Cartman','Butters','Mr. Garrison','Randy','N/A'];   
            
        // Visuals

        var pieLabels = ['Correct','Incorrect'];
        var UserValues = [[tUserCorrect,tTotal-tUserCorrect],
                        [dbUserCorrect,dbTotal-dbUserCorrect]];
        var userPieData = [
            {
                values: UserValues[0],
                labels: pieLabels,
                type: 'pie',
                name: 'Current User Stats',
                marker: {
                    colors: colorCartman
                },
                domain: {
                    row:0,
                    column: 0
                },
                legendgroup: 'Current',
                showlegend: true

            },
            {
                values:UserValues[1],
                labels: pieLabels,
                type: 'pie',
                name: 'Overall User Stats',
                marker: {
                    colors: colorStan
                },
                domain: {
                    row: 1,
                    column: 1
                },
                legendgroup: 'Overall',
                showlegend: true

            }
        ];
        var userLayout = {
            grid: { rows: 2, columns: 2},
            title: 'User Stats: Current/Overall'
        };
        var MachValues = [[tMachCorrect,tTotal-tMachCorrect],
                        [dbMachCorrect,dbTotal-dbMachCorrect]];
        var machPieData = [
            {
                values: MachValues[0],
                labels: pieLabels,
                type: 'pie',
                name: 'Current Machine Stats',
                marker: {
                    colors: [colorKyleLtd[0],colorKyleLtd[3]]
                },
                domain: {
                    row:0,
                    column: 1
                },
                legendgroup: 'Current',
                showlegend: true

            },
            {
                values:MachValues[1],
                labels: pieLabels,
                type: 'pie',
                name: 'Overall Machine Stats',
                marker: {
                    colors: [colorKyleLtd[1],colorKyleLtd[5]]
                },
                domain: {
                    row: 1,
                    column: 0
                },
                legendgroup: 'Overall',
                showlegend: true

            }
        ];
        var machLayout = {
            grid: { rows: 2, columns: 2},
            title: 'Machine Stats: Current/Overall'
        };

        d3.select('#viz_1').text('');
        Plotly.newPlot('viz_1',userPieData,userLayout);
        console.log('DB user Correct:' + dbUserCorrect);
        console.log('DB total' + dbTotal);

        // d3.select('#viz_1').text('')
        // Plotly.newPlot('viz_1',[{
        //     values:[tUserCorrect,tTotal-tUserCorrect],
        //     labels:["Correct","Incorrect"],
        //     type: 'pie',
        //     marker: {
        //         colors: colorCartman
        //     }
        // }],
        //     {
        //         title: 'Human % Correct'           
        //     })

        d3.select('#viz_2').text('');
        Plotly.newPlot('viz_2',machPieData,machLayout);
        // Plotly.newPlot('viz_2',[{
        //     values:[tMachCorrect,tTotal-tMachCorrect],
        //     labels:["Correct","Incorrect"],
        //     type: 'pie',
        //     marker: {
        //         colors: colorStan
        //     } 
        // }],
        //     {
        //         title: 'Machine % Correct'
        //     });

        d3.select('#viz_3').text('')
        
        var userValue = [stan[0],kyle[0],cartman[0],butters[0],garrison[0],randy[0],unk[0]];
        var machineValue = [stan[1],kyle[1],cartman[1],butters[1],garrison[1],randy[1],unk[1]];
    
        var trace1 = {
            x: xvars,
            y: userValue,
            name: 'User Count',
            type: 'bar',
            text: userValue.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: colorKyleLtd[5]
            }
          };
          var trace2 = {
            x: xvars,
            y: machineValue,
            name: 'Machine Count',
            type: 'bar',
            text: machineValue.map(String),
            textposition:'auto',
            hoverinfo: 'none',
            marker: {
                color: colorCartman[0]
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