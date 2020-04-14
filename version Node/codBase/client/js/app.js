
  class EventManager{
    constructor() {
        this.urlBase = "api/events"
        this.inicializarFormulario()
        this.obtenerDataInicial()
        this.guardarEvento()
    }

    //para obtener la data inicial y pasarsela al calendario.
    obtenerDataInicial() {
        let url = this.urlBase+'/all'
        $.ajax({
          url: url,
          dataType: "json",
          cache: false,
          processData: false,
          contentType: false,
          type: 'GET',
          success: (data) =>{
            if (data.msg=='Todos los eventos') {
              this.inicializarCalendario(data.events)
              //console.log(data.eventos);
            }else {
              alert(data.msg)
              //window.location.href = 'index.html';
            }
          },
          error: function(){
            alert("error en la comunicación con el servidor");
          }
        })
    }

    //para iniciar el calendario
    inicializarCalendario(eventos) {
      $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2020-04-15',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (updateEvent) => {
                this.actualizarEvento(updateEvent)
            },
            eventResize: (updateEvent) => {
                //this.actualizarEvento(updateEvent)
            },
            events: eventos,
            eventDragStart: (event, jsEvent) => {
                $('.delete').find('img').attr('src', "img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (deleteEvent, jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(deleteEvent)
                        $('.calendario').fullCalendar('removeEvents', deleteEvent._id);
                        $('.delete').find('img').attr('src', "img/delete.png");
                    }
                }
            })
    }

    //para inicar el formulario
    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    //metodo para guardar
    guardarEvento() {
        $('.addButton').on('click', (e) => {
            e.preventDefault()
            let title = $('#titulo').val();
            let start = $('#start_date').val();
            let end = '';
            let start_hour = '';
            let end_hour = '';
            let all_day = 1;

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                all_day = 0;
            }
            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                let newEvent = {
                    title: title,
                    start: start,
                    hour_start: start_hour,
                    end: end,
                    hour_end: end_hour,
                    all_day: all_day
                }
                $.post(url, newEvent, (res) => {
                  alert(res.msg)
                  if(res.msg == 'Evento creado exitosamente'){
                    console.log(res.event)
                    $('.calendario').fullCalendar('renderEvent', newEvent)
                  }
                })
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    //para actualizar un evento.
    actualizarEvento(evento){
      let id = evento._id;
      let start = moment(evento.start).format('YYYY-MM-DD');
      let end = moment(evento.end).format('YYYY-MM-DD');
      let updateEvent ={
        id: id,
        start: start,
        end: end
      }
      let url = this.urlBase+'/update';
      //console.log(updateEvent)
      $.post(url, updateEvent, (res)=>{
        alert(res.msg)
      })
    }

    //para eliminar un evento
    eliminarEvento(evento) {
      let eventId = evento._id;
      let url = this.urlBase+'/delete';
      //console.log(eventId)
      $.post(url, {id: eventId}, (res) => {
          alert(res.msg)
      })
    }

  }//fin de la clase

  /*
  **  inicializar el main
  */
  $(document).ready(function(){
    const Manager = new EventManager();
    Manager.obtenerDataInicial();
  })
