import psycopg2

try:
    conn = psycopg2.connect(
        host='localhost',
        port=5433,  # Porta do PostgreSQL 17
        user='postgres',
        password='sua_senha',  # Substitua pela senha real
        dbname='postgres'
    )
    conn.autocommit = True
    cur = conn.cursor()
    
    # Tenta criar o banco
    cur.execute('CREATE DATABASE portal_noticias ENCODING "UTF8" TEMPLATE template0')
    print('✅ Banco criado com sucesso!')
except psycopg2.OperationalError as e:
    if 'already exists' in str(e):
        print('ℹ️ O banco já existe')
    else:
        print(f'❌ Erro de conexão: {e}')
        print('Verifique:')
        print('- Se a senha está correta')
        print('- Se o PostgreSQL 17 está rodando na porta 5433')
except Exception as e:
    print(f'❌ Erro inesperado: {type(e).__name__}: {e}')
finally:
    if 'conn' in locals():
        conn.close()