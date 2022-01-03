var schedule = require('node-schedule')
const sqlite = require("./aa-sqlite")
const moment = require('moment');


var ago = moment().subtract(2, 'day').format()

async function deletevent() {
  await sqlite.open('./fertevents.db')
  let sql = "DELETE FROM sched_event_details WHERE start_date <'"+ ago + "' AND state = 'completed' "
  console.log("database opened, cleaning routing started")
  await sqlite.run(sql, (err, rows) => {
      if (err) {
          throw err;
      }
      console.log(`Row(s) deleted ${this.changes}`);
    });
    await sqlite.close()
  }

schedule.scheduleJob({hour:3}, function(){
    deletevent()
});
