from rest_framework.permissions import BasePermission
from rest_framework import permissions

class IsAuthorOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        # read only is allowed for any methods 
        #. Several common HTTP methods are safe: GET, HEAD, or OPTIONS
        if request.method in permissions.SAFE_METHODS:
            return True
        # if user = author give other http methods too
        return obj.author == request.user

"""
permissions are derived from basepermission class 
has_object_permission = check the permission in obj level
has_permission = general permission in view level
"""