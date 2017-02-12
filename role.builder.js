var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('collecting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                target = creep.pos.findClosestByRange(targets)
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
	    }
	    else {
	        spawns = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ( (structure.structureType==STRUCTURE_EXTENSION&& structure.energy >0)|| (structure.structureType == STRUCTURE_SPAWN && structure.energy > 200));
                }
            });

            if(spawns.length){
                target = creep.pos.findClosestByRange(spawns)
                if(!(creep.pos.isNearTo(target))){
                    creep.moveTo(target);
                }else{
                    creep.withdraw(target, RESOURCE_ENERGY, (creep.carryCapacity - _.sum(creep.carry)));
                }
            }
	    }
	}
};

module.exports = roleBuilder;
