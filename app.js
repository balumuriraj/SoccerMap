require(
  [
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",

    "esri/geometry/Extent",
    "esri/geometry/SpatialReference",
    
    "esri/layers/ArcGISTiledLayer",
    "esri/layers/FeatureLayer",
     
    "esri/renderers/UniqueValueRenderer", 
    
    "esri/symbols/SimpleLineSymbol", 
    "esri/symbols/SimpleFillSymbol",
    
    "esri/Color",
     
    "dojo/domReady!"
  ], function (
    Map, MapView, SceneView,
    Extent, SpatialReference,
    ArcGISTiledLayer, FeatureLayer,
    UniqueValueRenderer,
    SimpleLineSymbol, SimpleFillSymbol,
    Color
  ) {

    /**** Maps ****/
    var map1 = new Map({
      //basemap: "satellite"
    });

    var map2 = new Map({
      basemap: "satellite"
    });

    /**** Views ****/
    var view2D = new MapView({
      container: "view2D",
      map: map1
    });

    var view3D = new SceneView({
      container: "view3D",
      map: map2
    });

    /**** 2D ****/
    // view2D.on("click", function(){
    //   console.log(view2D.extent);
    // });
    
    /**** Layer ****/
    var baselyr = new ArcGISTiledLayer({
      url: "http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer"
    });
    
    map1.add(baselyr);
    
    var lyr = new FeatureLayer({
      url: "http://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries_(Generalized)/FeatureServer/0",
      opacity: 0.95
    });
    
    map1.add(lyr);

    var init2DExtent = new Extent({
      xmax: 19407422.51677575,
      xmin: -18162905.625944093,
      ymax: 12827633.823335513,
      ymin: -5859690.851819406,
      spatialReference: new SpatialReference({
        wkid: 102100
      })
    });

    view2D.then(function() {
      
      lyr.then(function() {
        var defaultSymbol = new SimpleFillSymbol({
          color: "#2ecc71"
        });
  
        var renderer = new UniqueValueRenderer(defaultSymbol, "Country");
        
        console.log(lyr);
    
        //add symbol for each possible value
        //renderer.addValue("Pacific", new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));
        
        lyr.renderer = renderer;
        
        view2D.animateTo(init2DExtent);
        
      });
    });

    /**** 3D ****/
    
    
    
    
    
    

  }
);