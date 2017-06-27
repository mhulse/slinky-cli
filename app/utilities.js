#!/usr/bin/env node
// jshint esversion:6, laxbreak:true

import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import untildify from 'untildify';
import move from 'mv';

module.exports = {
	
	last: function(file) {
		
		let match = file.match(/([^\/]*)\/*$/)[1];
		
		if (match) {
			
			return match;
			
		} else {
			
			this.exit(`${file} could not be matched!`, 1);
			
		}
		
	},
	
	fix: function(file) {
		
		try {
			
			return fs.realpathSync(path.normalize(untildify(file)));
			
		} catch (error) {
			
			this.exit(`${file} can not be fixed!`, 1);
			
		}
		
		
	},
	
	exists: function(file, symlink = false) {
		
		try {
			
			return (symlink) ? fs.lstatSync(file).isSymbolicLink() : fs.existsSync(file);
			
		} catch (error) {
			
			this.exit(`${file} does not exist!`, 1);
			
		}
		
	},
	
	yaml: function(file) {
		
		try {
			
			return yaml.safeLoad(fs.readFileSync(file, 'utf8'));
			
		} catch(error) {
			
			this.exit(`${file} could not read yaml!`, 1);
			
		}
		
	},
	
	move: function(from, to, callback) {
		
		move(from, to, {
			mkdirp: true
		}, function(error) {
			
			if (error) {
				
				this.exit(`${from} could not be moved!`, 1);
				
			} else {
				
				callback();
				
			}
		});
		
	},
	
	link: function(target, link) {
		
		if ( ! this.exists(link)) {
			
			let result = fs.symlinkSync(target, link);
			
			if (result === null) {
				
				console.log(`${link} could not create symlink!`);
				
			}
			
		} else {
			
			console.log(`${link} symlink already exists!`);
			
		}
		
	},
	
	exit: function(message, code = 0) {
		
		console.error(message);
		
		process.exit(code);
		
	},
	
};
