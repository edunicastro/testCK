<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Lista de Endereços</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="public/styles/main.css">
    <script>
      const preloader = () => {
        heavyImage = new Image();
        heavyImage.src = "public/images/loader.gif";
      }
    </script>
  </head>
  <body onLoad="javascript:preloader()">
    <script src="main.js"></script>
    <header>
      <a href='/'>Home Page</a>
    </header>
    <div id="mainContainer">
      <div id="loader">
        <img src="public/images/loader.gif" />
      </div>
      <div id="formularioContainer"></div>
      <div id="tabelaContainer"></div>
    </div>
    <footer>
      Copyright
    </footer>
  </body>
</html>
