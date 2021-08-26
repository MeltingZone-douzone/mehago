#### spring

<pre>
    src
    |--- /main
            |--- /java
            |       |--- /com/douzone/mehago
            |               |--- /config
            |               |       |--- WebConfig.java
            |               |--- /controller
            |               |       |--- AccountController.java
            |               |       |--- MailController.java
            |               |--- /repository
            |               |       |--- AccountRepository.java
            |               |--- /service
            |               |       |--- AccountService.java
            |               |       |--- MailService.java
            |               |--- /vo
            |               |       |--- Account.java
            |               |       |--- Mail.java
            |               |--- /security
            |               |       |--- Auth.java
            |               |       |--- AuthInterceptor.java
            |               |       |--- AuthUser.java
            |               |       |--- AuthUserHandlerMethodArgument.java
            |               |       |--- LoginInterceptor.java
            |               |       |--- LogoutInterceptor.java
            |               |--- /utils
            |               |       |--- AES.java
            |               |       |--- JsonBodyConverter.java
            |               |       |--- JwtDecoder.java
            |               |       |--- JwtToken.java
            |               |       |--- MailHandler.java
            |               |       |--- RandomPassword.java
            |               |--- /exceptions
            |               |       |--- GlobalExceptionHandler.java
            |               |       |--- InvaildJwtException.java
            |               |       |--- LoginException.java
            |               |--- /responses
            |               |       |---CommonResponse.java
            |               |--- MehagoApplication.java
            |--- /resource
                    |--- /config
                    |       |--- WebConfig.properties
                    |--- /mybatis
                    |       |--- /mappers
                    |       |       |--- account.xml
                    |       |--- configuration.xml
                    |--- application.yml
</pre>


#### frontend

<pre>
    frontend
        |--- /config
        |       |--- babel.config.json
        |       |--- webpack.config.js
        |--- /public
        |       |--- /assets
        |       |       |--- /js
        |       |               |-- main.js
        |       |--- favicon.ico
        |       |--- index.html
        |--- /src
</pre>

#### backend