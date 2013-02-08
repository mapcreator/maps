var tool;
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

        tool = $(this);
        
        if(tool.hasClass('ui-selecting')){  

            // клик на бэкграунд после выбора инструмента    
            $('#background').mousedown(function(e){ 
               
                // создаем canvas с проверкой, что не кликнули на слой из панели 
                if($('#tool'+id).attr('id') != 'tool'+id){
                    layer['tool'+id] = new canvasLayer('#background', id );
                    $('#tool'.id).css('z-index', id);
                    
                    //создаем новый слой в панели слоев
                    createToolLayer('tool'+id);
                    getLayer('tool'+id)
                }
                
                // берем первые координаты
                posCX = e.pageX;
                posCY = e.pageY;   
            });      
             
            // последние координаты     
             $('#background').mouseup(function(e){
                 var parentOffset = $(this).parent().offset(); 
                 
                   // делим координаты на sx и sy потому что проблема с масштабированием пока
                     var sx = $('#background').width()/300;
                     var sy = $('#background').height()/150;
                     
                     var cX = parseInt((posCX-parentOffset.left)/sx);
                     var cY = parseInt((posCY-parentOffset.top)/sy);
                     var mX = parseInt((e.pageX-parentOffset.left)/sx);
                     var mY = parseInt((e.pageY-parentOffset.top)/sy);
                     
                           
                // CREATING POLIGON  строим полигон, если был выбран инструмент полигона
                if(tool.hasClass('poligon')){   
                    // параметры полигона будем брать из настроек пользователя
                     layer['tool'+id].context.lineWidth=1;
                     
                    // рисуем полигон  
                     layer['tool'+id].context.beginPath();   
                     layer['tool'+id].context.moveTo(cX, cY);  
                     layer['tool'+id].context.lineTo(mX,mY);
                     layer['tool'+id].context.stroke();
                          
                }
                         
               
                // CREATING RECT   рисуем прямоугольник если был выбран инструмент прямоугольник 
                if(tool.hasClass('rectangle')){
                    // параметры прямоугольника, берем из панели настроек
                      layer['tool'+id].context.lineWidth=1;   
                      
                    // рисуем прямоугольник
                      layer['tool'+id].context.rect(cX,cY,(mX-cX), (mY-cY));
                      layer['tool'+id].context.stroke(); 
                      console.log('END '+(mX)+', '+(mY));
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

// создаем холст canvas
function canvasLayer(location, idd) {

    this.width = $(location).width();
    this.height = $(location).height();
    this.element = document.createElement('canvas');

    $(this.element)
       .attr('id', 'tool'+idd)
       .text('unsupported browser')
       .width(this.width)
       .height(this.height)
     //  .css('z-index', idd)   
       .appendTo(location);
       
    this.context = this.element.getContext("2d");
    
}

// создаем название слоя в панели слоев с возможностью удаления слоя 
//и выбор холста при клике на нем
function createToolLayer(id){
    $('#curves').append('<div onclick="getLayer(\''+id+'\')" class="chLayer">layer '+id+' <div class="delete" id="del'+id+'">X</div></div>')
}                                                                                                    

// выбор холста
function getLayer(nid){
   
   resetLeyersZzindex();
   
   $('#'+nid).css('z-index', '6000');
   $('#'+nid).css('background-color', '#FFC0C0');
   $('#'+nid).css('opacity', '0.8');
 //  $('#'+nid).addClass('ui-draggable-dragging');
   
   selected_id = nid;
   
}

function resetLeyersZzindex(){
    $.each(layer, function(idd,v){
           $('#'+idd).css('z-index', 0);
           $('#'+idd).css('background', 'none'); 
   })
}
