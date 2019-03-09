



answerSubmit = d3.select('#answer_button');

answerSubmit.on("click",buttonClick);


function buttonClick() {
    var newVar;
    console.log('click');
    d3.queue()
    .defer(d3.json,'/characters')
    .await(response);
    function response (error, charData) {
        // console.log(charData);
        // console.log(charData.length);
        var totalCharacters = charData.length;
        for (c in charData){
            // console.log(charData[c]);
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

    d3.select('#bar').text('')
    Plotly.newPlot('bar',[{
        x: xvars,
        y:[getRandomInt(5)
            ,getRandomInt(5)
            ,getRandomInt(5)
            ,getRandomInt(5)
            ,getRandomInt(5)
            ,getRandomInt(5)],
        type:'bar'
        }],
        {
            title: 'Count of Selections by Character',
            yaxis: {
                title: 'Number of Selections'
            },
            xaxis: {
                title: 'Character'
            }
        });

    d3.select('#pie').text('')
    Plotly.newPlot('pie',[{
        values:[getRandomInt(25),getRandomInt(25)],
        labels:["Human","Machine"],
        type: 'pie'
        // name: 'Plot 2',
        // mode: 'lines'    
    }],
        {
            title: 'Human vs Machine',
            // yaxis: {
            //     title: 'Y-Axis'
            // },
            // xaxis: {
            //     title: 'X-Axis'
            // }
        })

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