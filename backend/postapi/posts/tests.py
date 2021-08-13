from django.test import TestCase
from django.contrib.auth.models import User
from .models import Post
# Create your tests here.

class PostTest(TestCase):
    # create user + post
    @classmethod
    def setUpTestData(cls):
        test_user = User.objects.create_user(
            username="test",password="abc123"
        )
        test_user.save()

        # post
        test_post = Post.objects.create(
            author=test_user,title="Test Title",body="Test Body Lorem"
        )
        test_post.save()
    
    def test_content(self):
        post = Post.objects.get(id=1)
        author = f"{post.author}"
        title = f"{post.title}"
        body = f"{post.body}"
        self.assertEqual(author,"test")
        self.assertEqual(title,"Test Title")
        self.assertEqual(body,"Test Body Lorem")

