const originalLine = document.getElementById("line-0");

const angles = [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

angles.forEach(makeLines) 

function makeLines(angle) {
    const newLine = originalLine.cloneNode(true);

    newLine.setAttribute("id", `line-${angle}`)

    newLine.setAttribute("transform", `rotate(${-angle} 250 250)`);

    newLine.setAttribute("style", "stroke: rgb(79, 111, 82); stroke-width: 1.5;");

    // Append the cloned line to the SVG container
    document.getElementById("line-container").appendChild(newLine);
    
};