var tool;

var posCX = 0;
var posCY =  0;

var cX;
var cY;
var mX;
var mY;   

var i;   

var line_obj; 
var poly_obj = '';  

var cklick = 0;          

$(function(){
    
    $('.tool').click(function(e){
        tool = $(this); 
        
        selected_tool(tool);                         
                                 
        if(tool.hasClass('ui-selecting')){
            workareaStopDraggable();  
            i = 0;  
            cX=0; cY=0; mX=0; mY=0; 
            // клик на бэкграунд после выбора инструмента    
            $('#workarea').on('mousedown.poly', function(e){ 
             
                // берем первые координаты
                var parentOffset = $(this).offset();
                posCX = e.pageX;
                posCY = e.pageY;

                // какой инструмент выбран
                //if(tool.hasClass('line'))
                
                var obj_class = '';
                if(tool.hasClass('line_ico')) obj_class = 'line';
                if(tool.hasClass('polygon_ico')) obj_class = 'polygon';
              
                //Создаем объект линии 
                line_obj = $('<div>', {      
                                class: obj_class,
                            }).css('left',(posCX-parentOffset.left)+'px').css('top', (posCY-parentOffset.top)+'px');
                
                 
                
            // последние координаты  
            // если тут поставить mousemove то начнет полигон рисовать
            // правда дописать надо чтоб все линии в одном контенте были   
            
            // CREATING LINE  строим полигон, если был выбран инструмент полигона 
            
             $('#workarea').on('mousemove.poly', function(e){
                var parentOffset = $(this).parent().offset(); 
                
                cX = parseInt((posCX-parentOffset.left));
                cY = parseInt((posCY-parentOffset.top));
                mX = parseInt((e.pageX-parentOffset.left));
                mY = parseInt((e.pageY-parentOffset.top));

                // параметры полигона будем брать из настроек пользователя

                // рисуем линию  с поворотом
                drawLineRotate(line_obj, mX, cX)  

                var new_obj = ($('<div class="ready_polygon_anymation"></div>')).html(line_obj);  
                $('#workarea').append(new_obj);


            }); 
           
        });
        
            $('#workarea').on('mouseup.poly', function(){  
                                                       
                if(line_obj.hasClass('line')){
                    var new_obj = ($('<div class="ready_polygon"></div>')).html(line_obj);
                     
                    $('#workarea').append(new_obj);
                    addSelectableHandler($(new_obj).find('.line'));
                    $('#workarea').unbind('mousemove.poly');  
                    $('.ready_polygon_anymation').remove(); 
                }
                
                if(line_obj.hasClass('polygon')){                         
                    var new_obj = ($('<div class="ready_polygon_anymation_2"></div>')).html(line_obj);
                    $('#workarea').append(new_obj);
                    poly_obj = poly_obj+line_obj.prop('outerHTML');
                   
               
                    $('#workarea').mousemove(); 
                     
                }
                
                
              })
              
              $('#workarea').on('dblclick.poly', function(){

                     var new_obj = ($('<div class="ready_polygon"></div>')).html(poly_obj);  
                 //    console.log(poly_obj)
                     $('#workarea').append(new_obj);
                     $('#workarea').unbind('mousemove.poly');  
                     
                      $('.ready_polygon_anymation_2').remove();
                      $('.ready_polygon_anymation').remove(); 
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
        
        $('.ready_polygon').draggable({
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
}

// переводим курсор в крестик
function cursor_cross(){
   $('body').css('cursor', 'crosshair'); 
}

// переводим курсор в авто режим (стрелка)
function cursor_auto(){
    $('body').css('cursor', 'auto');
}                                                                                                   

function ubindActions(){
    $('#workarea').unbind('mousedown.poly');
    $('#workarea').unbind('mouseup.poly');
    $('#workarea').unbind('mousemove.poly'); 
    workareaStartDraggable();
}


function rotateIt(pw, radians){
    
    var degree = (radians * (180 / Math.PI) );   

    var origin = '0 0';

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

function drawLineRotate(line_obj, mX, cX){
    // рисуем линию  с поворотом
    var W = Math.sqrt(Math.pow((mX-cX),2)+Math.pow((mY-cY),2)); 
                    
    line_obj.css('width', W);
    line_obj.css('height', 5);   

    var B = Math.acos((mX-cX)/W);
                   
    if(mY<cY)
        B=B*(-1);
                    
    rotateIt(line_obj, B);
}