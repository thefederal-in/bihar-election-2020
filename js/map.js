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

    // var tool_tip = d3.tip()
    //     .attr("class", "d3-tip")
    //     .offset([-15, 0])
    //     .html(function(d) { 
    //         // if(d["Total Deaths"]=="NULL")
    //         // { 
    //         // d["Total Deaths"] = 0;
    //         // }
    //         var html = "<p>"+d.name +"</p> "
    //         return html; 
    //     });
    // svg.call(tool_tip);
    
    var projection = d3.geoMercator()
        .scale(scale)
        .center(center)
        .translate([width / 2, height / 2])

    var geoPath = d3.geoPath()
        .projection(projection)
    

    d3.json(mapurl, function(mapdata){
        
        let allShape = topojson.feature(mapdata, mapdata.objects.collection).features;

        console.log(allShape[0].properties);

        svg.selectAll(".const")
            .data(allShape).enter().append("path")
            .attr("d", geoPath)
            .attr("class", function(d){
                return "allconst const"+d.properties.AC_NO;
            })
            .attr("stroke", "#000")
            .attr("stroke-width", 0.2)
            .attr("fill", function(d, i){
                
                var fd = data2020['2015'].filter(function(obj){
                    return obj.constno === d.properties.AC_NO;
                })

                if(fd[0]['leadingParty'] !== undefined){
                    return partycolors[partyAbbrList[fd[0]['leadingParty']]];
                }else{
                    return "#FFFFFF";
                }
                
                
            })
            .on("click", function(d, i){
                // var fd = data2020['2015'].filter(function(obj){
                //     return obj.constno === d.properties.AC_NO;
                // })

                $(".allconst").removeClass("active");
                
                d3.select(".const"+d.properties.AC_NO).classed("active", "true");
                $('#constlist option[value="'+d.properties.AC_NO+'"]').attr("selected",true);

                feedData(data2020['2015'], d.properties.AC_NO);
            })
        
        d3.select(".const"+defaultconst).classed("active", "true")
        
        
        createDropDowns("#constlist", allShape, "AC_NO", "AC_NAME", "map")

    });

    
}