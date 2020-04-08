const projectName = "random-quote-machine";
	localStorage.setItem('example_project', 'Randowm Quote Machine');
	let quotesData;


	var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
	var currentQuote = '', currentAuthor = '';

	const quotes = {
	  1 : {
		text : "The way to get started is to quit talking and begin doing",
		author : "Walt Disney"
	  },
	  2 : {
		text : "Life is what happens when you're busy making other plans.",
		author : "John Lennon"
	  },
	3 : {
		text : "Always remember that you are absolutely unique. Just like everyone else.",
		author : "Margret Mead"
	  },4 : {
		text : "Whoever is happy will make others happy too.",
		author : "Anne Frank"
	  },0 : {
		text : "Life is either a daring adventure or nothing at all.",
		author : "Helen Keller"
	  }
	};
	
	function changeQuote(){
		randomQuote = Math.floor(Math.random() * Object.keys(quotes).length);
	  randomColor  = Math.floor(Math.random() * colors.length);
	  currentQuote = quotes[randomQuote].text;
	  currentAuthor = quotes[randomQuote].author;
	  //$('#text').html(currentQuote) ;
	  //$('#author').html(currentAuthor);
	  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
	  
	  $("html body").animate(
		{
		  backgroundColor: colors[randomColor],
		  color: colors[randomColor]
		},
		1000
	  );
	  $(".button").animate(
		{
		  backgroundColor: colors[randomColor]
		},
		1000
	  );
	  
	   $(".quote-text").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $('#text').text(currentQuote);
    }
  );

  $(".quote-author").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $('#author').html(currentAuthor);
    }
  );
  
	}

	$(document).ready(function() {
	  
	  changeQuote();
	  $('#new-quote').on('click',changeQuote);
	  $('#tweet-quote').on('click',function(e){
		e.preventDefault(); 
		var url = $(this).attr('href'); 
		window.open(url, '_blank');
		
	  });
	});