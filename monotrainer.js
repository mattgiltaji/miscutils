
//todo: factor unit cost vs dps/eps into upgrades vs unit purchases
costScholar = Math.floor(100 * Math.pow(1.2,ownedScholar));
costMelee = Math.floor(5 * Math.pow(1.2,ownedMelee));
costRanged = Math.floor(50 * Math.pow(1.2,ownedRanged));
costMounted = Math.floor(750 * Math.pow(1.2,ownedMounted));
costSiege = Math.floor(15000 * Math.pow(1.2,ownedSiege));
costAircraft = Math.floor(200000 * Math.pow(1.2,ownedAircraft));

//cost-benefit ratio is always in terms of increased EPS divided by EP cost,
//so benefits are just the increased EPS
convertDpsToEps = function(dps) {
    return (dps/damageToEvo);
};

powerUpSwordBenefit = function(newSwordPower) {
    return convertDpsToEps((newSwordPower - swordPower) * swordHitsPerSecond * bonusDPS);
};

powerUpGenericArmyUnitBenefit = function(newUnitPower, oldUnitPower, numUnits) {
    return convertDpsToEps((newUnitPower - oldUnitPower) * numUnits * DPSMultiplier * bonusDPS);
};

addGenericArmyUnitBenefit = function(unitPower) {
    return convertDpsToEps(unitPower * DPSMultiplier * bonusDPS);
};

powerUpScholarBenefit = function(newUnitPower) {
    return ((newUnitPower - powerScholar) * ownedScholar * (EPSMultiplier + (statShards * 0.01)) * bonusEPS);
};

addScholarBenefit = function(unitPower) {
    return (unitPower * (EPSMultiplier + (statShards * 0.01)) * bonusEPS);
};

addRawEpsBenefit = function(newEPS) {
    return ((newEPS - EPS2) * (EPSMultiplier + (statShards*0.01)));
};

addMeleeBenefit = function () { return addGenericArmyUnitBenefit(powerMelee); };
addRangedBenefit = function () { return addGenericArmyUnitBenefit(powerRanged); };
addMountedBenefit = function () { return addGenericArmyUnitBenefit(powerMounted); };
addSiegeBenefit = function () { return addGenericArmyUnitBenefit(powerSiege); };
addAircraftBenefit = function () { return addGenericArmyUnitBenefit(powerAircraft); };
powerUpMeleeBenefit = function (newPower) {
    return powerUpGenericArmyUnitBenefit(newPower, powerMelee, ownedMelee);
};
powerUpRangedBenefit = function (newPower) {
    return powerUpGenericArmyUnitBenefit(newPower, powerRanged, ownedRanged);
};
powerUpMountedBenefit = function (newPower) {
    return powerUpGenericArmyUnitBenefit(newPower, powerMounted, ownedMounted);
};
powerUpSiegeBenefit = function (newPower) {
    return powerUpGenericArmyUnitBenefit(newPower, powerSiege, ownedSiege);
};
powerUpAircraftBenefit = function (newPower) {
    return powerUpGenericArmyUnitBonus(newPower, powerAircraft, ownedAircraft);
};

improveDpsConversionBenefit = function () {
    var currDPS = damageCalc();
    return (currDPS / damageToEvo) - (currDPS / (damageToEvo - 1));
};

improveDpsBonusBenefit = function(newBonus) {
    return convertDpsToEps(damageCalcNoBonus() * newBonus - damageCalc());
};

improveEpsBonusBenefit = function(newBonus) {
    return (EPSCalcNoBonus() * newBonus - EPSCalc());
};

improveDpsMultiplierBenefit = function(newMultiplier) {
    var currDps = damageCalc();
    return convertDpsToEps(newMultiplier * currDps / DPSMultiplier - currDps);
};

improveEpsMultiplierBenefit = function(newMultiplier) {
    return ((newMultiplier - EPSMultiplier) * (EPS2 + powerScholar * ownedScholar ) * bonusEPS);
};


