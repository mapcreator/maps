
$(function() {

var posX;
var posY;
var draggable_original = {
    distance: 5,
    helper: "clone",
    opacity: 0.5,
    start: function(e, ui){
        //$('.ui-draggable-dragging').draggable(draggable_original);
        
    },
};
var draggable_cloned = {
    distance: 5,
    opacity: 0.5,
    handle: "#workarea",
    containment: "#workarea",
    start: function(e, ui){

    },
};

    $( ".draggable" ).draggable(draggable_original);
    
    $( "#workarea" ).droppable({
        hoverClass: "drop-hover",
        tolerance: "fit",
        drop: function( e, ui ) {
        
            posX = $(this).position().left;
            posY = $(this).position().top;
            //alert( 'X='+(e.pageX - posX) + ' , Y=' + (e.pageY - posY)+' UI_top='+ui.offset.top+' UI_left='+ui.offset.left);
            if ($('.ui-draggable-dragging').hasClass('original')){
                var e_new = $('.ui-draggable-dragging').clone();
                $(e_new).prependTo("#workarea");
                $('.ui-draggable-dragging').removeClass('original');  
                $(e_new).draggable(draggable_cloned);
            }
            //alert(draggable_options);
            //$(e).draggable(draggable_options);
            
        },
        
    });
    
    
});

$(function() {
    
    $( "#accordion" ).accordion({
        header: "> div > h3",
        heightStyle: "fill"
    })

    .sortable({
        axis: "y",
        handle: "h3",
        stop: function( event, ui ) {
            // IE doesn't register the blur when sorting
            // so trigger focusout handlers to remove .ui-state-focus
            ui.item.children( "h3" ).triggerHandler( "focusout" );
        }
    });
    
});