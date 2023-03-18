# INSTRUCCIONES

Antes de ejecutar el comando npm run server

1. Crear base de datos en mysql llamada `pocom_db`
2. Abrir una terminal en el proyecto en la carpeta server y ejecutar el siguiente comando `npm install`
3. Podran ver un archivo llamado `.env.example` 
4. Deberan crear un archivo llamado `.env` en la carpeta `server`
5. Una vez creado copien lo del archivo `.env.example` a `.env`
6. Escriban sus respectivas credenciales en `DB_USERNAME` `DB_PASSWORD`
7. Despues ejecutar el siguiente comando `sequelize db:migrate`
8. Verifiquen que se hayan creado correctamente las tablas