//userAgent Check
const dataUser = document.documentElement;
dataUser.className = dataUser.className.replace('no-js','js');
dataUser.setAttribute("data-useragent",  navigator.userAgent);
dataUser.setAttribute("data-platform", navigator.platform );

//None Mouse Rgiht click
$(document).bind("contextmenu",function(e){return false;});
$(document).bind("ondragstart",function(e){return false;});
$(document).bind("onselectstart",function(e){return false;});

const isMobile = () => { 
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
  };

/* ------------------------------------------------------------------------------- */
/* 실시간예약 - account */
let account = "hellokids";

const url =  isMobile() && window.innerWidth <=768 ? 'http://gonylab8.speedgabia.com/hellokids/m/' : 'http://gonylab8.speedgabia.com/hellokids/';


/* 실시간예약 - Type */
let type = "N";

/* 영상 - Url */
let vid = [''];

let names = [
	['키즈 풀빌라 1','키즈 풀빌라 2'],
	['KIDS POOLVILLA 1','KIDS POOLVILLA 2'],
];

/* 이미지 - Number */
let img = [
	//index
	[12],
	//exterior  
	[10],
	//rooms
	[
		19,19
	],
	//special
	[
		5,5,2,6,3
	],
];




/* ------------------------------------------------------------------------------- */
/* SNS */
let	INTRAGRAM = "#";				
let	FACEBOOK = "#";
let	NV_BLOG = "#";
let	NV_CAFE = "#";
let	KAKAO = "#";