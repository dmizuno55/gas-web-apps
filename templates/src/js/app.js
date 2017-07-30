function App() {
  this.eventSources = {};
  this.searchPattern = null;
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
    eventRender: function(event, element, view) {
      if (this.searchPattern === null) {
        return true;
      }

      return this.searchPattern.test(event.title);
    },
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

  var self = this;

  google.script.run.withSuccessHandler(function(result) {
    self.eventSources = result;
  }).getEventSources();

  $('.js-adspot').click(function() {
    if ($(this).prop('checked')) {
      var eventSource = self.eventSources[$(this).val()];
      $('#calendar').fullCalendar('addEventSource', eventSource);
    } else {
      $('#calendar').fullCalendar('removeEventSource', $(this).val());
    }
  });

  $('#js-toggle-all').click(function() {
    $('#calendar').fullCalendar('option', 'eventLimit', !$(this).prop('checked'));
  });

  $('#js-search-button').click(function() {
    var searchText = $('#js-search-text').val();
    self.searchPattern = new RegExp(searchText);
    $('#calendar').fullCalendar('rerenderEvents');
  });
}

// @global
var app = new App();
