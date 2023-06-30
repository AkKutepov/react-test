<!DOCTYPE html>
<html>
  <head>
    <meta charset='UTF-8'>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>React Example</title>

    <!--+->    
    <link rel="stylesheet" href="./css/bootstrap.css">
    <link rel="stylesheet" href="./css/main.css">
    <!---->

    <script src='./ext/react.development.min.js'></script>
    <script src='./ext/react-dom.development.min.js'></script>
    <script src='./ext/react-router-dom.min.js'></script>

    <!--+->
    <script src="./ext/axios.min.js"></script>
    <script src='https://unpkg.com/babel-standalone@6.26.0/babel.js'></script>
    <!---->
  </head>
  <body>
    <div id='root'></div>

    <!---->
    <script src="./dist/weather.js"></script>
    <script src="./dist/bundle.js"></script>
    <!---->

    <!--+->
    <script type='module'>
      import "./src/weather.js"
      import "./src/main.js"
    </script>
    <!---->
    <!-- <script type="text/babel" src="./com/test.jsx"></script> -->

  </body>
</html>