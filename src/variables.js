
var TILE_SIZE = 256;
var MAX_TILES_PER_GRID = 100;

var DEFAULT_HEIGHT = 10;
var HEIGHT_SCALE = 1.0;

var DEFAULT_COLOR = 'rgb(220, 210, 200)';
var HIGHLIGHT_COLOR = '#f08000';
var FOG_COLOR = '#f0f8ff';
var BACKGROUND_COLOR = '#efe8e0';

var document = global.document;

var EARTH_RADIUS_IN_METERS = 6378137;
var EARTH_CIRCUMFERENCE_IN_METERS = EARTH_RADIUS_IN_METERS * Math.PI * 2;

var METERS_PER_DEGREE_LATITUDE = EARTH_CIRCUMFERENCE_IN_METERS / 360;
