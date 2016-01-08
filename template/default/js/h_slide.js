// JavaScript Document
function $f(id) { return document.getElementById(id); }

function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
		
	} else {
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
		return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}

function classNormal(iFocusBtnID,iFocusTxID){
	var iFocusBtns= $f(iFocusBtnID).getElementsByTagName('li');
	var iFocusTxs = $f(iFocusTxID).getElementsByTagName('li');
	for(var i=0; i<iFocusBtns.length; i++) {
		iFocusBtns[i].className='normal';
		iFocusTxs[i].className='normal';
	}
}

function classCurrent(iFocusBtnID,iFocusTxID,n){
	var iFocusBtns= $f(iFocusBtnID).getElementsByTagName('li');
	var iFocusTxs = $f(iFocusTxID).getElementsByTagName('li');
	iFocusBtns[n].className='current';
	iFocusTxs[n].className='current';
}

function iFocusChange() {
	if(!$f('ifocus')) return false;
	$f('ifocus').onmouseover = function(){atuokey = true};
	$f('ifocus').onmouseout = function(){atuokey = false};
	var iFocusBtns = $f('ifocus_btn').getElementsByTagName('li');
	var listLength = iFocusBtns.length;
	for(i=0;i<listLength;i++)
	{
		j=-330*i;
		iFocusBtns[i].onmouseover = function() {
		moveElement('ifocus_piclist',j,0,5);
		classNormal('ifocus_btn','ifocus_tx');
		classCurrent('ifocus_btn','ifocus_tx',i);}
	}
}

setInterval('autoiFocus()',3000);
var atuokey = false;
function autoiFocus() {
	if(!$f('ifocus')) return false;
	if(atuokey) return false;
	var focusBtnList = $f('ifocus_btn').getElementsByTagName('li');
	var listLength = focusBtnList.length;
	for(var i=0; i<listLength; i++)
	{
		if (focusBtnList[i].className == 'current') var currentNum = i;
	}
	for(i=0;i<listLength;i++)
	{
		if(i!=currentNum)
		{
			continue;
		}
		if(currentNum==listLength-1)
		{
			moveElement('ifocus_piclist',0,0,5);
			classNormal('ifocus_btn','ifocus_tx');
			classCurrent('ifocus_btn','ifocus_tx',0);
		}
		else
		{
			j=i+1;
			k=-330*j;
			moveElement('ifocus_piclist',k,0,5);
			classNormal('ifocus_btn','ifocus_tx');
			classCurrent('ifocus_btn','ifocus_tx',j);
		}
	}
}
addLoadEvent(iFocusChange);
