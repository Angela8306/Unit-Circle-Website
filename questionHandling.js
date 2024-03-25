import random from 'random'

class UnitCircle {
    constructor(radians, degrees, positive, negative, simple, complex) {
        this.radians = true;
        this.degrees = false;
        this.positive = true;
        this.negative = false;
        this.simple = true;
        this.complex = false;
        this.deg_to_rad = {
            "0" : "0",
            "30" : "π/6",
            "45" : "π/4",
            "60" : "π/3",
            "90" : "π/2",
            "120" : "2π/3",
            "135" : "3π/4",
            "150" : "5π/6",
            "180" : "π",
            "210" : "7π/6",
            "225" : "5π/4",
            "240" : "4π/3",
            "270" : "3π/2",
            "300" : "5π/3",
            "315" : "7π/4",
            "330" : "11π/6",
            "360" : "2π"
        }

        this.xy_pts = {
            "0" : ["1", "0", "0"],
            "30" : ["√3/2", "1/2", "√3/3"],
            "45" : ["√2/2", "√2/2", "1"],
            "60" : ["1/2", "√3/2", "√3"],
            "90" : ["0", "1", "Undefined"],
            "120" : ["-1/2", "√3/2", "-√3"],
            "135" : ["-√2/2", "√2/2", "-1"],
            "150" : ["-√3/2", "1/2", "-√3/3"],
            "180" : ["-1", "0", "0"],
            "210" : ["-√3/2", "-1/2", "√3/3"],
            "225" : ["-√2/2", "-√2/2", "1"],
            "240" : ["-1/2", "-√3/2", "√3"],
            "270" : ["0", "-1", "Undefined"],
            "300" : ["1/2", "-√3/2", "-√3"],
            "315" : ["√2/2", "-√2/2", "-1"],
            "330" : ["√3/2", "-1/2", "-√3/3"],
            "360" : ["1", "0", "0"]
        };
    }
}

class Question {
    constructor(unit_circle) {
        this.unit_circle = unit_circle;
        this.current_question = [];
        this.current_answer_choices = [];
        this.norm_answer_choices = ["√3/2", "√2/2", "1/2"];
        this.tan_answer_choices = ["√3/3", "1", "√3"];
        this.extreme_norm_answer_choices = ["1", "0"];
        this.extreme_tan_answer_choices = ["0", "Undefined"];

        this.extreme_possibilites = ["0", "90", "180", "270", "360", "π/2", "π", "3π/2", "2π"];
        this.stems = ["cos", "sin", "tan", "sec", "csc", "cot"];
        this.pick_list = [];

        this.total_count = 0;
        this.correct_count = 0;
    }

    generateQuestion() {
        this.total_count += 1;
        this.generateQuestionSettings();
        this.current_answer_choices = this.generateAnswerChoices();

        if (this.current_question[1].includes("π")) {
            
        }
    }

    generateQuestionSettings() {
        let stem_choices = [];
        let rad_deg = [];

        if (this.unit_circle.simple && !this.unit_circle.complex) {
            stem_choices = this.stems.slice(0,3);
        } else if (this.unit_circle.complex && !this.unit_circle.simple) {
            stem_choices = this.stems.slice(3, -1);
        } else {
            stem_choices = this.stems.slice();
        }

        if (this.unit_circle.radians && !this.unit_circle.degrees) {
            rad_deg = this.unit_circle.radians;
        } else if (this.unit_circle.degrees && !this.unit_circle.radians) {
            rad_deg = this.unit_circle.degrees;
        } else {
            rad_deg = random.choice([this.unit_circle.radians, this.unit_circle.degrees]);
        }

        this.current_question = [random.choice(stem_choices), random.choice(rad_deg)];
        
        if (this.current_question[0] === "tan") {
            this.pick_list = this.tan_answer_choices;
            if (this.extreme_possibilites.includes(this.current_question[1])) {
                this.pick_list = this.extreme_tan_answer_choices;
            }
        } else if (this.current_question[0] === "sin" || this.current_question[0] === "cos") {
            this.pick_list = this.norm_answer_choices;
            if (this.extreme_possibilites.includes(this.current_question[1])) {
                this.pick_list = this.extreme_norm_answer_choices;
            }
        }
    }

    generateAnswerChoices() {
        let og = this.pick_list.slice();
        let choices = [];
        for (let i = 0; i < 2; i++) {
            let pick = random.choice(og);
            choices.push(pick);
            let ind = og.indexOf(pick);
            if (ind > -1) {
                og.splice(ind, 1);
            }
            choices.push("-" + pick);
        }
        choices.push("None of the Above")
        return choices;
    }
}