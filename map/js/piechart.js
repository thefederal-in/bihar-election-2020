function drawPiechart(selection, piedata) {
    var width= 500, height= 270, pi= Math.PI, margin= { top: 20, right: 20, bottom: 20, left: 20 }, innerR= 150,
    textLabel= "text", numberLabel= "voterturnout", displayLabel= "voterturnout";
    const chartWidth = width - margin.right - margin.left;
    const chartHeight = height - margin.right - margin.left
    const radius = width / 2;

    // console.log('piedata', piedata);

    var legendRectSize = 18;                                  // NEW
    var legendSpacing = 4;                                    // NEW

    

    d3.select(selection).html(null)

    const color = d3.scaleOrdinal()
        .range(['#59c4ed', '#dddddd'])
        .domain(['actual turn out', 'difference turn out']);


    //Arc generator
    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(150);
    //Arc for Label generator
    var labelArc = d3.arc()
        .outerRadius(radius - 50)
        .innerRadius(radius - 50);
    //Pie Generator
    var pie = d3.pie()
        .sort(null)
        .value(function(d) {
            return d[numberLabel];
        })
        .startAngle(-90 * (pi / 180))
        .endAngle(90 * (pi / 180));

    var formatNumbers = d3.format(".2");

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(selection).append("svg")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + 250 + ")")

    var g = svg.selectAll(".arc")
        .data(pie(piedata))
        .enter().append("g")
        .attr("class", "arc")

    g.append("path")
        .attr("d", arc)
        .attr("fill", function(d) {
            return color(d.data[textLabel])
        })
        .attr("stroke", "#fff")
        .transition()
        .duration(1000)
        .attrTween("d", tweenPie);

    g.append("text")
        .attr("transform", function(d) {
            return "translate(" + labelArc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .attr("class", "pieText")
        .attr("font-size", "3em")
        .text(function(d) {

           if(d.data[displayLabel] !== 0 && d.data[textLabel] !=='difference turn out'){
            return d.data[displayLabel] + '%';
           }
        })

    // legendItems

    // let legendRow = d3.select(selection).append('div')
    //     .attr("class", 'legendDiv')

    // let legendItems = legendRow.selectAll('.legend')
    //     .data(color.domain())
    //     .enter()
    //     .append('div')
    //     .attr('class', 'legend')

    // legendItems.append('span')
    //     .style('background-color', function(d,i){
    //         return color(d);
    //     })
    
    // legendItems.append('b')
    //     .html(function(d) { return d; }); 
    
    // legendItems               

    function tweenPie(b) {
        console.log(b.data.text === "actual turn out");
        console.log(b.data.voterturnout);

        if(b.data.text === "actual turn out"){
            if(b.data.voterturnout == 0){
                d3.select(".startertext").style("display", "block")
            }else{
                d3.select(".startertext").style("display", "none")
            }
        }else{

        }
        b.innerRadius = 0;
        var i = d3.interpolate({
            startAngle: -90 * (pi / 180),
            endAngle: 90 * (pi / 180)
        }, b);
        return function(t) {
            return arc(i(t));
        };
    }

} // end drawPiechart