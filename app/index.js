#!/usr/bin/env node
// jshint esversion:6, -W030

import yargs from 'yargs';

import pkg from '../package.json';
import utilities from './utilities';

const OPTIONS = {};

function linkFile(from, to) {
	
	console.log(from, to);
	
	utilities.link(from, to);
	
}

function moveFile(from) {
	
	let to = `${OPTIONS.directory}/${utilities.last(from)}`;
	
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
				
				if (utilities.exists(file) && ( ! utilities.exists(file, true))) {
					
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
		.option('directory', {
			alias: [
				'd',
			],
			description: 'Directory where sylinked destinations will be copied.',
			type: 'string',
			demand: true,
		})
		.option('config', {
			alias: [
				'c'
			],
			description: 'Configuration file name and extension.',
			type: 'string',
			default: 'config.yml',
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
