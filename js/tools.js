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
var select_obj;  

var cklick = 0;          

var select_obj_left;
var select_obj_top;
var select_obj_right;
var select_obj_bottom;

var draggable_line = draggable_cloned;
draggable_line.containment = false;
draggable_line.stack = false;

$(function(){  
attrs_init();     
    $('.tool').click(function(e){
        tool = $(this); 
        
        selected_tool(tool);
        
        if(tool.hasClass('ui-selecting')){  
            ubindActions();
            workareaStopDraggable();    
            i = 0;  
            cX=0; cY=0; mX=0; mY=0; 
            // клик на бэкграунд после выбора инструмента    
        
            // ОТРИСОВКА ЛИНИИ ИЛИ ПОЛИГОНА ******************************************************
            if(tool.hasClass('line_ico') || tool.hasClass('polygon_ico')){  
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

                    // CREATING LINE  строим полигон, если был выбран инструмент полигона
                    $('#workarea').on('mousemove.poly', function(e){
                        var parentOffset = $(this).parent().offset(); 

                        cX = parseInt((posCX-parentOffset.left));
                        cY = parseInt((posCY-parentOffset.top));
                        mX = parseInt((e.pageX-parentOffset.left));
                        mY = parseInt((e.pageY-parentOffset.top));

                        // параметры полигона будем брать из настроек пользователя

                        // рисуем линию  с поворотом
                        drawLineRotate(line_obj, mX, cX);
                        var new_obj = ($('<div class="ready_polygon_anymation"></div>')).html(line_obj);  
                        $('#workarea').append(new_obj);
                    });
                });
            
                $('#workarea').on('mouseup.poly', function(){
                    if(line_obj.hasClass('line')){
                        line_obj = setRotators(line_obj);
                        var new_obj = ($('<div class="ready_polygon"></div>')).html(line_obj);
                        $('#workarea').append(new_obj);
                        var line_id = setNewId($(new_obj).find('.line'));
                        addSelectableHandler($('#'+line_id));
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
                    var new_obj = $('<div class="ready_polygon"></div>').html(poly_obj);  
                    console.log(poly_obj)
                    $('#workarea').append(new_obj);
                    $('#workarea').unbind('mousemove.poly');  
                    $('.ready_polygon_anymation').remove();
                });
            }
            
            // ВЫДЕЛЕНИЕ ЭЛЕМЕНТОВ МЫШКОЙ ******************************************************
            if(tool.hasClass('select_ico')){
                cursor_auto();
                bindSelectingStart();
            }
        
            // ROTATE LINE ******************************************************
            if(tool.hasClass('rotate_ico')){
                  
                  $('.ready_polygon').on('click.rotate', function(){
                      showRotators($(this));
                      resizeAndRotate($(this));
                      
                      
                  })
            }
        }
    });  
    
})


function attrs_init(){
  
    $('.minicolors').minicolors({
        animationSpeed: 100,
        animationEasing: 'swing',
        change: null,
        changeDelay: 0,
        control: 'hue',
        defaultValue: '',
        hide: null,
        hideSpeed: 100,
        inline: false,
        letterCase: 'lowercase',
        opacity: false,
        position: 'default',
        show: null,
        showSpeed: 100,
        swatchPosition: 'left',
        textfield: true,
        theme: 'bootstrap'
    });
   
}


function resizeAndRotate(obj){
    var lrot = obj.find('.rleft');
    var rrot = obj.find('.rright');
    $(lrot).add(rrot).draggable({ 
                            cursorAt: { left: 5 },
                            start: function(e){
                                console.log($(e.target).attr('class'))
                             // берем первые координаты
                                var parentOffset = $('#workarea').offset();
                                
                                if($(e.target).hasClass('rleft')){
                                    posCX = (rrot.offset()).left;
                                    posCY = (rrot.offset()).top;
                                }
                                
                                if($(e.target).hasClass('rright')){
                                    posCX = (lrot.offset()).left;
                                    posCY = (lrot.offset()).top;
                                }
                                
                                //Создаем объект линии 
                                line_obj = $('<div>', {      
                                                class: 'line',
                                            }).css('left',(posCX-parentOffset.left)+'px').css('top', (posCY-parentOffset.top)+'px');
                                                
                                                                                                                                                                            
                            },
                            drag: function(e){
                                 var parentOffset = $('#workarea').offset(); 
                                 
                                 cX = parseInt((posCX-parentOffset.left));
                                 cY = parseInt((posCY-parentOffset.top));
                                 mX = parseInt((e.pageX-parentOffset.left));
                                 mY = parseInt((e.pageY-parentOffset.top));
                                 
                                // параметры полигона будем брать из настроек пользователя
                              
                                   // рисуем линию  с поворотом
                                   drawLineRotate(line_obj, mX, cX)  

                                   var new_obj = ($('<div class="ready_polygon_anymation"></div>')).html(line_obj);  
                                   $('#workarea').append(new_obj);
                            }, 
                            stop: function(e){
                                    line_obj = setRotators(line_obj);
                                    var new_obj = ($('<div class="ready_polygon"></div>')).html(line_obj);
                                     
                                    $('#workarea').append(new_obj);
                                    addSelectableHandler($(new_obj).find('.line'));
                                    $('#workarea').unbind('mousemove.poly');  
                                    $('.ready_polygon_anymation').remove(); 
                                    $(e.target).parent().parent().remove();   
                            }      
                      })
}

