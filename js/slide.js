function Slides(h,j){
	//select
	var thumb = $("."+ h);			
	var thumb_sel = thumb.find("." + j);
	var i = 0;							
	
	thumb.append(
		"<div id='nav'>" +
			"<div class='arrow'>" +
				"<span><b>01</b>/" + numbering(thumb_sel.length - 1) + "</span>" +
				"<a class='prev' href='#'><span class='alt'>이전</span></a>" +
				"<a class='next' href='#'><span class='alt'>다음</span></a>" +
			"</div>" +
			//"<ul></ul>" + 
		"</div>"
	);

	thumb_sel.each(function(e){ 
		var lt = 100 * e + "%"; $(this).css("left",lt); 
		thumb.find("#nav ul").append("<li><a href='#'><span class='alt'>"+ (e + 1) +"</span></a></li>");
	});
	
	//paging
	thumb.find("#nav ul").css("margin-left",thumb.find("#nav ul").width() / -2);
	thumb_sel.eq(0).addClass("active"); 
	thumb.find("#nav ul li").eq(0).addClass("active");
		
	// Btn
	thumb.find(".prev").click(function(){thumb.slides("prev","slide > li",500,"swing");return false;});
	thumb.find(".next").click(function(){thumb.slides("next","slide > li",500,"swing");return false;});
	thumb.find("#nav li a").click(function(){
		targ = $(this).parent("li").index();
		if($(this).is(".active") == true) return false;
		thumb.slides(targ,"slide > li",500,"swing");
		return false;
	});	

	// Swipe
	thumb.swipe({
		swipe:function(event, direction, distance, duration){
		//event, direction, distance, duration, fingerCount, fingerData	
		var cp_left = (direction == "left" && distance > 50 && duration > 50);
		var cp_right = (direction == "right" && distance > 50 && duration > 50);
		var cp_top = (direction == "up" && distance > 50 && duration > 50);
		
		if(cp_left) thumb.slides("next","slide > li",700,"swing");
		else if(cp_right) thumb.slides("prev","slide > li",700,"swing");
		
	},threshold:0});
	
	// Keyboard
	$('body').keydown(function(e) {
		if(e.keyCode == 37) thumb.slides("prev","slide > li",700,"swing");
		else if(e.keyCode == 39) thumb.slides("next","slide > li",700,"swing");
	});

}

	
//slide PlugIn
(function( $ ){
	$.fn.slides = function(e, s, spd, eft, roll){
	var thumb =  this;
	var thumb_sel = this.find("." + s);
	var total =  thumb_sel.length - 1;
	var pct = 100;						//% 퍼센트
	var i = 0;
	
	if (thumb_sel.is(":animated")) return false; 	
	thumb_sel.each(function(k){
		if($(this).attr("class") == "active") i = k;
	});	
		
	//Mov
	function VidMove(){
		if($("body").is(".vid") == true){
			var video = document.getElementById("MyVideo");
			var player = new Vimeo.Player(video);
			var dht = $("section > div:first-child").height() - 86;
			var poX = $(this).scrollTop();
		
			if(dht < poX) player.pause(); 
			else player.play();
			
			if(i == 0){ 
				if(dht < poX) player.pause(); 
				else player.play();  
			}else{ 
				player.pause(); 
			}
			
		}
	}

	//prev
	if(e == "prev"){
		if(i <= 0) i = total; else i = i - 1;
		if(thumb_sel.eq(0).attr("class") == "active"){
			$(thumb_sel.get().reverse()).each(function(e){
				if($(this).attr("class") != "active"){ e = e + 1; 
					$(this).css("left",-pct * e + "%");
				}
			});
			thumb_sel.animate({"left":"+=" + pct + "%"},spd,eft,function(){ thumb_sel.eq(0).css("left",(-pct * total) + "%"); });
		}else{
			thumb_sel.animate({"left":"-=" + -pct + "%"},spd,eft);
		}VidMove();
	
	//next
	}else if(e == "next"){
		if(i == total) i = 0; else i = i + 1;
		if(thumb_sel.eq(total).attr("class") == "active"){
			thumb_sel.each(function(e){
				if($(this).attr("class") != "active"){ $(this).css("left",pct * e + pct + "%"); }
			});
			thumb_sel.animate({"left":"-=" + pct + "%"},spd,eft,function(){ thumb_sel.eq(total).css("left",(pct * total) + "%"); });
		}else{
			thumb_sel.animate({"left":"-=" + pct + "%"},spd,eft);
		}VidMove();
		
	//page
	}else{ i = e;
		if($(window).width() <= 1000) var dom_w = 1000 / pct; 
		else var dom_w = thumb.width() / pct;
						
		s_left = thumb_sel.eq(i).position().left; 
		s_left = s_left / dom_w; 
		
		thumb_sel.animate({"left":"-=" + s_left + "%"},spd,eft);
		VidMove();
	}
	
	thumb_sel.removeClass("active");
	thumb_sel.eq(i).addClass("active");
	
	thumb.find(".arrow span b").text(numbering(i));

	thumb.find("#nav li").removeClass("active");
	thumb.find("#nav li").eq(i).addClass("active");
			
	};
}(jQuery));