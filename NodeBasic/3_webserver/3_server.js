/**
 * http://usejsdoc.org/
 */

var express = require('express');
//1.동일한 폴더에서 express.js 파일
//2.node_modules 폴더에 express.js파일
//3.node_modules / express 폴더를 찾고 index.js찾음

var http = require('http');
var path = require('path');

var static = require('serve-static');
var bodyParse = require('body-parser');

var app = express();

app.set('port',process.env.PORT||3000);