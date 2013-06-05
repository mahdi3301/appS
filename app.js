/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.1.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

//@require @packageOverrides
var map,lat,lng,marker,c,d,i;
e = new Array();
var i=1;


function transform1(c,d) {
     // var Z = new Proj4js.Proj(Ext.getCmp('Zone').getValue());
      
      var wgs84 = new Proj4js.Proj('EPSG:4326');
      var Z = new Proj4js.Proj(Ext.getCmp('Zone').getValue());
      // (x,y) ou (lambda,phi)
     // var pointSource = new Proj4js.Point(443799.97419095394,267191.39958294964);
     var pointSource = new Proj4js.Point(c,d);
      var pointDest = Proj4js.transform(wgs84, Z, pointSource);
      return pointDest
   };
   function transform2(X,Y) {
     // var Z = new Proj4js.Proj(Ext.getCmp('Zone').getValue());
      
      var wgs84 = new Proj4js.Proj('EPSG:4326');
      var Z = new Proj4js.Proj(Ext.getCmp('Zone').getValue());
      // (x,y) ou (lambda,phi)
     // var pointSource = new Proj4js.Point(443799.97419095394,267191.39958294964);
     var pointSource = new Proj4js.Point(X,Y);
      var pointDest = Proj4js.transform(Z, wgs84, pointSource);
      return pointDest
      
   };
function carte(){

  var coordonnee=Ext.getCmp('coordonnee');
  var a=new google.maps.LatLng(lat,lng);
  map = new google.maps.Map(document.getElementById('panel1'),
            {	zoom: 10,
              	center: new google.maps.LatLng(lat, lng),
              	mapTypeId: google.maps.MapTypeId.ROADMAP
              }  
									);
          marker = new google.maps.Marker({
			 		position: a,
					map: map,
					draggable:true

    										});
          transform1();

          google.maps.event.addListener(marker, 'drag', function() {


    coordonnee.setHtml('X : ' + transform1(marker.getPosition().lb,marker.getPosition().kb).x.toFixed(5) + ' ; '
                                      + 'Y : ' + transform1(marker.getPosition().lb,marker.getPosition().kb).y.toFixed(5));
          
  
  }); 
  google.maps.event.addListener(marker, 'dragend', function() {
    e[0]=new google.maps.LatLng(lat, lng);
    e[i]=new google.maps.LatLng(marker.getPosition().kb, marker.getPosition().lb);
          i++;
          
console.log(e);
 var flightPlanCoordinates = [
    new google.maps.LatLng(37.772323, -122.214897),
    new google.maps.LatLng(21.291982, -157.821856),
  ];
  
  // Construct the polygon
  // Note that we don't specify an array or arrays, but instead just
  // a simple array of LatLngs in the paths property
  var flightPath = new google.maps.Polyline({
    path: e,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);  

  });
        
			map.setCenter(a);
			map.setZoom(15);
};
function geoloc() {

Ext.device.Geolocation.getCurrentPosition({
    allowHighAccuracy : true,
    

    success: function(position) {
    	
    	var coordonnee=Ext.getCmp('coordonnee');
           lng=position.coords.longitude;
           lat=position.coords.latitude;
           coordonnee.setHtml('X : ' + transform1(lng,lat).x.toFixed(5) + ' ; '
                                      + 'Y : ' + transform1(lng,lat).y.toFixed(5));
    
        
        carte();

                                },
    failure: function() {
        console.log('something went wrong!');
                        }

                                            });
	 };

Ext.Loader.setConfig({

});

Ext.application({
    views: [
        'MyTabPanel'
    ],
    models: [
        
    ],
    stores: [
        
    ],
    controllers: [
        'MyController'
    ],
    name: 'MyApp',

    launch: function() {
    Ext.create('MyApp.view.MyTabPanel', {fullscreen: true});
    
	 geoloc();
	 



       
    
       

    
}

});
