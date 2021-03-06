$(function(){
	/*---------------------------------------------------------------*/	
	//common
	let video = document.getElementById("MyVideo");
	const path = (location.href.substr(location.href.lastIndexOf("/") + 1)).split(".")[0]; 	//path
	const detailPath = ((location.href.substr(location.href.lastIndexOf("=") + 1)).slice(0, 2) - 1 + 1) - 1; //detail Path
	
	/*---------------------------------------------------------------*/
	/* Gnb */	
	$("hgroup .lnb ul li a,#IdxMenu .lnb ul li a").on("click",function(){
		var i = $(this).parent("li").index();
		if($(this).parent("li").is(".on") === true){
			$("hgroup .lnb ul li").removeClass("on");
			$("#IdxMenu .lnb ul li").removeClass("on");
			$("header > nav").css({"height":"0"});
			$("header > nav > div").css({"opacity":"0","z-index":"1"});		
		}else{
			$("hgroup .lnb ul li").removeClass("on");
			$("hgroup .lnb ul li").eq(i).addClass("on");
			$("#IdxMenu .lnb ul li").removeClass("on");
			$("#IdxMenu .lnb ul li").eq(i).addClass("on");
			$("header > nav").css({"height":"500px"});
			$("header > nav > div").css({"opacity":"0","z-index":"1"});
			$("header > nav > div").eq(i).css({"opacity":"1","z-index":"2"});
		}	
		return false;
	});
	
	$(window).on("scroll",function(){
		if($("hgroup .lnb ul li").is(".on") === true || $("#IdxMenu .lnb ul li").is(".on") === true){
			$("hgroup .lnb ul li").removeClass("on");
			$("#IdxMenu .lnb ul li").removeClass("on");
			$("header > nav").css({"height":"0"});
			$("header > nav > div").css({"opacity":"0","z-index":"1"});
		}
	});
	
	/*---------------------------------------------------------------*/	
	//container
		switch(path){
			//index Page
			case '':
			case 'index': videoControl(video);
				window.onload = function(){
					$("#Videos h2 div").css({"transform":"translateX(0)","opacity":"1"}); 
					$("#Videos h2 img:nth-of-type(1)").css({"transform":"translateY(0)","opacity":"1"}); 
					$("#Videos h2 img:nth-of-type(2)").css({"transform":"translateY(0)","opacity":"1"}); 	
				}
	
				$(".section").eq(0).append(
					'<div id="scroll"><div></div><a href="#"><img src="../images/scroll_idx.png" width="107" height="30" alt="" /></a><div></div></div>'
				);
	
				$(window).on("scroll",function(){
					var thisTop = $(this).scrollTop();

					var a = $(".section").eq(1).find("h3").offset().top - $(window).height();
					var b = $(".section").eq(2).find("h3").offset().top - $(window).height();
					var c = $(".section").eq(3).find("h3").offset().top - $(window).height();
					var d = $("#index .villas .InBox").offset().top - $(window).height();
					var e = $("#index .Vimeos .InBox").offset().top - $(window).height();
					var f = $("#index .gallerys .InBox").offset().top - $(window).height();
		
					if((thisTop > a) && (thisTop < b)) animated(1);
					else if((thisTop > b) && (thisTop < c)) animated(2);
					else if(thisTop > c) animated(3);
					
					if((thisTop > d) && (thisTop < e)){
						$("#index .villas  .InBox").css({"opacity":"1","transform":"translateY(0)"});
					}else if((thisTop > e) && (thisTop < f)){
						$("#index .Vimeos .InBox").css({"opacity":"1","transform":"translateY(0)"});
					}else if((thisTop > f)){
						$("#index .gallerys .InBox").css({"opacity":"1","transform":"translateY(0)"});
					}
				});
	
				function animated(e){
					$(".section").eq(e).find("h3 img").css({"opacity":"1","transform":"translateX(0)"});
					$(".section").eq(e).find("h3 div").css({"opacity":"1","transform":"translateX(10px)"});
					$(".section").eq(e).find("p span").css({"opacity":"1","transform":"translateY(0)"});
				}
		
				//Swipers -  Rooms
				for(var i=0; i < img[0]; i++){
					$(".villas .swiper-image").append(
						'<div class="swiper-slide">' + 
							'<div style="background-image:url('+ url +'/main/' + (i + 1) + '.jpg)"></div>' + 
						'</div>'
					);
				} Swipers(".villas", "auto", true, 10, false); 

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
					)
				};


			break;
	
			case 'about': videoControl(video);	
				$.getJSON('http://digitalnow.co.kr/reserve/pensionInfo/'+ account +'/4',//????????? ??????
				function(data){
					
					var NEW_USER_ADDR = data.result.NEW_USER_ADDR;	//????????? ??????
					var USER_ADDR = data.result.USER_ADDR;			//?????? ??????
					var USER_TEL1 = data.result.USER_TEL1;			//???????????? 1
					var USER_TEL2 = data.result.USER_TEL2;			//???????????? 2
	
					$(".cont02 .title p").append(
						'<strong>'+ NEW_USER_ADDR +'('+ USER_ADDR +')</strong>' +
						'<span>???????????? '+ USER_TEL1 + '</span>'
					);
					
					for(var i=0; i < img[1]; i++){
						$(".cont01 .swiper-image").append(
							'<div class="swiper-slide">' +
								'<div style="background-image:url('+ url +'/m/about/'+ (i + 1) +'.jpg)"></div>' +
							'</div>'
						);
					} 
					Swipers(".Swipers", "auto", true, 0, false); 
				});
			break;
	
			//travel Page
			case 'travel' :	
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
								'<div class="img"><img src="../images/travel/'+ (key + 1) +'.jpg" width="100%" height="auto" alt="" /></div>' +
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
			break;	
	
			case 'rooms': 
				$("body").addClass("rooms_" + numbering(detailPath));
				$.getJSON('http://digitalnow.co.kr/reserve/pensionInfo/'+ account +'/8',
				function(data){

					var TYPE_NAME = data.result[detailPath]["TYPE_NAME"];				//???????????????(EN)
					var TYPE_DESC = data.result[detailPath]["TYPE_DESC"];				//???????????????(KR)
					var TYPE_CONTENT = data.result[detailPath]["TYPE_CONTENT"];			//??????????????????
					var TYPE_NM = data.result[detailPath]["TYPE_NM"];					//?????????(KR)
					var TYPE_NM_EN = data.result[detailPath]["TYPE_NM_EN"];				//?????????(EN)

					var ROOM_TYPE = data.result[detailPath]["ROOM_TYPE"];				//????????????
					var ROOM_EXTN = data.result[detailPath]["ROOM_EXTN"] ;				//????????????
					var FLHT_ROOM_CNT = data.result[detailPath]["FLHT_ROOM_CNT"]; 		//????????????(??????)
					var ADLT_BASE_PERS = data.result[detailPath]["ADLT_BASE_PERS"];		//????????????(??????)
					var ADLT_MAX_PERS = data.result[detailPath]["ADLT_MAX_PERS"];		//????????????(??????)
					var ETC_DETL = data.result[detailPath]["ETC_DETL"];					//????????????
					var INTERIOR = data.result[detailPath]["INTERIOR"].split(',');		//????????????
	
					$("#visual").css("background-image","url(" + url + "/m/room/" + (detailPath + 1) + "/0.jpg)");
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
								'<h3>????????????</h3>' +
								'<ul>' +
									'<li><span class="tl">????????????</span><span class="tx">'+ ROOM_TYPE +'</span></li>' +
									'<li><span class="tl">????????????</span><span class="tx">'+ ROOM_EXTN +'??????</span></li>' +
									'<li><span class="tl">????????????</span><span class="tx">?????? '+ ADLT_BASE_PERS +'??? ~ ?????? '+ ADLT_MAX_PERS +'???</span></li>' +
									'<li><span class="tl">??????/??????</span><span class="tx checkInOut">PM3:00 / AM 11:00</span></li>' +
									'<li><span class="tl">????????????</span><ul class="eq"></ul></li>' +
									'<li class="etc"><span class="tl">????????????</span><span class="tx">'+ ETC_DETL +'</span></li>' +
								'</ul>' +
							'</div>' +
							'<div class="InBox">' +
								'<h3>????????????</h3>' +
								'<ul>' +
									'<li>?????? ????????? ???????????? ????????? ????????? ?????? ???????????? ????????? ???????????????.</li>'+
									'<li>?????? ?????? ??? ??????????????? ?????? ????????? ?????? ???????????? ?????? ??? ????????????.</li>'+
									'<li>???????????? ???????????? ?????? ????????? ???????????????.</li>'+
									'<li>??????????????? ????????? ?????? ?????? ??? ????????? ????????? ???????????????.</li>'+
								'</ul>' +
							'</div>' +
						'</div>'
					);	
					
					// swiper
					for(var i=0; i < img[2][detailPath]; i++){
						$("#Swipers .swiper-image").append(
							'<div class="swiper-slide">' + 
								'<div style="background-image:url('+ url +'/m/room/'+(detailPath + 1) +  '/' + (i + 1) +'.jpg)"></div>' + 
							'</div>'
						);
					} Swipers01(".Room_Img", "auto", true, 10, false);
	
					//INTERIOR
					for(var e = 0; e < INTERIOR.length; e++) $(".eq").append('<li>' + INTERIOR[e] + ',</li>');	
					var last = $(".eq li").eq(INTERIOR.length - 1).text().replace(/,/g, '');
					$(".eq li").eq(INTERIOR.length - 1).text(last);
	
					// ??? ?????? swiper
					for(var i = 0; i < img[2].length; i++){
						$(".room_menu .roomLists").append(
							'<div class="swiper-slide">' + 
								'<a href="rooms.html?num='+ numbering(i) +'">' +
									'<div class="txt"><span>' + data.result[i]["TYPE_DESC"]  + '</span><b>'+ data.result[i]["TYPE_NAME"] + '</b></div>' +
									'<div class="img"><img src="' + url + '/m/room/0/' + ( i + 1) + '.jpg' + '"alt="/" width="100%" height="auto"></div>' +
								'</a>' +
							'</div>' 
						);	
					} Swipers02(".room_menu", 1.65, false, 20, false);
				});

			break;
	
			case 'special': 
				$.getJSON('http://digitalnow.co.kr/reserve/pensionInfo/'+ account +'/9',
				function(data){ 
					//Order Number Sort
					var specialList = new Array();
					for (var i = 0; i < data.result.length; i++) {
						for (var j = 0; j < data.result.length; j++) {
							if (Number(data.result[j]["ORDER_NUM"]) - 1 === i) specialList.push(data.result[j]);
						}
					}
					$("#visual").css("background-image","url("+ url +"/m/special/"+ (detailPath + 1) +"/0.jpg)");
					$("#visual").append(
						'<div class="InBox">' +
							'<h2 class="ttls">' +
								'<span>SPECIAL &nbsp;>&nbsp; <b>'+ specialList[detailPath]["TITLE_EN"] +'</b></span>' +	
								'<strong>'+ specialList[detailPath]["TITLE_EN"] +'</strong>' +
							'</h2>' +
						'</div>'
					);
					$(".notices").append(
						'<h3>' + 
							'<strong>'+ specialList[detailPath]["TITLE_EN"] +'</strong>'+ specialList[detailPath]["TITLE_KR"] +
						'</h3>'+
						'<p>' + specialList[detailPath]["CONTENT"] + '</p>'
					);
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
						'</div>' +
						'<div class="section infos">' +
							'<div class="InBox">' +
								'<h4><span>INFORMATION</span><div></div></h4>' +
								'<div class="text">' +
									'<p>'+ specialList[detailPath]["CONTENT1"] + '</p>' + 
									'<span>'+ specialList[detailPath]["CONTENT2"] +'</span>' +
								'</div>' +
							'</div>' +
							'<div class="Lists">' +
								'<ul></ul>' +
							'</div>' +	
						'</div>'
					);	
	
					if(specialList[detailPath]["CONTENT1"] === "" && specialList[detailPath]["CONTENT2"] === "") $(".infos .InBox").remove();
					if(specialList[detailPath]["CONTENT1"] === "") $(".infos .InBox .text p").remove();
					if(specialList[detailPath]["CONTENT2"] === "") $(".infos .InBox .text p span").remove();
	
					//Swipers
					for(var i=0; i < img[3][detailPath]; i++){
						$(".Swipers .swiper-image").append(
							'<div class="swiper-slide">' + 
								'<div style="background-image:url('+ url + '/m/special/' + (detailPath + 1) + '/' + (i + 1) +'.jpg)"></div>' + 
							'</div>'
						);
					} Swipers01(".Swipers", "auto", true, 10, false); 	

					for(var i = 0; i < img[3].length; i++){
						$(".special_menu .specialLists").append(
							'<div class="swiper-slide">' + 
								'<a href="special.html?num='+ numbering(i) +'">' +
									'<div class="txt"><span>'+ specialList[i]["TITLE_EN"] +'</span><b>'+ specialList[i]["TITLE_KR"] +'</b></div>' +
									'<div class="img"><img src="'+ url +'/m/special/0/'+ (i + 1) +'.jpg" width="100%" height="auto" /></div>' +
								'</a>' +
							'</div>' 
						);	
					}
					 
					Swipers02(".special_menu", 2, false, 30, false);
				
				});			
			break;
			
			case 'reserve': 
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
	
			case 'community': 
				$(".contents .snb li a").on("click",function(){ 
					var nb = $(this).parent("li").index();
					$(".contents .snb > li").removeClass("active");
					$(".contents .snb > li").eq(nb).addClass("active");
				
					if(nb == 0){
						$("#Banner .ttls b").text("NOTICE");
						$("#Banner .ttls strong").text("NOTICE");
	
						$(".frame h3 strong").text("????????????");
						$(".frame h3 span").text("??????????????? ????????? ????????? ??????????????????.");
						$(".frame iframe").attr("src","/board/bbs/board.php?bo_table=notice_");
					}else if(nb == 1){
						$("#Banner .ttls b").text("Q&A");
						$("#Banner .ttls strong").text("Q&A");
					
						$(".frame h3 strong").text("????????????");
						$(".frame h3 span").text("??????????????? ???????????? ???????????????.");
						$(".frame iframe").attr("src","/board/bbs/board.php?bo_table=qna_");
					} return false;
				});
	
	
			break;	
	
			// None Page
			default : 
			location.href = "index.html";
			break;
		}
	
	$("#scroll a").on("click",function(){
		$("html,body").stop().animate({scrollTop:$(".section").eq(1).offset().top - 100},700);
		return false;
	});
	
	/*---------------------------------------------------------------*/
	//footer
	$.getJSON('http://digitalnow.co.kr/reserve/pensionInfo/'+ account +'/4',	//User Info
		function(data){
			var USER_TEL1 = data.result.USER_TEL1;				//???????????? 1
			var USER_TEL2 = data.result.USER_TEL2;				//???????????? 2
			var NEW_USER_ADDR = data.result.NEW_USER_ADDR;		//???????????????
			var USER_ADDR = data.result.USER_ADDR;				//????????????
			var BUSI_NM = data.result.BUSI_NM;					//?????????
			var USER_EMAIL = data.result.USER_EMAIL;			//?????????
			var USER_ACCO = data.result.USER_ACCO;				//????????????
			var COMM_SALE_NO = data.result.COMM_SALE_NO;		//?????????????????????

			$("footer").append(
				'<div id="ft-menu">' +
					'<div class="InBox">' +
						'<ul>' +
							'<li><a href="about.html">?????????</a></li>' +	
							'<li><a href="rooms.html?num=01">?????????</a></li>' +
							'<li><a href="special.html?num=01">?????????</a></li>' +
							'<li><a href="about.html#location">????????????</a></li>' +
							'<li><a href="community.html?table=notice">????????????</a></li>' +
						'</ul>' +
						'<div class="ft-rbtn"><a href="reserve.html?reserve=rv">?????? ???????????? ></a></div>' +
					'</div>' +
				'</div>' +
				'<div id="ft-cont">' +
					'<div class="InBox">' +
						'<ul class="address">' +
							'<li><a href="tel:'+ USER_TEL1 +'">????????????<span>'+ USER_TEL1 +'</span> <img src="../images/tell.png" width="38" height="auto" /></a></li>' +
	
							'<li>'+ NEW_USER_ADDR +'<span>('+ USER_ADDR +')</span></li>' +
							'<li>' +
								'<ul class="sns">' +
									'<li><a href="#" target="_blank" class="sns_01"><img src="../images/sns_01.png" width="39" height="39" alt="" /></a></li>' +
									'<li><a href="#" target="_blank" class="sns_02"><img src="../images/sns_02.png" width="39" height="39" alt="" /></a></li>' +
								'</ul>' +
							'</li>' +
						'</ul>' +
						// '<h5><a href="index.html"><img src="../images/ft_logo.png" width="150" height="auto" alt="" /></a></h5>' +
					'</div>' +
					'<div class="copy">' +
						'<p>' +
							'????????? :' + BUSI_NM +   ' | ????????? : <span class="BUSI_PRE_NM"></span><br />' +
							'???????????????: <span class="BUSI_NO"></span>' + '<br />' +
							'??????????????? ?????? : '+ COMM_SALE_NO +'<br />' +
							'???????????? : ' + USER_ACCO + 
						'</p>' +
						// '<a href="http://www.gonylab.com/" target="_blank">Create by GONYLAB</a>' +
					'</div>' +
				'</div>'
			);
	
			//????????? ??????	
			$.getJSON('http://digitalnow.co.kr/reserve/pensionInfo/'+ account +'/11', //User Info
			function(data){
				var BUSI_PRE_NM = new Array(); 						//???????????????
				var BUSI_NO = new Array();							//?????????
				$.each(data.result,function(key,val){
					BUSI_PRE_NM.push(val["BUSI_PRE_NM"]); BUSI_NO.push(val["BUSI_NO"]);
					$(".BUSI_PRE_NM").text(BUSI_PRE_NM); $(".BUSI_NO").text(BUSI_NO);
				});
			});
	
			//sns - href
			$(".sns_01").attr("href",INTRAGRAM); 
			$(".sns_02").attr("href",FACEBOOK); 
			$(".sns_03").attr("href",NV_BLOG);
	
			if(INTRAGRAM == "#"){$(".sns_01").on('click',function(){alert('??????????????????.');return false;});}
			if(FACEBOOK == "#"){$(".sns_02").on('click',function(){alert('??????????????????.');return false;});}
			if(NV_BLOG == "#"){$(".sns_03").on('click',function(){alert('??????????????????.');return false;});}
		});
	});	
	
	
	/*---------------------------------------------------------------*/
	//function - numbering
	function numbering(n) { // ????????? ????????? 10 ?????? ?????????
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

	//Swipers ?????????
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

	//function - video
	function videoControl(control){
		$(window).on("scroll",function(){
			let thisTop = $(this).scrollTop();
			let stopTop = $("#Videos").height();
			let player = new Vimeo.Player(control);
			if(thisTop > stopTop) player.pause();
			else player.play();
		});
	}