# WEB SERVER

1. Instalar las dependecias:

```
    npm install
```

2. Copiar el archivo .env.template a .env:

```
    cp .env.template .env
```

3. Configurar las variables de entorno del archivo .env:

```
    PORT=3000
    PUBLIC_PATH=public

    POSTGRES_URL=postgresql://postgres:123456@localhost:5432/TODO
    POSTGRES_USER=postgres
    POSTGRES_DB=TODO
    POSTGRES_PORT=5432
    POSTGRES_PASSWORD=123456


    NODE_ENV=development
```

4. Leventar docker para la base de datos:

```
    docker compose up -d
```

5. Ejecutar el script dev para usar la app en modo desarrollo:

```
    npm run dev
```
