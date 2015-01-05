var Jog = require('./jog')

module.exports.createStats = function(jogs){
  var weeks = [];
  for(var i = 0; i < jogs.length; i++){
    var jog = jogs[i];
    var date = jog.get("date");
    var week = this.findWeek(weeks, date);
    if(week == null){
      week = this.createWeek(date);
      weeks[weeks.length] = week;
    }

    week.distance += jog.distance;
    week.time += jog.time;
    week.jogs++;
  }
  return weeks;
}

exports.findWeek = function(weeks, date){
  for(var i = 0; i < weeks.length; ++i){
    var week = weeks[i];
    if(date >= week.startDate && date <= week.endDate){
      return week;
    }
  }
  return null;
}

exports.createWeek = function(date){
  var weekDates = this.weekDates(date);
  var week = {
    startDate: weekDates[0],
    endDate: weekDates[1],
    distance: 0,
    time: 0,
    jogs: 0
  };
  return week;
}

exports.weekDates = function(date){
  var now = new Date(date);

  // get the previous monday
  var monday = new Date(now);
  monday.setDate(monday.getDate() - monday.getDay() + 1);
  monday.setHours(0,0,0,0);

  // get next sunday
  var sunday = new Date(now);
  sunday.setDate(sunday.getDate() - sunday.getDay() + 7);
  sunday.setHours(23, 59, 59, 999);

  return [monday, sunday];
}
