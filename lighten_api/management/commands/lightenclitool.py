



#   load all the sample org data :
#  docker-compose run web ./manage.py lightenclitool -- --readfrom   data/json1/json_schema/orgs.t.p.??.json  data/json1/json_schema/orgs.t.p.???.json
#
#  prod db :
#
#     heroku run python manage.py  lightenclitool -- -- --writetodb  data/json1/json_schema/orgs.t.p.??.json  data/json1/json_schema/orgs.t.p.???.json
#     note the double '--' z'





# http://stackoverflow.com/questions/1310495/running-a-python-script-outside-of-django
# https://docs.djangoproject.com/en/dev/howto/custom-management-commands/
from optparse import make_option
from django.core.management.base import BaseCommand, CommandError, NoArgsCommand
#from polls.models import Poll

from lighten_api.models import Organization
import argparse
import json
import sys


    # this works here, thought it seems wrong.
parser = argparse.ArgumentParser(description='A backend lighten json1 loading and unloading tool',
                   epilog='\n\nthings\n\n')

parser.add_argument('--readfromdb', action='store_true', help='read all the records from a db and display them to stdout' , default=False)
parser.add_argument('--writetodb', action='store', help='add some records to the db (posisbly dedup the duplicates, or update current records)' , nargs='*')

#parser.add_argument('integers', metavar='N', type=int, nargs='+',
#                   help='an integer for the accumulator')
#parser.add_argument('--sum', dest='accumulate', action='store_const',
#                   const=sum, default=max,
#                   help='sum the integers (default: find the max)')

#args = parser.parse_args()
#print args.accumulate(args.integers)
from pprint import pprint

#def quick_record_checker(txt):

#
#
#   run it through validity, syntax, and dup checks first.  (todo)
#
#
def safestoreOrganization(txt):
    #print "storing as a raw string for now"
    # overwrite any previous reocrd with this unique_lighten_recordId
    data = json.loads(txt)
    if not "unique_lighten_recordId" in data :
        print("Malformed lighten json1 reocrd format a unique_lighten_recordId property is required in:")
        print(txt)
        print("quiting")
        sys.exit(2)


    ulrid = data["unique_lighten_recordId"]
    # lookup and filter on the record ID... oh, ick, this is a icky load and tablescan...
    allrecords = Organization.objects.filter()
    written = False

    for rec in allrecords :
        #print rec.json
        dbdata = json.loads(rec.json)
        if "unique_lighten_recordId" in dbdata and dbdata["unique_lighten_recordId"] == data["unique_lighten_recordId"] :
            #check for mod time? ( currently just slamming it )
            print("found record for " + ulrid)
            rec.json = txt
            rec.save
            written = True
            break
        else :
            print("NOT : found record for " + ulrid)


    if not written :
        print("A new entry into the db...")
        b = Organization(json=txt)
        b.save()

#    b = Organization(json=txt)
#    b.save()



#class Command(NoArgsCommand):
class Command(BaseCommand):

    help = """The lighten cli tool for managing db entries in the django backend db, loading, unloading and updating records from json1 format"""

 #   add_arguments(parser)
  #  option_list = NoArgsCommand.option_list + (
   #     make_option('--verbose', action='store_true'),
    #)
    def add_arguments(self , parser):
        parser.add_argument('--readfromdb', action='store_true', help='read all the records from a db and display them to stdout' , default=False)
        parser.add_argument('--writetodb', action='store', help='add some records to the db (posisbly dedup the duplicates, or update current records)' , nargs='*')


    def handle(self, *args, **options):
        #   print "handling with args.... I guess.."
 #  #     print "mark1 "
  #      print args
   #     print options
        ap_args = parser.parse_args(args)
        if False:
            print("the args args follows :")
            print(args)
            print("the app args follows :")
            print(ap_args)
            print("the options follows ")
            print(options)

        ap_args = options
  #      print ap_args.accumulate(ap_args.integers)
      #  print ap_args.readfromdb

        if ap_args["readfromdb"] :
            allrecords = Organization.objects.filter()
            print("[")
            firstone = True
            for rec in allrecords :
                if not firstone :
                    print("\n,")
                else :
                    firstone = False
                #print "WAKA WAKA WAKA\n";
                print(rec.json)

                #print "record .... "
                #print rec.json
            print("]\n")


        if ap_args["writetodb"] :
            # read the files
            for filename in ap_args["writetodb"]:
                print("filename " + filename)
                infile = open(filename,"r")
                buf = infile.read()
                print("buf : ")
                print(buf)
                data = json.loads(buf)
                pprint(data)
                if type([]) == type(data):
                    for rec in data :
                        safestoreOrganization(json.dumps(rec))
                else :
                    safestoreOrganization(buf)

	#	Organization2.objects.filter()

 #       print "mark2 "

    def handle_noargs(self, **options):
        pass
        #	print "wkaka"




