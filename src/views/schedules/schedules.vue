
<template>
  <div id="home">
    <div>
      <LayoutNavbar />
    </div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="10" sm="10" md="10">
          <v-sheet height="64">
            <v-toolbar flat>
              <div class="my-2">
                <v-btn
                  class="addEvent"
                  @click="modalAddSchedules = true"
                  color="warning"
                  dark
                >
                  Reservar Sala
                </v-btn>
              </div>
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
              >
                Hoje
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right> mdi-menu-down </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Dia</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Semana</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Mês</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :weekdays="weekday"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateCalendar"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-btn icon @click="editReservation(selectedEvent)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>

                  <v-btn icon @click="deleteReservation(selectedEvent)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">
                    Cancelar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="dialogform" persistent max-width="600px">
          <v-card>
            <v-form @submit.prevent="ScheduleFormEdit()">
              <v-card-title>
                <span class="headline">{{ formdialog.title }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-textarea
                      name="description"
                      v-model="formdialog.description"
                      clearable
                      clear-icon="mdi-close-circle"
                      label="Descrição da Reserva"
                      :value="formdialog.description"
                    ></v-textarea>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogform = false">
                  Fechar
                </v-btn>
                <v-btn color="blue darken-1" text type="subimit">
                  {{ formdialog.title }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="modalAddSchedules" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Adicionar Reserva</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" lg="4">
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateFormatted"
                          label="Data"
                          hint="Datas Anteriores a hoje não serão aceitas"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          @blur="date = parseDate(dateFormatted)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                        @input="menu1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="formaddschedules.time"
                          label="Horário"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="formaddschedules.time"
                        full-width
                        @click:minute="$refs.menu.save(formaddschedules.time)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea
                      name="description"
                      clearable
                      clear-icon="mdi-close-circle"
                      label="Descrição da Reserva"
                      v-model="formaddschedules.description"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="modalAddSchedules = false"
              >
                Fechar
              </v-btn>
              <v-btn color="blue darken-1" text @click="addSchedules()">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <div class="text-center">
        <v-dialog v-model="loadingdialog" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              Por favor aguarde
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import LayoutNavbar from "@/components/schedules/LayoutNavBar";
export default {
  name: "schedules",
  components: {
    LayoutNavbar,
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("schedules", ["listSchedules"]),
    computedDateFormatted() {
      
      return this.formatDate(this.date);
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  data: (vm) => ({
    loadingdialog: false,
    time: null,
    menu3: false,
    modal2: false,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    focus: "",
    type: "month",
    weekday: [1, 2, 3, 4, 5],
    typeToLabel: {
      month: "Mês",
      week: "Semana",
      day: "Dia",
      "4day": "4 dias",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    details: [],
    colors: ["green", "red"],
    names: ["Disponivel", "Reservado"],
    dialogform: false,
    modalAddSchedules: false,
    formdialog: {
      title: "Reserva",
      description: "",
      id: "",
    },
    formaddschedules: {
      time: "",
      date: "",
      description: "",
      user_id: "",
    },
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.ActionShowSchedules();
    this.updateCalendar();
  },

  created() {
    this.ActionShowSchedules();
    this.updateCalendar();
  },
  methods: {
    ...mapActions("schedules", [
      "ActionShowSchedules",
      "ActionAddSchedules",
      "ActionEditSchedule",
      "ActionDeleteSchedule",
    ]),
     
    async ScheduleFormEdit() {

      this.loadingdialog = true;
      
      try {
        await this.ActionEditSchedule(this.formdialog);
        this.ActionShowSchedules();
        alert("Agendamento Alterado com Sucesso!");
        this.updateCalendar();
        this.dialogform = false;
        this.loadingdialog = false;
      } catch (err) {
        alert("Erro ao alterar Agendamento");
        this.loadingdialog = false;
      }
    },

    async deleteReservation(dataReservation) {
      this.loadingdialog = true;
      try {
        var validUser = this.validUser(dataReservation.user_id);
        if (validUser === true) {
          var confirmSchedule = confirm(
            "Tem certeza que quer excluir o agendamento ?"
          );

          if (confirmSchedule === true) {
            await this.ActionDeleteSchedule(dataReservation.id_schedules);

            this.ActionShowSchedules();
            alert("Deletado com Sucesso!");
            this.updateCalendar();
            this.loadingdialog = false;
          }
        } else {
           this.loadingdialog = false;
        }
      } catch (error) {
         this.loadingdialog = false;
        alert("Erro ao deletar");
      }
    },

    editReservation(dataReservation) {
      try {
        var validUser = this.validUser(dataReservation.user_id);
        var valideDate = this.valideDate(dataReservation.start);

        if (validUser === true && valideDate === true) {
          this.dialogform = true;
          this.formdialog.title = "Editar Reserva";
          this.formdialog.description = dataReservation.details;
          this.formdialog.id = dataReservation.id_schedules;
        }
      } finally {
        // Do nothing
      }
    },

    validUser(user_id) {
      if (user_id != this.user.id) {
        alert("Você não tem permissão para alterar esse agendamento !!!");
      } else {
        return true;
      }
    },

     addDays (date){

      var dt = new Date(date);
      dt.setDate(dt.getDate() + 1);
      return this.alterDate(dt);

    },

    alterDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    },


    valideDate(date) {
      
  
      if (this.alterDate(new Date()) <= this.addDays(date) ) {
        return true;
        
      } else {
        return false;
      }
    },

    formatDate(date) {
      if (!date) return null;
      if (!this.valideDate(date)) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      
      if (!date) return null;
      if (!this.valideDate(date)) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    async addSchedules() {
      this.formaddschedules.user_id = this.user.id;
      this.formaddschedules.date = this.date;
      this.loadingdialog = true;
      try {
        await this.ActionAddSchedules(this.formaddschedules);
        this.ActionShowSchedules();

        alert("Cadastrado com Sucesso");
        this.updateCalendar();
        this.modalAddSchedules = false;
        this.loadingdialog = false;
      } catch (error) {
        this.loadingdialog = false;
        alert(error.date ? error.date : "Erro ao Cadastrar");
      }
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },

    async updateCalendar() {
      const events = [];  
        await this.listSchedules.forEach((doc) => {
        events.push({
          name: "Reservado por " + doc.name,
          start: doc.date + " " + doc.time,
          details: doc.description,
          timed: doc.time,
          color: "success",
          user_id: doc.user_id,
          id_schedules: doc.id,
        });
  
      });
      this.events = events;
    },
  },
};
</script>
<style scoped>
  .addEvent {
    margin-right: 10px;
  }
</style>