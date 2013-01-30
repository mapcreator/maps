
$(function() {

var posX;
var posY;
    
    $( ".draggable" ).draggable({
        start: function(e, ui){
            //$(this).clone().prependTo("#left_tools");
        },
        
    });
    
    $( "#worckflow" ).droppable({
        drop: function( e, ui ) {
        
        posX = $(this).position().left;
        posY = $(this).position().top;
        alert( 'X='+(e.pageX - posX) + ' , Y=' + (e.pageY - posY)+' UI_top='+ui.offset.top+' UI_left='+ui.offset.left);
    
        },
        
    });
    
    
});