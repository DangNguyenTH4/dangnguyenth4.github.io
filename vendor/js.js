 $(function(){
 	 	 
 	 $(".xuong,.kn").click(function(){
 	  	$('body,html').animate({scrollTop:$('#khoiedu').offset().top},700);
 	  	return false ; 
 	  
 	 })
 	$(".sp").click(function(){
 	  	$('body,html').animate({scrollTop:$('#khoisanpham').offset().top},700);
 	  	return false ; 
 	  
 	 })
 	
	$(".cm").click(function(){
 	  	$('body,html').animate({scrollTop:$('#phanhoi').offset().top},700);
 	  	return false ; 
 	  
	  })

})
$(document).on('click','div#callme',function(){
	document.getElementById("au").pause();
	window.open("https://www.topcv.vn/xem-cv/BgJQD1AKBAYBUFVXW1dSB1YGUFFUBwMNVAJQWw157b")
});

