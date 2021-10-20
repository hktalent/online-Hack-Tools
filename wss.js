'use strict'

function myWss(app, io)
{
    io.use(function(socket, next) 
    {
        (socket.request.res) ? session(socket.request, socket.request.res, next)
        : next(next);
    });

    io.on('connection', (client) => {
        client.on('doRmtDE',function(){
            client.emit('sendClt',s1);
        })
    });
}

module.exports = { myWss: myWss};