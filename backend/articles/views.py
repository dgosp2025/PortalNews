from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Article, Category
from .serializers import ArticleSerializer, CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.filter(status='published')
    serializer_class = ArticleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug']
    search_fields = ['title', 'content']
    ordering_fields = ['publish_date', 'created_at']
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset
