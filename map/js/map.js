function mapfunction(selector){

    var margin = {top: 0, left: 0, right: 0, bottom: 0},
    scale = 8000, center = [85.9, 25.7],
    height = 600 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;
    mapurl = "map/bihar-ac.json"

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

        // console.log(allShape);

        svg.selectAll(".const")
            .data(allShape).enter().append("path")
            .attr("d", geoPath)
            .attr("class", function(d){
                return "const"+d.properties.AC_NO;
            })
            .attr("stroke", "#000")
            .attr("stroke-width", 0.2)
            .attr("fill", function(d, i){
                console.log(typeof(d.properties.AC_NO))
                if(phase_ii.includes(d.properties.AC_NO)){
                    return "#fe8800"
                }else{
                    return "#ccc" //TODO: Change to white later once the phase wise list is fixed
                }
            })
            d3.select(".const"+defaultconst).classed("active", "true")  

    });

    
}