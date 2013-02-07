<?php
include 'views/header.php';  
?>

<!-- menu -->
<div id="menu" class="menu">        

</div><!-- end of menu -->

<!-- main container -->
<div id="container" class="row">

    <!-- LEFT TOOL BAR -->
    <div id="left_tools" class="col">
        <div id="accordion">
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
                   <div class="lefticon tool poligon">POLIGON</div>
                   <div class="lefticon tool rectangle">RECT</div>  
                </div>
                <div id="tollsbg"></div>
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
    <div id="workarea" class="col">
        <div id="background"></div>
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
         <div id="accordion_tools">
            <div class="group">
                <h3>Curves</h3>
                <div id="curves">
                    
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