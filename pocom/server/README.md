# INSTRUCCIONES

Antes de ejecutar el comando npm run server

1. Crear base de datos en mysql llamada `pocom_db`
2. Instalar globalmente `sequelize` con el siguiente comando `npm install -g sequelize-cli`
3. Abrir una terminal en el proyecto en la carpeta server y ejecutar el siguiente comando `npm install`
4. Podran ver un archivo llamado `.env.example` 
5. Deberan crear un archivo llamado `.env` en la carpeta `server`
6. Una vez creado copien lo del archivo `.env.example` a `.env`
7. Escriban sus respectivas credenciales en `DB_USERNAME` `DB_PASSWORD`
8. Despues ejecutar el siguiente comando `sequelize db:migrate`
9. Verifiquen que se hayan creado correctamente las tablas


# SEQUELIZE

## Aplicar migraciones pendientes
    sequelize db:migrate

## Crear Tabla (Ejemplo)
    sequelize model:create --name usuario --attributes username:string,status:char

## Deshacer ultima migracion
    npx sequelize-cli db:migrate:undo

## Deshacer todas las migraciones
    npx sequelize-cli db:migrate:undo:all