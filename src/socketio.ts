import {Server} from 'socket.io';
import services from './helper';

const event = {
  SUBSCRIBE: 'SUBSCRIBE'
};

const socketHandler = (io: Server):void=>{
  const namespace = io.of('/votes')
  .on('connection', (socket)=>{

    let interval:NodeJS.Timer;
    console.log(`There is a client connected: ${socket.id}`);

    socket.on(event.SUBSCRIBE, (campaignId: string)=>{
      clearInterval(interval);
      console.log(campaignId);
      interval = setInterval(()=>{
        services.getSummary(campaignId)
        .then(data=>{
          namespace.emit(`${event.SUBSCRIBE}`, {...data});
        })
      }, 2000);
    });

    socket.on('disconnect', ()=>{
      console.log(`Client leaves ${socket.id}`);
      clearInterval(interval);
    })
  });
}

export default socketHandler;