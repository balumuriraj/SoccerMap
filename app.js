require(
  [
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",

    "esri/geometry/Extent",
    "esri/geometry/SpatialReference",

    "dojo/domReady!"
  ], function (
    Map, MapView, SceneView,
    Extent, SpatialReference
  ) {

    /**** Maps ****/
    var map1 = new Map({
      basemap: "satellite"
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
      view2D.animateTo(init2DExtent);
    });

    /**** 3D ****/

  }
);