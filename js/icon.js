
    
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
            // координаты верхнего левого и нижнего правого углов рабочей области:
            bg_left = parseFloat($("#background").css('left'));
            bg_top = parseFloat($("#background").css('top'));
            bg_right = bg_left + parseFloat($("#background").css('width'));
            bg_bottom = bg_top + parseFloat($("#background").css('height'));
            // запоминаем начальные координаты элемента, за который цепляемся:
            var object_offsets = getRealObjectOffsets(ui.helper);
            //console.log(object_offsets);
            posL = parseFloat(object_offsets.left); // left
            posT = parseFloat(object_offsets.top); // top
            posR = parseFloat(object_offsets.right); // right
            posB = parseFloat(object_offsets.bottom); // bottom
            //alert(posX+'; '+posY);
            getAll(ui).each(function(){
                // запоминаем начальные координаты каждого выделенного элемента:
                var object_offsets = getRealObjectOffsets(this);
                console.log(object_offsets);
                //console.log($(this).attr('class'));
                eval('pos_'+$(this).attr('id')+'_X = parseFloat($(this).css("left"));');
                eval('pos_'+$(this).attr('id')+'_Y = parseFloat($(this).css("top"));');
                // рассчитываем координаты новой области, в которой могут двигаться элементы
                if (posL > object_offsets.left) bg_left = bg_left + posL - object_offsets.left;
                if (posR < object_offsets.right) bg_right = bg_right + posR - object_offsets.right;
                if (posT > object_offsets.top) bg_top = bg_top + posT - object_offsets.top;
                if (posB < object_offsets.bottom) bg_bottom = bg_bottom + posB - object_offsets.bottom;
                
                //$('#background').text('posL='+posL+'; '+'posT='+posT+'; '+'posR='+posR+'; '+'posB='+posB+'; ');
                //$('#background').text('bg_top='+bg_top+'; '+'bg_left='+bg_left+'; '+'bg_bottom='+bg_bottom+'; '+'bg_right='+bg_right+'; ');
            });
        },
        stop: function(e, ui) {
            
        },
        drag: function(e, ui) {
            var object_offsets = getRealObjectOffsets(ui.helper);
            if (object_offsets.top >= bg_top && object_offsets.bottom <= bg_bottom){
                // определяем смещение элемента, за который цепляемся, относительно исходной позиции:
                offsetY = object_offsets.top-posT;
                getAll(ui).each(function(){
                    // высчитываем новую позицию для каждого элемента:
                    eval('var newTop = pos_'+$(this).attr('id')+'_Y + offsetY;');
                    // задаем новую позицию:
                    $(this).css("top", newTop);
                });
            }
            if (object_offsets.left >= bg_left && object_offsets.right <= bg_right){
                // определяем смещение элемента, за который цепляемся, относительно исходной позиции:
                offsetX = object_offsets.left-posL;
                getAll(ui).each(function(){
                    // высчитываем новую позицию для каждого элемента:
                    eval('var newLeft = pos_'+$(this).attr('id')+'_X + offsetX;');
                    // задаем новую позицию:
                    $(this).css("left", newLeft);
                });
            }
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
        $( "#workarea div" ).removeClass("ui-selected");
        $( "#workarea div" ).removeClass("ui-selecting");
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
    var workareaX = parseInt($("#workarea").css('left'));
    var workareaY = parseInt($("#workarea").css('top'));
    $(element).css('left', parseInt($(element).css('left'))-workareaX);
    $(element).css('top', parseInt($(element).css('top'))-workareaY);
    if (setNewId(element)){
        addSelectableHandler(element);
        selectElement(element, e);
    }
}

// function to get matching groups (change '.group' and /group.../ inside the match to whatever class you want to use
var getAll = function(t) {
    return $('.ui-selecting').not(t);
};



