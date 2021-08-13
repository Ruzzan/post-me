from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class PostPagination(PageNumberPagination):
    page_size = 2
    max_page_size = 5
    page_query_param = 'p'
    page_size_query_param = 'page_size'

    # def get_paginated_response(self, data):
    #     response = Response()
    #     response['count'] = self.page.paginator.count
    #     response['next'] = self.get_next_link()
    #     response['previous'] = self.get_previous_link()
    #     response['p'] = int(self.request.GET.get('p',1))
    #     response['page_size'] = int(self.request.GET.get('page_size',self.page_size))
    #     response['results'] = data
    #     return response


"""
pagination are derived from pagination(pagenumberpagination) class 
page_size = no. of objs in a request
page_query_param = p (to access page number) ?p=pagenumber
get_paginated_response = send the count,next,previous value in each request 
# """
# from rest_framework.pagination import PageNumberPagination
# from rest_framework.response import Response

# DEFAULT_PAGE = 1
# DEFAULT_PAGE_SIZE = 20

# class CustomPagination(PageNumberPagination):
#     page = DEFAULT_PAGE
#     page_size = DEFAULT_PAGE_SIZE # number of the model objects 
#     page_query_param = 'page' # /?page=number

#     def get_paginated_response(self, data):
#         return Response({
#             'links': {
#                 'next':self.get_next_link(),
#                 'previous':self.get_previous_link()
#             },
#             'total':self.page.paginator.count,
#             'page':int(self.request.GET.get('page', DEFAULT_PAGE)),
#             'page_size':int(self.request.GET.get('page_size', self.page_size)),
#             'results':data, # list data of the objects
#         })
