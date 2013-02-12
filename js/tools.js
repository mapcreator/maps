var tool;
var layer = {};

var posCX = 0;
var posCY =  0;

var id = 0;
var selected_id = 0;

var cX;
var cY;
var mX;
var mY;      

var line_obj; 
var parent_off_first;              

$(function(){
    
    $('.tool').click(function(e){

        cX=0;
        cY=0;
        mX=0;
        mY=0;

        if(selected_id==0){
            id = id+1;   
        }
        else{
            id = selected_id.replace("tool", "");   
        }

        selected_tool($(this)); 

        tool = $(this);
      
        if(tool.hasClass('ui-selecting')){  

            // клик на бэкграунд после выбора инструмента    
            $('#background').mousedown(function(e){ 
             
                // берем первые координаты
                posCX = e.pageX;
                posCY = e.pageY;   
                var parentOffset = $(this).parent().offset();
                parent_off_first = parentOffset;
                line_obj = $('<div>', {      
                                class: 'poligon',
                            }).css('left',(posCX-parentOffset.left)+'px').css('top', (posCY-parentOffset.top)+'px');
                $('#background').append(line_obj);      
                
            });      
                
            // последние координаты     
             $('#background').mouseup(function(e){
                 var parentOffset = $(this).parent().offset(); 
                     
                     cX = parseInt((posCX-parentOffset.left));
                     cY = parseInt((posCY-parentOffset.top));
                     mX = parseInt((e.pageX-parentOffset.left));
                     mY = parseInt((e.pageY-parentOffset.top));
                     
                           
                // CREATING POLIGON  строим полигон, если был выбран инструмент полигона
                if(line_obj.hasClass('poligon')){   
                    // параметры полигона будем брать из настроек пользователя
                     
                //    console.log(Math.sqrt(Math.pow((mX-cX),2)+Math.pow((mY-cY),2))) 
                line_obj.resizable();
                    // рисуем полигон 
                    var W = Math.sqrt(Math.pow((mX-cX),2)+Math.pow((mY-cY),2)); 
                    
                    line_obj.css('width', W);
                    line_obj.css('height', 5);   

                    var B = Math.acos((mX-cX)/W);
                   
                    if(mY<cY) B=B*(-1);
                    
                    rotateIt(line_obj, B);
                    
                      
                }
              
            }); 

        }
        
    });  



})




/// HELPER FUNCTIONS

// выбор инструмента и указателя мыши, общая функция
function selected_tool(obj){

    if(obj.hasClass('ui-selecting')){
        deselect_tool(obj);
        cursor_auto();
        ubindActions();
        $('.poligon').draggable({
            distance: 0,
            opacity: 0.5,
        });
    }else{
        select_tool(obj);
        cursor_cross();
        
    }
       
} 

// выбор инструмента
function select_tool(obj){
    $('#tools > div').removeClass('ui-selecting');
    obj.addClass('ui-selecting'); 
    cursor_cross();
}

// снятие выделение всех инструментов
function deselect_tool(obj){  
    $('#tools > div').removeClass('ui-selecting');
    selected_id = 0;
    resetLeyersZzindex();
}

// переводим курсор в крестик
function cursor_cross(){
   $('body').css('cursor', 'crosshair'); 
}

// переводим курсор в авто режим (стрелка)
function cursor_auto(){
    $('body').css('cursor', 'auto');
}                                                                                                   

function resetLeyersZzindex(){
    $.each(layer, function(idd,v){
           $('#'+idd).css('z-index', 0);
           $('#'+idd).css('background', 'none');
           $('#name'+idd).css('class','chLayer');  
   });
   
}

function ubindActions(){
    $('#background').unbind('mousedown');
    $('#background').unbind('mouseup');
}


function rotateit(obj) {

  obj.find('.rotate_ico').css('display', 'block'); 
  //obj.find('.resize_ico').css('display', 'block'); 
  
  obj.find('.rotate_ico').draggable({  
            distance: 1,
            containment: "parent",                                 
            drag: function(e2){ 
                    rotateOnMouse(e2, obj.find('.rotate_ico').parent());
            }
  }); 

  obj.find('.rotate_ico').parent().resizable({
       alsoResize: obj.find('.road_ico'),
  });
  
}


function rotateOnMouse(e, pw) {
      var offset = pw.offset();
      var center_x = (offset.left) + ($(pw).width() / 2);
      var center_y = (offset.top) + ($(pw).height() / 2);
      var mouse_x = e.pageX;
      var mouse_y = e.pageY;
      var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
      var degree = (radians * (180 / Math.PI) * -1) + 100;
      //            window.console.log("de="+degree+","+radians);
      $(pw).css('-moz-transform', 'rotate(' + degree + 'deg)');
      $(pw).css('-webkit-transform', 'rotate(' + degree + 'deg)');
      $(pw).css('-o-transform', 'rotate(' + degree + 'deg)');
      $(pw).css('-ms-transform', 'rotate(' + degree + 'deg)');

}

function rotateIt(pw, radians){
    var degree = (radians * (180 / Math.PI) );   
  console.log('Before:'+degree);
     if(degree<0) degree = 360+(degree);
    var origin = '0 0';
console.log('After:'+degree);
     $(pw).css('transform', ' rotate(' + degree + 'deg)');   
     $(pw).css('transform-origin', origin);   
     $(pw).css('-moz-transform', ' rotate(' + degree + 'deg)');
     $(pw).css('-moz-transform-origin', origin);
     $(pw).css('-webkit-transform', ' rotate(' + degree + 'deg)');
     $(pw).css('-webkit-transform-origin', origin);
     $(pw).css('-o-transform', ' rotate(' + degree + 'deg)');
     $(pw).css('-o-transform-origin', origin); 
     $(pw).css('-ms-transform', ' rotate(' + degree + 'deg)');
     $(pw).css('-ms-transform-origin', origin);
}