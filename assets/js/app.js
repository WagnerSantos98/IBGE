// Create chart instance
var chart = am4core.create("chartdiv", am4maps.MapChart);

// Make the chart fade-in on init
chart.hiddenState.properties.opacity = 0;


// Set geodata


//map.geodataSource.url = "http://kh.neoplace.com.br/scripts/geojs-41-mun.json";

chart.geodata = am4geodata_brazilLow;

//#testes Paul
//chart.dataSource.url = //"https://s3.amazonaws.com/neoplace/static/maps/br//azil.json";
//chart.dataSource.parser = new am4core.JSONParser();
//chart.dataSource.parser.options.emptyAs = 0;




// Set projection to be used
// @see {@link https://www.amcharts.com/docs/v4/reference/mapchart/#projection_property}
chart.projection = new am4maps.projections.Miller();

// Create polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.useGeodata = true;
polygonSeries.exclude = ["AQ"]; // Exclude Antractica
polygonSeries.tooltip.fill = am4core.color("#000000");

var colorSet = new am4core.ColorSet();

// Configure polygons
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.togglable = true;

// Set events to apply "active" state to clicked polygons
var currentActive;
polygonTemplate.events.on("hit", function (event) {
  // if we have some country selected, set default state to it
  if (currentActive) {
    currentActive.setState("default");
  }

  chart.zoomToMapObject(event.target);
  currentActive = event.target;
})

// Configure states
// @see {@link https://www.amcharts.com/docs/v4/concepts/states/}

// Configure "hover" state
var hoverState = polygonTemplate.states.create("hover");
hoverState.properties.fill = colorSet.getIndex(0);

// Configure "active" state
var activeState = polygonTemplate.states.create("active");
activeState.properties.fill = colorSet.getIndex(4);

// Create a zoom control
var zoomControl = new am4maps.ZoomControl();
chart.zoomControl = zoomControl;
zoomControl.slider.height = 100;