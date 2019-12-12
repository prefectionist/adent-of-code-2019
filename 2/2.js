// https://adventofcode.com/2019/day/2

function processOpCode(pointer, program, verbose=false) 
{
	let halt = false;

	// get the opcode	
	var opCode = parseInt(program[pointer], 10);

	// get parameter addresses
	var input1 = program[pointer+1];
	var input2 = program[pointer+2];
	var outputPos = program[pointer+3];

	if (verbose) {
		console.log("Instruction: " + opCode + ", " + input1 + ", " + input2 + ", " + outputPos);
		console.log("opcode: " + opCode);
		console.log("input1 position: " + input1);
		console.log("input1: " + program[input1]);
		console.log("input2 position: " + input2);
		console.log("input2: " + program[input2]);
		console.log("output position: " + outputPos);
	}

	// Execute the opcode with the input values
	var output = null;
	switch(opCode) {
		case 1:
			if (verbose) { 
				console.log("Adding..."); 
			}
			output = parseInt(program[input1], 10) + parseInt(program[input2], 10);
			break;
		case 2:
			if (verbose) {
				console.log("Multiply...");
			}
			output = parseInt(program[input1], 10) * parseInt(program[input2], 10);
			break;
		case 99:
			// Stop when halt opCode is encountered
			if (verbose) {
				console.log("[!] Halt reached");
			}
			return true;
			break;
		default:
			// Stop when bad opCode is encountered
			if (verbose) {
				console.log("[!] Bad opcode");
			}
			return true;
	}
	if (verbose) {
		console.log("output: " + output);
	}
	// Set the new value in the output position
	program[outputPos] = output;
}

/**
 * Patch the program state to the '1202 program alarm' state 
 */
function setInputs(program, noun, verb) {
	program[1] = noun;
	program[2] = verb;

	return program;
}

function runIntCode(init, noun, verb, verbose=false)
{
	// Set the program's inputs
	let program = setInputs(init, noun, verb);

	// Initialize the pointer
	var pointer = 0;
	var cur = 1;

	// Execute the program (with infinite loop protection)
	while (pointer <= program.length) {
		// process the opcode segment
		var halt = processOpCode(pointer, program, verbose);

		// Stop execution if halt is reached.
		if (halt) { break; }

		if (verbose) {
			// Verify the new program state
			console.log("program state, iteration " + cur + ": ");
			console.log(program);
		}

		if (cur === 1) {
			console.log('starting output = ');
			
		} 

		// Move the pointer to the next opcode
		pointer += 4;
		if (verbose) {
			console.log("New pointer: " + pointer);
		}

		// iterate
		cur++;
	}

	// Return the program results;
	return program[0];
}

function findStartingInputs(desiredOutput) 
{
	let runs = 1;
	for (n=0; n<=initialMemory.length; n++) {
		for (v=0; v<=initialMemory.length; v++) {
			// Run the Intcode computer
			answer = runIntCode(input.split(","), n, v, false);
			console.log(answer);

			if (desiredOutput == answer) {
				console.log("Inputs found!");
				console.log(n + " " + v);
				console.log( (100*parseInt(n,10)) + parseInt(v,10) );

				return true;
			}

			console.log("Runs: " + runs);
			runs++;
		}
	}
		
	console.log('No noun:verb pairing found for ' + desiredOutput);
	return false;
}

// let input = "1,9,10,3,2,3,11,0,99,30,40,50";		// Testing input
let input = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,19,5,23,2,23,6,27,1,27,5,31,2,6,31,35,1,5,35,39,2,39,9,43,1,43,5,47,1,10,47,51,1,51,6,55,1,55,10,59,1,59,6,63,2,13,63,67,1,9,67,71,2,6,71,75,1,5,75,79,1,9,79,83,2,6,83,87,1,5,87,91,2,6,91,95,2,95,9,99,1,99,6,103,1,103,13,107,2,13,107,111,2,111,10,115,1,115,6,119,1,6,119,123,2,6,123,127,1,127,5,131,2,131,6,135,1,135,2,139,1,139,9,0,99,2,14,0,0";

// Get the initial memory from the input
let initialMemory = input.split(",");
console.log("Initial memory state:");
console.log(initialMemory);

// Run Advent 2.1 solution:
// Advent 2.1 presumes noun and verb of 12 and 2
let answerPart1 = runIntCode(input.split(","), 12, 2, false);
console.log("Advent 2.1 answer: " + answerPart1);

// Advent 2.2 solution
findStartingInputs(19690720);