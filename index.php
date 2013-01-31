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
                    <div class="lefticon draggable original">:-)</div>
                    <div class="lefticon draggable original">:-(</div>
                    <div class="lefticon draggable original">:-0</div>
                </div>
            </div>
            <div class="group">
                <h3>Shapes</h3>
                <div>
                   <div class="lefticon draggable_shape original line">---<br />line</div> 
                   <div class="lefticon draggable_shape original rectangle">|=|<br />rectangle</div> 
                   
                   <!--
                   <ul id="selectable_draw">
                   <li>---- line</li> 
                   <li>-/-/- pencil</li> 
                   </ul>
                   -->
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
    <div id="workarea" class="col">
    
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
        
    </div>
    <!-- END OF RIGHT TOOL BAR -->
    
</div>
<!-- end of main container -->


<?php
include 'views/footer.php';  
?>