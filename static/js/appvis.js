



answerSubmit = d3.select('#answer_button');

answerSubmit.on("click",buttonClick);

colorCartman = ['#00B8C4','#FFE11D','#FFEEC3','#EE3253'
        ,'#844D38','#302E3C'];
colorStan = ['#4D7DBD','#EE324B','#FFEBC0','#DF8A7A'
        ,'#4E4648'];
colorKyleLtd = ['#297B78','#48464B']

function buttonClick() {
    var newVar;
    console.log('click');
    d3.queue()
    .defer(d3.json,'/characters')
    .await(response);
    function response (error, charData) {
        var totalCharacters = charData.length;
        for (c in charData){
            if(charData[c].Character.Name == 'Stan Marsh') {
                console.log('Success!');
                break
            };
        };
    };
    console.log('makeGraph');
    makeGraph();
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
        values:[getRandomInt(25),getRandomInt(25)],
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
        values:[getRandomInt(25),getRandomInt(25)],
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

function init() {
    var char1 = d3.select("#name_1");
    var char2 = d3.select("#name_2");
    var char3 = d3.select("#name_3");
    var char4 = d3.select("#name_4");
    var char5 = d3.select("#name_5");
    var char6 = d3.select("#name_6");
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
                char1.text('Stan');
                char1.append("img")
                    .attr('src', stan)
                    .attr('width','100%');
            } else if (cName == 'Kyle Broflovski') {
                var kyle = cImg
                char2.text('Kyle');
                char2.append("img")
                    .attr('src', kyle)
                    .attr('width','100%');
            } else if (cName == 'Eric Cartman') {
                var cartman = cImg;
                char3.text('Cartman');
                char3.append("img")
                    .attr('src', cartman)
                    .attr('width','100%');
            } else if (cName == 'Butters Stotch') {
                var butters = cImg
                char4.text('Butters');
                char4.append("img")
                    .attr('src', butters)
                    .attr('width','100%');
            } else if (cName == 'Herbert Garrison') {
                var garrison = cImg
                char5.text('Mr. Garrison');
                char5.append("img")
                    .attr('src', garrison)
                    .attr('width','100%');
            } else if (cName == 'Randy Marsh') {
                var randy = cImg
                char6.text('Randy');
                char6.append("img")
                    .attr('src', randy)
                    .attr('width','100%');
            } else {
                
            };
            };
            // console.log(stan,kyle,cartman,butters,garrison,randy)
        };
        makeGraph();
        
        
    };


// console.log(charData);
  // console.log(data)



// d3.select('name_1').text('');
// d3.select('name_1').attr('img')
//     .data(

init();