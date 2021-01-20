function mapfunction(selector){

    var margin = {top: 0, left: 0, right: 0, bottom: 0},
    scale = 9100, center = [85.8, 25.9],
    height = 600 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;
    mapurl = "https://thefederal.com/embed/bihar-election-2020/map/bihar-ac.json"

    d3.select(selector).html(null)

    var svg = d3.select(selector)
        .append("svg")
        .attr("class", "biharmap")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")

    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-15, 0])
        .html(function(d) { 
            // console.log(d.properties.AC_NAME);
            var html = "<p>"+d.properties.AC_NAME+"</p> "
            return html; 
        });
    svg.call(tool_tip);
    
    var projection = d3.geoMercator()
        .scale(scale)
        .center(center)
        .translate([width / 2, height / 2])

    var geoPath = d3.geoPath()
        .projection(projection)
    

    d3.json(mapurl, function(mapdata){
        
        let allShape = topojson.feature(mapdata, mapdata.objects.collection).features;

        // console.log(allShape[0].properties);

        svg.selectAll(".const")
            .data(allShape).enter().append("path")
            .attr("d", geoPath)
            .attr("class", function(d){
                return "allconst const"+d.properties.AC_NO;
            })
            .attr("stroke", "#000")
            .attr("stroke-width", 0.2)
            .attr("fill", function(d, i){
                
                var fd = data2020['data'].filter(function(obj){
                    // console.log(obj);
                    return obj.constno === d.properties.AC_NO;
                })

                if(fd[0] !== undefined){
                    // console.log(fd[0]['leadingParty'], partyAbbrList[fd[0]['leadingParty']], partycolors[partyAbbrList[fd[0]['leadingParty']]])
                    

                    if(fd[0]['status'] !== "Result Declared"){
                        return partycolorsmaplead[partyAbbrList[fd[0]['leadingParty']]];
                    }else{
                        return partycolorsmapwin[partyAbbrList[fd[0]['leadingParty']]];
                    }


                }else{
                    return "#FFFFFF";
                }
                
                
            })
            .on('mouseover', tool_tip.show)
            .on('mouseout', tool_tip.hide)
            .on("click", function(d, i){
                $(".allconst").removeClass("active");
                d3.select(".const"+d.properties.AC_NO).classed("active", "true");
                $('#constlist option[value="'+d.properties.AC_NO+'"]').attr("selected",true);

                var fd = data2020['data'].filter(function(obj){
                    return obj.constno === d.properties.AC_NO;
                })

                feedData(data2020['data'], d.properties.AC_NO, d.properties.AC_NAME);

                // if(fd[0] !== undefined){

                //     feedData(data2020['data'], d.properties.AC_NO, d.properties.AC_NAME);
                // }else{
                //     console.log("No Data");
                //     d3.selectAll(".map-content__point").style("display", "none");
                //     d3.select(".nodatamessage").style("display", "block");
                // }
                

                
                
                

                
               
            })
        
        d3.select(".const"+defaultconst).classed("active", "true")
        
        
        createDropDowns("#constlist", allShape, "AC_NO", "AC_NAME", "map")

    });

    
}