# EmailService
Backend Challenge

Email sender

users authentication (register and login) and use (JWT).

they are diferent user:

normal one:
can send emails
cannot retrieve emails

admin one:
can also send emails?
can retrieve /stats




userController (JWT) => login, register => userType (email, password, isAdmin)

emailService()

ServiceType (SendGrid o XX)

SENDGRID_API_KEY=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
MAILGUN_API_KEY=9846cf9478c1070031df8d4023e7bb4d-ed54d65c-b073b2c1
MAILGUN_DOMAIN_KEY=sandbox1f33cb9ac43b4a858949d0aa3089a727.mailgun.org


Falta:
- users
  el tokenPayload colocar su role dentro de el, tambien el ID ✅
  Si es posible encriptar el string del password

- email service
  Falta que funcione su logica de strategy ✅

- 1000 mails
    Antes de mandar un email, verificar por flecha de creado, si puede mandar mas X mensajes ✅

- Para /stats
    Meter variable admin en el token para que pregunte en el o lo saque de el ✅
    hacer la pregunta

    

