const lib = require("base/earthlib");

const earth = new Planet("地球", Planets.sun, 1, 3.4);
earth.meshLoader = prov(() => new MultiMesh(
    new HexMesh(earth, 7)
));
earth.cloudMeshLoader = prov(() => new MultiMesh(
    new HexSkyMesh(earth, 3, 0.14, 0.14, 5, Color.valueOf("8CA9E860"), 2, 0.42, 1, 0.43),
    new HexSkyMesh(earth, 3, 0.6, 0.15, 5, Color.valueOf("8CA9E880"), 2, 0.42, 1.2, 0.45)
));
earth.generator = new SerpuloPlanetGenerator();
earth.visible = true;
earth.accessible = true;
earth.alwaysUnlocked = true;
earth.clearSectorOnLose = false;
earth.tidalLock = false;
earth.localizedName = "地球";
earth.bloom = false;
earth.startSector = 1;
earth.orbitRadius = 85;
earth.orbitTime = 180 * 60;
earth.rotateTime = 90 * 60;
earth.atmosphereRadIn = 0.02;
earth.atmosphereRadOut = 0.3;
earth.atmosphereColor = Color.valueOf("8CA9E890");
earth.lightColor = Color.valueOf("8CA9E890");

// 添加图标颜色
earth.iconColor = Color.valueOf("8CA9E8");

exports.earth = earth;

const 东亚地区 = new SectorPreset("东亚地区", earth, 3);
东亚地区.description = "我们视为家园的地球现在同样危机四伏做，好准备吧要降落了";
东亚地区.difficulty = 4;
东亚地区.alwaysUnlocked = false;
东亚地区.addStartingItems = true;
东亚地区.captureWave = 30;
东亚地区.localizedName = "东亚地区";
exports.东亚地区 = 东亚地区;
lib.addToResearch(东亚地区, {
    parent: "planetaryTerminal",
    objectives: Seq.with(
        new Objectives.SectorComplete(SectorPresets.planetaryTerminal))
});

const 欧洲地区 = new SectorPreset("欧洲地区", earth, 214);
欧洲地区.description = "欧洲，全称欧罗巴洲自17世纪以来，欧洲逐渐成为世界经济中心，当然也成为了敌人的聚集中心，我们会随机降落在5个国家的首都做好准备吧";
欧洲地区.difficulty = 2;
欧洲地区.alwaysUnlocked = false;
欧洲地区.addStartingItems = true;
欧洲地区.captureWave = 45;
欧洲地区.localizedName = "欧洲地区";
exports.欧洲地区 = 欧洲地区;
lib.addToResearch(欧洲地区, {
    parent: "东亚地区",
    objectives: Seq.with(
        new Objectives.SectorComplete(东亚地区))
});