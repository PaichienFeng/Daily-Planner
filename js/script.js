$(function () {
    $("#currentDay").text(dayjs().format("dddd, MMM D, YYYY"));
  
    for (let hour = 9; hour <= 17; hour++) {
      
      const newRow = $("<div>").addClass("row time-block");

      let hourColumn;
      if (hour === 12) {
        hourColumn = $("<div>").addClass("col-1 hour").text(hour + "PM")
      } else if (hour >=12) {
        hourColumn = $("<div>").addClass("col-1 hour").text(hour-12 + "PM")
      } else {
        hourColumn = $("<div>").addClass("col-1 hour").text(hour + "AM")
      }
  
      const descriptionColumn = $("<textarea>").addClass("col-10 description");
  

      if (hour < dayjs().hour()) {
        descriptionColumn.addClass("past");
      } else if (hour === dayjs().hour()) {
        descriptionColumn.addClass("present");
      } else {
        descriptionColumn.addClass("future");
      }

      const savedEvent = localStorage.getItem(dayjs().format("YYYY-MM-DD") + "-" + hour);
      if (savedEvent) {
        descriptionColumn.val(savedEvent);
      }; 
     
  

      const saveButtonColumn = $("<button>").addClass("col-1 saveBtn btn btn-primary").attr("data-time", hour).text("Save");
  
      newRow.append(hourColumn, descriptionColumn, saveButtonColumn);
  
      $(".container").append(newRow);

    }
    
  
    $(".saveBtn").on("click", function (e) {
      const hour = $(e.target).attr("data-time");
      const description = $(e.target).siblings(".description").val();
      localStorage.setItem(dayjs().format("YYYY-MM-DD") + "-" + hour, description);
    });
   
  });
