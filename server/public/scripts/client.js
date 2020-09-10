$( document ).ready( onReady );

function onReady(){
    getSongs();
    $( '#addSongButton' ).on( 'click', addSong );
    $( document ).on( 'click', '.deleteSongBtn', deleteSong );
    $( document ).on( 'click', '.rankUPBtn', rankUp );
    $( document ).on( 'click', '.rankDownBtn', rankDown );
} // end onReady


function rankUp(){
    console.log('in rankUp');
    let songId = $(this).data('id');
    console.log(songId);
    $.ajax({
        method: 'PUT',
        url: `/songs/${songId}`,
        data: {
            direction: 'up'
        }
    }).then(function(response){
        console.log('response from rankup',response);
    }).catch( function(err){
        console.log("Error in delete", err);
        alert("ruh-roh");
    });

}
function rankDown(){
    let songId = $(this).data('id');
    console.log('in rankDown', songId);
    
}

function deleteSong(){
    // Grab the `data-id` attribute
    // from our "Button"
    let songId = $(this).data('id');        // 10

    $.ajax({
        method: 'DELETE',
        url: `/songs/${songId}`     // /songs/10
    }).then( function( response ){
        console.log("Deleted!", response);

        // Refresh page (aka do another GET request)
        getSongs();
    }).catch( function(err){
        console.log("Error in delete", err);
        alert("ruh-roh");
    });



}

function addSong(){
    let objectToSend = {
        rank: $( '#rankIn' ).val(),
        artist: $( '#artistIn' ).val(),
        track: $( '#trackIn' ).val(),
        published: $( '#publishedIn' ).val()
    } // end object to send
    $.ajax({
        method: 'POST',
        url: '/songs',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        getSongs();
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
        // display songs on DOM 
        let el = $( '#songsOut' );
        el.empty();
        for( let i=0; i<response.length; i++ ){
            el.append( `<li>
            ${ response[i].rank }
            ${ response[i].track }
            ${ response[i].artist }
            ${ response[i].published.split( 'T' )[0] }
            <button class="deleteSongBtn" data-id="${response[i].id}">Delete Me</button>
            <button class="rankUPBtn" data-id="${response[i].id}">Up</button>
            <button class="rankDownBtn" data-id="${response[i].id}">Down</button>
            </li>`)
        } // end for
    }).catch( function( err ){
        alert( 'error!' );
        console.log( err );
    }) // end AJAX GET
} // end getSongs()