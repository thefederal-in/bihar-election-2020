function createDropDowns(selector, dropdowndata, valuelabel, contentlabel, type){
    // console.log("dropdowndata", dropdowndata);
    var select = d3.select(selector)
    select.html(null);
    select.append('option').text("Select Constituency").attr("value", 0);
    var options = select.selectAll('option')
            .data(dropdowndata).enter()
            .append('option')
            .text(function (d) {
                // console.log(d.properties[contentlabel])
                return d.properties[contentlabel]; 
            })
            .attr("value", function (d) { 
                return d.properties[valuelabel]; 
            })
            .attr("data-name", function (d) { 
                return d.properties[contentlabel]; 
            })
            // .attr("data-name", function (d) { 
            //     return d.properties[contentlabel]; 
            // })

    $(selector +' option[value="'+defaultconst+'"]').attr("selected",true);    

}



function feedData(details, selectconstno, selectconstname){
    
    var fd = details.filter(function(obj){
        return obj.constno === selectconstno;
    })
    // console.log("feedData",fd[0])

    if(fd[0] !== undefined){
         if(fd[0]['status'] !== "Result Declared"){
            d3.select(".winorleadcand").text("Leading candidate")
            d3.select(".winorleadmarg").text("Leading margin")
            d3.select("#constName").html(selectconstname+ " <span>"+fd[0]['status']+"</span>");
        }else{
            d3.select(".winorleadcand").text("Winning candidate")
            d3.select(".winorleadmarg").text("Winning margin")
            d3.select("#constName").html(selectconstname+ " <span style='background-color:green;'>"+fd[0]['status']+"</span>");
        }
        d3.selectAll(".map-content__point").style("display", "grid")
        d3.select(".nodatamessage").style("display", "none")

        // d3.select("#constName").html(selectconstname+ " <span>"+fd[0]['status']+"</span>");
        d3.select("#leadCandName").text(fd[0]['leadingCandidate']);
        d3.select("#leadMargin").text(fd[0]['margin'].toLocaleString('en-IN'));
        d3.select("#trailCandName").text(fd[0]['trailingCandidate']);
        d3.select("#leadParty").html('<img src="img/parties/'+partyAbbrList[fd[0]['leadingParty']].toLowerCase()+'.svg" alt="">'+partyAbbrList[fd[0]['leadingParty']]);
        d3.select("#trailParty").html('<img src="img/parties/'+partyAbbrList[fd[0]['trailingParty']].toLowerCase()+'.svg" alt="">'+partyAbbrList[fd[0]['trailingParty']]);

    }else{
        
        d3.select("#constName").html(selectconstname);
        d3.selectAll(".map-content__point").style("display", "none")
        d3.select(".nodatamessage").style("display", "block")
        
    }
    
}
function drawCandList(canddata){
    console.log(canddata)

    var ul = d3.select(".candidates-list")

    ul.selectAll(".candmem")
    .data(canddata).enter().append("li").html(function(d,i){
        console.log(d.candidatename);
        var html = "<img src='https://thefederal.com/embed/bihar-election-2020/img/cands/"+d.sno+".png' /> <div class='li-meta'> <div class='licol'> <p>"+d.candidatename+"</p> <p><span>"+d.party+"</span> | <span>"+d.constituencyname+"</span></p></div><div class='leadortrail "+d.leadortrail+"'>"+d.leadortrail+"</div></div>"
        return html;
    })
}
function showConstData(){
    var selectedValue = $('#constlist option:selected').attr("value");
    var selectedValueName = $('#constlist option:selected').data();
    console.log(selectedValueName.name);
    $(".allconst").removeClass("active");
    d3.select(".const"+selectedValue).classed("active", "true");
    feedData(data2020['data'], parseInt(selectedValue), selectedValueName.name);
}