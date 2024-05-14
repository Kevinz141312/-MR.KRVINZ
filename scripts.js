var li_items = document.querySelectorAll(".side_bar_bottom ul li");
var side_bar_menu = document.querySelector(".side_bar_menu");
var wrapper = document.querySelector(".wrapper");
const newTaskInput = document.querySelector("#new-task input");
const tasksDiv = document.querySelector("#tasks");
let deleteTasks, editTasks, tasks;
let updateNote = "";
let count;

li_items.forEach(function(li_main){
	li_main.addEventListener("click", function(){
		li_items.forEach(function(li){
			li.classList.remove("active");
		})
		li_main.classList.add("active");
	})
})

side_bar_menu.addEventListener("click", function(){
	wrapper.classList.toggle("active");
});

window.onload = () => {
	updateNote = "";
	count = Object.keys(localStorage).length;
	displayTasks();
  };
  //Function to Display The Tasks
  const displayTasks = () => {
	if (Object.keys(localStorage).length > 0) {
	  tasksDiv.style.display = "inline-block";
	} else {
	  tasksDiv.style.display = "none";
	}
	//Clear the tasks
	tasksDiv.innerHTML = "";
	//Fetch All The Keys in local storage
	let tasks = Object.keys(localStorage);
	tasks = tasks.sort();
	for (let key of tasks) {
	  let classValue = "";
	  //Get all values
	  let value = localStorage.getItem(key);
	  let taskInnerDiv = document.createElement("div");
	  taskInnerDiv.classList.add("task");
	  taskInnerDiv.setAttribute("id", key);
	  taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;
	  //localstorage would store boolean as string so we parse it to boolean back
	  let editButton = document.createElement("button");
	  editButton.classList.add("edit");
	  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
	  if (!JSON.parse(value)) {
		editButton.style.visibility = "visible";
	  } else {
		editButton.style.visibility = "hidden";
		taskInnerDiv.classList.add("completed");
	  }
	  taskInnerDiv.appendChild(editButton);
	  taskInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-trash"></i></button>`;
	  tasksDiv.appendChild(taskInnerDiv);
	}
	//tasks completed
	tasks = document.querySelectorAll(".task");
	tasks.forEach((element, index) => {
	  element.onclick = () => {
		//local storage update
		if (element.classList.contains("completed")) {
		  updateStorage(element.id.split("_")[0], element.innerText, false);
		} else {
		  updateStorage(element.id.split("_")[0], element.innerText, true);
		}
	  };
	});
	//Edit Tasks
	editTasks = document.getElementsByClassName("edit");
	Array.from(editTasks).forEach((element, index) => {
	  element.addEventListener("click", (e) => {
		//Stop propogation to outer elements (if removed when we click delete eventually rhw click will move to parent)
		e.stopPropagation();
		//disable other edit buttons when one task is being edited
		disableButtons(true);
		//update input value and remove div
		let parent = element.parentElement;
		newTaskInput.value = parent.querySelector("#taskname").innerText;
		//set updateNote to the task that is being edited
		updateNote = parent.id;
		//remove task
		parent.remove();
	  });
	});
	//Delete Tasks
	deleteTasks = document.getElementsByClassName("delete");
	Array.from(deleteTasks).forEach((element, index) => {
	  element.addEventListener("click", (e) => {
		e.stopPropagation();
		//Delete from local storage and remove div
		let parent = element.parentElement;
		removeTask(parent.id);
		parent.remove();
		count -= 1;
	  });
	});
  };
  //Disable Edit Button
  const disableButtons = (bool) => {
	let editButtons = document.getElementsByClassName("edit");
	Array.from(editButtons).forEach((element) => {
	  element.disabled = bool;
	});
  };
  //Remove Task from local storage
  const removeTask = (taskValue) => {
	localStorage.removeItem(taskValue);
	displayTasks();
  };
  //Add tasks to local storage
  const updateStorage = (index, taskValue, completed) => {
	localStorage.setItem(`${index}_${taskValue}`, completed);
	displayTasks();
  };
  //Function To Add New Task
  document.querySelector("#push").addEventListener("click", () => {
	//Enable the edit button
	disableButtons(false);
	if (newTaskInput.value.length == 0) {
	  alert("Please Enter A Task");
	} else {
	  //Store locally and display from local storage
	  if (updateNote == "") {
		//new task
		updateStorage(count, newTaskInput.value, false);
	  } else {
		//update task
		let existingCount = updateNote.split("_")[0];
		removeTask(updateNote);
		updateStorage(existingCount, newTaskInput.value, false);
		updateNote = "";
	  }
	  count += 1;
	  newTaskInput.value = "";
	}
  });
  

  //declare variables we'll need
