from rest_framework import serializers
from .models import Article, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']

class ArticleSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    author = serializers.StringRelatedField()
    
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ['slug', 'created_at', 'updated_at']