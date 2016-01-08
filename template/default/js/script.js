/*图片切换*/
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
function Focus() {
	function byid(id) {
		return document.getElementById(id);
	}
	function bytag(tag, obj) {
		return (typeof obj == 'object' ? obj: byid(obj)).getElementsByTagName(tag);
	}
	var timer = null;
	var oFocus = byid('tFocus');
	var oPic = byid('pnl_scroll');
	var oPicLis = bytag('li', oPic);
	var oBtn = byid('tFocus-btn');
	var oBtnLis = bytag('li', oBtn);
	var biao = byid('biao');
	var iActive = 0;
	function inlize() {
		oPicLis[0].style.filter = 'alpha(opacity:100)';
		oPicLis[0].style.opacity = 100;
		oPicLis[0].style.zIndex = 5;
	};
	for (var i = 0; i < oPicLis.length; i++) {
		oBtnLis[i].sIndex = i;
		oBtnLis[i].onclick = function() {
			if (this.sIndex == iActive) return;
			iActive = this.sIndex;
			changePic();
		}
	};
	/*byid('tFocus-leftbtn').onclick = byid('prev').onclick = function() {
		iActive--;
		if (iActive == -1) {
			iActive = oPicLis.length - 1;
		}
		changePic();
	};
	byid('tFocus-rightbtn').onclick = byid('next').onclick = function() {
		iActive++;
		if (iActive == oPicLis.length) {
			iActive = 0;
		}
		changePic();
	};*/
	
	function changePic() {
		for (var i = 0; i < oPicLis.length; i++) {
			doMove(oPicLis[i], 'opacity', 0);
			oPicLis[i].style.zIndex = 0;
			oBtnLis[i].className = '';
		};
		doMove(oPicLis[iActive], 'opacity', 100);
		oPicLis[iActive].style.zIndex = 5;
		oBtnLis[iActive].className = 'active';
		if(oPicLis.length > 4){
			if (iActive == 0) {
				//bytag('ul', oBtn)[0].style.left = 0;
				doMove(bytag('ul', oBtn)[0], 'left', 0);
				biao.style.display = "block";
				
				
			} else if (iActive >= oPicLis.length - 3) {
				
				//bytag('ul', oBtn)[0].style.left = ((oPicLis.length - 3) * (oBtnLis[0].offsetWidth + 4));
				doMove(bytag('ul', oBtn)[0], 'left', -(oPicLis.length - 4) * (oBtnLis[0].offsetWidth));
				biao.style.display = "none";
			} else {
				//alert((iActive - 1) * (oBtnLis[0].offsetWidth + 4));
				//bytag('ul', oBtn)[0].style.left = (iActive - 1) * (oBtnLis[0].offsetWidth + 4);
				doMove(bytag('ul', oBtn)[0], 'left', -(iActive - 1) * (oBtnLis[0].offsetWidth));
				
				biao.style.display = "block";
				
			}
		} 
		
	};
	function autoplay() {
		if (iActive >= oPicLis.length - 1) {
			iActive = 0;
		} else {
			iActive++;
		}
		changePic();
	};
	aTimer = setInterval(autoplay, 4000);
	inlize();
	function getStyle(obj, attr) {

		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			//alert(getComputedStyle(obj, false)[attr]);

			return getComputedStyle(obj, false)[attr];
		}
	};
	function doMove(obj, attr, iTarget) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			var iCur = 0;
			if (attr == 'opacity') {
				iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			} else {

				iCur = parseInt(getStyle(obj, attr));
			}
			var iSpeed = (iTarget - iCur) / 6;

			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if (iCur == iTarget) {
				clearInterval(obj.timer);
			} else {
				if (attr == 'opacity') {
					obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
					obj.style.opacity = (iCur + iSpeed) / 100;
				} else {
					//alert(iCur +" "+ iSpeed);
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
		},
		30)
	};
	byid('tFocus').onmouseover = function() {
		clearInterval(aTimer);
	}
	byid('tFocus').onmouseout = function() {
		aTimer = setInterval(autoplay, 4000);
	}
	byid('tFocusBtn').onmouseover = function() {
		clearInterval(aTimer);
	}
	byid('tFocusBtn').onmouseout = function() {
		aTimer = setInterval(autoplay, 4000);
	}
}