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
	//alert(Slider.prototype.getCurrentLeft());

	Slider.prototype.run = function (argument) {
		Slider.end = -((arguments[3] - 1) * 1250 - (arguments[3] - 2) * 300);
		if (arguments[0].id == "next") {
			Slider.element[0].addEventListener("click", Slider.prototype.listener);
		}
		
		if (arguments[1].id == "back") {
			Slider.element[1].addEventListener("click", function () {
				if (Slider.prototype.getCurrentLeft() == 300) {
					this.style.cursor = "not-allowed";
					return false;
				}else{
					Slider.element[0].style.cursor = "pointer";
					Slider.prototype.back(Slider.element[2]);
				}
			});
		}
	}

	Slider.prototype.listener = function (e) {
				if (Slider.prototype.getCurrentLeft() == Slider.end) {
					Slider.element[0].style.cursor = "not-allowed";
					return false;
				}else{
					Slider.element[1].style.cursor = "pointer";
					Slider.prototype.next(Slider.element[2]);
				}
				
			}

	Slider.prototype.next = function (element) {
			var start = Slider.prototype.getCurrentLeft();
		var left = 0;

		var timer = setInterval(function(){
			if (left == 1250) {
				clearInterval(timer);
			}
			element.style.left = start - left +"px";
			left+=250;
		},100)

	}

	Slider.prototype.back = function (element) {
		var start = Slider.prototype.getCurrentLeft();
		var left = 0;

		var timer = setInterval(function(){
			if (left == 1250) {
				clearInterval(timer);
			}
			element.style.left = start + left +"px";
			left+=250;
		},100)
		
	}

	Slider.prototype.auto = function () {
		var timer = setInterval(function (argument) {
			Slider.prototype.listener();
			if (Slider.prototype.getCurrentLeft() == Slider.end) {
				clearInterval(timer);
				alert(1);
			}
		}, 3000)
	}
	var slider = new Slider();
	slider.run(slider.getElement("next"), slider.getElement("back"), slider.getElement("slider"), 3);
	Slider.prototype.auto();


}

