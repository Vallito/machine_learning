

var newQuote = d3.select("#shuffle_button");
var quoteText = d3.select("#quote");
var doc; 
var quote;
var ml_character;
var javascript_data = {};

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
    
  });



  // Button selection logic
  var b1 = d3.select("#name_1");
  var b2 = d3.select("#name_2");
  var b3 = d3.select("#name_3");
  var b4 = d3.select("#name_4");
  var b5 = d3.select("#name_5");
  var b6 = d3.select("#name_6");
  var submit = d3.select("#answer_button");

  var selected;

b1.on("click",function(){
    selected = 1;
    character = 'Stan';
  });
b2.on("click",function(){
    selected = 2;
    character = 'Randy';
});
b3.on("click",function(){
    selected = 3;
    character = 'Kyle';
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
    character = 'Timmy';
});

submit.on("click",function(){


console.log(doc);
console.log(selected);
//  Update User Counts
    if (doc.Character == character){
        console.log('character match');
        if(isNaN(doc.User) ){
            console.log('nan');
            doc.User = 1
        }
        else {
        doc.User = doc.User + 1
    };
        
    };
// Update computer Counts
if (doc.Character == ml_character){
    console.log('Computer match');
    if(isNaN(doc.Computer) ){
        console.log('nan');
        doc.Computer = 1
    }
    else {
    doc.Computer = doc.Computer + 1
};
    
};
// Update Total Counts
if(isNaN(doc.Count) ){
    doc.Count = 1
}
else {
doc.Count = doc.Count + 1
};


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
});
