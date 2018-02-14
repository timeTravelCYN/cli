#!/usr/bin/env node

'use strict';

const chalk = require('chalk');

// Verify the correct version of Node is in use.
const minimum = [6, 4, 0];
const active = process.versions.node.split('.').map(val => parseInt(val));
if(active[0] < minimum[0] || (active[0] === minimum[0] && active[1] < minimum[1])) {
	console.log(chalk.red('You are running Node ' + active.join('.') + '.\n@enact/cli requires Node '
			+ minimum.join('.') + ' or higher. \n' + chalk.bold('Please update your version of Node.')));
	process.exit(1);
}

// Handle tasks/arguments
if (process.argv.indexOf('-v') >= 0 || process.argv.indexOf('--version') >= 0) {
	const pkg = require('../package.json');
	// Enact-CLI ascii art title
	const title = `                                               
    ┌─┐┌┐┌┌─┐┌─┐┌┬┐  ┌─┐┬  ┬    ▐██▄▄    ▄▄██▌ 
    │  ││││ ││   │   │  │  │    ▐██▀██████▀▀   
    ├┤ │││├─┤│   │ ──│  │  │    ▐██▄▄ ▀▀ ▄▄    
    │  ││││ ││   │   │  │  │    ▐██▀██████▀    
    └─┘┘└┘┴ ┴└─┘ ┴   └─┘┴─┘┴    ▐██▄▄ ▀▀ ▄▄██▌ 
    ────────────────────────      ▀▀██████▀▀   
                                      ▀▀       `;
	// Add colour to the logo
	const colourTitle = title.split(/[\n\r]+/g).map(l => {
		const half = (l.length-31)/2;
		return l.substring(0, 31) + chalk.bgBlueBright(chalk.whiteBright(l.substring(31, 31+half))
				+ chalk.white(l.substring(31+half)));
	}).join('\n');
	console.log();
	console.log(colourTitle);
	console.log('    Version ' + pkg.version);
	console.log();
} else {
	const command = process.argv[2];

	switch (command) {
		case 'create':
		case 'link':
		case 'serve':
		case 'transpile':
		case 'pack':
		case 'clean':
		case 'test':
		case 'template':
		case 'lint':
		case 'license':{
			const task = require('../global-cli/' + command).cli;
			task(process.argv.slice(3));
			break;
		}
		default: {
			console.log('  Usage');
			console.log('    enact <command> [...]');
			console.log();
			console.log('  Commands');
			console.log('    create            Create a new project');
			console.log('    link              Link @enact dependencies');
			console.log('    serve             Development server');
			console.log('    pack              Bundle source code');
			console.log('    test              Test specs runner');
			console.log('    transpile         Transpile to ES5');
			console.log('    template          Manage Enact templates');
			console.log('    license           Detect all used licenses');
			console.log('    lint              Lint source code');
			console.log('    clean             Clean build directory');
			console.log();
			console.log(`  Refer to each command's ${chalk.cyan('--help')} for more details.`);
			console.log();
		}
	}
}
