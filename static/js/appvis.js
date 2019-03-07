// test = document.getElementById('bar');

metadataURL = "/characters"
d3.json(metadataURL),function(data){
    console.log(data);
};
// console.log('Stan Marsh');
// Object.entries(data).forEach(function([k,v]) {
//     console.log(v);

// });

d3.select('#bar').text('')
Plotly.plot('bar',[{
    x:[1,2,3,4,5],
    y:[1,4,6,8,15]
    }],
    {
        title: 'Graph Title',
        yaxis: {
            title: 'Y-Axis'
        },
        xaxis: {
            title: 'X-Axis'
        }
    });

d3.select('#pie').text('')
Plotly.plot('pie',[{
    x:[2,4,6,8,10],
    y:[1,1.5,3.5,3,5],
    type: 'scatter',
    name: 'Plot 2',
    mode: 'lines'    
}],
    {
        title: 'Graph 2 Title',
        yaxis: {
            title: 'Y-Axis'
        },
        xaxis: {
            title: 'X-Axis'
        }
    })

d3.select('name_1').text('');
// d3.select('name_1').attr('img')
//     .data(