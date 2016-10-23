



#   load all the sample org data :
#  docker-compose run web ./manage.py lightenclitool -- --readfrom   data/json1/json_schema/orgs.t.p.??.json  data/json1/json_schema/orgs.t.p.???.json
#
#  prod db :
#
#     heroku run python manage.py  lightenclitool -- -- --writetodb  data/json1/json_schema/orgs.t.p.??.json  data/json1/json_schema/orgs.t.p.???.json
#     note the double '--' z'





# http://stackoverflow.com/questions/1310495/running-a-python-script-outside-of-django
# https://docs.djangoproject.com/en/dev/howto/custom-management-commands/
from django.core.management.base import BaseCommand
#from polls.models import Poll

from lighten_api.models import Organization
import argparse
import json


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
    data = json.loads(txt)

    print("A new entry into the db...")
    b = Organization(json=data)
    b.save()



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
                infile = open(filename,"r",encoding="utf-8")
                buf = infile.read().encode('utf8')
                print("buf : ")
                print(buf)
                data = json.loads(buf.decode('utf8'))
                pprint(json.dumps(data, indent=2))
                safestoreOrganization(json.dumps(data))
