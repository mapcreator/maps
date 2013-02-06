

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
        start: function(e, ui){

        },
    };
    
$(function() {
    
    $( ".draggable" ).draggable(draggable_originalicon);
    
});


// Функция, осуществляющая выделение объектов в рабочей области
function addSelectableHandler(){
    $( "#workarea > div" ).mousedown( function(e){
        selectElement(this, e);
    });
}


function selectElement(elem, e){
    if (e.ctrlKey == false) {
        // if command key is pressed don't deselect existing elements
        $( "#workarea > div" ).removeClass("ui-selected");
        $( "#workarea > div" ).removeClass("ui-selecting");
        $(elem).addClass("ui-selecting");
    }
    else {
        if ($(elem).hasClass("ui-selecting")) {
            // remove selected class from element if already selected
            $(elem).removeClass("ui-selecting");
        }
        else {
            // add selecting class if not
            $(elem).addClass("ui-selecting");
            //alert('111');
        }
    }
}

function dropIcon(e){
    var element;
    $('#workarea > .ui-draggable-dragging').removeClass('ui-draggable-dragging');
    element = $('.ui-draggable-dragging').clone();
    
    $(element).prependTo("#workarea");
    //$('.ui-draggable-dragging').removeClass('originalicon').append('<div class="delete">X</div>');
    //icon_over_delete();
    $(element).draggable(draggable_cloned);
    $(element).css('opacity', '1');
    addSelectableHandler();
    selectElement(element, e);
}    