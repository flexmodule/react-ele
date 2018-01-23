var webpack =require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool:"source-map",
    entry: {
        index:path.join(__dirname , "src/index.js")
    }, //已多次提及的唯一入口文件
    output: {
        path: path.join(__dirname ,"dist"), //打包后的文件存放的地方
        filename: "[name].bundle.js",//打包后输出文件的文件名
        publicPath:"/dist/"   //webpack output is served from
    },

    devServer: {
        inline:true,
        contentBase: "./",  //content not from webpack is serverd
        port: '8088',
        historyApiFallback: true,

        proxy:{
           '/bgs/weather': {
              target: 'https://restapi.ele.me',
              host: 'restapi.ele.me',
              changeOrigin:true,
              // pathRewrite: {
              //     '^/v4/api': '/v4/api'
              //   }
          },
          '/bgs/poi': {
              target: 'https://restapi.ele.me',
              host: 'restapi.ele.me',
              changeOrigin:true,
              // pathRewrite: {
              //     '^/v4/api': '/v4/api'
              //   }
          },
          '/shopping/v3':{
              target: 'https://restapi.ele.me',
              host: 'restapi.ele.me',
              changeOrigin:true,
          },
          '/shopping/v1':{
              target: 'https://restapi.ele.me',
              host: 'restapi.ele.me',
              changeOrigin:true,
          },
          '/shopping/v2': {
              target: 'https://restapi.ele.me',
              host: 'restapi.ele.me',
              changeOrigin:true,
          },
          '/shopping/restaurants': {
              target: 'https://restapi.ele.me',
              host: 'restapi.ele.me',
              changeOrigin:true,
          },
          '/shopping/restaurant': {
              target: 'https://restapi.ele.me',
              host: 'restapi.ele.me',
              changeOrigin:true,
          },
          '/ugc/v2/': {
              target: 'https://restapi.ele.me',
              host: 'restapi.ele.me',
              changeOrigin:true,
          },
          '/marketing/v1/': {
              target: 'https://restapi.ele.me',
              host: 'restapi.ele.me',
              changeOrigin:true,
          },
          '/member/v1': {
              target: 'https://restapi.ele.me',
              host: 'restapi.ele.me',
              changeOrigin:true,
          }, 
           '/hotfood/v1': {
              target: 'https://restapi.ele.me',
              host: 'restapi.ele.me',
              changeOrigin:true,
          }
        }
    },

    module:{
        loaders:[
         
            {
                test: /\.css$/,
                 loader: 'style-loader!css-loader'//添加对样式表的处理,内联样式
                // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })//外部样式
            },

            {
                test: /\.scss$/,
                 loader: 'style-loader!css-loader!sass-loader'//添加对样式表的处理,内联样式
                // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })//外部样式
            },

            {
                test:/\.js$/, //随便起的test 名字
                exclude: /node_modules/, //排除一个
                // exclude: /(node_modules|src)/, //*****排除多个怎么写？？？
                loader:'babel-loader',
                query:{
                    presets:['env','react']
                }
                
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[ext]?[hash]' //目标文件夹
                }
            }, 

            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[ext]'
                }
            }
            
        ]
    },
    resolve: {
        alias: {
          '@': path.resolve("src")
        }
        //起一个别名@ 代替src
    },
    

    plugins:[
     new webpack.ProvidePlugin({
            axios: 'axios'  //各个模块都可以使用axios
        })
        // new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true })
    ]    
}
