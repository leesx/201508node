/**
 * Created by caomei on 2015/12/5.
 */
/**
 * 5.说明一下cookie的哪些参数，分别有什么作用？
 *
 *  donmain 指定cookie会发送到哪些域名下
 *  path  控制访问哪些路径可以看到cookie (把cookie发送到服务器)
 *  size  cookie的总长度
 *  expire/max-age 指定cookie的失效时间，如果不指定 cookie不会写入硬盘，持续到浏览器关闭为止
 *  expire：受客户端影响，不是很精确，如果客户端改动本地之间，会受影响
 *  max-age: 倒计时，不受客户端时间的影响
 *  httpOnly: cookie只能被浏览器读到，用js读不到而且不能操作，防止客户端进行篡改
 *
 *
 *  1.一旦服务器向客户端发了cookie,以后除非 cookie过期，否则 浏览器每次都会向服务器发cookie
    2.存放在客户端，容易被篡改
 -------------------------------
    1.不要存储私密数据
    2.正确的设置path domain 以减少cookie的发送
    3. 正确的设置httpOnly防止cookie被篡改

 //直接通过req.cookies.key获取对应cookies中记录的value值
    req.cookies.remember
 //输入key值，清除对应的value值
    res.clearCookie('remember');
 **/

var http = require('http');
var url = require('url');
var queryString = require('querystring');

http.createServer(function(req, res){
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if(pathname == '/favicon.ico'){
        return res.end('404');
    }else if(pathname == '/write'){
        res.writeHead(200, {'Content-type':'text/html', 'Set-Cookie':['name=zfpx','isAdmin=1']});
        //res.setHeader('Set-Cookie', 'name=zfpx');
        //res.setHeader('Set-Cookie', 'age=6;path=/a');
        //res.setHeader('Set-Cookie', 'age=6;Expires='+new Date(new Date().getTime()+3600*1000).toGMTString());
        //res.setHeader('Set-Cookie', 'age=6;Max-Age=20');//Max-Age的单位是秒
        //res.setHeader('Set-Cookie', 'age=6;HttpOnly');
        res.end('write cookies');
    }else{
        //console.log(req);
        var cookieObj = queryString.parse(req.headers.cookie,';');
        console.log(cookieObj);
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        //res.write(req.headers.cookie);
        if(cookieObj.age){
            res.end('老用户')
        }else{
            res.end('新用户')
        }
    }
}).listen(8080);
