class UnitCircle {
    constructor() {
        this.radians = document.getElementById("rad");
        this.radians.checked = true;
        this.degrees = document.getElementById("deg");
        this.degrees.checked = false;
        this.positive = document.getElementById("pos");
        this.positive.checked = true;
        this.negative = document.getElementById("neg");
        this.negative.checked = false;
        this.simple = document.getElementById("simple");
        this.simple.checked = true;
        this.complex = document.getElementById("complex");
        this.complex.checked = false;

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

        this.deg_array = Object.keys(this.deg_to_rad);
        this.rad_array = Object.values(this.deg_to_rad)
    }
}

class History {
    constructor() {
        this.question_list = document.getElementById("question-list");
        this.answers = [];
    }

    addQuestion(question, answer) {
        let newQuestion = document.createElement("li");
        const text = document.createTextNode(`${question}`);
        newQuestion.appendChild(text);
        this.question_list.appendChild(newQuestion);
        this.answers.append(answer)
    }

    showAnswerToolTip() {

    }
}

class Question {
    constructor() {
        this.unit_circle = new UnitCircle();
        this.history = new History()

        this.norm_answer_choices = ["√3/2", "√2/2", "1/2"];
        this.tan_answer_choices = ["√3/3", "1", "√3"];
        this.extreme_norm_answer_choices = ["1", "0"];
        this.extreme_tan_answer_choices = ["0", "Undefined"];

        this.extreme_possibilites = ["0", "90", "180", "270", "360", "π/2", "π", "3π/2", "2π"];
        this.stems = ["cos", "sin", "tan", "sec", "csc", "cot"];
        this.pick_list = [];

        this.total_count = 0;
        this.correct_count = 0;

        this.submitted = false;
        this.hintActive = false;
        this.hintUsed = false;

        this.current_question = [];
        this.current_answer_choices = [];
        this.correct_answer = this.generateQuestion();
        this.updateUI();
        this.checkEvents();
    }

    generateQuestion() {
        this.total_count += 1;
        this.submitted = false;
        this.generateQuestionSettings();
        this.current_answer_choices = this.generateAnswerChoices();
        let xy_key = null;

        if (this.current_question[1].includes("π")) {
            const ind = this.unit_circle.rad_array.indexOf(this.current_question[1]);
            xy_key = this.unit_circle.deg_array[ind];
        } else {
            xy_key = this.current_question[1];
        }

        console.log(`xykey: ${xy_key}`)
        this.correct_answer = this.unit_circle.xy_pts[`${xy_key}`][this.stems.indexOf(this.current_question[0])];

        // add correct answer that looks like a tool tip when hovering history question
        console.log(`actual answer: ${this.correct_answer}`)

        if (!this.current_answer_choices.includes(this.correct_answer)){
            this.correct_answer = this.current_answer_choices.slice(-1)[0]
            console.log(`answer is "None of the Above"`)
        }

        return this.correct_answer
    }

    generateQuestionSettings() {
        let stem_choices = [];
        let rad_deg = [];

        if (this.unit_circle.simple.checked && !this.unit_circle.complex.checked) {
            stem_choices = this.stems.slice(0,3);
        } else if (this.unit_circle.complex.checked && !this.unit_circle.simple.checked) {
            stem_choices = this.stems.slice(3, -1);
        } else {
            stem_choices = this.stems.slice();
        }
        
        rad_deg = [this.unit_circle.rad_array, this.unit_circle.deg_array].random();
        if (this.unit_circle.radians.checked && !this.unit_circle.degrees.checked) {
            rad_deg = this.unit_circle.rad_array;
        } else if (this.unit_circle.degrees.checked && !this.unit_circle.radians.checked) {
            rad_deg = this.unit_circle.deg_array;
        } else {
            rad_deg = [this.unit_circle.rad_array, this.unit_circle.deg_array].random();
        }

        this.current_question = [stem_choices.random(), rad_deg.random()];
        
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
            let pick = og.random();
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

    generateHint() {
        
    }

    checkAnswer() {
        const chosenAnswer = document.getElementsByClassName("chosen-answer-choice")[0];
        if (chosenAnswer.innerHTML === this.correct_answer){
            chosenAnswer.style.border = "3px solid rgb(79, 111, 82)";
            chosenAnswer.style.backgroundColor = "rgb(169, 179, 136)";
            this.correct_count += 1;
        } else {
            const ansChoices = document.getElementsByClassName("answer-choice");
            for (const ansChoice of ansChoices) {
                console.log(typeof this.correct_answer)
                if (ansChoice.innerHTML === this.correct_answer) {
                    ansChoice.style.border = "3px solid rgb(79, 111, 82)";
                    ansChoice.style.backgroundColor = "rgb(169, 179, 136)";
                    
                    chosenAnswer.style.border = "3px solid rgb(183, 66, 66)";
                    chosenAnswer.style.backgroundColor = "rgb(234, 115, 98)";
                }
            }
        }
    }

    answerChoiceClicked(event) {
        let allChosen = document.getElementsByClassName("chosen-answer-choice");
        if (allChosen[0]) {
            allChosen[0].classList.remove("chosen-answer-choice");
        }
        event.target.classList.add("chosen-answer-choice");
    }

    checkEvents() {
        const submit = document.getElementById("submit-button");
        this.submitClicked = (event) => {
            this.submitted = true;
            console.log("submit was clicked!")
            const next = document.getElementById("next-button");
            next.style.opacity = "100";
            next.style.cursor = "pointer";
            event.target.style.opacity = "50%";
            event.target.style.cursor = "not-allowed";

            this.checkAnswer();
        }
        submit.addEventListener("click", this.submitClicked);

        const hint = document.getElementById("hint-button");
        const hintContainer = document.getElementById("hint");
        hintContainer.style.display = "none";
        this.hintClicked = (event) => {
            this.hintUsed = true;
            this.hintActive = !this.hintActive;
            console.log("Hint was clicked")
            if (this.hintActive) {
                console.log("hint showing")
                hintContainer.style.display = "flex";
                hintContainer.style.opacity = "100%";
            } else {
                console.log("hint hiding")
                hintContainer.style.display = "none";
                hintContainer.style.opacity = "0";
            }
        }
        hint.addEventListener("click", this.hintClicked);

        const close_hint_btn = document.getElementById("x-hint-btn");
        this.close_hint = (event) => {
            this.hintActive = false;
            hintContainer.style.display = "none";
        }
        close_hint_btn.addEventListener("click", this.close_hint);

        for (const ansChoice of document.getElementsByClassName("answer-choice")) {
            ansChoice.addEventListener("click", this.answerChoiceClicked)
        }

        const next = document.getElementById("next-button");
        this.launchNextQuestion = (event) => {

        }
        next.addEventListener("click", this.launchNextQuestion);

    }

    updateUI() {
        document.getElementById("question").innerHTML = `${this.current_question[0]}(${this.current_question[1]})?`;
        for (const [index, ans] of this.current_answer_choices.entries()) {
            document.getElementById(`a${index + 1}`).innerHTML = ans;
        }
    }
}

Array.prototype.random = function() {
    return this[Math.floor((Math.random()*this.length))]
}

let application = new Question;