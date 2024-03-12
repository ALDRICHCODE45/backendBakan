export const htmlBody = (link: string): string => {
  return `
    <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
            text-align: center;
        }
        p {
            color: #666666;
          text-align:center;
          font-size:20px;
        }
        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #007bff;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
        }
      .button > p{
        color:#000000;
        font-size:15px;
      }
        .button:hover {
            background-color: #0056b3;
        }
        .image {
            display: block;
            margin: 20px auto;
            width: 200px;
            border-radius:10px
        }
    </style>
</head>
<body>
    <div class="container">
        <img class="image" src="https://servifibra.com/wp-content/uploads/2017/12/bakan.jpg" alt="Correo electrónico">
        <h1>¡Valida tu correo electrónico!</h1>
        <p>alguien te esta registrando en bakanApp, para completar tu registro, por favor haz clic en el siguiente botón:</p>
        <a class="button" href="${link}"> <p> Validar Correo Electrónico</p> </a>
    </div>
</body>
</html>
    `;
};
