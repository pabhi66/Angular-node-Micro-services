const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPITONS, DELETE, PUT");
    next();
});

const httpServer = http.createServer(app);

app.get('/', (req, res) => {
	return res.json({status:"ok"});
});

app.get('/query', (req, res) => { // TODO 

	request.get('http://es:9200/test', (err, response, body) => {
		return res.json({"body":body});
	});

});


// Gets pages from page service. Sends to elasticsearch service for indexing
// TODO - use _Bulk indexing api 
//		- configure for indexing to be called periodically
//		- index all page data, not just title and route
// Index formatted as {_index: pages, _type: page}
app.post('/index', (req, res) => {

	request.get('http://wiki-api-gateway:8080/api/v1/pages', (err, response, body) => {
		body = JSON.parse(body);
		let data = body.map(x => JSON.parse(JSON.stringify(x)));
		
		//console.log(JSON.parse(JSON.stringify(body[0])));
		data.forEach(element => {
			request.post('http://es:9200/pages/page', {json: element} , (err, response, b) => {
				console.log(b);
			});
		});
		/*
		request.post('http://es:9200/pages/page', {json:  JSON.parse(JSON.stringify(body[0]))} , (err, response, b) => {
			console.log(b);
		}); */
		return res.json({"body":body});
	});

});

/*setTimeout(function(){
request.get('http://es:9200', function(err,res,body) {
//	console.log(res);
	console.log(body);
//	console.log(err);
});}, 10000); */

httpServer.listen(4040);
console.log("server started on 4040");

