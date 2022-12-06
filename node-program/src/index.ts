import https = require('https');
import http = require('http');
import express = require('express');
import morgan = require('morgan');
import fs = require('fs');
import path = require('path');
const fsPromises = fs.promises;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const PORT = 8080;

const app = express();
app.use(morgan('combined'));

// app.use(express.text());

app.use(express.json());

app.get('/', async (req, res) => {
  console.log('test');
  res.send(`Hello world!`);
});

//app.post<void, any, any>('/'), async (req, res) => {
app.post('/', async (req, res) => {
  console.log('body', req.body);
  console.log('Status', req.body.Status);
  console.log('Config', req.body.Config);

  if (req.body.Configuration?.RoomAnalytics?.PeopleCountOutOfCall !== undefined) {
    console.log('PeopleCountOutOfCall', req.body.Configuration.RoomAnalytics.PeopleCountOutOfCall);
  }

  if (req.body.Status?.Conference?.DoNotDisturb !== undefined) {
    console.log('DoNotDisturb ', req.body.Status.Conference.DoNotDisturb);
  }

  if (req.body.Status?.RoomAnalytics?.PeopleCount !== undefined) {
    const peopleCount = req.body.Status.RoomAnalytics.PeopleCount;
    const systemName = req.body.Status.Identification.SystemName.Value;
    console.log('PeopleCount', peopleCount);
    fsPromises.appendFile(
      path.join(__dirname, 'PeopleCount.txt'),
      `${String(new Date())}: ${JSON.stringify(peopleCount)}\n`,
    );
    fsPromises.appendFile(
      path.join(__dirname, 'PeopleCount.txt'),
      `${String(new Date())}: ${JSON.stringify(systemName)}\n`,
    );
  }

  if (req.body.Status?.RoomAnalytics?.PeoplePresence !== undefined) {
    console.log('PeoplePresence', req.body.Status.RoomAnalytics.PeoplePresence);
  }

  res.send(`You sent: ${JSON.stringify(req.body)}`);
});

// app.get<void, string, void, { location: string }>('/getxml', async (req, res) => {
//   const ciscoRes = await new Promise<string>((resolve, reject) => {
//     const r = https.request(
//       {
//         hostname: 'IP_address',
//         port: 443,
//         path: `/getxml?location=${req.query.location}`,
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/xml',
//           Authorization: 'Basic YWRtaW46ZmFiQzcxMQ==',
//         },
//       },
//       (res: any) => {
//         console.log(`statusCode: ${res.statusCode}`);
//         res.setEncoding('utf8');
//         res.on('data', (d: string) => {
//           process.stdout.write(d);
//           resolve(d);
//         });
//       },
//     );
//     r.on('error', (error: any) => {
//       console.error(error);
//       reject(error);
//     });
//     r.end();
//   });
//   res.send(ciscoRes);
// });

// app.post<void, string, string>('/putxml', async (req, res) => {
//   console.log('body', req.body);
//   const ciscoRes = await new Promise<string>((resolve, reject) => {
//     const r = https.request(
//       {
//         hostname: 'IP_Address',
//         port: 443,
//         path: '/putxml',
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/xml',
//           Authorization: 'Basic YWRtaW46ZmFiQzcxMQ==',
//           'Content-Length': req.body.length,
//         },
//       },
//       (res: any) => {
//         console.log(`statusCode: ${res.statusCode}`);
//         res.on('data', (d: any) => {
//           process.stdout.write(d);
//           resolve(d);
//         });
//       },
//     );
//     r.on('error', (error: any) => {
//       console.error(error);
//       reject(error);
//     });
//     r.write(req.body);
//     r.end();
//   });

//   res.send(ciscoRes);
// });

// app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

// const httpsOptions = {
//   key: fs.readFileSync('./server.key'),
//   cert: fs.readFileSync('./server.crt'),
// };
// https.createServer(httpsOptions, app).listen(PORT, () => {
//   console.log('server running at ' + PORT);
// });
// https.createServer({}, app).listen(PORT, () => {
//   console.log('server running at ' + PORT);
// });

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


// const https = require('https');
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// (async () => {
//   // =======================================

//   console.log('GET START');
//   await new Promise((resolve, reject) => {
//     const req = https.request(
//       {
//         hostname: 'IP_Adsress',
//         port: 443,
//         path: '/getxml?location=/Status/RoomAnalytics/PeopleCount',
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/xml',
//           Authorization: 'Basic YWRtaW46ZmFiQzcxMQ==',
//         },
//       },
//       (res: any) => {
//         console.log(`statusCode: ${res.statusCode}`);
//         res.setEncoding('utf8');
//         res.on('data', (d: any) => {
//           process.stdout.write(d);
//           resolve(d);
//         });
//       },
//     );
//     req.on('error', (error: any) => {
//       console.error(error);
//       reject(error);
//     });
//     req.end();
//   });
//   console.log('GET DONE');

//   // =======================================
//   // =======================================
//   // =======================================

//   console.log('POST START');
//   const data = `<Command><Conference><DoNotDisturb><Activate></Activate></DoNotDisturb></Conference></Command>`;
//   await new Promise((resolve, reject) => {
//     const req = https.request(
//       {
//         hostname: 'IP_Address',
//         port: 443,
//         path: '/putxml',
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/xml',
//           Authorization: 'Basic YWRtaW46ZmFiQzcxMQ==',
//           'Content-Length': data.length,
//         },
//         data,
//       },
//       (res: any) => {
//         console.log(`statusCode: ${res.statusCode}`);
//         res.on('data', (d: any) => {
//           process.stdout.write(d);
//           resolve(d);
//         });
//       },
//     );
//     req.on('error', (error: any) => {
//       console.error(error);
//       reject(error);
//     });
//     req.end();
//   });
//   console.log('POST DONE');

//   // =======================================
// })();
