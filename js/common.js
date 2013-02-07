var new_id = 1;


$(function() {
    resizeBackground();
    
    $( "body" ).bind('keydown', function(e){
        e = (e) ? e : window.event;
        if (e.keyCode){
            if (e.keyCode=='46'){
                $('.ui-selecting').remove();
            } else if (e.keyCode=='65'){
                if (e.ctrlKey !== false) {
                    $("#background").click();
                    $("#workarea > div").addClass("ui-selecting");
                    $("#background").removeClass("ui-selecting");
                    return false;
                }
            }
        }
    });
    
    $( "#workarea" ).droppable({
        hoverClass: "drop-hover",
        tolerance: "fit",
        drop: function( e, ui ) {
            posX = $(this).position().left;
            posY = $(this).position().top;
            
            //alert( 'X='+(e.pageX - posX) + ' , Y=' + (e.pageY - posY)+' UI_top='+ui.offset.top+' UI_left='+ui.offset.left);
            if ($('.ui-draggable-dragging').hasClass('originalicon')){
                dropIcon(e);
            }
            if ($('.ui-draggable-dragging').hasClass('originalshape')){
                dropShape(e);
            }
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

$(function() {
    
    $( "#accordion_tools" ).accordion({
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

// используем этот метод для  ресайза фона рабочей области
function resizeBackground(){
    $('#background').css('width', $('#workarea').width());
    $('#background').css('height', $('#workarea').height());
}

function setNewId(el){
    if ($(el).attr('id')==undefined){
        $(el).attr('id', "el_"+new_id);
        new_id++;
        return $(el).attr('id');
    }else{
        return false;
    }
}
