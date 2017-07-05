#!/usr/bin/env node
// jshint esversion:6, laxbreak:true

import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import untildify from 'untildify';
import move from 'mv';
import { execSync as exec } from 'child_process';

require('dotenv').config();

module.exports = {
	
	last: function(file) {
		
		let match = file.match(/([^\/]*)\/*$/)[1];
		
		if (match) {
			
			return match;
			
		} else {
			
			this.exit(`File could not be matched! ${file}`, 1, error);
			
		}
		
	},
	
	delete: function(file) {
		
		try {
			
			fs.unlinkSync(file);
			
		} catch (error) {
			
			this.exit(`File can not be deleted! ${file}`, 1, error);
			
		}
		
	},
	
	fix: function(file) {
		
		try {
			
			// Remove trialing slash:
			file = file.replace(/[\\\/]+$/, '');
			// Expand home directory tilde:
			file = untildify(file);
			// Normalize double slashes, etc.:
			file = path.normalize(file);
			
			return file;
			
		} catch (error) {
			
			this.exit(`File can not be fixed! ${file}`, 1, error);
			
		}
		
	},
	
	exists: function(file, symlink = false) {
		
		try {
			
			return (symlink) ? fs.lstatSync(file).isSymbolicLink() : fs.existsSync(file);
			
		} catch (error) {
			
			this.exit(`File does not exist! ${file}`, 1, error);
			
		}
		
	},
	
	yaml: function(file) {
		
		try {
			
			return yaml.safeLoad(fs.readFileSync(file, 'utf8'));
			
		} catch(error) {
			
			this.exit(`File could not be read as yaml! ${file}`, 1, error);
			
		}
		
	},
	
	move: function(from, to, callback) {
		
		move(from, to, {
			mkdirp: false
		}, error => {
			
			if (error) {
				
				this.exit(`File could not be moved!\nFrom: ${from}\nTo: ${to}`, 1, error);
				
			} else {
				
				callback();
				
			}
		});
		
	},
	
	zip: function(file) {
		
		let zip = `${file}.zip`;
		
		try {
			
			exec(`rm -f "${zip}" && zip -r -X "${zip}" "${file}"`);
			
		} catch(error) {
			
			this.exit(`File could not be zipped! ${file}`, 1, error);
			
		}
		
	},
	
	link: function(target, link) {
		
		if ( ! this.exists(link)) {
			
			let result = fs.symlinkSync(target, link);
			
			if (result === null) {
				
				console.log(`Could not create symlink!\nTarget: ${target}\nLink: ${link}`);
				
			}
			
		} else {
			
			console.log(`Symlink already exists! ${link}`);
			
		}
		
	},
	
	exit: function(message, code = 0, error = undefined) {
		
		console.error(message);
		
		(process.env.DEBUG && error) && console.error(error);
		
		process.exit(code);
		
	},
	
};
