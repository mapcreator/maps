var tool = 0;
var layer = {};

var posCX = 0;
var posCY =  0;

$(function(){
    $('#tools').css('width', '100%');
    $('#tools').css('height', '100%');


    $('.tool').click(function(){
        
        
        selected_tool($(this));
        setCursor();
        
        if($(this).hasClass('poligon')){  
            tool=1;
            //$('#workarea').html('<canvas id="myCanvas" width="'+$('#workarea').width()+'" height="'+$('#workarea').height()+'"></canvas>');
            layer['tool'] = new canvasLayer('#workarea', '');
           
            $('#workarea > canvas').mousedown(function(e){ 
                    posCX = e.pageX;
                    posCY = e.pageY;   
            });
                   
             $('#workarea > canvas').mouseup(function(e){
                 var parentOffset = $(this).parent().offset(); 
                 
                 var cX = posCX-parentOffset.left;
                 var cY = posCY-parentOffset.top;
                 var mX = e.pageX-parentOffset.left;
                 var mY = e.pageY-parentOffset.top;
                 
                 console.log('START '+(parentOffset.left)+', '+(posCX)+' '+cX+' '+cY);  
                 
                 layer['tool'].context.beginPath();   
                 layer['tool'].context.moveTo(cX, cY);  
                 layer['tool'].context.lineTo(cX+mX,cY+mY);
                 layer['tool'].context.closePath();
                 layer['tool'].context.stroke();
                 
                 console.log('END '+(mX)+', '+(mY));
             });
            
        }
        
    });  

})

function selected_tool(obj){
    if(obj.hasClass('ui-selecting')){
        obj.removeClass('ui-selecting');
    }else{
        obj.addClass('ui-selecting');
    }
} 

function setCursor(){
    
    if($('body').css('cursor')=='auto')
        $('body').css('cursor', 'crosshair');
    else
        $('body').css('cursor', 'auto');
}

function canvasLayer(location, id) {

    this.width = $(location).width();
    this.height = $(location).height();
    this.element = document.createElement('canvas');

    $(this.element)
       .attr('id', id)
       .text('unsupported browser')
       .width(this.width)
       .height(this.height)
       .appendTo(location);

    this.context = this.element.getContext("2d");

}
