#!/usr/bin/env node

var fs = require('fs');
var open = require('open');

var thepackage = process.env.PWD + '/package.json'
fs.readFile(thepackage, 'utf-8', (err, data) => {
	// File can't be found
	if (err) return console.error('Sorry, package.json can\'t be found...');
	// File has been found
	var p = JSON.parse(data);
	if (p.repository && p.repository.url && (p.repository.type == 'git' || !p.repository.type)) {
		// Withdraw link from git repo string
		var link = processLink(p.repository.url);
		console.log('Opening ' + link);
		open(link , a => {
			// Link is broken
			if (a) return console.error('Sorry, theres been an error opening the link...');
		});
	} else {
		return console.error('Sorry, Github link can\'t be found...');
	}
})
// Finds the appropriate link. Typically removes the +git from the beginning and .git from the end.
function processLink(link) {
	var start = link.indexOf('github.com');
	var end = link.indexOf('.git');
	return 'https://' + link.slice(start, end);
}