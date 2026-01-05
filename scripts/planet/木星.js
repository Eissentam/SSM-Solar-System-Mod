const lib = require("base/marslib");
const TBLY = new Planet("木星（类地化）", Planets.sun, 1, 3.2);
TBLY.meshLoader = prov(() => new MultiMesh(
	new HexMesh(TBLY, 8)
));
TBLY.cloudMeshLoader = prov(() => new MultiMesh(
	new HexSkyMesh(TBLY, 2, 0.15, 0.14, 5, Color.valueOf("8CA9E860"), 2, 0.42, 1, 0.43),
	new HexSkyMesh(TBLY, 3, 0.6, 0.15, 5, Color.valueOf("8CA9E880"), 2, 0.42, 1.2, 0.45)
));
TBLY.generator = new SerpuloPlanetGenerator();
TBLY.visible = TBLY.accessible = TBLY.alwaysUnlocked =  true;
TBLY.clearSectorOnLose = false;
TBLY.tidalLock = false;
TBLY.localizedName = "木星（类地化）";
TBLY.bloom = false;
TBLY.startSector = 1;
TBLY.orbitRadius = 100;
TBLY.orbitTime = 210 * 90;
TBLY.rotateTime = 120 * 90;
TBLY.atmosphereRadIn = 2;
TBLY.atmosphereRadOut = 0.6;
TBLY.atmosphereColor = TBLY.lightColor = Color.valueOf("8CA9E890");
TBLY.hiddenItems.addAll(Items.erekirItems).removeAll(Items.serpuloItems);
