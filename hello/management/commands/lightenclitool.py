



#   load all the sample org data : 
#  docker-compose run web ./manage.py db3 -- --readfrom   data/json1/json_schema/orgs.t.p.??.json  data/json1/json_schema/orgs.t.p.???.json





# http://stackoverflow.com/questions/1310495/running-a-python-script-outside-of-django
# https://docs.djangoproject.com/en/dev/howto/custom-management-commands/
from optparse import make_option
from django.core.management.base import BaseCommand, CommandError, NoArgsCommand
#from polls.models import Poll

#from hello.models import Example2
#from  models import Example2
#from  models import *
#from  ..models import *
#from  ...hello import *
from hello.models import Example 
import argparse
import json;

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
def safestoreExample(txt):
    print "storing as a raw string for now"
    b = Example(content=txt)
    b.save()



#class Command(NoArgsCommand):
class Command(BaseCommand):

    help = "Whatever you want to print here"

    option_list = NoArgsCommand.option_list + (
        make_option('--verbose', action='store_true'),
    )

    def handle(self, *args, **options):
        print "handling with args.... I guess.."
        print "mark1 "
        print args 
        print options 
        ap_args = parser.parse_args(args)
  #      print ap_args.accumulate(ap_args.integers)
        print ap_args.readfromdb 

        if ap_args.readfromdb  :
            allrecords = Example.objects.filter()
            for rec in allrecords : 
                print "record .... "
                print rec.content



        if ap_args.writetodb : 
            # read the files
            for filename in ap_args.writetodb:
                print "filename " + filename
                infile = open(filename,"r")
                buf = infile.read()
                print "buf : " 
                print buf 
                data = json.loads(buf)
                pprint(data)
                if type([]) == type(data):
                    for rec in data : 
                        safestoreExample(json.dumps(rec)) 
                else :
                    safestoreExample(buf)


        #b = Example2(content='Beatles Blog txt blob')
        #b.save()
        # https://docs.djangoproject.com/en/1.9/ref/models/expressions/
#
# (venv) bbbb:lighten-django-demo x$ docker-compose run web ./manage.py shell 
# from hello.models import Example2
#		>>> stuff = Example2.objects.filter() 
#>>> for thing in stuff : 
#...     print thing.content
#

	#	Example2.objects.filter()
		
        print "mark2 "

    def handle_noargs(self, **options):
		print "wkaka"




