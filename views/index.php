<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Lista de Endereços</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,700,500' rel='stylesheet' type='text/css'>
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
      <h1>Lista de Endereços</h1>
    </header>
    <div id="mainContainer">
      <div id="loader">
        <img src="public/images/loader.gif" />
      </div>
      <div id="formularioContainer"></div>
      <div id="tabelaContainer"></div>
    </div>
    <footer>
      <h4>Copyright</h4>
    </footer>
  </body>
</html>
