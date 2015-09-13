# slaidShow

 ## Основные фичи:

1. Автопрокрутка

2. Прокуртка с помощью боковых навигационных кнопок

3. Пагинация буллетами

4. Остановкка автопрокрутки при наведении указателем на слайд

Инициализация 

```html
<div id = "slaider" class = "slaiderContainer">
	<div class = "show">
		<div class = "view">
			<ul>
				<li><img src='' width='' height=''></li>
			</ul>
		</div>
	</div>
</div>
```

```js
var slideShow = new SlideShow(container,width,height,options);
	slideShow.run();
```

Arguments                    | Description                                     
--------------------------|----------------------------------------------------------------------------
`container`    | DOM контейнер
`width`    | ширина изображения
`height`    | высота изображения
`options`    | опции слайдшоу

Arguments                    | Type                		| Description                                     
--------------------------|--------------------------|----------------------------------------------------------------------------
`nav`    | boolean |  true - показывать кнопки навигации, false - не показывать
`autoPlay`    | boolean | true - вкючить автопрокрутку слайдов, false - выключить
`isBullets`    | boolean | true - вкючить пагинацию буддетами, false - выключить
`slideTimeout`    | number | задержка переключений слайдов в миллисекундах
