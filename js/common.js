"use strict";
document.write(
"<!--[if lte IE 9]>"
+ "<script type='text/javascript' src='//cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.3/jquery.xdomainrequest.min.js'></script>"
+ "<script type='text/javascript'>alert('브라우저를 최신 버전으로 업그레이드하세요.'); window.open('http://outdatedbrowser.com/ko','_blank');</script>"
+ "<![endif]-->"
);
$(function(){
/*---------------------------------------------------------------*/	
//variable
let video = document.getElementById("MyVideo");
let path = (location.href.substr(location.href.lastIndexOf("/") + 1)).split(".")[0]; 	//path
let split = (location.href.substr(location.href.lastIndexOf("/") + 1)).split("&idx")[1]; //split
let detailPath = ((location.href.substr(location.href.lastIndexOf("=") + 1)).slice(0, 2) - 1 + 1) - 1; //detail Path

/*---------------------------------------------------------------*/	
//header - GNB


if(window.innerWidth < 768) {  
	$("hgroup #lnb ul li a,#IdxMenu .lnb ul li a").on("click",function(){
		var i = $(this).parent("li").index();
		if($(this).parent("li").is(".on") === true){
			$("hgroup #lnb ul li").removeClass("on");
			$("#IdxMenu .lnb ul li").removeClass("on");
			$("header > nav").css({"height":"0"});
			$("header > nav > div").css({"opacity":"0","z-index":"1"});		
		}else{
			$("hgroup #lnb ul li").removeClass("on");
			$("hgroup #lnb ul li").eq(i).addClass("on");
			$("#IdxMenu .lnb ul li").removeClass("on");
			$("#IdxMenu .lnb ul li").eq(i).addClass("on");
			$("header > nav").css({"height":"500px"});
			$("header > nav > div").css({"opacity":"0","z-index":"1"});
			$("header > nav > div").eq(i).css({"opacity":"1","z-index":"2"});
		}	
		return false;
	});
	
	$(window).on("scroll",function(){
		if($("hgroup #lnb ul li").is(".on") === true || $("#IdxMenu .lnb ul li").is(".on") === true){
			$("hgroup #lnb ul li").removeClass("on");
			$("#IdxMenu .lnb ul li").removeClass("on");
			$("header > nav").css({"height":"0"});
			$("header > nav > div").css({"opacity":"0","z-index":"1"});
		}
	});	
	
	

} else {
	$("#lnb .InBox ul li, #IdxMenu .lnb .InBox ul li, header > nav > div").hover(function(){
		var i = $(this).index();
		$("#lnb .InBox ul li").removeClass("on");
		$("#lnb .InBox ul li").eq(i).addClass("on");
		$("#IdxMenu .lnb .InBox ul li").removeClass("on");
		$("#IdxMenu .lnb .InBox ul li").eq(i).addClass("on");
	
		$("header > nav").css({"height":"380px"});
		$("header > nav > div").css({"opacity":"0","z-index":"1"});
		$("header > nav > div").eq(i).css({"opacity":"1","z-index":"2"});
	});	
	
	$("#lnb, #IdxMenu, header > nav").mouseleave(function(){
		$("#lnb .InBox ul li").removeClass("on");
		$("#IdxMenu .lnb .InBox ul li").removeClass("on");
		$("header > nav > div").css({"opacity":"0","z-index":"1"});
		$("header > nav").css({"height":"0"});
	});
}



/*---------------------------------------------------------------*/	
//body
switch(path){
	//index Page
	case '' :
	case 'index' :
		var str = getBrowserType();
		function getBrowserType(){
			var agt = navigator.userAgent.toLowerCase();
			if (agt.indexOf("chrome") != -1) return 'Chrome';
			if (agt.indexOf("safari") != -1) return 'Safari';
		}
		if(str === "Safari") { $(".MyFrame #MyVideo").css("min-width","120%"); };

		if($(this).scrollTop() > 0){
			$("#IdxMenu").css("transform","translateY(-130px)");      
			$("#index header hgroup").css("transform","translateY(0px)");
		}else{
			$("#IdxMenu").css("transform","translateY(0px)");
			$("#index header hgroup").css("transform","translateY(-130px)");
		}	

		videoControl(video);
		new Vimeo.Player(video).on('play',function(){ 
			$("#Mov h2 div").css({"transform":"translateX(0)","opacity":"1"}); 
			$("#Mov h2 span").css({"transform":"translateY(0)","opacity":"1"}); 
			$("#Mov h2 strong").css({"transform":"translateY(30px)","opacity":"1"}); 
		});

		$(".section").eq(0).append(
			'<div id="scroll"><div></div><a href="#"><img src="images/scroll_idx.png" width="107" height="30" alt="" /></a><div></div></div>'
		);

		for(var i=0; i < img[0]; i++){
			$(".villas .swiper-image").append(
				'<div class="swiper-slide">' + 
					'<div style="background-image:url('+ url +'/main/' + (i + 1) + '.jpg)"></div>' + 
				'</div>'
			);
		} Swipers(".villas", "auto", true, 10, false); 

		$(window).on("scroll",function(){
			var thisTop = $(this).scrollTop();
			if(thisTop > 0){
				$("#IdxMenu").css({"transform":"translateY(-224px)","transition":"0.6s"});
				$("#index header hgroup").css({"transform":"translateY(0px)","transition":"0.6s ease"});
				$("#index header nav").addClass("open");
			}else{
				$("#IdxMenu").css({"transform":"translateY(0px)","transition":"0.6s"});
				$("#index header hgroup").css({"transform":"translateY(-224px)","transition":"0.6s"});
				$("#index header nav").removeClass("open");
			}

			var a = $(".section").eq(1).find("h3").offset().top - $(".section").height();
			var b = $(".section").eq(2).find("h3").offset().top - $(".section").height();
			var c = $(".section").eq(3).find("h3").offset().top - $(".section").height();
			
			var d = $("#index .villas .InBox").offset().top - $(".section").height();
			var e = $("#index .Vimeos > .Layout .InBox, .vid_bg").offset().top - $(".section").height();
			var f = $("#index .gallerys .InBox").offset().top - $(".section").height();

			if((thisTop > a) && (thisTop < b)) animated(1);
			else if((thisTop > b) && (thisTop < c)) animated(2);
			else if(thisTop > c) animated(3);
			
			if((thisTop > d) && (thisTop < e)){
				$("#index .villas .InBox").css({"opacity":"1","transform":"translateY(0)"});
			}else if((thisTop > e) && (thisTop < f)){
				$("#index .Vimeos > .Layout .InBox, .vid_bg").css({"opacity":"1","transform":"translateY(0)"});
			}else if((thisTop > f)){
				$("#index .gallerys .InBox").css({"opacity":"1","transform":"translateY(0)"});
			}
		});	

		function animated(e){
			$(".section").eq(e).find("h3 div").css({"opacity":"1","transform":"translateX(0)"});
			$(".section").eq(e).find("h3 span").css({"opacity":"1","transform":"translateX(115px)"});
			$(".section").eq(e).find("h3 strong").css({"opacity":"1","transform":"translateX(140px)"});
			$(".section").eq(e).find("p span").css({"opacity":"1","transform":"translateY(0)"});

			if(window.innerWidth < 768) { 
				$(".section").eq(e).find("h3 strong").css({"opacity":"1","transform":"translateX(40px)"});
	
			}

		}

		
		

		for(var i = 0; i < names[0].length; i++){
			$(".gallerys .InBox ul").append(
				'<li>' +
					'<a href="rooms.html?num='+ numbering(i) +'">' +
						'<div class="txt">' + 
							'<span>'+ names[0][i] +'</span>' +
							'<strong>'+ names[1][i] +'</strong>' +
						'</div>' +
						'<div class="img" style="background:url('+ url +'/room/' + (i + 1) + '/1.jpg) no-repeat 50% 50%;background-size:cover;"></div>' + 
					'</a>' +
				'</li>'
			);
		}

		$("#index .gallerys .InBox ul li").css("height",$("#index .gallerys .InBox ul li").width() / 5 * 5);
	
		$(window).on("resize", function() {
			$("#index .gallerys .InBox ul li").css("height",$("#index .gallerys .InBox ul li").width() / 5 * 5);	
		});

	break;	

	//about Page
	case 'about' :
		videoControl(video);
		$.getJSON('http://digitalnow.co.kr/reserve/pensionInfo/'+ account +'/4',//사업자 정보
		function(data){
			
			var NEW_USER_ADDR = data.result.NEW_USER_ADDR;	//도로명 주소
			var USER_ADDR = data.result.USER_ADDR;			//지번 주소
			var USER_TEL1 = data.result.USER_TEL1;			//전화번호 1
			var USER_TEL2 = data.result.USER_TEL2;			//전화번호 2

			$(".cont02 .title p").append(
				'<strong>'+ NEW_USER_ADDR +'('+ USER_ADDR +')</strong>' +
				'<span>예약문의 '+ USER_TEL1 + '</span>'
			);
			
			for(var i=0; i < img[1]; i++){
				$(".cont01 .swiper-image").append(
					'<div class="swiper-slide">' +
						'<div style="background-image:url('+ url +'/exterior/'+ (i + 1) +'.jpg)"></div>' +
					'</div>'
				);
			} 
			Swipers(".Swipers", "auto", true, 0, false); 
		});
	break;

	//travel Page
	case 'travel' :	
		/*
		$.getJSON("http://digitalnow.co.kr/reserve/pensionInfo/" + account + "/10", 
		function(data){
			let orderedList = [];
			for (let i = 0; i < data.result.length; i++){
				for (let j = 0; j < data.result.length; j++){
					if (Number(data.result[j]["ORDER_NUM"]) - 1 === i) orderedList.push(data.result[j]);
				}
			}
			$.each(data.result,function(key,val){
				$(".contents .InBox ul").append(
					'<li>' +
						'<div class="img"><img src="images/travel/'+ (key + 1) +'.jpg" width="100%" height="auto" alt="" /></div>' +
						'<div class="txt">' +
							'<h4>' +
								'<strong>'+ orderedList[key]["TITLE"] +'</strong>' +
								'<span>&nbsp;|&nbsp; '+ orderedList[key]["DISTANCE"] +'</span>' +
							'</h4>' +
							'<span>'+ orderedList[key]["CONTENT"] +'</span>' +
						'</div>' +
					'</li>'
				);
			});
		});
		*/
	break;	

	//rooms Page
	case 'rooms' :
		videoControl(video);

		$("body").addClass("rooms_" + numbering(detailPath));
		$.getJSON('http://digitalnow.co.kr/reserve/pensionInfo/'+ account +'/8',
		function(data){
			
			var TYPE_NAME = data.result[detailPath]["TYPE_NAME"];				//객실타입명(EN)
			var TYPE_DESC = data.result[detailPath]["TYPE_DESC"];				//객실타입명(KR)
			var TYPE_CONTENT = data.result[detailPath]["TYPE_CONTENT"];			//객실타입설명
			var TYPE_NM = data.result[detailPath]["TYPE_NM"];					//객실명(KR)
			var TYPE_NM_EN = data.result[detailPath]["TYPE_NM_EN"];				//객실명(EN)

			var ROOM_TYPE = data.result[detailPath]["ROOM_TYPE"];				//객실정보
			var ROOM_EXTN = data.result[detailPath]["ROOM_EXTN"] ;				//객실평수
			var FLHT_ROOM_CNT = data.result[detailPath]["FLHT_ROOM_CNT"]; 		//객실침실(침대)
			var ADLT_BASE_PERS = data.result[detailPath]["ADLT_BASE_PERS"];		//객실인원(기준)
			var ADLT_MAX_PERS = data.result[detailPath]["ADLT_MAX_PERS"];		//객실인원(최대)
			var ETC_DETL = data.result[detailPath]["ETC_DETL"];					//객실상세
			var INTERIOR = data.result[detailPath]["INTERIOR"].split(',');		//객실비품

			$("#visual").css("background-image","url(" + url + "/room/" + (detailPath + 1) + "/0.jpg)");
			$("#visual").append(
				'<div class="InBox">' +
					'<h2 class="ttls">' +
						'<span>POOLVILLA &nbsp;>&nbsp; <b>'+ names[1][detailPath] +'</b></span>' +	
						'<strong>POOLVILLA</strong>' +
					'</h2>' +
				'</div>'
			);
			$(".notices").append('<h3><span>' + names[0][detailPath] + '</span><strong>' + names[1][detailPath] +'</strong></h3>'); //<p>' + ETC_DETL + '</p>
			$(".contents").append(
				'<div class="section Swipers Room_Img" id="Swipers">' + 
					'<div class="swiper-view">' +
						'<div class="InBox">' +
							'<div class="swiper-container swiper">' +
								'<div class="swiper-wrapper swiper-image"></div>' +
								'<div class="swiper-button-next swiper-btn"></div>' +
								'<div class="swiper-button-prev swiper-btn"></div>' +
								'<div class="swiper-pagination"></div>' +
							'</div>' +
						'</div>' +        
					'</div>' +	 
				'</div>' +
				'<div class="section infos">' +
					'<div class="InBox">' +
						'<h3>객실정보</h3>' +
						'<ul>' +
							'<li><span class="tl">객실구조</span><span class="tx">'+ ROOM_TYPE +'</span></li>' +
							'<li><span class="tl">객실크기</span><span class="tx">'+ ROOM_EXTN +'평형</span></li>' +
							'<li><span class="tl">입실인원</span><span class="tx">기준 '+ ADLT_BASE_PERS +'명 ~ 최대 '+ ADLT_MAX_PERS +'명</span></li>' +
							'<li><span class="tl">입실/퇴실</span><span class="tx checkInOut">PM3:00 / AM 11:00</span></li>' +
							'<li><span class="tl">객실비품</span><ul class="eq"></ul></li>' +
							'<li class="etc"><span class="tl">특이사항</span><span class="tx">'+ ETC_DETL +'</span></li>' +
						'</ul>' +
					'</div>' +
					'<div class="InBox">' +
						'<h3>확인사항</h3>' +
						'<ul>' +
							'<li>모든 객실은 금연이며 화재의 위험이 있는 양초류의 사용은 불가합니다.</li>'+
							'<li>객실 구조 및 인테리어는 객실 위치에 따라 이미지와 다를 수 있습니다.</li>'+
							'<li>풀빌라내 반려동물 동반 입장은 불가합니다.</li>'+
							'<li>데코레이션 업체를 통한 객실 내 장식물 부착은 불가합니다.</li>'+
						'</ul>' +
					'</div>' +
				'</div>'
			);	
		
			//Swipers
			for(var i=0; i < img[2][detailPath]; i++){
				$("#Swipers .swiper-image").append(
					'<div class="swiper-slide">' + 
						'<div style="background-image:url('+ url +'/room/'+(detailPath + 1) +  '/' + (i + 1) +'.jpg)"></div>' + 
					'</div>'
				);
			} Swipers01(".Room_Img", "auto", true, 10, false);

			//INTERIOR
			for(var e = 0; e < INTERIOR.length; e++) $(".eq").append('<li>' + INTERIOR[e] + ',</li>');	
			var last = $(".eq li").eq(INTERIOR.length - 1).text().replace(/,/g, '');
			$(".eq li").eq(INTERIOR.length - 1).text(last);

			// 룸 메뉴 swiper
			for(var i = 0; i < img[2].length; i++){
				$(".room_menu .roomLists").append(
					'<div class="swiper-slide">' + 
						'<a href="rooms.html?num='+ numbering(i) +'"><div class="txt"><span>' + names[1][i]  + '</span><b>'+ names[0][i] + '</b></div><div class="img"><img src="' + url + '/room/' + ( i + 1) + '/1.jpg' + '"alt="/" width="100%" height="auto"></div></a>' +
					'</div>' 
				);	
			} Swipers02(".room_menu", 2, false, 40, false);

			$("#rooms .room_menu .swiper-slide a .img img").css("height",$("#rooms .room_menu .swiper-slide a .img img").width() / 5 * 5);
			$(window).on("resize", function() {
				$("#rooms .room_menu .swiper-slide a .img img").css("height",$("#rooms .room_menu .swiper-slide a .img img").width() / 5 * 5);	
			});
		
		});
	break;

	//special Page
	case 'special' :
		videoControl(video);

		$.getJSON('http://digitalnow.co.kr/reserve/pensionInfo/'+ account +'/9',
		function(data){ 
			//Order Number Sort
			var specialList = new Array();
			for (var i = 0; i < data.result.length; i++) {
				for (var j = 0; j < data.result.length; j++) {
					if (Number(data.result[j]["ORDER_NUM"]) - 1 === i) specialList.push(data.result[j]);
				}
			}

			$("#visual").css("background-image","url("+ url +"/special/"+ (detailPath + 1) +"/0.jpg)");
			$("#visual").append(
				'<div class="InBox">' +
					'<h2 class="ttls">' +
						'<span>SPECIAL &nbsp;>&nbsp; <b>'+ specialList[detailPath]["TITLE_EN"] +'</b></span>' +	
						'<strong>'+ specialList[detailPath]["TITLE_EN"] +'</strong>' +
					'</h2>' +
				'</div>'
			);
			$(".notices").append('<h3><strong>'+ specialList[detailPath]["TITLE_EN"] +'</strong>'+ specialList[detailPath]["TITLE_KR"] +'</h3><p>' + specialList[detailPath]["CONTENT"] + '</p>');
			$(".contents").append(
				'<div class="section Swipers" id="Swipers">' + 
					'<div class="swiper-view">' +
						'<div class="InBox">' +
							'<div class="swiper-container swiper">' +
								'<div class="swiper-wrapper swiper-image"></div>' +
								'<div class="swiper-button-next swiper-btn"></div>' +
								'<div class="swiper-button-prev swiper-btn"></div>' +
								'<div class="swiper-pagination"></div>' +
							'</div>' +
						'</div>' +
					'</div>' +	
				'</div>'
			);	
			

			//Swipers
			for(var i=0; i < img[3][detailPath]; i++){
				$(".Swipers .swiper-image").append(
					'<div class="swiper-slide">' + 
						'<div style="background-image:url('+ url + '/special/' + (detailPath + 1) + '/' + (i + 1) +'.jpg)"></div>' + 
					'</div>'
				);
			} Swipers01(".Swipers", "auto", true, 10, false); 	

			for(var i = 0; i < img[3].length; i++){
				$(".special_menu .specialLists").append(
					'<div class="swiper-slide">' + 
						'<a href="special.html?num='+ numbering(i) +'">' +
							'<div class="txt"><span>'+ specialList[i]["TITLE_EN"] +'</span><b>'+ specialList[i]["TITLE_KR"] +'</b></div>' +
							'<div class="img"><img src="'+ url +'/special/' +  (i + 1) +'/1.jpg" width="100%" height="auto" /></div>' +
						'</a>' +
					'</div>' 
				);
			} 
			
			Swipers02(".special_menu", 2.25, false, 40, false);

			$("#special .special_menu .swiper-slide a .img img").css("height",$("#special .special_menu .swiper-slide a .img img").width() / 5 * 5);
			$(window).on("resize", function() {
				$("#special .special_menu .swiper-slide a .img img").css("height",$("#special .special_menu .swiper-slide a .img img").width() / 5 * 5);	
			});

		});	
	break;

	//reserve Page
	case 'reserve' :
		$(".contents .snb li a").on("click",function(){ 
			var nb = $(this).parent("li").index();
			$(".contents .snb > li").removeClass("active");
			$(".contents .snb > li").eq(nb).addClass("active");

			if(nb == 0){
				$("#Banner .ttls b").text("RESERVATION");
				$("#Banner .ttls strong").text("RESERVATION");
				$(".frame").hide(); $(".frame_01").show();
			}else if(nb == 1){
				$("#Banner .ttls b").text("GUIDE");
				$("#Banner .ttls strong").text("GUIDE");
				$(".frame").hide(); $(".frame_02").show();
			} return false;
		}); reserInfo(account);
	break;
	
	//community Page
	case 'community' :
		$(".contents .snb li a").on("click",function(){ 
			var nb = $(this).parent("li").index();
			$(".contents .snb > li").removeClass("active");
			$(".contents .snb > li").eq(nb).addClass("active");
		
			if(nb == 0){
				$("#Banner .ttls b").text("NOTICE");
				$("#Banner .ttls strong").text("NOTICE");

				$(".frame h3 strong").text("공지사항");
				$(".frame h3 span").text("공지사항과 다양한 소식을 확인해보세요.");
				$(".frame iframe").attr("src","/board/bbs/board.php?bo_table=notice");
				$("#community #Banner").css("background-image","url(http://gonylab8.speedgabia.com/hellokids/banner/1.jpg)");

			}else if(nb == 1){
				$("#Banner .ttls b").text("Q&A");
				$("#Banner .ttls strong").text("Q&A");
			
				$(".frame h3 strong").text("문의사항");
				$(".frame h3 span").text("헬로키즈에 무엇이든 물어보세요.");
				$("#community #Banner").css("background-image","url(http://gonylab8.speedgabia.com/hellokids/banner/2.jpg)");

			} return false;
		});
	break;

	//None Page
	default : location.href = "index.html";
	break;
}


/*---------------------------------------------------------------*/
//footer
	$("#scroll a").on("click",function(){
		$("html,body").stop().animate({scrollTop:$(".section").eq(1).offset().top - 50},700);
		return false;
	});
	
	//Swipers 나누기
	function Swipers01(value, view, center, Between, boolean, auto){
		var swiper = new Swiper(value + ' .swiper', {
			paginationClickable: true,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			pagination: '.swiper-pagination',
			slidesPerView: view,
			centeredSlides: center,
			spaceBetween: Between,
			loop: boolean,
			autoplay: auto,
		});
	}
	function Swipers02(value, view, center, Between, boolean){
		var swiper2 = new Swiper(value + ' .swiper', {
			paginationClickable: true,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			slidesPerView: view,
			centeredSlides: center,
			spaceBetween: Between,
			loop: boolean
		});
	}
	
	$.getJSON('http://digitalnow.co.kr/reserve/pensionInfo/'+ account +'/4',	//User Info
	function(data){
		const USER_TEL1 = data.result.USER_TEL1;				//전화번호 1
		const USER_TEL2 = data.result.USER_TEL2;				//전화번호 2
		const NEW_USER_ADDR = data.result.NEW_USER_ADDR;		//도로명주소
		const USER_ADDR = data.result.USER_ADDR;				//지번주소
		const BUSI_NM = data.result.BUSI_NM;					//상호명
		const USER_ACCO = data.result.USER_ACCO;				//계좌번호
		const COMM_SALE_NO = data.result.COMM_SALE_NO;			//통신판매업번호
		const USER_EMAIL = data.result.USER_EMAIL;				//이메일

		$("footer").append(
			'<div id="ft-menu">' +
				'<div class="InBox">' +
					'<ul>' +
						'<li><a href="about.html">인사말</a></li>' +	
						'<li><a href="rooms.html?num=01">풀빌라</a></li>' +
						'<li><a href="special.html?num=01">스페셜</a></li>' +
						'<li><a href="about.html#location">오시는길</a></li>' +
						'<li><a href="community.html?table=notice">공지사항</a></li>' +
					'</ul>' +
					'<div class="ft-rbtn"><a href="reserve.html?reserve=rv">객실 예약하기 ></a></div>' +
				'</div>' +
			'</div>' +
			'<div id="ft-cont">' +
				'<div class="InBox">' +
					'<h5><a href="index.html"><img src="images/logo.svg" width="100%" height="auto" alt="" /></a></h5>' +
					'<ul class="address">' +
						'<li>예약문의<span>'+ USER_TEL1 +'</span></li>' +
						'<li>'+ NEW_USER_ADDR +' <span>('+ USER_ADDR +')</span></li>' +
						'<li>' +
							'<ul class="sns">' +
								'<li><a href="#" target="_blank" class="sns_01"><img src="images/sns_01.png" width="39" height="39" alt="" /></a></li>' +
								'<li><a href="#" target="_blank" class="sns_02"><img src="images/sns_02.png" width="39" height="39" alt="" /></a></li>' +
							'</ul>' +
						'</li>' +
					'</ul>' +
				'</div>' +
				'<div class="copy">' +
					'<p>' +
						'업체명 :' + BUSI_NM +   ' | 대표자 : <span class="BUSI_PRE_NM"></span> | 사업자번호: <span class="BUSI_NO"></span>' + '<br />' +
						'통신판매업 번호 : '+ COMM_SALE_NO +' | 계좌번호 : ' + USER_ACCO + 
					'</p>' +
					//'<a href="http://www.gonylab.com/" target="_blank">Create by GONYLAB</a>' +
				'</div>' +
			'</div>'
		);

		//사업자 정보	
		$.getJSON('http://digitalnow.co.kr/reserve/pensionInfo/'+ account +'/11', //User Info
		function(data){
			let BUSI_PRE_NM = new Array(); 						//대표자
			let BUSI_NO = new Array();							//사업자번호
			$.each(data.result,function(key,val){
				BUSI_PRE_NM.push(val["BUSI_PRE_NM"]); BUSI_NO.push(val["BUSI_NO"]);
				$(".BUSI_PRE_NM").text(BUSI_PRE_NM); $(".BUSI_NO").text(BUSI_NO);
			});
		});

		//sns - href
		$(".sns_01").attr("href",INTRAGRAM); 
		$(".sns_02").attr("href",FACEBOOK); 
		$(".sns_03").attr("href",NV_BLOG);

		if(INTRAGRAM == "#"){$(".sns_01").on('click',function(){alert('준비중입니다.');return false;});}
		if(FACEBOOK == "#"){$(".sns_02").on('click',function(){alert('준비중입니다.');return false;});}
		if(NV_BLOG == "#"){$(".sns_03").on('click',function(){alert('준비중입니다.');return false;});}
	});
});	

