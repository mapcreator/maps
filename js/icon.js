
    
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
            bg_left = parseInt($("#background").css('left'));
            bg_top = parseInt($("#background").css('top'));
            bg_right = bg_left + parseInt($("#background").css('width'));
            bg_bottom = bg_top + parseInt($("#background").css('height'));
            // запоминаем начальные координаты элемента, за который цепляемся:
            posX = parseInt(ui.helper.css('left'));
            posY = parseInt(ui.helper.css('top'));
            getAll(ui).each(function(){
                // запоминаем начальные координаты всех элементов:
                var currLeft = parseInt($(this).css("left"));
                var currTop = parseInt($(this).css("top"));
                var currWidth = parseInt($(this).css("width"));
                var currHeight = parseInt($(this).css("height"));
                eval('pos_'+$(this).attr('id')+'_X = currLeft;');
                eval('pos_'+$(this).attr('id')+'_Y = currTop;');
                // рассчитываем координаты новой области, в которой могут двигаться элементы
                if (posX > currLeft) bg_left = bg_left + posX - currLeft;
                
                if (posY > currTop) bg_top = bg_top + posY - currTop;
                
                if (posX < currLeft) bg_right = bg_right + posX - currLeft;
                else bg_right = bg_right + posX - currLeft - currWidth;
                
                if (posY < currTop) bg_bottom = bg_bottom + posY - currTop;
                else bg_bottom = bg_bottom + posY - currTop - currHeight;
                
                //$(this).text('Y='+posY+'; '+'X='+posX);
                //$(this).text('bg_top='+bg_top+'; '+'bg_left='+bg_left+'; '+'bg_bottom='+bg_bottom+'; '+'bg_right='+bg_right+'; ');
            });
        },
        stop: function(e, ui) {
            
        },
        drag: function(e, ui) {
            var newY = parseInt(ui.helper.css('top'));
            if (newY >= bg_top && newY <= bg_bottom){
                // определяем смещение элемента, за который цепляемся, относительно исходной позиции:
                offsetY = newY-posY;
                getAll(ui).each(function(){
                    eval('var startY = pos_'+$(this).attr('id')+'_Y;');
                    // высчитываем новую позицию для каждого элемента:
                    var currTop = parseInt(offsetY)+startY;
                    // задаем новую позицию:
                    $(this).css("top", currTop+'px');
                });
            } else if (newY < bg_top){
                ui.helper.css('top', bg_top);
            } else {
                ui.helper.css('top', bg_bottom);
            }
            var newX = parseInt(ui.helper.css('left'));
            if (newX >= bg_left && newX <= bg_right){
                // определяем смещение элемента, за который цепляемся, относительно исходной позиции:
                offsetX = newX-posX;
                getAll(ui).each(function(){
                    eval('var startX = pos_'+$(this).attr('id')+'_X;');
                    // высчитываем новую позицию для каждого элемента:
                    var currLeft = parseInt(offsetX)+startX;
                    // задаем новую позицию:
                    $(this).css("left", currLeft+'px');
                    
                    
                });
            } else if (newX < bg_left){
                ui.helper.css('left', bg_left);
            } else {
                ui.helper.css('left', bg_right);
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



