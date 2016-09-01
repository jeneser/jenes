window.onload = function () {
	// 构造函数，封装滑动模块
	function Slider() {}
	// 定义数组，存放获取的元素节点
	Slider.element = [];

	Slider.prototype.getElement = function(id) { 
		Slider.element.push(document.getElementById(id));
		return document.getElementById(id);
	};

	Slider.prototype.getCurrentLeft = function () {
		// + 转换为数字
		return +getComputedStyle(Slider.prototype.getElement("slider")).left.replace("px", '');
	}

//////////
// 手动滚动 //
//////////

	Slider.prototype.run = function (argument) {

		Slider.end = -((arguments[3] - 1) * 1250 - (arguments[3] - 2) * 300);
// alert(Slider.end);

		
		Slider.prototype.getElement("slider").addEventListener("mouseover", Slider.prototype.stop);
		
		if (arguments[0].id == "next") {
			Slider.element[0].addEventListener("click", Slider.prototype.next);
			removeEventListener("click", Slider.prototype.next);
		}
		
		if (arguments[1].id == "back") {
			Slider.element[1].addEventListener("click", Slider.prototype.back);
			removeEventListener("click", Slider.prototype.back);
		}
	}

//////////
// 向下滚动 //
//////////

	Slider.prototype.next = function () {
		
				if (Slider.prototype.getCurrentLeft() == Slider.end) {
					Slider.element[0].style.cursor = "not-allowed";
					Slider.h = 0;
					return false;
				}else{
					Slider.element[1].style.cursor = "pointer";
					// Slider.prototype.next(Slider.element[2]);
					var start = Slider.prototype.getCurrentLeft();
		var left = 0;

		var timer = setInterval(function(){
			if (left == 1250) {
				clearInterval(timer);
			}
			Slider.element[2].style.left = start - left +"px";
			left+=250;
		},100)

				}
				
			}
//////////
// 向上滚动 //
//////////
		Slider.prototype.back = function () {
				if (Slider.prototype.getCurrentLeft() == 300) {
					Slider.element[1].style.cursor = "not-allowed";
					Slider.h = 1;
					return false;
				}else{
					Slider.element[0].style.cursor = "pointer";
					var start = Slider.prototype.getCurrentLeft();
		var left = 0;

		var timer = setInterval(function(){
			if (left == 1250) {
				clearInterval(timer);
			}
			Slider.element[2].style.left = start + left +"px";
			left+=250;
		},100)
		
				}
			}

//////////
// 暂停滚动 //
//////////

Slider.prototype.stop = function (arguments) {
		clearInterval(Slider.timer);
		removeEventListener("mouseover", Slider.prototype.stop);
}


//////////
// 自动滚动 //
//////////
	Slider.prototype.auto = function () {
			Slider.h = 1;

		Slider.timer = setInterval(function (argument) {
	/*		alert(Slider.prototype.getCurrentLeft());*/
			if (Slider.h) {
				// 
				// alert(1);
				Slider.prototype.next();
				
			}else {
				
				Slider.prototype.back();
			}
		}, 3000)
		
	}


	var slider = new Slider();
	slider.run(slider.getElement("next"), slider.getElement("back"), slider.getElement("slider"), 3);
	Slider.prototype.auto();


}