// функция для выделения элементов с помощью мыши
function bindSelectingStart(){
    $('#workarea').disableSelection();
    $('#workarea').on('mousedown.selectobj', function(e){
        $(select_obj).remove();
        select_obj = $('<div class="selectobj"></div>');
        $(select_obj).appendTo($('#workarea'));
        var parentOffset = $(this).offset();
        cX = e.pageX - parentOffset.left;
        cY = e.pageY - parentOffset.top;
        $('#workarea').on('mousemove.selectobj', function(e){
            drawSelectingArea(e.pageX, e.pageY);
            return false;
        });
        $('body').on('mouseup.selectobj', function(){
            $('#workarea').unbind('mousemove.selectobj');
            $('body').unbind('mouseup.selectobj');
            $(select_obj).remove();
            $('.ui-selecting').click();
        });
    });
}

function drawSelectingArea(startX, startY){
    var parentOffset = $('#workarea').offset();
    mX = startX - parentOffset.left;
    mY = startY - parentOffset.top;
    select_obj_left = mX<cX ? mX : cX;
    select_obj_top = mY<cY ? mY : cY;
    var select_obj_width = Math.abs(mX-cX);
    var select_obj_height = Math.abs(mY-cY);
    select_obj_right = select_obj_left + select_obj_width;
    select_obj_bottom = select_obj_top + select_obj_height;
    $(select_obj).css('left', select_obj_left);
    $(select_obj).css('top', select_obj_top);
    $(select_obj).css('width', select_obj_width);
    $(select_obj).css('height', select_obj_height);
    selectElementsByArea();
}

function selectElementsByArea(){
    var ids = getAllElements();
    //console.log(elements);
    for (var i=ids.length-1; i>=0; i--){
        var el = $('#'+ids[i]);
        var line_offsets = getRealObjectOffsets(el);
        if (line_offsets){ // если наш объект - линия, то сюда запишутся смещения
            var el_left = line_offsets.left;
            var el_top = line_offsets.top;
            var el_right = line_offsets.right;
            var el_bottom = line_offsets.bottom;
        }else{ // иначе - иконка
            var el_left = parseInt($(el).css('left'));
            var el_top = parseInt($(el).css('top'));
            var el_right = el_left + parseInt($(el).css('width'));
            var el_bottom = el_top + parseInt($(el).css('height'));
        }
        //$(".selectobj").text("Element: el_left="+el_left+"; el_top="+el_top+"; el_right="+el_right+"; el_bottom="+el_bottom+"; ");
        if(el_left>select_obj_left && el_top>select_obj_top && el_right<select_obj_right && el_bottom<select_obj_bottom){
            //$(".selectobj").text($(this).attr('id'));
            $(el).addClass("ui-selecting");
        }else{
            $(el).removeClass("ui-selecting");
        }
    }
}

