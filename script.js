function make_lines() {
    let angle_list = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
    let original = document.getElementById('original-line');
    let line_container = document.getElementById('line-container')
    for (var angle of angle_list) {
        let new_line = $.extend(true, {}, original).setAttribute("transform", `rotate(${angle})`)
        document.line_container.appendChild(new_line)
    }
}