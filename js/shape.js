

var posX;
var posY;

var draggable_original_shape = {
    distance: 5,
    helper: "clone",
    opacity: 0.5,
    start: function(e, ui){
        //$('.ui-draggable-dragging').draggable(draggable_original);
        
    },
};

var draggable_cloned_shape = {
    distance: 5,
    opacity: 0.5,
    handle: "#workarea",
    containment: "#workarea",
    start: function(e, ui){

    },
};

$(function() {
    $( ".draggable_shape" ).draggable(draggable_original_shape);
});

function icon_over_delete(){
     var obj = $('.ui-draggable-dragging');
     obj.mouseover(function(){ $(this).find('div.drow_options').css('display', 'block'); })
     obj.mouseout(function(){ $(this).find('div.drow_options').css('display', 'none'); })
     obj.find('div.delete').click(function(){obj.remove()}); 
     obj.find('div.resize').click(function(){obj.find('canvas').resizable({
         stop : function(e, ui){
                var n_obj=obj.find('canvas');
                if(obj.hasClass('rectangle'))
                    reDrawRectangle(n_obj, ui.size.width, ui.size.height);
                if(obj.hasClass('line'))
                    reDrawLaine(n_obj,ui.size.width,ui.size.height)
         }
     })}); 
    // obj.find('div.rotate').click(function(){obj.find('canvas').rotate({animateTo:90})});
}


function reDrawRectangle(obj, width, height, color){
     obj.drawRect({
                    fillStyle: color,
                    x: 0, y: 0,
                    width: width,
                    height: height,
                    fromCenter: false
     });
}


function reDrawLaine(obj, length, strokeWidth, color){
    obj.drawLine({
                    strokeStyle: color,
                    strokeWidth: strokeWidth,
                    rounded: true,
                    x1: 0, y1: 0,
                    x2: length, y2: 0,
        //     x3: 200, y3: 100,
        //     x4: 150, y4: 200
                });
}

function dropShape(){
    var w = 0;
    var h = 0;
    if ($('.ui-draggable-dragging').hasClass('line')){ w = 200; h = 5; }
    if ($('.ui-draggable-dragging').hasClass('rectangle')){ w = 107; h = 57; }
    
    var e_new = $('.ui-draggable-dragging').clone();
    $(e_new).prependTo("#workarea");
    $('.ui-draggable-dragging').removeClass('originalshape')
                               .removeClass('lefticon')   
                               .html('<canvas width="'+w+'" height="'+h+'"></canvas><div class="drow_options"><div class="delete">Del</div> <div class="resize">Resize</div> <div class="rotate">Rot</div></div>');  
    $(e_new).draggable(draggable_cloned_shape);
    icon_over_delete();
   
    if ($('.ui-draggable-dragging').hasClass('line')){ 
        reDrawLaine($('.ui-draggable-dragging').find("canvas"), 200,1, "#000")
    }

    if ($('.ui-draggable-dragging').hasClass('rectangle')){ 
        reDrawRectangle($('.ui-draggable-dragging').find("canvas"),100,50,"#800000");
    }
}

