/**
 *
 * @param container
 * @param width
 * @param height
 * @constructor
 */

function SlideShow(container,width,height,options){

	/**
	* дефолтные настройки
	* @type {{
	* nav: boolean, - bool - true - показывать кнопки навигации, false - не показывать
	* autoPlay: boolean, - bool - true - вкючить автопрокрутку слайдов, false - выключить
	* isBullets: boolean - bool - true - вкючить пагинацию буддетами, false - выключить
	* }}
	*/
	var optionsDefault = {
		'nav':true,
		'autoPlay':true,
		'isBullets':true
	}

	this.options = options || optionsDefault;

	/**
     *    @param this.width - ширина изображения в слайдере
     */
	this.width = width || this.imgs[0].width;
	/**
     *    @param this.height - высота изображения в слайдере
     */
	this.height = height || this.imgs[0].height;

	/**
	 *  @param this.container - контейнер с изображениями
	 */
	this.container = container.css({'width':this.width,'height':this.height,}).find('.view');

	/**
	 *  @param this.viewUL - ul контейнер с картинками
	 */
	this.viewUL = this.container
				.css('overflow','hidden')
				.children('ul');

	/**
	 *  @param this.imgs - jquery объект со всеми картинками
	 */
	this.imgs = this.viewUL.find('img');

	/**
	 *  @param this.imgs - jquery объект со всеми картинками
	 */
	this.imgW = this.width;
	//высота одной каринки
	this.imgH = this.height;

	/**
	 *  @param this.imgsLen - количество изображений
	 */
	this.imgsLen = this.imgs.length;

	/**
	 *  @param this.totalImgsW - общая ширина прокручиваемых картинок
	 */
	this.totalImgsW = this.imgW * this.imgsLen;

	/**
	 *  @param this.current - порядковый номер картинки
	 */
	this.current = 1;

	/**
	 *  @param this.butNav - размерные параметры кнопок навигации
	 */
	this.butNav = {
		'height': '50',
		'width': '50',
		'indent': '15'
	}

	/**
	 *  @param top - отступ кнопки сверху
	 */
	var top = (parseInt(this.height)/2) - (parseInt(this.butNav.height)/2);

	/**
	 *  @param leftPrev - отступ кнопки слева
	 */
	var leftPrev = this.butNav.indent;

	/**
	 *  @param leftNext - отступ кнопки справа
	 */
	var leftNext = parseInt(this.width) - (parseInt(this.butNav.width) + parseInt(this.butNav.indent));

	/**
	 *  @param leftNext - стиль кнопки предыдущий слайд
	 */
	var prevCss = {
		'height': this.butNav.height,
		'width': this.butNav.width,
		'top': top,
		'left': leftPrev
	};

	/**
	 *  @param nextCss - стиль кнопки следующий слайд
	 */
	var nextCss = {
		'height': this.butNav.height,
		'width': this.butNav.width,
		'top': top,
		'left': leftNext
	};

	/**
	 *  @param this.prev - объект кнопки следующий слайд
	 */
	this.prev = $('<a/>').attr('id','prev').css(prevCss);

	/**
	 *  @param this.next - объект кнопки следующий слайд
	 */
	this.next = $('<a/>').attr('id','next').css(nextCss);


}




SlideShow.prototype.nextSlaid = function(direction){
	var direction = direction || 'next';
	(direction === 'next') ? ++this.current : --this.current;
	var position = this.imgW;
	if (this.current === 0) {
		this.current = this.imgsLen;
		direction = 'next';
		position = this.totalImgsW - this.imgW;
	}
	// если номер картинки = количеству картинок, то приводим к дефолтному
	else if (this.current - 1 === this.imgsLen) {
		this.current = 1;
		position = 0;
	}
	var sign; // -= +=
	if (direction && position != 0){
		sign = (direction === 'next') ? '-=' : '+=';
	}
	this.viewUL.animate({
		// если существует sign то увеличиваем или уменьшаем значение margin-left на position, если нет, то оставляем position
		'margin-left': sign ? (sign+position) : position
	});
	$('.anim-dots-this').removeClass();
	$('.anim-dots span').eq(this.current-1).addClass('anim-dots-this');
}

/**
 * функция показа кнопок навигации
 */
SlideShow.prototype.clickNavButton = function() {
	var self = this;
	this.prev.insertAfter(this.viewUL);
	this.next.insertAfter(this.viewUL);
	this.container.find('a').on('click', function() {
		// атрибут кнопок вперед назад
		var direction = $(this).attr('id');
		self.nextSlaid(direction);
	});
}

/**
 *	автоматическая прокрутка
 */
SlideShow.prototype.auto = function(){
	var self = this;
	var sliderTimer =  setInterval(function(){self.nextSlaid()},2000);
	this.container.hover(
		function(){
			clearInterval(sliderTimer)
		},
		function(){
			sliderTimer = setInterval(function(){
				self.nextSlaid()},2000);
		}
	);
};



//функция добавления кнопок перехода на каждый слайд (ещё их называют буллеты).
SlideShow.prototype.bullets = function(current){
	var self = this;
	// контейнеры с навигацией
	var dotDiv = $("<div/>",{
		'class':'anim-dots'
	});

	var dotSpanAll = [];
	for (var i=0;i<this.imgsLen;i++){
		if (i == 0) {
			dotSpanAll[i] = '<span class="anim-dots-this"></span>';
			continue;
		}
		dotSpanAll[i] =  '<span></span>';
	}

	for(var i=0;i<dotSpanAll.length;i++){
		$(dotSpanAll[i]).appendTo(dotDiv);
	}
	dotDiv.insertAfter(this.viewUL);

	$(dotDiv).find('span').on('click',function(){
		var elThis = $(this);
		dotDiv.find('.anim-dots-this').removeClass();
		elThis.addClass('anim-dots-this');
		var current = elThis.index();
		var position = self.imgW * current;
		self.viewUL.animate({
			'margin-left': '-'+position
		});

	});
}

/**
 * функция запуск конструктора
 */
SlideShow.prototype.run = function(){
	// вызываем функцию клика
	if (this.options.nav) this.clickNavButton();
	// вызываем функцию автопоказа
	if (this.options.autoPlay) this.auto();
	// показ bullets
	if (this.options.isBullets) this.bullets(this.current);
}