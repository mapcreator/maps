var new_id = 1;
var shift_offset = 10;

$(function() {
    resizeBackground();
    
    $( "body" ).bind('keydown', function(e){
        e = (e) ? e : window.event;
        //alert(e.keyCode);
        if (e.keyCode){
            var arrows_move_offset = e.shiftKey !== false ? shift_offset : 1;
            if (e.keyCode=='46'){ // Del
                $('#workarea .ui-selecting').remove();
                return false;
            } else if (e.keyCode=='37'){ // Left
                $('.ui-selecting').each(function(){
                    $(this).css('left', parseInt($(this).css('left'))-arrows_move_offset);
                });
                return false;
            } else if (e.keyCode=='38'){ // Up
                $('.ui-selecting').each(function(){
                    $(this).css('top', parseInt($(this).css('top'))-arrows_move_offset);
                });
                return false;
            } else if (e.keyCode=='39'){ // Right
                $('.ui-selecting').each(function(){
                    $(this).css('left', parseInt($(this).css('left'))+arrows_move_offset);
                });
                return false;
            } else if (e.keyCode=='40'){ // Down
                $('.ui-selecting').each(function(){
                    $(this).css('top', parseInt($(this).css('top'))+arrows_move_offset);
                });
                return false;
            } else if (e.keyCode=='65'){ // Ctrl+A
                if (e.ctrlKey !== false) {
                    $("#background").click();
                    $("#workarea div.lefticon").addClass("ui-selecting");
                    $("#workarea div.line").addClass("ui-selecting");
                    $("#background").removeClass("ui-selecting");
                    
                }
                return false;
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
        },
    });
    
    resizeBlocks();
    $(window).bind("resize", function(){
        resizeBlocks();
        reloadAccordions();
    });
    
    workareaStartDraggable();
    workareaStartPlace();
    $('#workarea').disableSelection();
    $('#left_tools').disableSelection(); 
    
});

function workareaStartDraggable(){
    var draggable_workarea = {
        distance: 10,
        opacity: 0.5,
        start: function(e, ui){
            //$('.ui-draggable-dragging').draggable(draggable_originalicon);
            
        },
    };
    $( "#workarea" ).draggable(draggable_workarea);
}

function workareaStopDraggable(){
    $( "#workarea" ).draggable("destroy");
}

function workareaStartPlace(){
    var offset = $("#center").offset();
    $( "#workarea" ).css("left", offset.left);
    $( "#workarea" ).css("top", offset.top);
}

function resizeBlocks(){
    $('#container').css('width', $(window).width());
    $('#center').css('width', $(window).width()-parseInt($('#right_tools').width())-parseInt($('#left_tools').width())-parseInt($('#left_tools').css('border-left-width'))-parseInt($('#left_tools').css('border-right-width'))-parseInt($('#right_tools').css('border-left-width'))-parseInt($('#right_tools').css('border-right-width'))-parseInt($('#center').css('border-left-width'))-parseInt($('#left_tools').css('border-right-width')));
    $('#right_tools').css('height', $(window).height()-parseInt($('#right_tools').css('border-top-width'))-parseInt($('#right_tools').css('border-bottom-width')));
    $('#center').css('height', $(window).height()-parseInt($('#center').css('border-top-width'))-parseInt($('#center').css('border-bottom-width')));
    $('#left_tools').css('height', $(window).height()-parseInt($('#left_tools').css('border-top-width'))-parseInt($('#left_tools').css('border-bottom-width')));
}

function reloadAccordions(){
    accordionLeftDestroy();
    accordionLeftStart();
    accordionRightDestroy();
    accordionRightStart();
}

function accordionLeftStart(){
    $( "#accordion_left" ).accordion({
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
}

function accordionLeftDestroy(){
    $( "#accordion_left" ).accordion('destroy');
}

function accordionRightStart(){
    $( "#accordion_right" ).accordion({
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
}

function accordionRightDestroy(){
    $( "#accordion_right" ).accordion('destroy');
}

$(function() {
    accordionLeftStart();
});

$(function() {
    accordionRightStart();
});

// используем этот метод для ресайза фона рабочей области
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

// возвращает ID всех элементов на рабочей области
function getAllElements(){
    var elements_ids = new Array;
    elements_ids = $('#workarea > div').map(function(){
        if ($(this).attr('id')=='background'){
            //return false;
        }else if($(this).hasClass('selectobj')){
            //return false;
        }else if($(this).hasClass('ready_polygon')){
            return $(this).find('div.line').attr('id');
        }else{
            return $(this).attr('id');
        }
    });
    //console.log(elements_ids);
    return elements_ids;
}
