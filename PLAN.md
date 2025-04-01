# Plano de Desenvolvimento - Portal de Notícias

**Stack Tecnológica:**

*   **Back-end:** Python (Django) com Django REST Framework (DRF)
*   **Front-end:** JavaScript (Next.js / React)
*   **Banco de Dados:** PostgreSQL
*   **Arquitetura:** API REST desacoplada

**Fase 1: Fundação e Estrutura Base**

1.  **Configuração do Ambiente:**
    *   Criar repositórios separados (ou um monorepo) para back-end e front-end.
    *   Configurar ambientes virtuais (Python) e gerenciadores de pacotes (npm/yarn).
    *   Dockerização (opcional, mas recomendado) para facilitar o desenvolvimento e deploy.
2.  **Back-end (Django):**
    *   Inicializar projeto Django e apps principais (`core`, `users`, `articles`, `media`).
    *   Configurar conexão com PostgreSQL.
    *   Instalar e configurar Django REST Framework (DRF) e CORS headers.
    *   Definir modelo de usuário customizado (se necessário).
3.  **Front-end (Next.js):**
    *   Inicializar projeto Next.js (com TypeScript, se preferir).
    *   Configurar ferramentas de linting/formatação (ESLint, Prettier).
    *   Estruturar pastas (`components`, `pages`, `lib`, `styles`, `services`).
    *   Configurar cliente HTTP base (Axios ou `fetch`) para comunicação com a API.
4.  **Arquitetura Visual:**

    ```mermaid
    graph TD
        subgraph "Usuário Final"
            Browser[Navegador Web]
        end

        subgraph "Administrador/Editor"
            AdminBrowser[Navegador Web]
        end

        subgraph "Front-end (Next.js)"
            FE[Aplicação Next.js]
            FE -- Requisições API --> BE_API
        end

        subgraph "Back-end (Django)"
            BE_API[API REST (DRF)]
            BE_Admin[Admin Django]
            BE_Logic[Models/Lógica Django]
            BE_API -- Usa --> BE_Logic
            BE_Admin -- Usa --> BE_Logic
            BE_Logic -- Interage com --> DB
        end

        subgraph "Banco de Dados"
            DB[(PostgreSQL)]
        end

        Browser -- Acessa --> FE
        AdminBrowser -- Acessa --> BE_Admin
    ```

**Fase 2: Back-end - Núcleo da API e Admin**

1.  **Modelos de Dados:** Definir `models.py` para `Category`, `Tag`, `Article` (com todos os campos: título, slug, conteúdo, destaque, autor, status, datas, SEO, etc.), `Media`, `Comment` (opcional).
2.  **Admin Django:** Configurar o `/admin` para gerenciar todos os modelos. Integrar um editor WYSIWYG (ex: `django-ckeditor`) para o conteúdo do artigo. Customizar listagens e formulários.
3.  **Serializers (DRF):** Criar serializers para converter os modelos em JSON.
4.  **API Endpoints (Views DRF):** Implementar os endpoints REST para:
    *   CRUD de Artigos (com filtros, paginação, busca por slug).
    *   CRUD de Categorias e Tags.
    *   Upload/Gerenciamento de Mídia.
    *   Autenticação/Autorização (Login/Registro, permissões por nível de usuário - Admin, Editor, Autor) usando `dj-rest-auth` ou similar.
    *   Endpoint de busca (`/api/search/`).
    *   Endpoint para configurações gerais (`/api/config/`).
    *   (Opcional) Endpoints para Comentários e Moderação.
5.  **Funcionalidades:** Lógica para geração automática de `slug`, agendamento de posts.

**Fase 3: Front-end - Portal Público**

1.  **UI/UX Base:** Implementar layout principal (Header, Footer, Grid), responsividade básica e tema visual inspirado em `vupler.com`. Escolher e configurar biblioteca de UI (ex: Tailwind CSS, Chakra UI, Material UI) ou CSS Modules.
2.  **Páginas Principais (Data Fetching via API):**
    *   Homepage (`index.js`): Exibir destaques, últimas notícias, seções por categoria (usar `getStaticProps` ou `getServerSideProps`).
    *   Página de Artigo (`/article/[slug].js`): Exibir conteúdo completo, autor, data, imagem, tags, compartilhamento social (usar `getStaticProps`).
    *   Páginas de Categoria/Tag (`/[categorySlug]/index.js`, `/tag/[tagSlug]/index.js`): Listar artigos com paginação (usar `getStaticProps`).
    *   Página de Busca (`/search.js`): Formulário de busca e exibição de resultados.
3.  **Componentes Reutilizáveis:** `ArticleCard`, `Pagination`, `SearchBar`, `SocialShareButtons`, `CommentSection` (se aplicável).
4.  **SEO:** Implementar `next/head` para meta tags dinâmicas, `next-seo` para Schema Markup (JSON-LD) em artigos, garantir URLs canônicas. Geração de `sitemap.xml` (pode ser via API do back-end ou no build do Next.js).
5.  **Performance:** Otimização de imagens com `next/image`, lazy loading.

**Fase 4: Funcionalidades Avançadas e Polimento**

1.  **Back-end:**
    *   Refinar permissões de usuário (ex: Autor só edita seus posts).
    *   Implementar Dashboard básico no Admin Django (estatísticas).
    *   Adicionar hooks ou configurações para futuras integrações (IA, Autopost).
    *   Otimizações de performance na API (caching, otimização de queries).
2.  **Front-end:**
    *   Refinar UI/UX e responsividade em todos os dispositivos.
    *   Implementar seção de comentários com interação com a API (se habilitado).
    *   Testes de usabilidade.
    *   Otimizações finais de performance (Lighthouse score).
3.  **Geral:**
    *   Implementar testes automatizados (unitários, integração).
    *   Revisão de segurança.

**Fase 5: Deploy e Manutenção**

1.  **Configuração de Deploy:**
    *   Back-end: Heroku, DigitalOcean App Platform, AWS, etc. (com Gunicorn/Nginx).
    *   Front-end: Vercel (recomendado para Next.js), Netlify, etc.
    *   Banco de Dados: Serviço gerenciado (AWS RDS, Heroku Postgres, etc.).
    *   Configurar CDN para mídia.
2.  **CI/CD:** Configurar pipelines (GitHub Actions, GitLab CI) para testes e deploys automáticos.
3.  **Monitoramento e Manutenção:** Configurar logs, monitoramento de performance e erros. Planejar atualizações de segurança e dependências.