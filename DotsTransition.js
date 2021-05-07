




			function addCircle(filteredData47, x, y, SelectionColor){

                //adding circles on far left	
                  svg.selectAll("circle")
                    .data(filteredData47)
                    .enter()
                    .append("circle")
                        .attr("transform", "translate("+110+",0)")
                          .attr("cx", 0)
                          .attr("cy", function(d) { return y(d.Response); })
                          .attr("r",  7)
                          .style("fill", function(d) { return SelectionColor(d.Selection); })
                          .style("stroke", function(d) { return SelectionColor(d.Selection); })
                        .style("stroke-width","2.5px")
                        .style("stroke-opacity","1")
                        .attr("fill-opacity","0")
                        .on("mouseover", function(d,i) {
                                   
                            var hoveredSelection47 = filteredData47[i].Selection;
    
                            svg.selectAll("circle").style("opacity", function(d) {
                                        return d.Selection == hoveredSelection47 ? 1 : 0.1; //only show highlighted with full opacity
    
                            })
                           
                            d3.select("#tooltip47")
                                .style("left", (d3.event.pageX -5) + "px")		
                                .style("top", (d3.event.pageY -70) + "px")
                                .select("#TooltipText47")
                                    .text(d.Value + "% responded " +d.Response +" pay increase")	
    
                            d3.select("#tooltip47")
                                .style("left", (d3.event.pageX -5) + "px")		
                                .style("top", (d3.event.pageY -70) + "px")
                                .select("#TooltipTitle47")
                                    .text(d.Selection)	
    
                            //Show the tooltip
                            d3.select("#tooltip47").classed("hidden", false);
    
                        }) // on mouseover
                        .on("mouseout", function() {
    
                               svg.selectAll("circle").style("opacity", 1)
    
                               //Hide the tooltip
                            d3.select("#tooltip47").classed("hidden", true);
                                
                        }); // on mouseout
    
                //transition into place and transistion size and fill
                svg.selectAll("circle")	
                          .transition()
                          .duration(1000)
                          .delay(0)
                          .attr("cx", function(d) { return x(d.Value) ; })
                          .transition()
                          .duration(500)
                          .delay(100)
                          .attr("fill-opacity", function(d) {
                              if (d.MinMiddleMax == "Min") {
                                   return 1;
                            } else if (d.MinMiddleMax == "Max") {
                                 return 1;
                            } else if (d.MinMiddleMax == "Middle") {
                                 return 0; 
                            } 
                        })
                        .attr("r",  function(d) { 
                              if (d.MinMiddleMax == "Min") {
                                   return 5;
                            } else if (d.MinMiddleMax == "Max") {
                                 return 9;
                            } else if (d.MinMiddleMax == "Middle") {
                                 return 7; 
                            } 
                          }); 	
    
                } //addCircle Function
    
                //creating legend function
                function addLegend(filteredData47, SelectionColor){
                    svgLegend.append("g")
                        .attr("class","myLegend47")
                        .attr("transform", "translate(15,15)")
                        .call(d3.legendColor()
                            .shape("path", d3.symbol().type(d3.symbolCircle).size(175)())
                            .scale(SelectionColor)
                            .shapePadding(12)
                            .orient("vertical")
                            .labelAlign("start")
                            .labelWrap(100)
                            .labelOffset(8)
                        );
    
                } //creating legend function
    
    
            //Width and height and other global variables
            var //margin = {top: 10, right: 10, bottom: 30, left: 10},
                width47 = 700, //- margin.left - margin.right,
                height47 = 500, //- margin.top - margin.bottom,
                selectedGroup47, hoveredSelection47, filteredData47;
    
            //creating SVG element for legend	
            var svgLegend = d3.select("#myLegend47")
    
            //Create SVG element for chart
            var svg = d3.select("#myChart47")
    
            
            d3.csv("DotsData.csv",function(data){ 
    
                dataset = data
    
                //converting measures 
                dataset.forEach(function(d) {
                    d.Response = d.Response;
                    d.SelectionGroup = d.SelectionGroup;
                    d.Selection = d.Selection;
                    d.Value = +d.Value;
                    d.SortOrder = +d.SortOrder;
                    d.MinMiddleMax = d.MinMiddleMax;
                });
    
                //sort data and assign to global variable
                dataset = data.sort(function(a, b) { return d3.ascending(a.SortOrder, b.SortOrder); });
                
    
                //Defining Global Scales
                var x = d3.scaleLinear()
                       .domain([0, d3.max(dataset, function(d) {return d.Value;})])
                    .range([ 0, width47-110-20]) //width - left label padding - extra padding to see full circle
    
                   var y = d3.scaleBand()
                    .range([0, height47])
                    .domain(dataset.map(function(d) { return d.Response; }))
                    .padding(1);
    
                //filter data
                filteredData47 = dataset
                .filter(function(d) { return d.SelectionGroup == "Company Size" ;})
                .sort(function(a, b) { return d3.ascending(a.sortOrder, b.sortOrder); });
    
                //Defining Color Scale on filtered data
                var SelectionColor = d3.scaleOrdinal()
                    .domain(filteredData47.map(function(d) { 	return d.Selection;}))
                    .range(["#004643","#2EC5C0","#CBAD39","#478289","#C3C9B0","#C3C909","#231F20","#AFDBBC","#F9A71C","#72BD44","#2961AE","#00ACC9"]);	
                        
    
                  //creating x axis
                  svg.append("g")
                      .attr("class","xaxis")
                    .attr("transform", "translate(110,"+0+")") //currently putting at the top
                    .call(d3.axisBottom()
                            .scale(x)
                            .ticks(7)
                            .tickFormat(x => `${x.toFixed(0)}%`) //% Format
                            .tickSizeOuter(0) //no outer ticks
                        )
                    
                d3.selectAll("g.tick")
                    .selectAll("text")
                //	.attr("fill","#57595D") //update color
    
                   //creating y axis
                  svg.append("g")
                      .attr("class","yaxis")
                      .attr("transform", "translate("+100+",0)") //a little less than 110
                    .call(d3.axisLeft()
                            .scale(y) 
                        ) 	
    
                d3.selectAll("g.tick")
                    .selectAll("text")
                //	.attr("fill","#57595D")	//update color
    
                   //horizontal gridlines
                   svg.append("g")			
                    .attr("class", "grid")
                    .attr("transform", "translate("+100+",0)")
                    .call(d3.axisLeft(y)
                        .ticks(5)
                         .tickSize(-width47+100)
                        .tickFormat("")
                    )				
        
                // Circles 
                addCircle(filteredData47, x, y, SelectionColor);
    
                // Legend 
                addLegend(filteredData47, SelectionColor);
    
    
    
    //////Updating Data and rebuilding Chart
    
                //dropdown selection updated
                d3.select("select")
                  .on("change",function(d){
    
                    selectedGroup47 = d3.select("#d3-dropdown").node().value; //selected string from dropdown
    
                    //filter data to 1 selection group
                    filteredData47 = dataset.filter(function(d) { return d.SelectionGroup == selectedGroup47 });
    
                    //updating color scale to new selection
                    SelectionColor = d3.scaleOrdinal()
                        .domain(filteredData47.map(function(d) { 	return d.Selection;}))
                        .range(["#004643","#2EC5C0","#CBAD39","#478289","#C3C9B0","#C3C909","#231F20","#AFDBBC","#F9A71C","#72BD44","#2961AE","#00ACC9"]);	
    
    
                    //remove unneeded circles
                    svg.selectAll("circle")
                        .remove();
    
                    //remove unneeded legend
                    svgLegend.selectAll("g")
                        .remove();
    
                    //create new circles 
                       addCircle(filteredData47, x, y, SelectionColor);
    
                       // Legend 
                    addLegend(filteredData47, SelectionColor);
    
    
                }); //dropdown update
    
            }); //data import
    