import os
import argparse
import logging, json
import datetime, time, os, sys, shutil
import cherrypy as HttpServer
import inspect
from pymongo import MongoClient


class DashboardServer(object):
    """"
    classdocs
    """

    staticdir = None
    serverstart = 0

    def __init__(self, staticdir=None, dbhost=None):
        """
        Constructor and initiallizers
        :param staticdir:
        :param dbhost:
        """
        self.staticdir = os.path.join(os.getcwd(), 'ui_www')
        self.serverstart = self.epoch()

        if staticdir:
            self.staticdir = staticdir

        logging.info("Static directory for web-content: %s" % self.staticdir)

        # Intializing the upload directory
        uploaddir = os.path.join(self.staticdir, '..', 'uploads')
        if uploaddir:
            self.uploaddir = uploaddir

        # DB Port Addresses
        self.dbhost = '127.0.0.1'
        self.dbport = 27017
        if dbhost:
            dbhostarr = dbhost.split(":")
            self.dbhost = dbhostarr[0]
            if dbhostarr[1]:
                self.dbport = int(dbhostarr[1])
        logging.info("MongoDB Client: {} : {}".format(self.dbhost, self.dbport))
        client = MongoClient(self.dbhost, self.dbport)

        self.dbase = client['salxai']
        self.dbcol = self.dbase['users']

    @HttpServer.expose
    def index(self):
        """
        Sources the index file
        :return: raw index file
        """
        return open(os.path.join(self.staticdir, "index.html"))

    @HttpServer.expose
    def nullx(self):
        """
        Sources the index file
        :return: raw index file
        """
        return open(os.path.join(self.staticdir, "index.html"))


    def epoch(self):
        """
        Returns System Time
        :return:
        """
        epc = int(time.time() * 1000)
        return epc

    @HttpServer.expose
    def status(self):
        """

        :return:
        """
        status = {'current': self.epoch(),
                  'uptime': self.epoch() - self.serverstart
                  }
        return json.dumps(status)



    @HttpServer.expose
    def createuser(self, firstname, lastname, email, address1, address2, city, state, country, zipcode, password):
        """
        Registers a New User

        :param userid:
        :param firstname:
        :param lastname:
        :param email:
        :param address1:
        :param address2:
        :param city:
        :param state:
        :param country:
        :param zipcode:
        :return:
        """
        uquery = {'firstname': firstname,
                  'lastname': lastname,
                  'address1': address1,
                  'address2': address2,
                  'city': city,
                  'state': state,
                  'country' : country,
                  'zipcode' : zipcode,
                  'email': email,
                  'password': password
                  }

        userdb = self.dbase['users']
        urecord = uquery.copy()
        urecord['created'] = self.epoch()
        emailquery = { 'email': uquery['email'] }
        uqresult= userdb.find_one(emailquery)

        result = {'exists': False, 'userid': None}
        if uqresult:
            result['exists'] = True
            result['userid'] = str(uqresult['_id'])
            logging.info("== Record Exists. Skipping update. {}".format(uqresult))
        else:
            logging.info("== Record does not exist, creating entry ")
            uqresult = userdb.insert_one(urecord)
            uqresult = userdb.find_one(urecord)
            result['userid'] = str(uqresult['_id'])

        return json.dumps(result)

    @HttpServer.expose
    def loginuser(self, email, password):
        """
        :param email:
        :return:
        """
        userdb = self.dbase['users']
        emailquery = {'email': email}
        uqresult = userdb.find_one(emailquery, {'_id': 1, 'password' : 1})

        result = {'exists': False, 'userid': None, 'auth' : False}
        if uqresult:
            print("Rec: {}".format(uqresult))
            result['exists'] = True
            result['userid'] = str(uqresult['_id'])
            if uqresult['password'] == password:
                result['auth'] = True
                userdata = self.getuserdata(result['userid'])
                result['data'] = userdata


        return json.dumps(result)

    @HttpServer.expose
    def imgupload(self, accountid=None, upfile=None, cameraid=None, timestamp=None, duration=None, params=None):
        """
        Handles Image and information upload
        :param accountid:
        :param upfile:
        :param cameraid:
        :param timestamp:
        :param duration:
        :param params:
        :return:
        """
        self.uploaddir = os.path.join(self.staticdir, 'uploads')
        print("UploadFile: Name: %s, Type: %s " % (upfile.filename, upfile.content_type))
        fext = str(upfile.content_type).split('/')[1]
        print("Extension: %s" % (fext))
        logging.info('Recieved request: {}/{}'.format(cameraid, timestamp))
        if not os.path.exists(self.uploaddir):
            logging.info('Upload directory does not exist, creating %s' % (self.uploaddir))
            os.makedirs(self.uploaddir)

        if upfile is not None:
            tsx = self.epoch()
            ofile = os.path.join(self.uploaddir, "%s.%s" % (tsx, fext))
            print("Local filename: %s" % (ofile))
            ofilex = open(ofile, "wb")
            shutil.copyfileobj(upfile.file, ofilex)
            logging.info("Copied uploaded file as %s" % (ofilex))
            ofilex.close()
            wwwbase = os.path.basename(self.staticdir)
            out = {'upimg': "%s.%s" % (tsx, fext) }
            infodb = self.dbase['infodb']

            info = {'upimg':  "{}.{}".format(tsx, fext),
                    'epoch': tsx,
                    'accountid': accountid,
                    'timestamp': int(timestamp),
                    'duration' : int(duration),
                    'cameraid': cameraid,
                    'params': params}

            # Finally insert received object into db
            res = infodb.insert_one(info)
            print(res)
            return json.dumps(out)

        else:
            return "Parameter: \"theFile\" was not defined"


    @HttpServer.expose
    def getlogs(self):
        """
        Returns the serverlog
        :return:
        """
        path = os.path.join(os.getcwd(), 'log', 'salxserver.log')
        lines = open(path, 'r').readlines()

        return json.dumps(lines)


    def getuserdata(self, accountid):
        """
        Grabs UserData based on an accountid

        :param accountid:
        :return: list of accountid
        """
        infodb = self.dbase['infodb']
        query = {'accountid': accountid }

        cameraids = infodb.find(query, {'_id': 0}).distinct('cameraid')
        results = {}
        results['cameraids'] = cameraids
        for cameraid in cameraids:
            print("CameraId:".format(cameraid))
            camquery = infodb.find({'accountid': accountid, 'cameraid': cameraid}, {'_id': 0})
            results[cameraid] = list(camquery)


        return results

    @HttpServer.expose
    def getjsonuserdata(self, accountid):
        """
        Get UserData in JSON format
        :param accountid:
        :return:
        """
        res = self.getuserdata(accountid=accountid)
        return json.dumps(res)


