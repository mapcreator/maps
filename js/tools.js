var tool = 0;
var layer = {};

var posCX = 0;
var posCY =  0;

var id = 0;
var selected_id = 0;

$(function(){

    $('.tool').click(function(e){

        if(selected_id==0){
            id = id+1;   
        }
        else{
            id = selected_id.replace("tool", "");   
        }

        selected_tool($(this)); 
        console.log(e);
    //   alert($(this).attr('class'))  
        if($(this).hasClass('ui-selecting')){  
 
            $('#background').mousedown(function(e){ 
                
                if($('#tool'+id).attr('id') != 'tool'+id){
                    layer['tool'+id] = new canvasLayer('#background', id );
                    $('#tool'.id).css('z-index', id);
                    
                    createToolLayer('tool'+id);
                }
                    posCX = e.pageX;
                    posCY = e.pageY;   
            });
                   
             $('#background').mouseup(function(e){
                 var parentOffset = $(this).parent().offset(); 
                
                var sx = $('#background').width()/300;
                var sy = $('#background').height()/150;
                
                
                     var cX = parseInt((posCX-parentOffset.left)/sx);
                     var cY = parseInt((posCY-parentOffset.top)/sy);
                     var mX = parseInt((e.pageX-parentOffset.left)/sx);
                     var mY = parseInt((e.pageY-parentOffset.top)/sy);
                     
                    //  
            //  alert($(this).attr('class'))      
                // CREATING POLIGON
         //       if($(this).hasClass('poligon')){   
                     layer['tool'+id].context.lineWidth=1;  
                     layer['tool'+id].context.beginPath();   
                     layer['tool'+id].context.moveTo(cX, cY);  
                     layer['tool'+id].context.lineTo(mX,mY);
                     layer['tool'+id].context.stroke();
                     
                   //      
        //        }
                
                // CREATING RECT
                console.log('START '+cX+' '+cY);    
                
                if($(this).hasClass('rectangle')){
                      layer['tool'+id].context.lineWidth=0.1;   
                      layer['tool'+id].context.rect(cX,cY,(mX-cX), (mY-cY));
                      layer['tool'+id].context.stroke(); 
                      console.log('END '+(mX)+', '+(mY));
                }
                
             });
            
        }
        
    });  

})




/// HELPER FUNCTIONS

function selected_tool(obj){

    if(obj.hasClass('ui-selecting')){
        deselect_tool(obj);
        cursor_auto();
    }else{
        select_tool(obj);
        cursor_cross();
    }
       
} 

function select_tool(obj){
    $('#tools > div').removeClass('ui-selecting');
    obj.addClass('ui-selecting'); 
    cursor_cross();
}

function deselect_tool(obj){  
    $('#tools > div').removeClass('ui-selecting');
    selected_id = 0;
}

function cursor_cross(){
   $('body').css('cursor', 'crosshair'); 
}

function cursor_auto(){
    $('body').css('cursor', 'auto');
}

function canvasLayer(location, idd) {

    this.width = $(location).width();
    this.height = $(location).height();
    this.element = document.createElement('canvas');

    $(this.element)
       .attr('id', 'tool'+idd)
       .text('unsupported browser')
       .width(this.width)
       .height(this.height)
       .css('z-index', idd)   
       .appendTo(location);
       
    this.context = this.element.getContext("2d");
    
}

function createToolLayer(id){
    $('#curves').append('<div onclick="getLayer(\''+id+'\')" class="chLayer">layer '+id+' <div class="delete" id="del'+id+'">X</div></div>')
}                                                                                                    

function getLayer(nid){
    alert(nid);
   $.each(layer, function(idd,v){
       alert(idd+' z-ind = '+$('#'.idd).css('z-index'));
           $('#'.idd).css('z-index', idd.replace('tool','')); 
   })
   
   $('#'.nid).css('z-index', '6000');
   $('#'.nid).css('background-color', '#FFC0C0');
   selected_id = nid;
   
}