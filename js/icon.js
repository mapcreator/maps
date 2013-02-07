
    
    var draggable_originalicon = {
        distance: 5,
        helper: "clone",
        opacity: 0.5,
        stack: ".lefticon",
        start: function(e, ui){
            //$('.ui-draggable-dragging').draggable(draggable_originalicon);
            
        },
    };
    var draggable_cloned = {
        distance: 5,
        opacity: 0.5,
        containment: "parent",
        stack: ".lefticon",
        
        start: function(e, ui) {
            posX = parseInt(ui.helper.css('left'));
            posY = parseInt(ui.helper.css('top'));
            getAll(ui).each(function(){
                eval('pos_'+$(this).attr('id')+'_X = $(this).css("left");');
                eval('pos_'+$(this).attr('id')+'_Y = $(this).css("top");');
                //eval('alert(pos_'+$(this).attr('id')+'_Y);');
                //$(this).text('Y='+posY+'; '+'X='+posX);
            });
        },
        stop: function(e, ui) {
            
        },
        drag: function(e, ui) {
            offsetY = parseInt(ui.helper.css('top'))-posY;
            offsetX = parseInt(ui.helper.css('left'))-posX;
            //return;
            getAll(ui).each(function(){
                eval('var startY = pos_'+$(this).attr('id')+'_Y;');
                eval('var startX = pos_'+$(this).attr('id')+'_X;');
                var currTop = parseInt(offsetY)+parseInt(startY);
                var currLeft = parseInt(offsetX)+parseInt(startX);
                $(this).css("top", currTop+'px');
                $(this).css("left", currLeft+'px');
                //$(this).text('Y='+offsetY+'; '+'X='+offsetX);
            });
        }
    };
    
$(function() {
    $( ".draggable" ).draggable(draggable_originalicon);
    
    addSelectableHandler($('#background'));
});


// Функция, осуществляющая выделение объектов в рабочей области
function addSelectableHandler(element){
    $(element).bind('mousedown', function(e){
        selectElement(this, e);
    });
}


function selectElement(elem, e){
    if (e.ctrlKey == false) {
        if ($(elem).hasClass("ui-selecting")) return;
        // if command key is pressed don't deselect existing elements
        $( "#workarea > div" ).removeClass("ui-selected");
        $( "#workarea > div" ).removeClass("ui-selecting");
        if ($(elem).attr('id')!='background'){
            $(elem).addClass("ui-selecting");
        }
    }
    else {
        if ($(elem).attr('id')=='background') return;
        if ($(elem).hasClass("ui-selecting")) {
            // remove selected class from element if already selected
            $(elem).removeClass("ui-selecting");
        }
        else {
            // add selecting class if not
            $(elem).addClass("ui-selecting");
        }
    }
}

function dropIcon(e){
    var element;
    $('#workarea > .ui-draggable-dragging').removeClass('ui-draggable-dragging');
    element = $('.ui-draggable-dragging').clone();
    
    $(element).prependTo("#workarea");
    $(element).draggable(draggable_cloned);
    $(element).css('opacity', '1');
    if (setNewId(element)){
        addSelectableHandler(element);
        selectElement(element, e);
    }
}

// function to get matching groups (change '.group' and /group.../ inside the match to whatever class you want to use
var getAll = function(t) {
    return $('.ui-selecting').not(t);
};



