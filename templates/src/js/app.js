function App() {
}

function Model() {
}

function View() {
}

function Controller() {
}

function setupCalendar($) {
  $(document).ready(function() {
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
      $('#calendar').fullCalendar({events: result.events});
      $('#tmpl-adspot').tmpl({adSpots: result.adSpots}).appendTo('#side-nav');
    }).getAdSpotCalendar();
  });
}
