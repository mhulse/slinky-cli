#!/usr/bin/env node
// jshint esversion:6, laxbreak:true

import _ from 'underscore';
import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import del from 'del';

// http://underscorejs.org/#template
_.templateSettings = {
	// `<% … %>` becomes `{% … %}`
	evaluate : /\{\%([\s\S]+?)\%\}/g,
	// `<%= … %>` becomes `{{ … }}`
	interpolate : /\{\{([\s\S]+?)\}\}/g
};

module.exports = {
	
	mappings: require('./mappings.json'),
	
	getLastDir: function(dirPath) {
		
		return dirPath.match(/([^\/]*)\/*$/)[1];
		
	},
	
	getDirVers: function(dirPath) {
		
		let dirs = glob.sync(dirPath, {
			nocase: true,
		});
		
		dirs = dirs.map(dir => {
			return this.getLastDir(dir);
		});
		
		return dirs.reverse();
		
	},
	
	fileExists: function(filePath) {
		
		try {
			filePath = fs.realpathSync(filePath);
			return fs.lstatSync(filePath).isFile();
		} catch (error) {
			return false;
		}
		
	},
	
	dirExists: function(dirPath, link = false) {
		
		let method = (link) ? 'isSymbolicLink' : 'isDirectory';
		
		try {
			return fs.lstatSync(dirPath)[method]();
		} catch (error) {
			return false;
		}
		
	},
	
	dirLinkExists: function(dirPath) {
		
		try {
			return fs.lstatSync(dirPath).isSymbolicLink();
		} catch (error) {
			return false;
		}
		
	},
	
	makeDir: function(dirPath) {
		
		if ( ! this.dirExists(dirPath)) {
			
			fs.mkdirSync(dirPath);
			
		}
		
	},
	
	makeDirLink: function(target, link) {
		
		if (this.dirExists(target) && ( ! this.dirExists(link, true))) {
			
			fs.symlinkSync(target, link);
			
		}
		
	},
	
	cleanDir: function(dirPath) {
		
		//console.log(dirPath);
		
		del.sync([
			`${dirPath}/**`,
			`!${dirPath}`,
		]);
		
	},
	
	o: function(type, ... messages) {
		
		console[type].apply(this, messages);
		
	},
	
	title: function(string) {
		
		this.o('log');
		this.o('log', ` ${string.toUpperCase()} `.bold.bgBlack.white);
		this.o('log');
		
	},
	
	done: function({
		text = 'Done!',
		before = true,
		after = false,
	} = {}) {
		
		if (before) this.o('log');
		
		this.o('log', text);
		
		if (after) this.o('log');
		
	},
	
};
