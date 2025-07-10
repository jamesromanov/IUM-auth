# IUMM auth express 

Start the project by do the folowing commands:

## installation

installing

```bash
 git clone https://github.com/jamesromanov/IUM-auth.git
 cd IUM-auth
 npm install
```

## usage
first configure and create .env file with variables shown in example.env file like: 
```bash
DB_PORT=database-port-
DB_HOST=db-host
DB_PASSWORD=db-password
DB_USERNAME=db-username
PORT=main-application-port
REFRESH_TOKEN_EXP=refreshtoken-expiration-date
REFRESH_TOKEN_KEY=refreshtoken-secret-key
ACCESS_TOKEN_EXP=accesstoken-expiration-date
ACCESS_TOKEN_KEY=accesstoken-secret-key
CODE_EXP=code-expiration
CODE_SECRET=code-secret
USER_MAIL=nodemailer-email
USER_PASS=nodemailer-passkey
COOKIE_EXP=cookie-expiration
```
if in development mode:
```bash
npm run start:dev
```
if in production
```bash
npm run start
```

## Additional
run the project bu docker by the following command:
```bash
docker compose up -d
```
then simply open the 
```bash
http://localhost:3000/api-docs
```


