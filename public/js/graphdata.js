
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
        var data = JSON.parse(this.response)
        students = data.totalstudents;
        bikeracks = data.totalracks;
        console.log(students, bikeracks);
        document.getElementsByClassName("number").item(0).innerHTML = students;
        document.getElementsByClassName("number").item(1).innerHTML = bikeracks;
        // return field1;
      //   data.forEach(movie => {
      //   console.log(movie.title)
      // })

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
      let data = JSON.parse(this.response);
      let students = data.studentsList;
      let dates = data.datelist;
      let day = [];
      weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      for (var i = 0; i <= dates.length - 1; i++) {
        let d= new Date(dates[i])
        day.push(weekday[d.getDay()]);

      }
      var ctx = document.getElementById("widgetChart5");
      getTotalStudentsPerWeek(students, route);
      drawChart(ctx, day, students);
    }
    else{
      console.log("Error");
    }
  }
xhttp.send();
}


function drawChart(ctx, week, students){
try {
    //WidgetChart 5
    if (ctx) {
      ctx.height = 220;
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          // labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          labels: week,
          datasets: [
            {
              label: "Students",
              // data [10, 20, 30, 40, 50, 60, 70],
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
              display: false,
              categoryPercentage: 1,
              barPercentage: 0.65
            }],
            yAxes: [{
              display: false
            }]
          }
        }
      });
    }

  } catch (error) {
    console.log(error);
  }
}

// getWeeklyRouteData();
// getTotalStudentsPerWeek();

function getTotalStudentsPerWeek(students, route){

  let totalstudents = 0
  for (var i = 0; i<=students.length - 1; i++) {
    totalstudents = totalstudents + students[i];
  }
  var ctx = document.getElementById("widgetChartStudents");
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
              display: false,
              categoryPercentage: 0.5,
              barPercentage: 0.65
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      });
    }

  } catch (error) {
    console.log(error);
  }
}

function createTable(){
  var xhttp = new XMLHttpRequest();
  var route = document.getElementById("dropdown2").value;
  var time = document.getElementById("dropdown3").value;
  // console.log(route);
  xhttp.open("GET", "https://us-central1-transitapp-d5956.cloudfunctions.net/api/testing", true);
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      var response = xhttp.responseText;
      var data = JSON.parse(this.response);

      var table = document.getElementById("table1");
      var row = table.insertRow(3);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      cell1.innerHTML = "5/9/2019";
      cell2.innerHTML = "Thursday";
      cell3.innerHTML = "7:30";
      cell4.innerHTML = "John";
      cell5.innerHTML = "112";
      cell6.innerHTML = "50";
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


