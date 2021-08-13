from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from dj_rest_auth.serializers import UserDetailsSerializer as UserInfoSerializer

class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """
    user = UserInfoSerializer(many=False, read_only=True)  # this is add by myself.
    class Meta:
        model = TokenModel
        fields = ('key', 'user')   # there I add the `user` field ( this is my need data ).