const alarmButton = document.querySelector(".btn-alarm");
const snoozeButton = document.querySelector(".btn-snooze");
const stopButton = document.querySelector(".btn-stopalarm");
const time = document.querySelector(".alarm-time");
const options = document.querySelector(".options");
const alarmSound = new Audio();

/* 
* I cannot guarantee this url
* will not change and break 
* the sound functionality. 
*/

alarmSound.src = "http://soundbible.com/mp3/Rooster-SoundBible.com-1114473528.mp3";
let alarmTimer;

// initially hides snooze and stop alarm options until they're useful
options.style.display = "none";

function setAlarm() {
  let ms =
    new Date().setHours(0, 0, 0, 0) +
    time.valueAsNumber;
  if (isNaN(ms)) {
    alert("You've got to give me something to work with here, friend.");
    return;
  }
  let alarm = new Date(ms);
  var dt = new Date().getTime();
  let differenceInMs = alarm.getTime() - dt;

  if (differenceInMs < 0) {
    alert(
      "It looks like that's a date from the past! Are you a time traveler?!"
    );
    return;
  }
  alarmTimer = setTimeout(initAlarm, differenceInMs);
  alarmButton.innerText = "Cancel Alarm";
  alarmButton.setAttribute("onclick", "cancelAlarm(this);");
  options.style.display = "";
}

function cancelAlarm() {
  clearTimeout(alarmTimer);
  alarmButton.innerText = "Set Alarm";
  alarmButton.setAttribute("onclick", "setAlarm(this);");
  options.style.display = "none";
}

function initAlarm() {
  alarmSound.play();
  alarmSound.loop = true;
  options.style.display = "";
}

function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  options.style.display = "none";
}

function snooze() {
  stopAlarm();
  setTimeout(initAlarm, 300000);
}

alarmButton.addEventListener("click", setAlarm, false);
snoozeButton.addEventListener("click", snooze, false);
stopButton.addEventListener("click", stopAlarm, false);

//#clock

const gnomeContainer = document.getElementById("metrognome");
const gnomeMouth = gnomeContainer.querySelector(".mouth");
const gnomeBeard = gnomeContainer.querySelector(".beard");
const gnomeStacheLeft = gnomeContainer.querySelector(".stache.left");
const gnomeStacheRight = gnomeContainer.querySelector(".stache.right");
const tempoSlider = document.getElementById("tempo");
const bpm = document.getElementById("bpm");
const playBtn = document.getElementById("play");
let isPlaying = false;
let metronomeStartTimer;

// Modified metronome code came from this great article by Grant James:
// https://grantjam.es/creating-a-simple-metronome-using-javascript-and-the-web-audio-api
class Metronome {
  constructor(tempo = 120, beatsPerMeasure = 4) {
    this.audioContext = null;
    this.notesInQueue = [];
    this.currentQuarterNote = 0;
    this.tempo = tempo;
    this.bpm = beatsPerMeasure;
    this.lookahead = 25;
    this.scheduleAheadTime = 0.1;
    this.nextNoteTime = 0.0;
    this.isRunning = false;
    this.intervalID = null;
  }

  nextNote() {
    var secondsPerBeat = 60 / this.tempo;
    this.nextNoteTime += secondsPerBeat;

    this.currentQuarterNote++;
    animSwing.duration(secondsPerBeat);
    animTalk.duration(secondsPerBeat / 2);

    if (this.currentQuarterNote == this.bpm) {
      this.currentQuarterNote = 0;
    }
  }

