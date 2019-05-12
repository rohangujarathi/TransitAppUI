
function getRoutes(){
  let routes = [];
  xhttp.open("GET", "https://us-central1-transitapp-d5956.cloudfunctions.net/api/getAllRoutes/Spring2019", true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = xhttp.responseText;
        var data = JSON.parse(this.response)
        console.log(data);
        for(var k in routes){
          routes.push(k);
        };
        return routes;

    } else {
        console.log("Error")
    }
  };
  xhttp.send();
}



function getMonthlyStudentsData(){

  var students, bikeracks;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://us-central1-transitapp-d5956.cloudfunctions.net/api/monthlystudents", true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = xhttp.responseText;
        if(response=="No docs found"){
          return;
        }
        console.log(response);
        var data = JSON.parse(this.response)
        students = data.totalstudents;
        bikeracks = data.totalracks;
        console.log(students, bikeracks);
        document.getElementsByClassName("number").item(0).innerHTML = students;
        document.getElementsByClassName("number").item(1).innerHTML = bikeracks;

    } else {
        console.log("Error");
    }
  };
  
  xhttp.send();
  
}
getMonthlyStudentsData();


function getPreInspectionIssues(){
  var xhttp = new XMLHttpRequest();
  var preInspectionIssuesissues;
  xhttp.open("GET", "https://us-central1-transitapp-d5956.cloudfunctions.net/api/preInspectionIssues", true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var preInspectionIssues = xhttp.responseText;
        console.log(preInspectionIssues);
        // return preInspectionIssues;
        document.getElementsByClassName("number").item(2).innerHTML = preInspectionIssues;
    } else {
        console.log("Error")
    }
  };
  xhttp.send();
}


function getPostInspectionIssues(){
  var xhttp = new XMLHttpRequest();
  var postInspectionIssues;
  xhttp.open("GET", "https://us-central1-transitapp-d5956.cloudfunctions.net/api/postInspectionIssues", true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var postInspectionIssues = xhttp.responseText;
        console.log(postInspectionIssues);
        // return postInspectionIssues;
        document.getElementsByClassName("number").item(3).innerHTML = postInspectionIssues;
    } else {
        console.log("Error")
    }
  };
  xhttp.send();
}

getPreInspectionIssues();
getPostInspectionIssues();



function getWeeklyRouteData(){
  
  var xhttp = new XMLHttpRequest();
  var route = document.getElementById("dropdown1").value;
  
  xhttp.open("GET", "https://us-central1-transitapp-d5956.cloudfunctions.net/api/getweeklystudents/" + route, true);
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      let response = xhttp.responseText;
      console.log(response);
      if(response=="No trip docs found"){
        return;
      }
      let data = JSON.parse(this.response);
      let students = data.studentsList;
      let dates = data.datelist;
      // let day = [];
      let dict = {};
      weekday = ['Sun', 'Mon', 'Tu', 'Wed', 'Th', 'Fri', 'Sat'];
      for (var i = 0; i <= dates.length - 1; i++) {
        let d= new Date(dates[i])
        // day.push(weekday[d.getDay()]);
        let day = weekday[d.getDay()];
        if(day in dict){
          temp = dict[day];
          dict[day] = temp + students[i];
        }
        else{
          dict[day] = students[i];
        }
      }

      listStudents = []
      listDays = []
      for (var i in dict) {
        listDays.push(i);
        listStudents.push(dict[i]);
      }

      var ctx = document.getElementById("widgetChart5");
      if(oldchart){
        // console.log(oldchart)
        oldchart.destroy();
    }
      getTotalStudentsPerWeek(listStudents, route);
      drawChart(ctx, listDays, listStudents);
    }
    else{
      console.log("Error");
    }
  }
xhttp.send();
}

var oldchart;
var oldchart1;

function drawChart(ctx, week, students){
  try {

    // single bar chart
    // console.log(week);
    // console.log(students);
    if (ctx) {
      ctx.height = 220;
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: week,
          datasets: [
            {
              label: "Students",
              data: students,
              backgroundColor: "#ccc"
            }
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontFamily: 'Poppins'
            }

          },
          scales: {
            xAxes: [{
              ticks: {
                fontFamily: "Poppins"
              },
              display: true
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontFamily: "Poppins",
              },
              display: true
            }]
          }
        }
      });
    }
  oldchart = myChart;
  } catch (error) {
    console.log(error);
  }
}



function getTotalStudentsPerWeek(students, route){

  let totalstudents = 0
  for (var i = 0; i<=students.length - 1; i++) {
    totalstudents = totalstudents + students[i];
  }
  var ctx = document.getElementById("widgetChartStudents");
  if(oldchart1){
        // console.log(oldchart)
        oldchart1.destroy();
    }

  drawChartPerRoute(ctx, [totalstudents], [route]);

}

function drawChartPerRoute(ctx, students, route){
try {
    //WidgetChartStudenss
    
    if (ctx) {
      ctx.height = 220;
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: route,
          datasets: [
            {
              label: "Students",
              data: students,
              borderColor: "transparent",
              borderWidth: "0",
              backgroundColor: "#ccc",
            }
          ]
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true,
              categoryPercentage: 0.5,
              barPercentage: 0.65
            }],
            yAxes: [{
              display: false
            }]
          }
        }
      });
    }
    oldchart1 = myChart;

  } catch (error) {
    console.log(error);
  }
}

function createTable(){
  var xhttp = new XMLHttpRequest();
  var route = document.getElementById("dropdown2").value;
  var schedule = document.getElementById("dropdown3").value;
  let date = document.getElementById("date").value;
  // date = date.replace("/", "-");
  date = date.split("/").join("-");
  console.log(date, route, schedule);

  xhttp.open("GET", "https://us-central1-transitapp-d5956.cloudfunctions.net/api/getTableDetails/" + route +"/" + date + "/" + schedule, true);
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      var response = xhttp.responseText;
      if(response=="No trip docs found"){
        console.log(response);
        return;
      }
      var data = JSON.parse(this.response);
      console.log(data);
      let driverName = data['driver_name'];
      console.log(driverName);
      var table = document.getElementById("table1");

      for (var i = 0; i<=driverName.length - 1; i++) {
        // var row = table.insertRow(i);

        var row = table.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        cell1.innerHTML = data['driver_name'][i];
        cell2.innerHTML = data['bus_no'][i];
        cell3.innerHTML = data['trip_stop'][i];
        cell4.innerHTML = data['trip_students_arrived'][i];
        cell5.innerHTML = data['trip_students_departed'][i];
        cell6.innerHTML = data['trip_racks_unloaded'][i];
        cell7.innerHTML = data['driver_name'][i];
      }

      exportTableToExcel();
    }
    else{
      console.log("Error");
    }
  }
xhttp.send();
}

var tables;
function exportTableToExcel(){
  var table = document.getElementById("table1");
  TableExport.prototype.formatConfig.xls.buttonContent = "Export Data";
  if(tables){
    console.log(tables);
    tables.remove();
  }
  tables = $(table).tableExport({
    formats:["xls"],
    bootstrap: false,
    position: "top",
    headings: true,
    ignoreCSS: "tableexport-ignore" });  

}


$(document).ready(function(){
      var date_input=$('input[name="date"]'); //our date input has the name "date"
      var options={
        format: 'mm/dd/yyyy',
        // container: container,
        todayHighlight: true,
        autoclose: true,
      };
      date_input.datepicker(options);
    })


