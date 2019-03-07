

var newQuote = d3.select("#quotebutton");
var quoteText = d3.select("#quote");

newQuote.on("click", function() {
    var quote;
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
            quote = appData[q].Line
            console.log(quote);
            quoteText.text(quote);
            break;
        };
    };
};
    // Set the counter quote text to the new quote
    // console.log(quote);
    
  });




