$( document ).ready( onReady );

function onReady(){
    getSongs();
    // TESTING ADD SONG //
    addSong();
} // end onReady

function addSong(){
    let objectToSend = {
        test: 'testData'
    } // end object to send
    $.ajax({
        method: 'POST',
        url: '/songs',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST with:', response );
    }).catch( function( err ){
        alert( 'error!' );
        console.log( err );
    }) // end AJAX POST
} // end addSong

function getSongs(){
    $.ajax({
        method: 'GET',
        url: '/songs'
    }).then( function( response ){
        console.log( 'back from GET with:', response );
    }).catch( function( err ){
        alert( 'error!' );
        console.log( err );
    }) // end AJAX GET
} // end getSongs()