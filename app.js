var input = d3.select("input");

d3.select("form").on("submit",()=>{
	d3.event.preventDefault();
	var text = input.property("value");

	var letters = d3.select("#letters")
			.selectAll(".letter")
		.data(getFrequencies(text),(d)=>{
			return d.character;
		});
				
	letters
		.classed("new", false)
	  .exit()
	  .remove();	
	
	letters
		.enter()
		.append("div")
		.classed("new", true)
		.classed("letter", true)
	  .merge(letters)
		.style("width","20px")
		.style("line-height","20px")
		.style("margin-right","5px")
		.style("height",(d)=>{
			return d.count * 20 + "px";
		})
		.text((d)=>{ return d.character;});
	d3.select("#phrase")
		.text("Analysis of: " + text);
	d3.select("#count")
		.text("( New Characters: " + letters.enter().nodes().length +" )");
	input.property("value","");
});

function getFrequencies(array){
	var sorted = array.toString().split("").sort();
	var data = [];
	for(var i=0; i<sorted.length; i++){
		var last = data[data.length-1];
		if(last && last.character === sorted[i]){ last.count++;}
		else{ data.push({character: sorted[i], count: 1});}
	}
	return data;
}

d3.select("#reset").on("click",()=>{
	console.log("Hi")
	d3.selectAll(".letter")
	  .remove();
	  
	d3.select("#phrase")
	  .text("");
	 
	d3.select("#count")
	  .text("");
});

