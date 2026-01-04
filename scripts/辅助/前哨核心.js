const 前哨核心 = extend(CoreBlock, "前哨核心", {
	setStats() {
		this.super$setStats();
		this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
	},
	canBreak(tile) {
		return Vars.state.teams.cores(tile.team()).size > 1;
	},
	canReplace(other,cores) {
		return other.alwaysReplace;
	},
	canPlaceOn(tile, team, rotation) {
		return Vars.state.teams.cores(team).size < 12;
	}
});
