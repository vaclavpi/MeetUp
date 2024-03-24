var events = [];

function addEvent() {
    var eventName = document.getElementById("event-name").value;
    var eventDate = document.getElementById("event-date").value;

    if(eventName && eventDate) {
        var event = { name: eventName, date: eventDate, times: [] };
        events.push(event);
        renderEvents();
    } else {
        alert("Please enter event name and date.");
    }
}

function renderEvents() {
    var eventList = document.getElementById("event-list");
    eventList.innerHTML = "";

    events.forEach(function(event, index) {
        var eventDiv = document.createElement("div");
        eventDiv.textContent = event.name + " - " + event.date;
        
        var timeInput = document.createElement("input");
        timeInput.type = "time";
        var addTimeButton = document.createElement("button");
        addTimeButton.textContent = "Add Time";
        addTimeButton.onclick = function() {
            addTime(event, timeInput.value);
        };

        var timeList = document.createElement("ul");
        event.times.forEach(function(time) {
            var timeItem = document.createElement("li");
            timeItem.textContent = time;
            timeList.appendChild(timeItem);
        });

        eventDiv.appendChild(timeInput);
        eventDiv.appendChild(addTimeButton);
        eventDiv.appendChild(timeList);

        eventList.appendChild(eventDiv);
    });
}

function addTime(event, time) {
    if(time) {
        event.times.push(time);
        renderEvents();
    }
}
