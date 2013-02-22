<?php
include 'views/header.php';  
?>

<!-- menu -->
<div id="menu" class="menu">        

</div><!-- end of menu -->

<div id="workarea">
    <div id="background"></div>
</div> 

<!-- main container -->
<div id="container" class="row">

    <!-- LEFT TOOL BAR -->
    <div id="left_tools" class="col">
        <div id="accordion_left">
            <div class="group">
                <h3>Section 1</h3>
                <div>
                    <div class="lefticon draggable originalicon">:-)</div>
                    <div class="lefticon draggable originalicon">:-(</div>
                    <div class="lefticon draggable originalicon">:-0</div>
                </div>
            </div>
            
            <div class="group">
                <h3>Shapes</h3>
                <div id="tools">
                   <div class="lefticon originalicon tool line_ico">Line</div>
                   <div class="lefticon originalicon tool polygon_ico">Poligon</div>
                   <div class="lefticon originalicon tool rotate_ico">Rotate</div>
                   <div class="lefticon originalicon tool select_ico">Select</div>
                </div>
            </div>
            <div class="group">
                <h3>Section 3</h3>
                <div>
                    <p>Nam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque lobortis. Phasellus pellentesque purus in massa. Aenean in pede. Phasellus ac libero ac tellus pellentesque semper. Sed ac felis. Sed commodo, magna quis lacinia ornare, quam ante aliquam nisi, eu iaculis leo purus venenatis dui. </p>
                    <ul>
                        <li>List item one</li>
                        <li>List item two</li>
                        <li>List item three</li>
                    </ul>
                </div>
            </div>
            <div class="group">
                <h3>Section 4</h3>
                <div>
                    <p>Cras dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean lacinia mauris vel est. </p><p>Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
                </div>
            </div>
        </div>
    </div>
    <!-- END LEFT TOOL BAR -->
    
    <!-- WORKFLOW -->  
    <div id="center" class="col">
    </div>
    <!-- END OF WORKFLOW -->
    
    
    
    <!-- PATTERN -->   
    <!--
    <div id="pattern" class="col">
    </div>
    -->
    <!-- END OF PATTERN -->

    
    
    <!-- RIGHT TOOL BAR -->    
    <div id="right_tools" class="col">
         <div id="accordion_right">
            <div class="group">
                <h3>Attrs</h3>
                <div id="attrs">
                <!--
                    1. цвет линии (просто заливка цветом)
                    2. стиль (бэкграундом разметки дорог)
                    3. ширина
                    4. баллун на клик
                    5. алт на овер
                    6. текст (название улицы например)
                    это должно быть перенесено в функцию для размножения по каждой линии
                -->
                    <div id="line_0">  
                        <div> 
                        Color  
                        <input type="minicolors" class="minicolors minicolors-input"> <br />
                        </div>
                        <div>
                        Height
                        <select class="height">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        </div>
                        <div>
                        Style
                        <select class="style">
                            <option value="1">---</option>
                            <option value="2">===</option>
                        </select>
                        </div>
                        <div>
                        Static text on object
                        <input type="text" class="statictext">
                        </div>
                        <div>
                        Mouse hover text
                        <input type="text" class="mhover">
                        </div>
                        <div>
                        Mouse clicked info text
                        <textarea cols="20" rows="3" class="mcklick"></textarea>
                        </div>
                    </div>
                     
                </div>
            </div>
            <div class="group">
                <h3>Curves</h3>
                <div id="curves">
                
                <div id="layerbackground"></div>     
                </div>
            </div>
            <div class="group">
                <h3>Adv</h3>
                <div id="adv">
                  
                </div>
            </div>
         </div>
    </div>
    <!-- END OF RIGHT TOOL BAR -->   
</div>
<!-- end of main container -->


<?php
include 'views/footer.php';  
?>