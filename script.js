const lines = [];
const angles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];

function make_lines(line_list, angle_list) {
    let original_line = document.getElementById('original-line');
    for (const angle of angle_list) {
        var new_line = $.extend(true, {}, original_line);
        new_line.setAttribute("transform", "rotate(${angle})");
        line_list.push(new_line);
    }
}

// function draw_lines_to_doc(line_list) {
//     for (const line of line_list) {

//     }
// }

make_lines(lines, angles);
console.log("hello world")