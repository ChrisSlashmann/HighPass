ymaps.ready(init);
  function init(){
  var myMap = new ymaps.Map("map", {
    center: [55.760154639, 37.618635861],
      zoom: 13
    });
        
  var myPlacemark = new ymaps.Placemark([55.76954828, 37.63851487], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/Ellipse.svg',
    iconImageSize: [12, 12],
    iconImageOffset: [1, 1]
  });
  myMap.geoObjects.add(myPlacemark); 
}