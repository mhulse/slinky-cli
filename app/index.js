#!/usr/bin/env node
// jshint esversion:6, -W030

import yargs from 'yargs';

import pkg from '../package.json';
import utilities from './utilities';

const OPTIONS = {};

function linkFile(from, to) {
	
	utilities.link(from, to);
	
}

function moveFile(from) {
	
	let to = `${OPTIONS.directory}/${utilities.last(from)}`;
	
	// Is destination already a symlink?
	if (utilities.exists(to) && utilities.exists(to, true)) {
		
		// Remove it so we can create it fresh in future steps:
		utilities.delete(to);
		
	}
	
	// Is target a symlink?
	if (utilities.exists(from, true)) {
		
		// IBID:
		utilities.delete(from);
		
		// Swap the target and destination so we can reverse the linking:
		[from, to] = [to, from];
		
	}
	
	utilities.move(from, to, function(error) {
		
		if ( ! error) {
			
			linkFile(to, from);
			
		}
		
	});
	
}

function startApp() {
	
	if (utilities.exists(OPTIONS.directory)) {
		
		let yaml = utilities.yaml(`${OPTIONS.directory}/${OPTIONS.config}`);
		
		for (let key in yaml) {
			
			for (let item of yaml[key]) {
				
				let file = utilities.fix(`${key}/${item}`);
				
				if (utilities.exists(file)) {
					
					moveFile(file);
					
				}
				
			}
			
		}
		
	}
	
}

function getOptions() {
	
	let argv = yargs
		.version(pkg.version)
		.command('adobe-dirs', 'Reverse symlink creation CLI.')
		.option('config', {
			alias: [
				'c'
			],
			description: 'Configuration file name and extension.',
			type: 'string',
			default: 'config.yml',
		})
		.option('directory', {
			alias: [
				'd',
			],
			description: 'Directory where sylinked destinations will be copied.',
			type: 'string',
			demand: true,
		})
		.usage('$0 --directory <directory>')
		.example(
			'$0 -d ~/dropbox/adobe/',
			'Create symlinks for application in specified directory.'
		)
		.alias('h', 'help')
		.help('h', 'Show help.')
		.argv;
	
	OPTIONS.config = argv.config;
	OPTIONS.directory = utilities.fix(argv.directory);
	
	startApp();
	
}

getOptions();
