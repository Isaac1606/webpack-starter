// Requerimos el paquete en la aplicacion asi que lo asignamos en una constante
// la palabra reservada require es como node carga el archivo del paquete 
const HtmlWebPackPlugin    = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    // Le indicamos que estamos en mode de desarrollo
    mode: 'development',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin()]
    },
    module: {
        rules: [
            {
                // Para poder cargar de forma dinamica
                // los archivos de css
                test: /\.css$/,
                // excluimos el directorio del css global
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                // Para nuestro css global 
                test: /styles\.css$/,
                use: [
                    // Para poder minimizar el css
                    // cuando lo mandemos a produccion
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                // Condicion que webpack evaluara archivo por archivo 
                // la condicion se va aplicar si es un archivo de html 
                test: /\.html$/i,
                // Que es lo que queremos que haga una vez que encunetre
                // un archivo de html
                loader: 'html-loader',
                options: {
                    attributes: false,
                    // Para que minimice el html
                    minimize: true,
                },
            },
            {
                // Para que acepte los diferentes formatos de imagen
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            eModule: false
                        }
                    }
                ]

            }
        ]
    },
    
    // Configuramos el plugin

    plugins: [
        new HtmlWebPackPlugin({
            // le indicamos que archivo queremos tomar 
           template : './src/index.html',
           // y en donde queremos colocarlo
           filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            // De la carpeta de assets en dist quiero que cree 
            // la carpeta assets 
            patterns: [
                {from: 'src/assets', to: 'assets/'}
            ]
        })
    ]

}