function getRealObjectCoords(el){
    var coords = new Array;
    if ($(el).hasClass('line')){ // Если объект - линия
        var degree = getRotationDegrees($(el));
        var el_height = parseFloat($(el).css('height'));
        var el_width = parseFloat($(el).css('width'));
        var radians = degree/(180 / Math.PI);
        var sinus = Math.sin(radians);
        var cosinus = Math.cos(radians);
        var offsetX = parseFloat($(el).parent().css('left'));
        offsetX = isNaN(offsetX) ? 0 : offsetX;
        var offsetY = parseFloat($(el).parent().css('top'));
        offsetY = isNaN(offsetY) ? 0 : offsetY;
        coords[0] = [parseFloat($(el).css('left')) + offsetX, parseFloat($(el).css('top')) + offsetY]; // 1X, 1Y
        if (degree<=-90){
            coords[1] = [coords[0][0] + Math.abs( el_height * sinus), coords[0][1] - Math.abs( el_height * cosinus)]; // 2X, 2Y
            coords[2] = [coords[0][0] - Math.abs( el_width * cosinus), coords[0][1] - Math.abs( el_width * sinus)]; // 3X, 3Y
            coords[3] = [coords[2][0] + Math.abs( el_height * sinus), coords[2][1] - Math.abs( el_height * cosinus)]; // 4X, 4Y
        }else if(degree>-90 && degree<0){
            coords[1] = [coords[0][0] + Math.abs( el_height * sinus), coords[0][1] + Math.abs( el_height * cosinus)]; // 2X, 2Y
            coords[2] = [coords[0][0] + Math.abs( el_width * cosinus), coords[0][1] - Math.abs( el_width * sinus)]; // 3X, 3Y
            coords[3] = [coords[2][0] + Math.abs( el_height * sinus), coords[2][1] + Math.abs( el_height * cosinus)]; // 4X, 4Y
        }else if(degree>90){
            coords[1] = [coords[0][0] + Math.abs( el_height * sinus), coords[0][1] - Math.abs( el_height * cosinus)]; // 2X, 2Y
            coords[2] = [coords[0][0] - Math.abs( el_width * cosinus), coords[0][1] + Math.abs( el_width * sinus)]; // 3X, 3Y
            coords[3] = [coords[2][0] + Math.abs( el_height * sinus), coords[2][1] - Math.abs( el_height * cosinus)]; // 4X, 4Y
        }else{
            coords[1] = [coords[0][0] - Math.abs( el_height * sinus), coords[0][1] + Math.abs( el_height * cosinus)]; // 2X, 2Y
            coords[2] = [coords[0][0] + Math.abs( el_width * cosinus), coords[0][1] + Math.abs( el_width * sinus)]; // 3X, 3Y
            coords[3] = [coords[2][0] - Math.abs( el_height * sinus), coords[2][1] + Math.abs( el_height * cosinus)]; // 4X, 4Y
        }
        return coords;
    }else{ // Если объект - иконка
        var el_left = parseFloat($(el).css('left'));
        var el_top = parseFloat($(el).css('top'));
        var el_height = parseFloat($(el).css('height'));
        var el_width = parseFloat($(el).css('width'));
        coords[0] = [el_left, el_top];
        coords[1] = [el_left, el_top+el_height];
        coords[2] = [el_left+el_width, el_top];
        coords[3] = [el_left+el_width, el_top+el_height];
        return coords;
    }
}

// Этот метод можно представить, как нахождение координат прямоугольника, описанного вокруг данного объекта
function getRealObjectOffsets(el){
    var coords = getRealObjectCoords(el);
    if (coords){
        var offsets = new Array;
        offsets.left = Math.min(coords[0][0], coords[1][0], coords[2][0], coords[3][0]);
        offsets.right = Math.max(coords[0][0], coords[1][0], coords[2][0], coords[3][0]);
        offsets.top = Math.min(coords[0][1], coords[1][1], coords[2][1], coords[3][1]);
        offsets.bottom = Math.max(coords[0][1], coords[1][1], coords[2][1], coords[3][1]);
        return offsets;
    }else{
        return false;
    }
}

function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.atan2(b, a) * (180/Math.PI);
    } else { var angle = 0; }
    return angle;
}

/// HELPER FUNCTIONS

// выбор инструмента и указателя мыши, общая функция
function selected_tool(obj){
    ubindActions();
    
    if(obj.hasClass('ui-selecting')){
        deselect_tool(obj);
        cursor_auto();
        $('.ready_polygon').draggable(draggable_line);
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
   $('#workarea').css('cursor', 'crosshair'); 
}

// переводим курсор в авто режим (стрелка)
function cursor_auto(){
    $('#workarea').css('cursor', 'auto');
}                                                                                                   

function ubindActions(){
    $('#workarea').unbind('mousedown.poly');
    $('#workarea').unbind('mouseup.poly');
    $('#workarea').unbind('mousemove.poly');
    $('.ready_polygon').unbind('click.rotate');
    $('.ready_polygon').unbind('draggable');
    $('#workarea').unbind('mousedown.selectobj');
    $('#workarea').unbind('mousemove.selectobj');
    $('body').unbind('mouseup.selectobj'); 
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
function setRotators(line_obj){
    return line_obj.html($('<div class="rotate_elem rleft"></div><div class="rotate_elem rright"></div>'));
}

function showRotators(obj){
    hideRotators();         
    obj.find('.rotate_elem').css('display', 'block');
}

function hideRotators(){
    $('#workarea').find('.rotate_elem').css('display', 'none')
}