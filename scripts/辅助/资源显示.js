//原作者，miner
//改编者，缝合怪帕奇维克
//抄袭者，年年有鱼
/*年年有鱼都抄，我Eissentam不抄怎么可能行（bushi）*/
//乐
var table = new Table();
var usedItems = new ObjectSet();
var scale = 0.85;
var player = null;

function setup() {
	table.background(Styles.black3);
	let iconSize = Vars.iconSmall * scale;
	table.table(null, itemsTable => {
		var rebuild = () => {
			itemsTable.clear();
			let i = 0;
			Vars.content.items().each((item) => {
				if (!usedItems.contains(item)) return;

				itemsTable.image(item.uiIcon).size(iconSize);

				itemsTable.label(() => "" + UI.formatAmount(player.core() == null ? 0 : player.core().items.get(item))).padRight(5).minWidth(iconSize + 5).get().setFontScale(scale);
				if (++i % 5 == 0) itemsTable.row();
			});
		};

		itemsTable.update(t => {
			Vars.content.items().each(item => {
				if (player.core() != null && player.core().items.get(item) > 0 && usedItems.add(item)) {
					rebuild();
				}
			});
		});
	});

	table.row();

	table.table(null, info => {
		let addInfo = (icon, l) => {
			info.image(icon).size(iconSize).growX();
			info.label(l).padRight(5).get().setFontScale(scale);
		}

		addInfo(Blocks.coreNucleus.uiIcon, () => player.team().cores().size + "");
		addInfo(UnitTypes.gamma.uiIcon, () => {
			let team = player.team();
			return "[#" + team.color + "]" + countPlayer(team) + "[]/[accent]" + Groups.player.size();
		});
	}).growX();
}

Events.on(ResetEvent, e => {
	usedItems.clear();
});

Events.on(EventType.ClientLoadEvent, cons(e => {
	Vars.ui.settings.graphics.checkPref("资源显示", Core.settings.getBool("资源显示"));
	player = Vars.player;
	setup();
	Vars.ui.hudGroup.fill(cons(t => {
		t.visibility = boolp(()=> Core.settings.getBool("资源显示"));
		t.left().name = "coreItems/info";
		t.add(table);

		// 可拖动的ui
		t.addListener(extend(InputListener, {
			lastx: 0,
			lasty: 0,

			touchDown(event, x, y, pointer, button) {
				var v = t.localToParentCoordinates(Tmp.v1.set(x, y));
				this.lastx = v.x;
				this.lasty = v.y;
				return true;
			},

			touchDragged(event, x, y, pointer) {
				var v = t.localToParentCoordinates(Tmp.v1.set(x, y));
				t.translation.add(v.x - this.lastx, v.y - this.lasty);
				this.lastx = v.x;
				this.lasty = v.y;
			},
		}));

	}));
}));

function countUnit(unitType, team) {
	return team.data().countType(unitType);
}

function countPlayer(team) {
	return team.data().players.size;
}