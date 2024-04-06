document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('simulationCanvas');
    var ctx = canvas.getContext('2d');
    var numAtoms = 10;
    var atoms = [];
    var bondThreshold = 30; // Pixels

    function initializeAtoms() {
        atoms = []; // Reset the atom array
        numAtoms = document.getElementById('numAtomsInput').value; // Update numAtoms based on input
        // Initialize atoms with random positions
        for (let i = 0; i < numAtoms; i++) {
            atoms.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            });
        }
    }

    window.restartSimulation = function() {
        initializeAtoms();
        draw();
    };

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        
        // Draw atoms
        atoms.forEach(atom => {
            ctx.beginPath();
            ctx.arc(atom.x, atom.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Simplified van der Waals thresholds
var minBondDistance = 20; // Minimum distance for bonding
var maxBondDistance = 30; // Maximum distance for bonding


        // Check for bonds and draw them
for (let i = 0; i < numAtoms; i++) {
    for (let j = i + 1; j < numAtoms; j++) {
        var dx = atoms[i].x - atoms[j].x;
        var dy = atoms[i].y - atoms[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        // Check if the distance falls within the van der Waals attraction range
        if (distance >= minBondDistance && distance <= maxBondDistance) {
            // Draw a line between atoms i and j to represent a bond
            ctx.beginPath();
            ctx.moveTo(atoms[i].x, atoms[i].y);
            ctx.lineTo(atoms[j].x, atoms[j].y);
            ctx.stroke();
        }
    }
}


         // Randomly move atoms in a more controlled random walk manner
         atoms.forEach(atom => {
            let stepSize = 2; // Control step size for the random walk
            let stepAngle = Math.random() * 2 * Math.PI; // Random angle in radians
            atom.x += stepSize * Math.cos(stepAngle);
            atom.y += stepSize * Math.sin(stepAngle);
        });

        requestAnimationFrame(draw); // Call draw again for the next frame
    }

    initializeAtoms(); // Initialize atoms for the first run
    draw(); // Start the simulation
});