const 超代核心 = extend(CoreBlock, "超代核心", {
	setStats() {
		this.super$setStats();
		this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
	},
	canBreak(tile) {
		return Vars.state.teams.cores(tile.team()).size > 1;
	},
	canReplace(other) {
		return other.alwaysReplace;
	},
	canPlaceOn(tile, team, rotation) {
		return Vars.state.teams.cores(team).size < 10;
	}
});
