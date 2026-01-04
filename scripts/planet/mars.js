try {
const lib = require("base/marslib");
const item = require("base/ssmitem");
// 添加远征一号的导入
const 远征一号 = require("blocks/远征一号");
// 使用构造函数创建火星
const mars = new Planet("mars", Planets.sun, 1, 3.3);


// 设置网格加载器
mars.meshLoader = prov(() => new MultiMesh(
    new HexMesh(mars, 8)
));

// 设置云层网格加载器
mars.cloudMeshLoader = prov(() => new MultiMesh(
    new HexSkyMesh(mars, 2, 0.15, 0.14, 5, Color.valueOf("F5560060"), 2, 0.42, 1, 0.43),
    new HexSkyMesh(mars, 3, 0.6, 0.15, 5, Color.valueOf("F5560060"), 2, 0.42, 1.2, 0.45)
));

// 设置行星生成器（只设置一次）
mars.generator = extend(SerpuloPlanetGenerator, {
    getDefaultLoadout() {
        return Schematics.readBase64("bXNjaAF4nGNgYWBhZmDJS8xNZeB5sX/O032NT3Y0PO3fzsCdklqcXJRZUJKZn8fAwMCWk5iUmlPMwBQdy8gg83TJqpczNj/fvPvZioXPd7foouhkYGAEISABAOilJlk=")
    }
});

// 设置行星属性
mars.visible = true;
mars.accessible = true;
mars.alwaysUnlocked = true;
mars.clearSectorOnLose = false;
mars.tidalLock = false;
mars.localizedName = "火星";
mars.bloom = false;
mars.startSector = 1;
mars.orbitRadius = 95;
mars.orbitTime = 180 * 60;
mars.rotateTime = 90 * 60;
mars.atmosphereRadIn = 0.02;
mars.atmosphereRadOut = 0.3;
mars.atmosphereColor = Color.valueOf("F5560090");
mars.lightColor = Color.valueOf("F5560090");

// 设置图标颜色（正确的属性名）
mars.iconColor = Color.valueOf("F5560090");

// 设置默认核心 - 在mars定义之后
// 设置默认核心 - 添加检查

mars.allowLaunchLoadout = true;

exports.mars = mars;

// 创建地区预设
const 初始地区 = new SectorPreset("初始地区", mars, 1);
初始地区.description = "这里将是火星之旅的开端";
初始地区.difficulty = 1;
初始地区.alwaysUnlocked = true;
初始地区.addStartingItems = true;
初始地区.captureWave = 1;
初始地区.localizedName = "初始地区";
exports.初始地区 = 初始地区;
lib.addToResearch(初始地区, {
    parent: "groundZero",
    objectives: Seq.with(
        new Objectives.SectorComplete(SectorPresets.groundZero))
});

const 火星文明 = new SectorPreset("火星文明", mars, 100);
火星文明.description = "我们竟然在火星上发现了外星文明！本以为是赛普罗星上的敌人登陆了火星，没想到竟然是火星上的敌对外星文明，但是眼前的场景让我们非常的棘手利用我们现有的科技碾碎他们";
火星文明.difficulty = 1;
火星文明.alwaysUnlocked = false;
火星文明.addStartingItems = true;
火星文明.captureWave = 5;
火星文明.localizedName = "火星文明";
exports.火星文明 = 火星文明;
lib.addToResearch(火星文明, {
    parent: "初始地区",
    objectives: Seq.with(
        new Objectives.SectorComplete(初始地区))
});

const 火星基地 = new SectorPreset("火星基地", mars, 22);
火星基地.description = "这所基地是我方早期探索星际时留下的小型基地但在很久以前就已经被攻陷了，狡猾的敌人将基地占为己有，拿下他！";
火星基地.difficulty = 2;
火星基地.alwaysUnlocked = false;
火星基地.addStartingItems = true;
火星基地.captureWave = 0;
火星基地.localizedName = "火星基地";
exports.火星基地 = 火星基地;
lib.addToResearch(火星基地, {
    parent: "火星文明",
    objectives: Seq.with(
        new Objectives.SectorComplete(火星文明))
});

const 星际仓库 = new SectorPreset("星际仓库", mars, 150);
星际仓库.description = "这里貌似是一个星际仓库，我们的资源已所剩无几，夺取它！";
星际仓库.difficulty = 6;
星际仓库.alwaysUnlocked = false;
星际仓库.addStartingItems = false;
星际仓库.captureWave = 0;
星际仓库.localizedName = "星际仓库";
exports.星际仓库 = 星际仓库;
lib.addToResearch(星际仓库, {
    parent: "火星基地",
    objectives: Seq.with(
        new Objectives.SectorComplete(火星基地))
});

const 火星人的阴谋 = new SectorPreset("火星人的阴谋", mars, 68);
火星人的阴谋.description = "这是一个阴谋!我们被火星人算计了，现在四周都被包围了，坚持住";
火星人的阴谋.difficulty = 8;
火星人的阴谋.alwaysUnlocked = false;
火星人的阴谋.addStartingItems = false;
火星人的阴谋.captureWave = 45;
火星人的阴谋.localizedName = "火星人的阴谋";
exports.火星人的阴谋 = 火星人的阴谋;
lib.addToResearch(火星人的阴谋, {
    parent: "星际仓库",
    objectives: Seq.with(
        new Objectives.SectorComplete(星际仓库))
});

// 确保远征一号正确导出
exports.远征一号 = 远征一号;

    print("火星加载成功");
} catch (err) {
    print("火星加载失败: " + err,"请联系开发者修复");
}
