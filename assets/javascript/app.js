// Global variables ---------------------


// This variable holds button descriptions/ (search urls)
var gifs = ["dogs", "cars", "cats", "bikes"];


 
// This function creates buttons
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function createButton() {
    
    // delete buttons so I wont have repeats
    $("#buttons-view").empty();

    // Loop through an array of gifs
    // this loop creates the buttons within itself
    for (var i=0; i < gifs.length; i++) {

        var a = $("<button>");
        a.addClass("gif-btn");
        // adds a data attribute which is connected to var search, which will define the url
        a.attr("data-search", gifs[i]);
        // This fills the button with a text description
        a.text(gifs[i]);
        // add this button to "buttons view div"
        $("#buttons-view").append(a);
    }
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


// This click function converts the buttons to gifs on the screen
 
function displayGifInfo() {

   var search = $(this).attr("data-search");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dRMgGOE4F5aMUkRDnIRkZ5nK5W6N5rW4&limit=5";

        $.ajax ({url: queryURL, method: 'GET'})
        .then(function(response){
            
        var results = response.data;


        for (var i=0; i < results.length; i++) {

            var gifDiv = $("<div class='item'>");

            var searchImage = $("<img>");

            searchImage.attr("src", results[i].images.fixed_height.url);

//////////////////////////////////////////////////////////////////
            // if the rating is PG, display the image

            if (response.data[i].rating = 'g' || 'pg'|| 'y') {
                console.log("appropiate!");
                // The original had these 2 lines of text below
                gifDiv.append(searchImage);

                $("#gif-div").prepend(gifDiv);

            } else {
                console.log("inappropiate");
                // alert("Some images are inapropiate");
            }
            // gifDiv.append(searchImage);

            //     $("#gif-div").prepend(gifDiv);

            console.log("The data rating for these images are: " + response.data[i].rating);
            console.log(response);
////////////////////////////////////////////////////////////////
            
        }
        // $("#gif-div").append("<div id='gif-div2'>");

}); // <-- End of click function
}
 ////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////
 
 // This function determines what happens when you click the "create gif" button 

 $("#add-gif").on("click", function(event) {

    event.preventDefault();

    // grab whatever was input into the gif search text
    var gif = $("#gif-input").val().trim();
    // push that input into the gif array
    gifs.push(gif);
    // call the function that creates and pushes the button to the buttons div
    createButton();
    // empty the content in the button
    $("#gif-form")[0].reset();

 });


///////////////////////////////////////////////////////
// adding an event listener

$(document).on("click", ".gif-btn", displayGifInfo);
 /////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////

 // Display all initial buttons
 createButton();





 //Extra work

//  This finds the rating
//  response.data[i].rating