## main code section
if __name__ == '__main__':
    port = 9005
    www = os.path.join(os.getcwd(), 'ui_www', 'VvvebJs-master')
    www = os.path.join(os.getcwd(), 'ui_www')
    ipaddr = '127.0.0.1'
    dbip = '127.0.0.1'
    logpath = os.path.join(os.getcwd(), 'log', 'sdashboard.log')
    logdir = os.path.dirname(logpath)

    cascPath = os.path.abspath(os.getcwd())

    ap = argparse.ArgumentParser()
    ap.add_argument("-p", "--port", required=False, default=6001,
                help="Port number to start HTTPServer." )

    ap.add_argument("-i", "--ipaddress", required=False, default='127.0.0.1',
                help="IP Address to start HTTPServer")

    ap.add_argument("-s", "--static", required=False, default=www,
                help="Static directory where WWW files are present")

    ap.add_argument("-d", "--dbaddress", required=False, default=dbip,
                    help="Database (MongoDB) IP address, defaults to %s" % (dbip))

    ap.add_argument("-f", "--logfile", required=False, default=logpath,
                    help="Directory where application logs shall be stored, defaults to %s" % (logpath) )

    # Parse Arguments
    args = vars(ap.parse_args())
    if args['port']:
        portnum = int(args["port"])

    if args['ipaddress']:
        ipadd = args["ipaddress"]

    if args['static']:
        staticwww = os.path.abspath(args['static'])

    if args['logfile']:
        logpath = os.path.abspath(args['logfile'])

    if not os.path.exists(logdir):
        print("Log directory does not exist, creating %s" % (logdir))
        os.makedirs(logdir)

    if args['dbaddress']:
        dbip = args['dbaddress']

    logging.basicConfig(filename=logpath, level=logging.DEBUG, format='%(asctime)s %(message)s')
    handler = logging.StreamHandler(sys.stdout)
    logging.getLogger().addHandler(handler)

    HttpServer.config.update({'server.socket_host': ipadd,
                           'server.socket_port': portnum,
                           'server.socket_timeout': 60,
                           'server.thread_pool': 8,
                           'server.max_request_body_size': 0
                           })

    logging.info("Static dir: %s " % (staticwww))

    conf = {'/': {
        'tools.sessions.on': True,
        'tools.staticdir.on': True,
        'tools.staticdir.dir': staticwww}
    }

    dbip = '172.245.217.212:28018'
    HttpServer.quickstart(DashboardServer(staticdir=staticwww, dbhost=dbip),
                            '/', conf)

