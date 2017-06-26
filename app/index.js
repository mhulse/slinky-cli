#!/usr/bin/env node
// jshint esversion:6, -W030

import _ from 'underscore';
import colors from 'colors';
import inquirer from 'inquirer';
import path from 'path';
import yargs from 'yargs';
import fs from 'fs-extra';

import pkg from '../package.json';
import utilities from './utilities';

const OPTIONS = {};

function makeSymlinks(version) {
	
	let parent = path.normalize(`${OPTIONS.dir}/${version}`);
	
	utilities.makeDir(parent)
	
	utilities.cleanDir(parent);
	
	_(utilities.mappings[OPTIONS.app]).each(mapping => {
		
		let target = _.template(mapping)({
			version: version
		});
		
		let link = path.normalize(`${parent}/${utilities.getLastDir(target)}`);
		
		utilities.makeDirLink(target, link);
		
	});
	
	
}

function checkVersion() {
	
	let choices = utilities.getDirVers(`/Applications/*${OPTIONS.app}*`);
	
	if (choices.length) {
		
		choices.push('Cancel');
		
		inquirer.prompt([
			{
				type: 'list',
				name: 'choose',
				message: 'Choose version',
				choices: choices,
			},
		]).then((answers) => {
			
			if (answers.choose.toLowerCase() != 'cancel') {
				
				makeSymlinks(answers.choose);
				
			}
			
		});
		
	}
	
}

function startApp() {
	
	if (utilities.mappings[OPTIONS.app]) {
		
		if (utilities.dirExists(OPTIONS.dir)) {
			
			utilities.title('Starting Adobe Dirs');
			
			checkVersion();
			
		} else {
			
			utilities.o('log', `Chosen directory does not exist: ${OPTIONS.dir.bold}`.red);
			
		}
		
	} else {
		
		utilities.o('log', `Chosen application does not exist: ${OPTIONS.app.bold}`.red);
		
	}
	
}

function getOptions() {
	
	let argv = yargs
		.version(pkg.version)
		.command('adobe-dirs', 'Create symlinks for Adobe applications.')
		.usage('$0 <application> <directory>')
		.example(
			'$0 illustrator ~/dropbox/adobe/illustrator',
			'Create symlinks for application in specified directory.'
		)
		.alias('h', 'help')
		.help('h', 'Show help.')
		.argv;
	
	OPTIONS.app = argv._[0].toLowerCase();
	OPTIONS.dir = argv._[1];
	
	startApp();
	
}

getOptions();
