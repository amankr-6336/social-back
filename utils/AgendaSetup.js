const Agenda=require('agenda');
const mongoose=require('mongoose');
const {deleteStoryControllerAgenda}=require('../controller/StoryController')

console.log("hiii from angenda");
const existingConnection=mongoose.connection;

const agenda=new Agenda({mongo:existingConnection});

agenda.define('deleteStoryControllerAgenda',async(job)=>{
    await  deleteStoryControllerAgenda()
})

agenda.on('complete', (job) => {
    console.log(`Job ${job.attrs.name} completed successfully.`);
  });
  
  // Listen for 'fail' event
  agenda.on('fail', (err, job) => {
    console.error(`Job ${job.attrs.name} failed with error: ${err.message}`);
  });

agenda.start();
agenda.every('30 minutes', 'deleteStoryControllerAgenda');
process.stdin.resume();