/*------------------------------------------------------------------------------------------------*/
//function - numbering
function numbering(n) { // 이미지 넘버링 10 보다 작을때
	var num = ''; var n = n + 1; var n = n.toString();
	if (n.length < 2){for (var i = 0; i < 2 - n.length; i++){num += '0';}}
	return num + n;
}
//function - swipers
function Swipers(value, view, center, Between, boolean){
	var swiper = new Swiper(value + ' .swiper', {
		paginationClickable: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		pagination: '.swiper-pagination',
		slidesPerView: view,
		centeredSlides: center,
		spaceBetween: Between,
		loop: boolean
	});
}
//function - video
function videoControl(control){
	videoScale(control);
	$(window).on("resize",function(){ 
		videoScale(control); 
	});
	$(window).on("scroll",function(){
		var thisTop = $(this).scrollTop();
		var stopTop = $("section > div:first-child").height() - 100;
		var player = new Vimeo.Player(control);
		if(thisTop > stopTop) player.pause();
		else player.play();
	});
}
//function - videocontrol
function videoScale(control){
	// var h = $(window).width() / 16 * 9;
	// var w = h / 9 * 16;
	// control.style.width = Math.round(h) + "px";
	// control.style.height = Math.round(w) + "px";

	if($(window).width() < 1000){
		control.style.width = (Math.round($(window).height() / 9 * 16) + 30) + "px";
		control.style.height = (Math.round($(window).width() / 16 * 9) + 30) + "px";	
	}else{
		control.style.width = Math.round($(window).height() / 9 * 16) + "px";
		control.style.height = Math.round($(window).width() / 16 * 9) + "px";
	}
}	