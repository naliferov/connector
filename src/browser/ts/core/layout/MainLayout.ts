export default class MainLayout {

    static build() {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Web-constructor</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
     <style>
        body {
            margin: 0;
            font-family: 'Roboto', sans-serif;
            font-size: 16px;
        }
        #app {
            display: grid;
            padding: 15px;
            row-gap: 15px;    
        }
        .grid {
            display: grid;
        }
        .flex {
            display: flex;
        }
        .unit a {
            color: black;
        }
        .btn {
            padding: 2px 4px;
            border: 1px solid black;
            white-space: nowrap;
            cursor: pointer;
        }
        .btn:hover {
            padding: 1px 3px;
            border: 2px solid black;
        }
        .btn.active {
            color: white;
            background: black;
        }
        .hidden {
          display: none;
        }
        .noselect {
            webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
        }
        .break {
            flex-basis: 100%;
            height: 0;
        }
        .trackTitle {
            width: 200px;
            margin-right: 5px;
            white-space: nowrap;
        }
    </style>
</head>
<body>
    <app id="app"></app>
    <script async src="/min.js"></script>
</body>
</html>
`.trim()
    }
}