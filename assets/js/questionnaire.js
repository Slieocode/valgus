$(document).ready(function(){
	if($('.questionnaire').length){
		$('body').css({overflow:"hidden"});
	}
	let tl = new TimelineMax({pause:true});
	function staggerEffect(){
		 tl.staggerFrom('.option', 0.5, {scale:"0", opacity:0,   ease:Power4.easeOut}, 0.2);		
	}
	staggerEffect();
	$('.start-questionnaire').on('click', function(){
		alert("s")
		tl
		 .to('.welcome', .5, {opacity:"0"})
		 .to('.welcome', .1, {css:{display:"none"}})
		 .to('#questions', 0.2, {opacity:1})
 
	});

	let optionsFields = $('.options-ul');
	let optionList;
	let i = 0;
	let currentlyClicked;
	let currentList;

	function find(obj, item) {
	    for(var key in obj) {                                   // for each key in obj (obj is either an object or an array)
	        if(obj[key] && typeof obj[key] === "object") {      // if the current property (value of obj[key]) is also an object/array
	            var result = find(obj[key], item);              // try finding item in that object
	            if(result) {                                    // if we find it
	                result.unshift(key);                        // we shift the current key to the path array (result will be an array of keys)
	                return result;                              // and we return it to our caller
	            }
	        } else if(obj[key] === item) {                      // otherwise (if obj[key] is not an object or array) we check if it is the item we're looking for
	            return [key];                                   // if it is then we return the path array (this is where the path array get constructed)
	        }
	    }
	}
	function findFormatted(obj, item) {
	    var path = find(obj, item);                             // first let's get the path array to item (if it exists)
	    if(path == null) {                                      // if it doesn't exist
	        return "";                                          // return something to signal its inexistance
	    }
	    return 'data["' + path.join('"]["') + '"]';            // otherwise format the path array into a string and return it
	}	

	function getList(obj){
		let loop = Object.keys(data);
	}

	function populateData(clickedList){
		// console.log(data[currentlyClicked])
		let grabedObj = eval(findFormatted(data, clickedList+"-op").split('["slot"]').join(''));
		let grablist;
		if(!grabedObj){
			console.warn(findFormatted(data, clickedList+"-op"))

			grabedObj = findFormatted(data, clickedList+"-op").split('["slot"]');
			grabedObj.pop();
			grabedObj = grabedObj.join('')

			// .join('').match(/\[(.*?)\]/g)
			// grabedObj.pop();
			// grabedObj = grabedObj.join("");
			console.log(grabedObj)
			grabedObj = eval(grabedObj);
			grablist = Object.keys(grabedObj).filter(function(item){
				return item !== "slot"
			});
		}else{
			    grablist = Object.keys(grabedObj);
				grablist.pop();			
		}
			// console.error(findFormatted(data, clickedList+"-op").split('["slot"]').join(''))
			// console.log(findFormatted(data, clickedList+"-op"))
		// console.log(findFormatted(data, grablist))

		// console.log(currentList)
		$(optionsFields).empty();

		for(i = 0; i < grablist.length; i+=1){
			$(optionsFields).append($("<li class='option'>"+ grablist[i] +"</li>")); 
		}
		staggerEffect();
	}

	$(document).on('click',".option",   function(){
		currentlyClicked = $(this).text();

		populateData(currentlyClicked);
	});

	function getData(){
		// firebase.database().ref().once('value', function(snapshot){
		// 		console.log(snapshot.child('some').val())
		// });
	
		// fetch('./database.json')
		// .then(function(res){
		// 	return res.json();
		// })
		// .then((data) => {
		// 	console.log(data)
		// })

		console.log(data)
	}
	getData();

});