//todo: handle the swordUnitMultiplier() effects on some upgrades (5b, 6b, 7b)
//      technically after the unlock hits, adding a unit should include the increased swordpower benefit
//      but does it make a real difference to the outcome?
//todo: handle the benefits of bonus unlocks (warcry, crit, breakthrough)
//      does it make a real difference to the outcome?
//todo: come up with some cost for the bare unit unlocks
//    maybe cost = unlock cost + 1st unit cost and benefit is 1st unit added dps? if so, chain the clicks together
//
/*
sword_01_a -> powerUpSwordBenefit(swordPower+3)
sword_02_a -> powerUpSwordBenefit(swordPower * 2)
sword_02_b -> powerUpSwordBenefit(swordPower + 10)
sword_03_a -> powerUpSwordBenefit(swordPower * 2) //also adds crit hit
sword_03_b -> powerUpSwordBenefit(swordPower + 40)
sword_04_a -> powerUpSwordBenefit(swordPower * 2)
sword_04_b -> powerUpSwordBenefit(swordPower + 250)
sword_05_a -> powerUpSwordBenefit(swordPower * 2)
sword_05_b -> powerUpSwordBenefit(swordPower + 600) //also adds 5 * number of current units
sword_06_a -> powerUpSwordBenefit(swordPower * 2)
sword_06_b -> powerUpSwordBenefit(swordPower * 3000) //also adds 5 * number of current units
sword_07_a -> powerUpSwordBenefit(swordPower * 2)
sword_07_b -> powerUpSwordBenefit(swordPower + 15000) //also adds 4 * number of current units
*/
/*
upgradeMonolith_01_a -> powerUpScholarBenefit(powerScholar + 2)
upgradeMonolith_01_b -> addRawEpsBenefit(EPS2 + 10)
upgradeMonolith_01_c -> powerUpMeleeBenefit(powerMelee + 2)
upgradeMonolith_01_d -> improveDpsConversionBenefit() //also upgrades era

upgradeMonolith_02_a -> improveDpsMultiplierBenefit(DPSMultiplier + 0.1)
upgradeMonolith_02_b -> powerUpScholarBenefit(powerScholar +10)
upgradeMonolith_02_c -> improveDpsConversionBenefit() //also upgrades era

upgradeBarracks_02_a -> powerUpMeleeBenefit(powerMelee + 3)
upgradeBarracks_02_b -> powerUpRangedBenefit(powerRanged + 8)

upgradeMonolith_03_a -> improveDpsMultiplierBenefit(DPSMultiplier + 0.1)
upgradeMonolith_03_b -> enables horses... how do we put an EPS price on that?
upgradeMonolith_03_c -> powerUpScholarBenefit(powerScholar + 20) //also unlocks breakthrough
upgradeMonolith_03_d -> improveEpsMultiplierBenefit(EPSMultiplier + 0.1)
upgradeMonolith_03_e -> improveDpsConversionBenefit() //also upgrades era

upgradeBarracks_03_a -> powerUpMeleeBenefit(powerMelee * 2)
upgradeBarracks_03_b -> powerUpRangedBenefit(powerRanged * 2)
upgradeBarracks_03_c -> improveDpsMultiplierBenefit( DPSMultiplier + 0.25)

upgradeMonolith_04_a -> unlocks siege. yay!
upgradeMonolith_04_b -> addRawEpsBenefit(EPS2 + 800)
upgradeMonolith_04_c -> improveEpsMultiplierBenefit(EPSMultiplier + 1.0)
upgradeMonolith_04_d -> improveDpsConversionBenefit() //also upgrades era

upgradeBarracks_04_a -> powerUpMeleeBenefit(powerMelee * 2)
upgradeBarracks_04_b -> powerUpRangedBenefit(powerRanged * 2)
upgradeBarracks_04_c -> powerUpMountedBenefit(powerMounted + 100)
upgradeBarracks_04_d -> improveDpsMultiplierBenefit(DPSMultiplier + 0.25)

upgradeSiege_04_a -> powerUpSiegeBenefit(powerSiege + 1500)

upgradeMonolith_05_a -> improveDpsMultiplierBenefit(DPSMultiplier + 1.0)
upgradeMonolith_05_b -> powerUpScholarBenefit(powerScholar + 100)
upgradeMonolith_05_c -> improveEpsMultiplierBenefit(EPSMultiplier + 1.0)
upgradeMonolith_05_d -> powerUpScholarBenefit(powerScholar + 300)
upgradeMonolith_05_e -> improveDpsConversionBenefit() //also upgrades era

upgradeBarracks_05_a -> powerUpRangedBenefit(powerRanged * 2)
upgradeBarracks_05_b -> powerUpMeleeBenefit(powerMelee * 2)
upgradeBarracks_05_c -> powerUpMountedBenefit(powerMounted * 2)
upgradeBarracks_05_d -> improveDpsMultiplierBenefit( DPSMultiplier + 0.25) //also unlocks warcry

upgradeSiege_05_a -> powerUpSiegeBenefit(powerSiege * 2)

upgradeMonolith_06_a -> improveDpsMultiplierBenefit(DPSMultiplier + 0.1)
upgradeMonolith_06_b -> addRawEpsBenefit(EPS2 + 2000)
upgradeMonolith_06_c -> improveDpsMultiplierBenefit(DPSMultiplier + 0.08) + addRawEpsBenefit(EPS2 + 1000)
upgradeMonolith_06_d -> improveEpsMultiplierBenefit(EPSMultiplier + 1.0)
upgradeMonolith_06_e -> improveDpsConversionBenefit() //also upgrades era

upgradeBarracks_06_a -> powerUpMeleeBenefit(powerMelee * 2)
upgradeBarracks_06_b -> powerUpRangedBenefit(powerRanged * 2)
upgradeSiege_06_a -> powerUpMountedBenefit(powerMounted * 2)
upgradeSiege_06_b -> powerUpSiegeBenefit(powerSiege * 2)

upgradeMonolith_07_a -> unlock aircraft!
upgradeMonolith_07_b -> improveDpsMultiplierBenefit(DPSMultiplier + 0.15)
upgradeMonolith_07_c -> improveEpsMultiplierBenefit(EPSMultiplier + 1.0)
upgradeMonolith_07_d -> addRawEpsBenefit(EPS2 + 3000)
upgradeMonolith_07_e -> improveDpsConversionBenefit() //also upgrades era ... but doesn't exist yet

upgradeBarracks_07_a -> powerUpMeleeBenefit(powerMelee * 2)
upgradeBarracks_07_b -> powerUpRangedBenefit(powerRanged * 2)
upgradeBarracks_07_c -> improveDpsMultiplierBenefit(DPSMultiplier + 0.25)
upgradeSiege_07_a -> powerUpMountedBenefit(powerMounted * 2)
upgradeSiege_07_b -> powerUpSiegeBenefit(powerSiege * 2)
upgradeAircraft_07_a -> powerUpAircraftBenefit(powerAircraft + 10000)
 */

/*
algorithm:
for all the visible buttons
calculate the benefits and cost to each button
sort the buttons by benefit/cost ratio
if you have enough EP to pay the cost, click it!

future optimizations
don't recalculate cost/benefit until something changes (new unit, button disappears or appears)
sort the buttons with some jitter to avoid local maxima (may not need to sort fresh every time, but every N times with teh jitter, etc)

factor in idle time accumulating EP as opportunity cost to the benefit/cost ratio

OMEGA TODO:
factor in optimal time to reset for new shards
 */

function () {

}
