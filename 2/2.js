// https://adventofcode.com/2019/day/2

// let input = "1,9,10,3,2,3,11,0,99,30,40,50";
let input = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,19,5,23,2,23,6,27,1,27,5,31,2,6,31,35,1,5,35,39,2,39,9,43,1,43,5,47,1,10,47,51,1,51,6,55,1,55,10,59,1,59,6,63,2,13,63,67,1,9,67,71,2,6,71,75,1,5,75,79,1,9,79,83,2,6,83,87,1,5,87,91,2,6,91,95,2,95,9,99,1,99,6,103,1,103,13,107,2,13,107,111,2,111,10,115,1,115,6,119,1,6,119,123,2,6,123,127,1,127,5,131,2,131,6,135,1,135,2,139,1,139,9,0,99,2,14,0,0";

function processOpCode(pointer, program) 
{
	let halt = false;

	// get the opcode	
	var opCode = parseInt(program[pointer], 10);
	var input1 = program[pointer+1];
	var input2 = program[pointer+2];
	var outputPos = program[pointer+3];

	console.log("opcode: " + opCode);
	console.log("input1 positions: " + input1);
	console.log("input1: " + program[input1], typeof(program[input1]));
	console.log("input2 position: " + input2);
	console.log("input2: " + program[input2]), typeof(program[input1]);
	console.log("output position: " + outputPos);

	// Execute the opcode with the input values
	var output = null;
	switch(opCode) {
		case 1:
			console.log("Adding...");
			output = parseInt(program[input1], 10) + parseInt(program[input2], 10);
			break;
		case 2:
			console.log("Multiply...");
			output = parseInt(program[input1], 10) * parseInt(program[input2], 10);
			break;
		case 99:
			// Stop when halt opCode is encountered
			console.log("[!] Halt reached");
			return true;
			break;
		default:
			// Stop when bad opCode is encountered
			console.log("[!] Bad opcode");
			return true;
	}
	console.log("output: " + output);

	// Set the new value in the output position
	program[outputPos] = output;
}

/**
 * Patch the program to the '1202 program alarm' state 
 */
function gravityAssistPatch(program) {
	program[1] = 12;
	program[2] = 2; 
}

// Get the program array from the input
let program = input.split(",");
console.log("Starting program state:");
console.log(program);

// throw '';

// Initialize the pointer
var pointer = 0;
var cur = 1;

// Run the patch
gravityAssistPatch(program);

// Execute the program (with infinite loop protection)
while (pointer <= program.length) {
	// process the opcode segment
	var halt = processOpCode(pointer, program);

	// Stop execution if halt is reached.
	if (halt) { break; }

	// Verify the new program state
	console.log("Program state, iteration " + cur + ": ");
	console.log(program);

	// Move the pointer to the next opcode
	pointer += 4;
	console.log("New pointer: " + pointer);
	
	// iterate
	cur++;
}

// Advent 2.1 answer:
console.log("Advent 2.1 answer: " + program[0]);