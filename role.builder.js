roleRepairer=require('role.repairer')
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('collecting');
	    }
	    if(!creep.memory.building && creep.carry.energy > creep.carryCapacity*0.5) {
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
            else {

              creep.memory.role='repairer'
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
                  if (target.energy <creep.carryCapacity){
                    creep.withdraw(target, RESOURCE_ENERGY, target.energy);
                  }
                  else{
                    creep.withdraw(target, RESOURCE_ENERGY, (creep.carryCapacity - _.sum(creep.carry)));
                  }
                }
            }
	    }
	}
};

module.exports = roleBuilder;
