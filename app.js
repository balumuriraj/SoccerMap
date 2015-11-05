require(
  [
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",

    "esri/geometry/Extent",
    "esri/geometry/SpatialReference",
    "esri/geometry/support/webMercatorUtils",
    
    "esri/layers/ArcGISTiledLayer",
    "esri/layers/FeatureLayer",
     
    "esri/renderers/UniqueValueRenderer", 
    
    "esri/symbols/SimpleLineSymbol", 
    "esri/symbols/SimpleFillSymbol",

    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",

    "dojo/on",
    "dojo/domReady!"
  ], function (
    Map, MapView, SceneView,
    Extent, SpatialReference, webMercatorUtils,
    ArcGISTiledLayer, FeatureLayer,
    UniqueValueRenderer,
    SimpleLineSymbol, SimpleFillSymbol,
    QueryTask, Query,
    on
  ) {

    /**** Maps ****/
    var map1 = new Map({
      basemap: "topo"
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
     view2D.on("click", function(){
       console.log(view2D.extent);
     });
    
    /**** Layer ****/
    /*var baselyr = new ArcGISTiledLayer({
      url: "http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer"
    });

    map1.add(baselyr);*/

    var url = "http://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries_(Generalized)/FeatureServer/0";
    
    var lyr = new FeatureLayer({
      url: url,
      opacity: 0.95
    });
    
    map1.add(lyr);

    var queryTask = new QueryTask({
      url: url
    });
    var query = new Query();
    query.returnGeometry = true;
    query.outFields = ["*"];

    //When resolved, returns features and graphics that satisfy the query.
    queryTask.execute(query).then(function(results){
      console.log(results.features);
    }, function (err) {
      console.log(err);
    });

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

        });
  
        var renderer = new UniqueValueRenderer(defaultSymbol, "Country");
        
        console.log(lyr);
    
        //add symbol for each possible value
        renderer.addValue("United States", new SimpleFillSymbol({
          color: "#2ecc71"
        }));
        
        lyr.renderer = renderer;

        view2D.animateTo(init2DExtent);
      });
    });

    var ele = document.getElementById("view2D");

    on(ele, "mousemove", showCoordinates);

    function showCoordinates(evt) {
      var point = view2D.toMap(evt.screenX, evt.screenY);
      var currentExtent = view2D.extent;
      console.log(currentExtent.contains(point));
    }

    /**** 3D ****/
    
    
    
    
    
    

  }
);