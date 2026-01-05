Events.on(EventType.ClientLoadEvent,()=>{
    var url = "https://mdt.wayzer.top/api/servers/servers.json"
    var callback = d=>{
        try {
            let list = JSON.parse(new java.lang.String(d.getResult(),"UTF-8"));
            Core.app.post(()=>{
                try {
                    //Vars.defaultServers.clear();
                    list.forEach(t=>{
                        Vars.defaultServers.add(ServerGroup(t.name,t.address))
                    })
                } catch (error) {print(error)}
            })
        } catch (error) {print(error)}
    }
    
    if(Version.build>=128)
        Http.get(url,callback)
    else
        Core.net.httpGet(url,callback,()=>{})
})

// 安全获取社区服务器数据（绝不 eval/require 远程返回）
// 请把 url 替换为真实 API 地址
var url = "https://mdt.wayzer.top/api/your-endpoint";

function printSnippet(tag, txt, len){
    len = len || 200;
    try{
        print(tag + ": " + (typeof txt === "string" ? txt.substring(0, len) : String(txt).substring(0, len)));
    }catch(e){
        print(tag + " (无法显示片段): " + e);
    }
}

function isLikelyHtml(txt){
    if(!txt || typeof txt !== "string") return false;
    var t = txt.trim();
    return t.length > 0 && t.charAt(0) === "<";
}

function handleServerResponseBody(txt){
    if(!txt){
        print("服务器返回为空字符串");
        return;
    }

    if(isLikelyHtml(txt)){
        print("远程接口返回 HTML（可能 404/被拦截/返回页面），不会执行。响应片段：");
        printSnippet("HTML片段", txt, 1000);
        return;
    }

    // 尝试解析 JSON
    try{
        var json = JSON.parse(txt);
        if(Array.isArray(json)){
            print("成功解析服务器数据，条目数: " + json.length);
            // TODO: 按你需要把 json 填充到 UI/列表，示例仅打印
            // updateServerList(json);
        } else {
            print("成功解析为 JSON 对象，键: " + Object.keys(json).join(", "));
        }
        return;
    }catch(e){
        print("解析 JSON 失败: " + e);
    }

    // 作为纯文本处理（不会执行）
    try{
        var lines = txt.split(/\r?\n/).map(function(s){ return s.trim(); }).filter(function(s){ return s.length > 0; });
        print("作为文本解析到行数: " + lines.length);
        // TODO: 根据文本格式处理 lines
    }catch(e){
        print("文本解析出错: " + e);
    }
}

function handleServerResponse(result){
    try{
        // 不同回调可能传入不同值：字符串或带 body 的对象
        var txt = null;
        if(typeof result === "string"){
            txt = result;
        } else if(result && result.body){
            txt = result.body;
        } else if(result && typeof result.toString === "function"){
            txt = result.toString();
        } else {
            txt = String(result);
        }
        print("收到远程响应，长度: " + (txt ? txt.length : "null"));
        printSnippet("开头片段", txt, 200);
        handleServerResponseBody(txt);
    }catch(e){
        print("处理响应时异常: " + e);
    }
}

function handleError(err){
    try{
        print("请求失败: " + err);
    }catch(e){
        print("请求失败且无法打印错误");
    }
}

// 发起请求：优先使用 Core.net.httpGet（Mindustry 桌面/移动端适配），否则尝试 Http.get
try{
    if(typeof Core !== "undefined" && Core.net && typeof Core.net.httpGet === "function"){
        // Core.net.httpGet(url, successCallback(bodyString), errorCallback)
        Core.net.httpGet(url, handleServerResponse, handleError);
    }else if(typeof Http !== "undefined" && typeof Http.get === "function"){
        // Http.get(url, function(response)){ some env pass object/text
        Http.get(url, function(r){
            if(r && r.body) handleServerResponse(r.body);
            else handleServerResponse(r);
        }, handleError);
    }else{
        print("没有可用的 HTTP 接口 (Core.net.httpGet / Http.get)，无法发起请求。");
    }
}catch(e){
    print("发起请求时异常: " + e);
}

// 把网络请求放到客户端加载完成后再执行
Events.on(EventType.ClientLoad, function(){
    try{
        var url = "https://mdt.wayzer.top/api/your-endpoint"; // 替换为真实 API

        print("尝试获取社区服务器列表: " + url);

        // 使用 Mindustry 提供的网络接口（非阻塞），并在错误回调中输出诊断
        if(typeof Core !== "undefined" && Core.net && typeof Core.net.httpGet === "function"){
            Core.net.httpGet(url, function(response){
                try{
                    var body = (response && response.body) ? response.body : response;
                    if(!body){
                        print("[服务器] 返回为空");
                        return;
                    }
                    var txt = (typeof body === "string") ? body.trim() : String(body).trim();
                    if(txt.charAt(0) === "<"){
                        print("[服务器] 返回 HTML（可能 404/被拦截），前200字符：\n" + txt.substring(0,200));
                        return;
                    }
                    try{
                        var json = JSON.parse(txt);
                        print("[服务器] 获取成功，条目: " + (Array.isArray(json) ? json.length : Object.keys(json).length));
                        // TODO: 处理 json 填充服务器列表
                    }catch(e){
                        print("[服务器] 解析 JSON 失败: " + e + "；返回片段:\n" + txt.substring(0,200));
                    }
                }catch(e){
                    print("[服务器] 成功回调处理异常: " + e);
                }
            }, function(err){
                try{
                    print("[服务器] 请求失败: " + err);
                    // 打印底层 stacktrace（若可用）
                    try{ if(err && err.printStackTrace) err.printStackTrace(); }catch(e){}
                }catch(e){
                    print("[服务器] 错误回调处理异常: " + e);
                }
            });
        } else {
            print("[服务器] 无可用的 HTTP 接口（Core.net.httpGet / Http.get）");
        }
    }catch(e){
        print("[服务器] 发起请求异常: " + e);
    }
});