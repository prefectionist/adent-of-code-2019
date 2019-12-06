let input = [
92903,
97793,
95910,
104540,
122569,
60424,
145155,
90081,
81893,
140366,
77358,
122977,
114868,
135274,
80770,
104328,
87475,
135948,
128585,
71353,
93571,
69870,
137262,
142606,
95397,
62517,
87269,
73336,
118502,
82894,
125097,
102311,
134164,
119828,
116181,
99303,
88937,
63418,
145060,
91014,
136031,
106000,
105084,
139280,
99775,
94626,
99081,
119824,
58232,
54759,
93633,
142621,
63718,
106439,
62425,
119965,
73033,
130019,
93223,
118848,
122769,
130704,
63418,
87205,
137230,
147960,
51051,
65279,
82183,
57705,
102519,
144031,
94413,
98485,
130646,
111400,
100503,
95963,
143785,
97857,
146611,
67684,
79662,
147350,
60427,
118683,
128729,
65014,
55844,
120846,
117969,
134494,
127003,
139614,
95021,
124970,
100680,
91622,
106898,
79702
];

function getFuelTotal(moduleMass) 
{
	fuelReq = Math.floor(moduleMass/3) - 2;
	return fuelReq;
} 

function getFuelTotalRecursive(fuel) 
{
	console.log("Iterative fuel requirement: " + fuel);

	// fuel required for arg fuel
	fuelReq = Math.floor(fuel/3) - 2;	
	
	if (fuelReq <= 0) {
		return fuel;
	} else {
		return fuel + getFuelTotalRecursive(fuelReq);
	}
}

let totalFuelPart1 = 0;
let totalFuelPart2 = 0;

input.forEach(function(moduleMass) {
	// Solving for Challenge 1.1
	console.log("moduleMass: " + moduleMass);
	let iterativeFuelReq = getFuelTotal(moduleMass);
	totalFuelPart1 += iterativeFuelReq;
	
	let totalModuleFuel = getFuelTotalRecursive(iterativeFuelReq);
	console.log('totalModuleFuel: ' + totalModuleFuel);
	totalFuelPart2 += totalModuleFuel;
});

// answer for Challenge 1.1
console.log("Challeng 1.1: " + totalFuelPart1);

// answer for Challenge 1.2
console.log("Challeng 1.2: " + totalFuelPart2);