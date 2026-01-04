//by Eissentam和大G老师（GitHub协作完成）
//mars-resources.js
//此js用于导出火星所有方块，供科技树及其他模块引用

// 改为懒初始化：先把所有导出设为 null，然后在 ClientLoadEvent 中尝试从适配器模块或 Vars.content 回填真实对象

function fallbackFindByContent(name){
    try{
        var ContentType = (typeof Java !== 'undefined' && Java.type) ? Java.type("mindustry.ctype.ContentType") : null;
        if(ContentType){
            var b = Vars.content.getByName(ContentType.block, "太阳系模组-" + name);
            if(b) return b;
        }
    }catch(e){}
    try{
        var blocks = Vars.content.blocks();
        for(var i=0;i<blocks.size;i++){
            var bb = blocks.get(i);
            if(!bb) continue;
            if(bb.name === "太阳系模组-" + name || bb.name === name) return bb;
            if(bb.localizedName && bb.localizedName === name) return bb;
        }
    }catch(e){}
    return null;
}

// 初始化导出为 null
var keys = [
    "核聚变反应堆","太阳能板","探照灯","微波发电机","远征一号","硅矿","石墨矿",
    "小钢炮","大型精炼钢墙","大型土钢墙","精炼钢墙","土钢墙",
    "精炼钢厂","游离粒子捕捉器","绝热装甲导管","铅传送带","土钢传送带","土钢路由器","热力钻头"
];
for(var k=0;k<keys.length;k++) exports[keys[k]] = null;

// mapping: export key -> candidate module ids (relative to scripts root) to require
var mapping = {
    "核聚变反应堆": ["blocks/火星/电力/核聚变反应堆"],
    "太阳能板": ["blocks/火星/电力/太阳能板"],
    "探照灯": ["blocks/火星/电力/探照灯"],
    "微波发电机": ["blocks/火星/电力/微波发电机"],
    "远征一号": ["blocks/远征一号","blocks/火星/核心/远征一号"],
    "硅矿": ["blocks/火星/矿物/硅矿"],
    "石墨矿": ["blocks/火星/矿物/石墨矿"],
    "小钢炮": ["blocks/火星/炮塔/小钢炮"],
    "大型精炼钢墙": ["blocks/火星/墙/大型精炼钢墙"],
    "大型土钢墙": ["blocks/火星/墙/大型土钢墙"],
    "精炼钢墙": ["blocks/火星/墙/精炼钢墙"],
    "土钢墙": ["blocks/火星/墙/土钢墙"],
    "精炼钢厂": ["blocks/火星/生产/精炼钢厂"],
    "游离粒子捕捉器": ["blocks/火星/生产/游离粒子捕捉器"],
    "绝热装甲导管": ["blocks/火星/液体/绝热装甲导管"],
    "铅传送带": ["blocks/火星/运输/铅传送带"],
    "土钢传送带": ["blocks/火星/运输/土钢传送带"],
    "土钢路由器": ["blocks/火星/运输/土钢路由器"],
    "热力钻头": ["blocks/热力钻头","blocks/火星/钻头/热力钻头"]
};

function tryRequireModule(id){
    try{
        var mod = require(id);
        return mod;
    }catch(e){
        return null;
    }
}

function isUnlockable(obj){
    try{
        if(!obj) return false;
        if(typeof Java !== 'undefined' && Java.type){
            var UC = Java.type("mindustry.content.UnlockableContent");
            return UC.class.isInstance(obj);
        }
    }catch(e){}
    // best-effort JS heuristic: has 'build' or 'requirements' or 'research' properties
    try{
        if(obj.build || obj.requirements || obj.research) return true;
    }catch(e){}
    return false;
}

function findUnlockableIn(obj, depth){
    depth = depth || 3;
    if(!obj || depth < 0) return null;
    if(isUnlockable(obj)) return obj;
    try{
        if(typeof obj === 'object'){
            var ks = Object.keys(obj);
            for(var i=0;i<ks.length;i++){
                var v = obj[ks[i]];
                if(isUnlockable(v)) return v;
            }
            for(var i2=0;i2<ks.length;i2++){
                var v2 = obj[ks[i2]];
                var found = findUnlockableIn(v2, depth-1);
                if(found) return found;
            }
        }
    }catch(e){}
    return null;
}

function initResources(){
    for(var i=0;i<keys.length;i++){
        var name = keys[i];
        var assigned = false;
        var candidates = mapping[name] || ["blocks/"+name];
        for(var j=0;j<candidates.length && !assigned;j++){
            var mod = tryRequireModule(candidates[j]);
            if(mod){
                // 1) explicit same-name export
                if(mod[name] && isUnlockable(mod[name])){ exports[name] = mod[name]; assigned = true; print("mars-resources: " + name + " <- module." + name); break; }
                // 2) try to find UnlockableContent anywhere in module (recursively)
                var found = findUnlockableIn(mod, 3);
                if(found){ exports[name] = found; assigned = true; print("mars-resources: " + name + " <- found in module (recursive)"); break; }
                // 3) try some common properties
                if(mod.block && isUnlockable(mod.block)) { exports[name] = mod.block; assigned = true; print("mars-resources: " + name + " <- module.block"); break; }
                if(mod.unit && isUnlockable(mod.unit)) { exports[name] = mod.unit; assigned = true; print("mars-resources: " + name + " <- module.unit"); break; }
                // 4) fallback: if module has exactly one export, assign it but only if it looks like a candidate (heuristic)
                try{
                    var modKeys = Object.keys(mod);
                    if(modKeys.length === 1){
                        var single = mod[modKeys[0]];
                        var deep = findUnlockableIn(single, 3);
                        if(deep){ exports[name] = deep; assigned = true; print("mars-resources: " + name + " <- module." + modKeys[0] + " (single, recursive)"); break; }
                    }
                }catch(e){}
            }
        }
        if(!assigned){
            // fallback to content lookup
            var found = fallbackFindByContent(name);
            if(found){ exports[name] = found; assigned = true; }
        }
        if(!assigned){
            // leave as null and log for diagnostics
            print("mars-resources: 未找到资源 -> " + name);
        }
    }
}

// 可由 F8 手动触发的初始化（便于调试）
exports._initNow = function(){
    try{
        initResources();
        print("mars-resources: 手动 init 完成");
    }catch(e){
        print("mars-resources: 手动 init 异常 -> " + e);
    }
};

// 简单诊断：打印当前 exports 中每个 key 的状态
exports._diagnose = function(){
    try{
        for(var i=0;i<keys.length;i++){
            var n = keys[i];
            var v = exports[n];
            print("mars-resources: " + n + " -> " + (v ? (v.name || v.localizedName || typeof v) : "null"));
        }
    }catch(e){ print("mars-resources: diagnose 异常 -> " + e); }
};

// 稳健访问器：避免控制台中点语法/标识符问题
exports.get = function(name){
    try{ return exports[name]; }catch(e){ return undefined; }
};

exports.keys = function(){
    try{ return keys.slice(); }catch(e){ return []; }
};

if(typeof ClientLoadEvent !== 'undefined' && typeof Events !== 'undefined'){
    Events.on(ClientLoadEvent, initResources);
} else {
    // fallback: try immediate init (some environments)
    try{ initResources(); }catch(e){}
}