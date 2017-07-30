function App() {
  this.eventSources = {};
}

App.prototype.setUp = function($) {
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    timeFormat: 'HH:mm',
    timezone: 'local',
    navLinks: true,
    eventTextColor: '#000',
    eventLimit: true,
    eventAfterRender: function(event, element) {
      var start = moment(event.start).format('M/D HH:mm');
      var end = moment(event.end).format('M/D HH:mm');
      element.qtip({
        content: {
          title: event.title,
          text: '期間: ' + start + ' - ' + end
        },
        position: {
          at: 'center left',
        },
      });
    }
  });

  google.script.run.withSuccessHandler(function(result) {
    app.eventSources = result;
  }).getEventSources();

  $('#adspot input').click(function() {
    if ($(this).prop('checked')) {
      var eventSource = app.eventSources[$(this).val()];
      $('#calendar').fullCalendar('addEventSource', eventSource);
    } else {
      $('#calendar').fullCalendar('removeEventSource', $(this).val());
    }
  });

  $('#toggle-all-event').click(function() {
    $('#calendar').fullCalendar('option', 'eventLimit', !$(this).prop('checked'));
  });
}

// @global
var app = new App();