  scheduleNote(beatNumber, time) {
    this.notesInQueue.push({ note: beatNumber, time: time });

    const osc = this.audioContext.createOscillator();
    const envelope = this.audioContext.createGain();

    osc.frequency.value = beatNumber % this.bpm == 0 ? 800 : 600;
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.01);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(envelope);
    envelope.connect(this.audioContext.destination);

    osc.start(time);
    osc.stop(time + 0.03);
  }

  scheduler() {
    while (
      this.nextNoteTime <
      this.audioContext.currentTime + this.scheduleAheadTime
    ) {
      this.scheduleNote(this.currentQuarterNote, this.nextNoteTime);
      this.nextNote();
    }
  }

  start() {
    if (this.isRunning) return;

    if (this.audioContext == null) {
      this.audioContext = new window.AudioContext();
    }

    this.isRunning = true;
    this.currentQuarterNote = 0;
    this.nextNoteTime = this.audioContext.currentTime + 0.05;
    this.intervalID = setInterval(() => this.scheduler(), this.lookahead);
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.intervalID);
  }
}

const metronome = new Metronome();
const startupDuration = 600;
const rotationDeg = 25;

const animStart = gsap
  .timeline({
    paused: true
  })
  .to(gnomeContainer, {
    rotate: rotationDeg * -1,
    ease: "back.in(2)",
    duration: startupDuration / 1000,
    onComplete: () => {
      animSwing.restart();
      animTalk.restart();
    }
  })
  .to(
    gnomeStacheLeft,
    {
      rotate: -10
    },
    "<"
  )
  .to(
    gnomeStacheRight,
    {
      rotate: 10
    },
    "<"
  );

const animStop = gsap
  .timeline({ paused: true })
  .to(gnomeContainer, {
    rotate: 0,
    ease: "elastic.out(1, 0.3)",
    duration: 1.4
  })
  .to(
    gnomeMouth,
    {
      scaleX: 0,
      scaleY: 0,
      duration: 0.2
    },
    "<"
  )
  .to(
    [gnomeStacheLeft, gnomeStacheRight],
    {
      rotate: 0
    },
    "<"
  );

const animSwing = gsap
  .timeline({
    repeat: -1,
    yoyo: true,
    paused: true
  })
  .fromTo(
    gnomeContainer,
    { rotate: rotationDeg * -1 },
    {
      rotate: rotationDeg,
      ease: "linear",
      immediateRender: false,
      onStart: () => animTalk.restart()
    }
  );

const animTalk = gsap
  .timeline({
    repeat: -1,
    yoyo: true,
    paused: true
  })
  .fromTo(
    gnomeMouth,
    { scaleX: 1, scaleY: 1 },
    {
      scaleX: 1,
      scaleY: 0,
      ease: "expo.out",
      immediateRender: false
    }
  )
  .fromTo(
    gnomeStacheLeft,
    { rotate: -10 },
    {
      rotate: 0,
      ease: "sine.in",
      immediateRender: false
    },
    "<"
  )
  .fromTo(
    gnomeStacheRight,
    { rotate: 10 },
    {
      rotate: 0,
      ease: "sine.in",
      immediateRender: false
    },
    "<"
  );

tempoSlider.addEventListener("input", () => {
  bpm.textContent = tempo.value;
  metronome.tempo = tempo.value;
});

function play() {
  isPlaying = true;
  playBtn.textContent = "Pause";
  animStop.invalidate().pause();
  animStart.restart();
  metronomeStartTimer = setTimeout(() => metronome.start(), startupDuration);
}

function pause() {
  isPlaying = false;
  clearTimeout(metronomeStartTimer);
  playBtn.textContent = "Play";
  animTalk.invalidate().pause();
  animSwing.invalidate().pause();
  animStart.invalidate().pause();
  animStop.restart();
  metronome.stop();
}

playBtn.addEventListener("click", () => (isPlaying ? pause() : play()));